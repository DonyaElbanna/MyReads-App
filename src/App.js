import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
//import SearchPage from './SearchPage'
import MainPage from './MainPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooks() {
    BooksAPI.getAll()
    .then((books) => {this.setState({books})
    })
  }

  componentDidMount () {
    this.getBooks()
  }

  //moveShelf func is inside main comp to be invoked here to alter the state
  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.getBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <MainPage 
          books={this.state.books}
          moveShelf={this.moveShelf}
        />
      </div>
    )
  }
}

export default BooksApp
