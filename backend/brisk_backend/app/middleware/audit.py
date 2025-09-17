from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
import json
import time
from datetime import datetime
from typing import Dict, Any, Optional
import uuid

from app.database import get_db
from app.models import AuditLog


class AuditMiddleware(BaseHTTPMiddleware):
    """Enterprise-grade audit middleware for comprehensive request/response logging"""
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        self.excluded_paths = {
            "/docs", "/redoc", "/openapi.json", "/favicon.ico",
            "/health", "/metrics", "/static"
        }
        self.sensitive_fields = {
            "password", "token", "secret", "key", "authorization"
        }
    
    async def dispatch(self, request: Request, call_next):
        if any(request.url.path.startswith(path) for path in self.excluded_paths):
            return await call_next(request)
        
        request_id = str(uuid.uuid4())
        start_time = time.time()
        
        request_data = await self._capture_request_data(request)
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        
        response_data = self._capture_response_data(response)
        
        await self._create_audit_log(
            request, response, request_data, response_data, 
            request_id, process_time
        )
        
        return response
    
    async def _capture_request_data(self, request: Request) -> Dict[str, Any]:
        """Capture comprehensive request data for audit logging"""
        try:
            body = None
            if request.method in ["POST", "PUT", "PATCH"]:
                body_bytes = await request.body()
                if body_bytes:
                    try:
                        body = json.loads(body_bytes.decode())
                        body = self._sanitize_data(body)
                    except (json.JSONDecodeError, UnicodeDecodeError):
                        body = {"_raw_size": len(body_bytes)}
            
            return {
                "method": request.method,
                "url": str(request.url),
                "path": request.url.path,
                "query_params": dict(request.query_params),
                "headers": self._sanitize_headers(dict(request.headers)),
                "body": body,
                "client_ip": self._get_client_ip(request),
                "user_agent": request.headers.get("user-agent"),
                "timestamp": datetime.utcnow().isoformat()
            }
        except Exception as e:
            return {"error": f"Failed to capture request data: {str(e)}"}
    
    def _capture_response_data(self, response: Response) -> Dict[str, Any]:
        """Capture response data for audit logging"""
        try:
            return {
                "status_code": response.status_code,
                "headers": self._sanitize_headers(dict(response.headers)),
                "content_type": response.headers.get("content-type"),
                "content_length": response.headers.get("content-length")
            }
        except Exception as e:
            return {"error": f"Failed to capture response data: {str(e)}"}
    
    async def _create_audit_log(
        self, request: Request, response: Response, 
        request_data: Dict[str, Any], response_data: Dict[str, Any],
        request_id: str, process_time: float
    ):
        """Create comprehensive audit log entry"""
        try:
            db = next(get_db())
            
            risk_level = self._determine_risk_level(request, response)
            
            user_id = getattr(request.state, 'user_id', None)
            tenant_id = getattr(request.state, 'tenant_id', None)
            
            audit_log = AuditLog(
                tenant_id=tenant_id,
                user_id=user_id,
                action=f"{request.method}_{request.url.path.replace('/', '_').upper()}",
                entity_type="HTTP_REQUEST",
                entity_id=request_id,
                details=f"{request.method} {request.url.path} - {response.status_code}",
                metadata={
                    "request": request_data,
                    "response": response_data,
                    "request_id": request_id,
                    "process_time_ms": round(process_time * 1000, 2),
                    "risk_level": risk_level,
                    "compliance_tags": self._get_compliance_tags(request)
                },
                risk_level=risk_level,
                compliance_tags=self._get_compliance_tags(request)
            )
            
            db.add(audit_log)
            db.commit()
            
        except Exception as e:
            print(f"Audit logging failed: {str(e)}")
    
    def _sanitize_data(self, data: Any) -> Any:
        """Recursively sanitize sensitive data"""
        if isinstance(data, dict):
            return {
                key: "***REDACTED***" if any(sensitive in key.lower() 
                                          for sensitive in self.sensitive_fields)
                else self._sanitize_data(value)
                for key, value in data.items()
            }
        elif isinstance(data, list):
            return [self._sanitize_data(item) for item in data]
        return data
    
    def _sanitize_headers(self, headers: Dict[str, str]) -> Dict[str, str]:
        """Sanitize sensitive headers"""
        sanitized = {}
        for key, value in headers.items():
            if any(sensitive in key.lower() for sensitive in self.sensitive_fields):
                sanitized[key] = "***REDACTED***"
            else:
                sanitized[key] = value
        return sanitized
    
    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP address"""
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        
        real_ip = request.headers.get("x-real-ip")
        if real_ip:
            return real_ip
        
        return request.client.host if request.client else "unknown"
    
    def _determine_risk_level(self, request: Request, response: Response) -> str:
        """Determine risk level based on request/response characteristics"""
        if request.method in ["DELETE"]:
            return "HIGH"
        
        if request.url.path.startswith("/api/v1/admin"):
            return "HIGH"
        
        if response.status_code >= 400:
            return "MEDIUM"
        
        if request.method in ["POST", "PUT", "PATCH"]:
            return "MEDIUM"
        
        return "LOW"
    
    def _get_compliance_tags(self, request: Request) -> list:
        """Generate compliance tags based on request characteristics"""
        tags = []
        
        if any(path in request.url.path for path in ["/vat", "/accounts", "/books"]):
            tags.append("FINANCIAL_DATA")
        
        if any(path in request.url.path for path in ["/clients", "/users", "/aml"]):
            tags.append("PERSONAL_DATA")
        
        if "/admin" in request.url.path:
            tags.append("ADMIN_OPERATION")
        
        if any(path in request.url.path for path in ["/auth", "/login", "/token"]):
            tags.append("AUTHENTICATION")
        
        return tags
