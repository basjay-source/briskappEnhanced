from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import uuid

class TenantMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        tenant_id = request.headers.get("X-Tenant-ID")
        
        if not tenant_id and request.url.path.startswith("/api/v1/"):
            if request.url.path not in ["/api/v1/admin/tenants", "/api/v1/auth/login"]:
                tenant_id = "default-tenant"
        
        if tenant_id:
            try:
                uuid.UUID(tenant_id)
            except ValueError:
                if tenant_id != "default-tenant":
                    raise HTTPException(status_code=400, detail="Invalid tenant ID format")
        
        request.state.tenant_id = tenant_id
        response = await call_next(request)
        return response
