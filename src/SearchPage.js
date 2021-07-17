import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
    state = { query: '',
              displayedBooks: [] }

    updateQuery = (query) => {
        this.setState ({query: query})
        this.displayBooks(query);}

    displayBooks = (query) => {
        if (query) {
            BooksAPI.search (query).then((displayedBooks) => {
                
                if (displayedBooks.error) {
                    this.setState({displayedBooks: []})
                } else {
                this.setState({displayedBooks: displayedBooks})
                }
            })
        } else {
          this.setState({displayedBooks: []})
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
                        {this.state.displayedBooks.map(displayedBooks => (
                            <li key={displayedBooks.id}>
                                <Book 
                                  book = {displayedBooks}
                                  moveShelf={this.props.moveShelf}
                                  shelf='none'
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage