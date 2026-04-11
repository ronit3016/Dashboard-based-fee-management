from fastapi import APIRouter, Depends
from database import SessionLocal
from models import Order
from auth import get_current_user

router = APIRouter()

@router.post("/orders")
def create_order(client_name: str, item: str, amount: float, user=Depends(get_current_user)):
    db = SessionLocal()
    order = Order(client_name=client_name, item=item, amount=amount)
    db.add(order)
    db.commit()
    db.refresh(order)
    db.close()
    return order

@router.get("/orders")
def get_orders(user=Depends(get_current_user)):
    db = SessionLocal()
    orders = db.query(Order).all()
    db.close()
    return orders