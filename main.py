from fastapi import FastAPI
from routes import user_router
from database import engine, Base

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(user_router)

@app.get("/")
def home():
    return {"message": "Face Liveness Detection API is Running"}
