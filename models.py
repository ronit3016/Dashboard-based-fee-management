from database import Base
from sqlalchemy import Column, String, Float, DateTime
from datetime import datetime
import uuid

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    client_name = Column(String)
    item = Column(String)
    amount = Column(Float)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.now)

class Client(Base):
    __tablename__ = "clients"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String)
    phone = Column(String)
    email = Column(String)
    created_at = Column(DateTime, default=datetime.now)    

class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    client_name = Column(String)
    amount = Column(Float)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.now)    

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    description = Column(String)
    category = Column(String)
    amount = Column(Float)
    created_at = Column(DateTime, default=datetime.now)   

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.now)     