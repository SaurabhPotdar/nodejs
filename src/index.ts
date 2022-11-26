import app from "./server";
import { Request, Response } from "express";
import config from "./config";
import { Book } from "./models/Book";

const books: Map<number, Book> = new Map<number, Book>();
var autoGenId: number = 0;

app.listen(config.port, () => {
    console.log(`Server running on ${config.port}`);
});

app.get("/books", (_req: Request, res: Response) => {
    return res.send(Array.from(books.values()));
});

app.get('/books/:bookId', (req: Request, res: Response) => {
    const id = parseInt(req.params.bookId);
    const book = books.get(id);
    return book == undefined ? res.status(404).send('Not Found') : res.status(200).send(book);
});

app.post("/books", (req: Request, res: Response) => {
    const book: Book = req.body;
    autoGenId++;
    books.set(autoGenId, book);
    book.id = autoGenId;
    res.status(200).send(book);
});

app.delete('/books/:bookId', (req: Request, res: Response) => {
    const id = parseInt(req.params.bookId);
    if (books.delete(id)) return res.status(200).send("Deleted successfully");
    return res.status(404).send('Not Found');
});

app.put('/books', (req: Request, res: Response) => {
    const book: Book = req.body;
    books.set(book.id, book);
    res.status(200).send(book);
});
