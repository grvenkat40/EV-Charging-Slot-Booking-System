from pydantic import BaseModel

class UserCreate(BaseModel):
    email : str
    password : str
    role:str = 'user'
    code:str | None = None

class UserResponse(BaseModel):
    id : int
    email : str

    model_config = {"from_attributes" : True}