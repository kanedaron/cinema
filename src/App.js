import React from 'react';
import logo from './logo.svg';
import './App.css';

// 1 a list page with all the movies filetered with the buttons(series/films,date/....)
// 2 a master component with states(list of entries, current filter, movie opened(either void or a name of a movie))
// 3 a movie poster component
// 4 a movie details component(which activates and filled based on "movie opened" state)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
