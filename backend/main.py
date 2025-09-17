from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware pro React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # adresa React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# EXISTUJÍCÍ endpoint pro Create
class CreateRequest(BaseModel):
    min_price: float
    max_price: float
    keywords: str

@app.post("/api/create")
def create_item(data: CreateRequest):
    return {
        "message": "Data received successfully!",
        "data": data
    }

# --- TADY PŘIDEJ nový endpoint /api/hello ---
@app.get("/api/hello")
def hello():
    return {"message": "Hello from backend!"}

