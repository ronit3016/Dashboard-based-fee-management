from fastapi import APIRouter, Depends
from database import SessionLocal
from models import Client
from auth import get_current_user

router = APIRouter()

@router.post("/clients")
def create_client(name: str, phone: str, email: str, user=Depends(get_current_user)):
    db = SessionLocal()
    client = Client(name=name, phone=phone, email=email)
    db.add(client)
    db.commit()
    db.refresh(client)
    db.close()
    return client

@router.get("/clients")
def get_clients(user=Depends(get_current_user)):
    db = SessionLocal()
    clients = db.query(Client).all()
    db.close()
    return clients