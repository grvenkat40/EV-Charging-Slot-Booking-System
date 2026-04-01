from fastapi import HTTPException
from app.models.user import User
from app.core.security import verify_password, create_access_token

def login_user(db, email, password):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=401, detail="User not found!")
    print(user)
    print(verify_password(password, user.password))
    if not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalied credentials!!")
    
    token = create_access_token({
        "sub":str(user.id),
        "role" : user.role
    })
    return {"access_token" : token, "token_type":"bearer"}