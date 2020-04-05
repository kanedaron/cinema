import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

// 1 a list page with all the movies filetered with the buttons(type,date) PLUS the sort options
// Abis a movie name search bar(add searchinput in state)
// 1ter filter through search bar name AND currentFilters
// 2 a master component with states(list of entries, current filter, movie opened(either void or a name of a movie))
// 3 a movie poster component
// 4 a movie details component(which activates and filled based on "movie opened" state)

const Card = (props) => {
  return <li style={{backgroundImage: `url(${props.image})`}} onClick={() => props.click(props.index)}>
                        <div className="canvas">
                                    <span>{props.name}</span>
                        </div>
        </li>
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
              <div class="back" onClick={() => props.back()}>Go Back</div>
  </div>
}

MovieDetails.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

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

 SetMovieDetails = (index) => {
        this.setState({movieOpened:index})
  }

 UnSetMovieDetails = () => {
  this.setState({movieOpened:-1})
  }
    
    render () {
      if (this.state.movieOpened > -1) {

        const film = this.state.entries[this.state.movieOpened]
        return <MovieDetails name={film.title} type={film.programType} 
        image={film.images["Poster Art"].url} desc={film.description} date={film.releaseYear} 
        back={this.UnSetMovieDetails} />
      }

      if (this.state.error) {
        return <div>Erreur : {this.state.error.message}</div>;
      } else if (this.state.isLoaded===false) {
        return <div>Chargement…</div>;
      } else {
        return (
                <div className="cinema">
                    {/* Top bar */}
                    <div className="topbar">
        {this.state.currentFilter.filteryear==="2010" ? <button className="activebutton">2010 onwards</button> : <button >2010 onwards</button> }
        {this.state.currentFilter.filteryear==="2000" ? <button className="activebutton">2000-2010</button> : <button >2000-2010</button> }
        {this.state.currentFilter.filteryear==="1990" ? <button className="activebutton">1990-2000</button> : <button >1990-2000</button> }

        {this.state.currentFilter.filtertype==="series" ? <button className="activebutton">Only Series</button> : <button >Only Series</button> }
        {this.state.currentFilter.filtertype==="movie" ? <button className="activebutton">Only Movies</button> : <button >Only Movies</button> }

                        {this.state.currentFilter.sortname ? <button className="activebutton">Sort by name</button> : <button >Sort by name</button> }
                        {this.state.currentFilter.sortyear ? <button className="activebutton">Sort by year</button> : <button >Sort by year</button> }
                        {this.state.currentFilter.sorttype ? <button className="activebutton">Sort by type</button> : <button >Sort by type</button> }
                        <input placeholder="Search for a name......"></input>
                    </div>
                    {/* movie list */}
                    <ul className="container">
                      {this.state.entries.map((movie,index) => <Card key={index} name={movie.title} 
                      image={movie.images["Poster Art"].url} index={index} click={this.SetMovieDetails} />)
                      
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
