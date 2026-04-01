from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.api.deps import get_db
from app.schemas.auth import LoginRequest
from app.services import auth_service

router = APIRouter()

@router.post("/login")
def login(
    form_data:OAuth2PasswordRequestForm = Depends(),
    db:Session = Depends(get_db)
    ):
    return auth_service.login_user(db, email = form_data.username, password = form_data.password)