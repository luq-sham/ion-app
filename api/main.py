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
    book_id: str
    genre: str
    price: float

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
    
    query = "INSERT INTO books (book_id, title, author, published_year, genre, price) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (book.book_id,book.title, book.author, book.published_year, book.genre, book.price)
    cursor.execute(query, values)
    conn.commit()
        
    return {"status_code": 200, "message": "Book added successfully"}