from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"))


@app.get("/", response_class=HTMLResponse)
async def root():
    with open("index.html","r") as f:
        return f.read()

@app.get("/api/predict")
async def predict():
    probabilities = [ 0.2, 0.3, 0.5, 0, 0, 0, 0, 0, 0, 0 ]
    return {'probabilities': probabilities}

