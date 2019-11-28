
class Book {
    constructor(title, author, urlTxt, urlMp3, isActive) {
        this.title = title;
        this.author = author;
        this.urlTxt = urlTxt;
        this.urlMp3 = urlMp3;
        this.isActive = isActive;
    }
}

module.exports.Book = Book;
