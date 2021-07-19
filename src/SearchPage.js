import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
    state = {
        query: '',
        displayedBooks: []
    }

    updateQuery = (query) => {
        this.setState({ query })
        this.displayBooks(query);
    }

    displayBooks = (query) => {
        if (query.length !==0) {
            BooksAPI.search(query).then((displayedBooks) => {
                /*
                * The nested "if" covers the case of an error.
                * For example, if I type something that returns no result,
                * the resulting object will still have to be an array
                * otherwise the app will crash when the .map() method
                * will be run. 
                */
                if (displayedBooks.error) {
                    this.setState({ displayedBooks: [] })
                } else {
                    this.setState({ displayedBooks: displayedBooks })
                    // console.log(matchedBooks);
                }
            }
            )
        } else {
            this.setState ({ displayedBooks: [] })
        }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        { }
                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) =>
                                this.updateQuery(event.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.displayedBooks.map(displayedBook => {
                            let shelf = 'none'
                            this.props.books.forEach(book => {
                                if (book.id === displayedBook.id) {
                                    shelf = book.shelf
                                } else {
                                    displayedBook.shelf = 'none'
                                }
                            })

                            return (
                                <li key={displayedBook.id}>
                                    <Book
                                        book={displayedBook}
                                        moveShelf={this.props.moveShelf}
                                        shelf={shelf}
                                    />
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage