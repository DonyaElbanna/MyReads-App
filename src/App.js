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

  //moveShelf func is inside main comp to be invoked here to alter the state
  moveShelf = (movedBook, newShelf) => {
    BooksAPI.update(movedBook, newShelf)
      .then(() => {
        this.getBooks()
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage
            books={this.state.books}
            moveShelf={this.moveShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            books={this.state.books}
            moveShelf={this.moveShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
