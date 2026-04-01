from app.models.station import Station
from fastapi import HTTPException

def create_station(db, data):
    exist_station = db.query(Station).filter(Station.name == data.name).first()
    if exist_station:
        raise HTTPException(status_code=403, detail="Station already exists!")
    
    station = Station(**data.dict())
    
    
    db.add(station)
    db.commit()
    db.refresh(station)
    return station

def get_stations(db, skip:int=0, limit:int=0):
    return db.query(Station).offset(skip).limit(limit).all()