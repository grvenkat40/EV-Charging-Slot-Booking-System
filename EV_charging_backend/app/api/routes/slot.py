from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

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