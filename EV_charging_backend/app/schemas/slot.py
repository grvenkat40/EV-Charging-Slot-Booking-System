from pydantic import BaseModel, validator
from datetime import datetime

class SlotCreate(BaseModel):
    station_id : int
    start_time : datetime
    end_time : datetime

    @validator("end_time")
    def check_time(cls, v, values):
        if "start_time" in values and v <= values["start_time"]:
            raise ValueError("End time must be after start time!")
        return v

class SlotResponse(BaseModel):
    id:int
    station_id:int
    start_time: datetime
    end_time: datetime
    is_available:bool

    model_config = {"from_attributes":True}