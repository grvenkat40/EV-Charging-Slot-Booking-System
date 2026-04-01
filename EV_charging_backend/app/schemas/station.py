from pydantic import BaseModel

class StationCreate(BaseModel):
    name:str
    location:str
    latitude:float
    longitude:float

class StationResponce(BaseModel):
    id:int
    name:str

    model_config = {"from_attributes":True}