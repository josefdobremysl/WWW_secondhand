from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from vinted_api import search_vinted # Import nové funkce

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchRequest(BaseModel):
    keywords: str
    min_price: float
    max_price: float

@app.get("/api/vinted/first_item")
def get_first_vinted_item():
    # 
    results = search_vinted(keywords="vetements", min_price=0, max_price=999999)
    if results:
        return results[0]
    else:
        return {"error": "No items found"}

@app.post("/api/search")
def search_vinted_items(request: SearchRequest):
    try:
        results = search_vinted(
            keywords=request.keywords,
            min_price=request.min_price,
            max_price=request.max_price
        )
        
        # print(f"Received search for: {request.keywords}, min_price: {request.min_price}, max_price: {request.max_price}")
        # print(f"Found {len(results)} items:")
        # for item in results:
        #     print(f"- Title: {item['title']}, Price: {item['price']} {item['currency']}, URL: {item['url']}")
        
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))