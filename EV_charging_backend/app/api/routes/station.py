from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_admin
from app.schemas.station import StationCreate, StationResponce
from app.services import station_service

router = APIRouter()

@router.post("/", dependencies=[Depends(require_admin)], response_model=StationResponce)
def create_station(data:StationCreate, db:Session = Depends(get_db)):
    return station_service.create_station(db, data)

@router.get("/get_stations", response_model=list[StationResponce])
def get_station(
    db:Session= Depends(get_db),
    skip:int = Query(0, ge=0),
    limit:int = Query(10, le=50)
):
    return station_service.get_stations(db, skip, limit)