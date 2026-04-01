from pydantic import BaseModel

class BookingCreate(BaseModel):
    # user_id:int
    slot_id:int

class SlotInfo(BaseModel):
    slot_id: int
    station_id: int

class BookingResponse(BaseModel):
    booking_id:int
    slot : SlotInfo

    model_config = {"from_attributes":True}
