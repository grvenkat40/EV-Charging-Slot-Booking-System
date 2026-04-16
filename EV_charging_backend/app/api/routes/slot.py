from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.models.slot import Slot
from app.api.deps import get_db, require_admin
from app.schemas.slot import SlotCreate, SlotResponse
from app.services import slot_service

router = APIRouter()

@router.post("/", dependencies=[Depends(require_admin)], response_model=SlotResponse)
def create_slot(data:SlotCreate, db:Session = Depends(get_db)):
    return slot_service.create_slot(db, data)

@router.get("/get_slots", response_model=list[SlotResponse])
def get_slots(
    db:Session = Depends(get_db),
    skip :int = Query(0, ge=0),
    limit :int = Query(10, le=50)
    
):
    return slot_service.get_slots(db, skip, limit)

@router.get("/get_slot/{stationId}", response_model=list[SlotResponse])
def station_slots(stationId : int, db: Session = Depends(get_db)):
    slots = db.query(Slot).filter(Slot.station_id == stationId).all()

    return [
        {
            "id": slot.id,
            "station_id": slot.station_id,
            "start_time": slot.start_time,
            "end_time": slot.end_time,
            "is_available": slot.is_available
            
        }
        for slot in slots
    ]