from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta
import os

from app.database import get_db
from app.models import User, Tenant

router = APIRouter(tags=["authentication"])
security = HTTPBearer()

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

@router.post("/login", response_model=LoginResponse)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == login_data.email).first()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    demo_password = os.getenv("DEMO_PASSWORD")
    if not demo_password or login_data.password != demo_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token_data = {
        "user_id": user.id,
        "email": user.email,
        "tenant_id": user.tenant_id,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    
    jwt_secret = os.getenv("JWT_SECRET_KEY")
    if not jwt_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server configuration error"
        )
    access_token = jwt.encode(token_data, jwt_secret, algorithm="HS256")
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user={
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "tenant_id": user.tenant_id
        }
    )

@router.get("/login-simple")
async def login_simple(
    email: str,
    password: str,
    auth: str = None,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == email).first()
    
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    demo_password = os.getenv("DEMO_PASSWORD")
    if not demo_password or password != demo_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token_data = {
        "user_id": user.id,
        "email": user.email,
        "tenant_id": user.tenant_id,
        "exp": datetime.utcnow() + timedelta(hours=24)
    }
    
    jwt_secret = os.getenv("JWT_SECRET_KEY")
    if not jwt_secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server configuration error"
        )
    access_token = jwt.encode(token_data, jwt_secret, algorithm="HS256")
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "tenant_id": user.tenant_id
        }
    }
