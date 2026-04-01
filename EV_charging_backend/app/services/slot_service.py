from app.models.slot import Slot
# from app.core.redis import redis_client
import json

def create_slot(db, data):
    slot = Slot(**data.dict())
    db.add(slot)
    db.commit()
    db.refresh(slot)
    return slot

def get_slots(db, skip:int = 0, limit:int = 10):
    # cache_key = f"slots:{skip}:{limit}"
    # cached_data = redis_client.get(cache_key)
    # if cached_data:
    #     print("CACHE HIT ⚡")
    #     return json.loads(cached_data)
    
    # print("CACHE MISS ❌")

    slots =  db.query(Slot).offset(skip).limit(limit).all()

    result = [
        {
            "id" : s.id,
            "station_id" : s.station_id,
            "start_time": s.start_time,
            "end_time": s.end_time,
            "is_available" :s.is_available
        }
        for s in slots
    ]

    # redis_client.setex(cache_key, 60, json.dumps(result))
    return result