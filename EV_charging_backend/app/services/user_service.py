from fastapi import HTTPException
from app.models.user import User
from app.core.security import hash_password
from dotenv import load_dotenv
import os

load_dotenv()

ADMIN_ACCESS_CODE = os.getenv("ADMIN_ACCESS_CODE")

def create_user(db, user_data):

    existing_user = db.query(User).filter(User.email == user_data.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered!")

    if user_data.role == "admin":
        if user_data.code != ADMIN_ACCESS_CODE:
            raise HTTPException(status_code=403, detail= "Invalied admin code!")
    
    user = User(
        email = user_data.email,
        password = hash_password(user_data.password),
        role = user_data.role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user