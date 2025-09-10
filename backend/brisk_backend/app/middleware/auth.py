from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        public_paths = ["/", "/health", "/docs", "/openapi.json", "/api/v1/auth/login"]
        
        if request.url.path in public_paths or not request.url.path.startswith("/api/v1/"):
            response = await call_next(request)
            return response
        
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            request.state.user_id = "demo-user"
        else:
            request.state.user_id = "authenticated-user"
        
        response = await call_next(request)
        return response
