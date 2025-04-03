from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="tempah"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Book(BaseModel):
    title: str
    author: str
    published_year: int


@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/api/get_books_details")
def get_books_details():
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM books")

    books = cursor.fetchall()
    count = len(books)

    cursor.close()
    
    return {"status_code": 200,"records":count, "return_data_set_1": books}

@app.post("/api/post_add_book")
def add_book(book: Book):
    cursor = conn.cursor()
    
    query = "INSERT INTO books (title, author, published_year) VALUES (%s, %s, %s)"
    values = (book.title, book.author, book.published_year)
    cursor.execute(query, values)
    conn.commit()
        
    return {"status_code": 201, "message": "Book added successfully"}