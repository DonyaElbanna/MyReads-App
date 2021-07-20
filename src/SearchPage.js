import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        displayedBooks: []
    }

    updateQuery = query => {
        this.setState({ query })
        this.displayBooks(query);
    }


    displayBooks = (query) => {

        if (query !== '') {
            BooksAPI.search(query).then((displayedBooks) => {

                if (displayedBooks.error) {
                    
                    this.setState({ displayedBooks: [] })
                } else {
                    this.setState({ displayedBooks: displayedBooks })
                }
            }
            )
        } else {
            this.setState ({ displayedBooks: [] })
            
        }
    }
    render() {

        const {query} = this.state
        const {books, moveBook} = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) =>
                                this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    
                    <ol className="books-grid">
                        {this.state.displayedBooks.map(displayedBook => {
                            let shelf = 'none'
                            books.forEach(book => {
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
                                        moveBook={moveBook}
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