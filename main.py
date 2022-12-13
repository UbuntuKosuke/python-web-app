from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"))


@app.get("/", response_class=HTMLResponse)
async def root():
    with open("index.html","r") as f:
        return f.read()

