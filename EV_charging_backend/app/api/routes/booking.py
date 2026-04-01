from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.booking import BookingCreate, BookingResponse
from app.services import booking_service
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/", response_model=BookingResponse)
def create_booking(
    data:BookingCreate,
    db:Session=Depends(get_db),
    current_user = Depends(get_current_user)
    ):
    print(current_user.id)
    return booking_service.create_booking(
        db,
        user_id= current_user.id,
        slot_id=data.slot_id
    )

@router.get("/get_my_bookings", response_model=list[BookingResponse])
def get_bookings(
    db:Session = Depends(get_db),
    current_user = Depends(get_current_user),
    skip:int = Query(0, ge = 0),
    limit:int = Query(10, le=50)
    ):
    return booking_service.get_bookings(db, user_id = current_user.id, skip = skip, limit=limit)