from fastapi import FastAPI
from app.api.routes import user, booking, station, slot, auth
from app.db.session import engine
from app.db.base import Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind = engine)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(station.router, prefix="/station", tags=["Stations"])
app.include_router(booking.router, prefix="/bookings", tags=["Bookings"])
app.include_router(slot.router, prefix="/slots", tags=["Slots"])

@app.get("/")
def root():
    return {"message" : "EV charging Backend is Running!"}