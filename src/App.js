import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

// 1 a list page with all the movies filetered with the buttons(type,date) PLUS the sort options
// Abis a movie name search bar(add searchinput in state)
// 1ter filter through search bar name AND currentFilters
// 2 a master component with states(list of entries, current filter, movie opened(either void or a name of a movie))
// 3 a movie poster component
// 4 a movie details component(which activates and filled based on "movie opened" state)

// const Card = (props) => {
//   return <div><img src={`${props.image}`} alt="the poster of the movie"></img>{props.name}</div>
// }

class Card extends Component {

  render() {
      return (<div><img src={`${this.props.image}`} alt="the poster of the movie"></img>{this.props.name}</div>)
  }
}

Card.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

const MovieDetails = (props) => {
  return <div class="moviedetails">
              <img src={props.image} alt="poster of the movie"></img>
              <div class="mdtitle">{props.name}</div>
              <div class="mddate">{props.date}</div>
              <div class="mdtype">{props.type}</div>
              <div class="mddesc">{props.desc}</div>
  </div>
}

class Cinema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      entries: []
    };
  }

  componentDidMount() {
    fetch("https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json")
    .then(res => res.json())
    .then(
      
      result => {
      this.setState({
        ...result,
        isLoaded: true,
        currentFilter: {
          sortyear:false,
          sortname:false,
          sorttype:false,
          filteryear:"",
          filtertype:""
        },
        searchInput: "",
        movieOpened: -1});
    },

    error => {
      this.setState({
        isLoaded: true,
        error
      });
    }

    );
  }
    
    render () {
      if (this.state.error) {
        return <div>Erreur : {this.state.error.message}</div>;
      } else if (this.state.isLoaded===false) {
        return <div>Chargement…</div>;
      } else {
        return (
                <div className="cinema">testcinema
                    {/* Top bar */}
                    <div className="topbar">
                        <button>Decade</button>
                        <button>series</button>
                        <button>movies</button>
                        <button>Sort by name</button>
                        <button>Sort by year</button>
                        <button>Sort by type</button>
                        <input></input>
                    </div>
                    {/* movie list */}
                    <ul class="container">
                      {this.state.entries.map((movie,index) => <Card key={index} name={movie.title} image={movie.images["Poster Art"].url} />)
                      
                      }
                    </ul>
                </div>
                      )
            }
    }
  }
function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Cinema />
    </div>
  );
}

export default App;
