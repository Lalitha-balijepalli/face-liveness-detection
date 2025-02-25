from sqlalchemy import Column, String, DateTime, func
from database import Base

class User(Base):
    __tablename__ = "users"
    
    username = Column(String, primary_key=True, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
