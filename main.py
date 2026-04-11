from fastapi import FastAPI, Depends
from database import engine
from models import Base
from auth import hash_password, verify_password, create_token, get_current_user
from database import SessionLocal
from models import User, Payment, Expense, Order
from routers import orders, clients, payments, expenses

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(orders.router)
app.include_router(clients.router)
app.include_router(payments.router)
app.include_router(expenses.router)

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/register")
def register(email: str, password: str):
    db = SessionLocal()
    user = User(email=email, password_hash=hash_password(password))
    db.add(user)
    db.commit()
    db.close()
    return {"message": "User registered successfully"}

@app.post("/login")
def login(email: str, password: str):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    db.close()
    if not user or not verify_password(password, user.password_hash):
        return {"error": "Invalid credentials"}
    token = create_token({"email": user.email})
    return {"token": token}

@app.get("/dashboard")
def get_dashboard(user=Depends(get_current_user)):
    db = SessionLocal()
    payments = db.query(Payment).all()
    expenses = db.query(Expense).all()
    total_revenue = sum(p.amount for p in payments if p.status == "paid")
    total_expenses = sum(e.amount for e in expenses)
    pending = sum(p.amount for p in payments if p.status == "pending")
    db.close()
    return {
        "total_revenue": total_revenue,
        "total_expenses": total_expenses,
        "net_profit": total_revenue - total_expenses,
        "pending_payments": pending
    }