import express from "express";
import cors from "cors";
import Books from "./Books.js"
import Users from "./Users.js";

const app = express();

app.use(express.json())
app.use(cors())

app.get('/books', (req, res) => {
    res.json(Books);
});

app.get('/book/:id', (req, res) => {
    const { id } = req.params;
    const Book = Books.find((book) => book.id == id);
    res.json(Book);
})

app.post('/book', (req, res) => {
    const { title, author, publicationDate, availableCopies } = req.body;
    const Book = Books.push({
        id: Books.length + 1,
        title,
        author,
        publicationDate,
        availableCopies
    })
    res.json(Book);
})

app.delete('/book/:id', (req, res) => {
    const { id } = req.params;
    const book = Books.filter((item) => item.id !== id);
    res.json(book);
})

app.put('book/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, publicationDate, availableCopies } = req.body;
    const book = Books.find((book) => book.id == id);
    if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        book, publicationDate = publicationDate || book.publicationDate;
        book.availableCopies = availableCopies || book.availableCopies
    }
    res.json()
})

app.get("/users", (req, res) => {
    res.json(Users);
})

app.post("/user", (req, res) => {
    const user = Users.push(req.body);
    res.status(200).json(user)
})

app.delete("/user/:id", (req, res) => {
    const {id} = req.params;
    const user = Users.filter((user) => user.id !== id)
    res.json(user);
})

app.put("/user/:id", (req, res) => {
    const {id} = req.params;
    const user = Users.find((user) => user.id === id);
    if(user){
        user.email = req.body.email 
        user.name = req.body.name
    }
    res.json(user)
})









app.listen(3000, () => {
    console.log("Server running in Port 3000");
})