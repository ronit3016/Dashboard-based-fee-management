from fastapi import APIRouter, Depends
from database import SessionLocal
from models import Payment
from auth import get_current_user

router = APIRouter()

@router.post("/payments")
def create_payment(client_name: str, amount: float, user=Depends(get_current_user)):
    db = SessionLocal()
    payment = Payment(client_name=client_name, amount=amount)
    db.add(payment)
    db.commit()
    db.refresh(payment)
    db.close()
    return payment

@router.get("/payments")
def get_payments(user=Depends(get_current_user)):
    db = SessionLocal()
    payments = db.query(Payment).all()
    db.close()
    return payments