"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("./config"));
const books = new Map();
var autoGenId = 0;
server_1.default.listen(config_1.default.port, () => {
    console.log(`Server running on ${config_1.default.port}`);
});
server_1.default.get("/books", (_req, res) => {
    return res.send(Array.from(books.values()));
});
server_1.default.get('/books/:bookId', (req, res) => {
    const id = parseInt(req.params.bookId);
    const book = books.get(id);
    return book == undefined ? res.status(404).send('Not Found') : res.status(200).send(book);
});
server_1.default.post("/books", (req, res) => {
    const book = req.body;
    autoGenId++;
    books.set(autoGenId, book);
    book.id = autoGenId;
    res.status(200).send(book);
});
server_1.default.delete('/books/:bookId', (req, res) => {
    const id = parseInt(req.params.bookId);
    if (books.delete(id))
        return res.status(200).send("Deleted successfully");
    return res.status(404).send('Not Found');
});
server_1.default.put('/books', (req, res) => {
    const book = req.body;
    books.set(book.id, book);
    res.status(200).send(book);
});
