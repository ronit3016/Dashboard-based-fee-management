from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi import Header, HTTPException
from dotenv import load_dotenv
import os
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password: str):
    return pwd_context.hash(password[:72])

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)

def create_token(data: dict):
    data["exp"] = datetime.now() + timedelta(hours=24)
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

def get_current_user(authorization: str = Header()):
    try:
        token = authorization.split(" ")[1]
        return verify_token(token)
    except:
        raise HTTPException(status_code=401, detail="Invalid or missing token")