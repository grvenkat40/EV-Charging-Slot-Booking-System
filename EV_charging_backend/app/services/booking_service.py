from fastapi import HTTPException
from app.models.booking import Booking
from app.models.slot import Slot

def create_booking(db, user_id:int, slot_id:int):
    slot = db.query(Slot).filter(Slot.id == slot_id, Slot.is_available == True).with_for_update().first()

    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found!")
    
    if not slot.is_available:
        raise HTTPException( status_code=400,detail="Slot already booked!")
    
    slot.is_available = False

    booking = Booking(
        user_id = user_id,
        slot_id = slot_id
    )
    print(user_id)
    db.add(booking)
    db.commit()
    db.refresh(booking)


    return {
        "booking_id" : booking.id,
        "slot" :{
            "slot_id" : slot.id,
            "station_id" : slot.station_id
        }
    }

def get_bookings(db, user_id, skip:int= 0, limit:int = 0):
    bookings = (
        db.query(Booking)
        .filter(Booking.user_id == user_id)
        .join(Slot)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return [
        {
            "booking_id" : b.id,
            "slot":{
                "slot_id" : b.slot_id,
                "station_id":b.slot.station_id
            }
        }
        for b in bookings
    ]