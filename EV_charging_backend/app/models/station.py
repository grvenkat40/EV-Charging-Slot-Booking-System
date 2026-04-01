from sqlalchemy import Column, Integer, String, Float
from app.db.base import Base

class Station(Base):
    __tablename__ = "stations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)