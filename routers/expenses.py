from fastapi import APIRouter, Depends
from database import SessionLocal
from models import Expense
from auth import get_current_user

router = APIRouter()

@router.post("/expenses")
def create_expense(description: str, category: str, amount: float, user=Depends(get_current_user)):
    db = SessionLocal()
    expense = Expense(description=description, category=category, amount=amount)
    db.add(expense)
    db.commit()
    db.refresh(expense)
    db.close()
    return expense

@router.get("/expenses")
def get_expenses(user=Depends(get_current_user)):
    db = SessionLocal()
    expenses = db.query(Expense).all()
    db.close()
    return expenses