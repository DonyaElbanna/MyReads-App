import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import MainPage from './MainPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  componentDidMount() {
    this.getBooks()
  }

  //moveBook func is inside main comp to be invoked here to alter the state
  moveBook = (movedBook, newShelf) => {
    BooksAPI.update(movedBook, newShelf)
      .then(() => {
        this.getBooks()
      })
  }

  render() {
    const {books} = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage
            books={books}
            moveBook={this.moveBook}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            books={books}
            moveBook={this.moveBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
