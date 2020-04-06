import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

// 1 a list page with all the movies filetered with the buttons(type,date) PLUS the sort options
// Abis a movie name search bar(add searchinput in state)
// 1ter filter through search bar name AND currentFilters
// 2 a master component with states(list of entries, current filter, movie opened(either void or a name of a movie))
// 3 a movie poster component
// 4 a movie details component(which activates and filled based on "movie opened" state)

const Card = (props) => {
  return (
    <li
      style={{ backgroundImage: `url(${props.image})` }}
      onClick={() => props.click(props.index)}
    >
      <div className="canvas">
        <span className={`${props.opened ? "forwardsanimation" : ""}`}>{props.name}</span>
      </div>
    </li>
  );
};

Card.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const MovieDetails = (props) => {
  return (
    <div className="exmoviedetails">
      <div className="moviedetails">
        <img src={props.image} alt="poster of the movie"></img>
        <div className="mdtitle">{props.name}</div>
        <div className="mddate">{props.date}<span>{props.type}</span></div>
        {/* <div className="mdtype">{props.type}</div> */}
        <div className="mddesc">{props.desc}</div>
        <div className="back" onClick={() => props.back()}>
          Go Back
        </div>
        <div className="mdspace"></div>
        <span className="pleinpot">a</span>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

class Cinema extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      entries: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            ...result,
            isLoaded: true,
            currentFilter: {
              sortyear: false,
              sortname: false,
              sorttype: false,
              filteryear: "",
              filtertype: "",
            },
            searchInput: "",
            movieOpened: -1,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  // MovieDetails toggles
  SetMovieDetails = (index) => {
    // document.getElementById("forward").classList.add("forwardsanimation")
      this.setState({ movieOpened: index });

  };

  UnSetMovieDetails = () => {
    document.getElementsByClassName("exmoviedetails")[0].classList.add("backwardsanimation")
    setTimeout(() => {
      this.setState({ movieOpened: -1 });
    }, 1000);
  };

  //Search Engine Interface

  search = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  // Filter and Sort toggles
  resettoggles = () => {
    this.setState({
      currentFilter: {
        sortyear: false,
        sortname: false,
        sorttype: false,
        filteryear: "",
        filtertype: "",
      },
    });
  };

  sortyear = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        sortyear: true,
        sortname: false,
        sorttype: false,
      },
    });
  };

  sortname = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        sortyear: false,
        sortname: true,
        sorttype: false,
      },
    });
  };

  sorttype = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        sortyear: false,
        sortname: false,
        sorttype: true,
      },
    });
  };

  filtermovie = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        filtertype: "movie",
      },
    });
  };

  filterseries = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        filtertype: "series",
      },
    });
  };

  filter1990 = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        filteryear: "1990",
      },
    });
  };

  filter2000 = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        filteryear: "2000",
      },
    });
  };

  filter2010 = () => {
    this.setState({
      currentFilter: {
        ...this.state.currentFilter,
        filteryear: "2010",
      },
    });
  };

  render() {
    if (this.state.error) {
      return <div>Erreur : {this.state.error.message}</div>;
    } else if (this.state.isLoaded === false) {
      return <div>Chargement…</div>;
    } else {
      // set up a copy of film entries which will a) be sorted and filtered
      // b) always keep an index to give a way to get back to original entry for moviedetails
      let tablerendue = [];
      for (let item in this.state.entries) {
        this.tablerendue = tablerendue.push({
          ...this.state.entries[item],
          index: item,
        });
      }

      // filter and sort the entries array

      //Search Engine
      //       const regex = /^destru/;
      // const result = words.filter(word => !word.search(regex));
      function regexEscape(str) {
        return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
      }

      if (this.state.searchInput !== "") {
        const input = regexEscape(this.state.searchInput);
        const regex2 = new RegExp(`^${input}`, "i");
        tablerendue = tablerendue.filter((word) => !word.title.search(regex2));
      }
      //End of Search Engine

      if (this.state.currentFilter.filteryear === "2010")
        tablerendue = tablerendue.filter((film) => film.releaseYear > 2009);
      if (this.state.currentFilter.filteryear === "2000")
        tablerendue = tablerendue.filter(
          (film) => film.releaseYear > 1999 && film.releaseYear < 2010
        );
      if (this.state.currentFilter.filteryear === "1990")
        tablerendue = tablerendue.filter(
          (film) => film.releaseYear > 1989 && film.releaseYear < 2000
        );

      if (this.state.currentFilter.filtertype === "series")
        tablerendue = tablerendue.filter(
          (film) => film.programType === "series"
        );
      if (this.state.currentFilter.filtertype === "movie")
        tablerendue = tablerendue.filter(
          (film) => film.programType === "movie"
        );

      if (this.state.currentFilter.sortname)
        tablerendue = tablerendue.sort((a, b) => {
          if (a.title > b.title) return 1;
          if (a.title < b.title) return -1;
          return 0;
        });
      if (this.state.currentFilter.sorttype)
        tablerendue = tablerendue.sort((a, b) => {
          if (a.programType > b.programType) return 1;
          if (a.programType < b.programType) return -1;
          return 0;
        });
      if (this.state.currentFilter.sortyear)
        tablerendue = tablerendue.sort((a, b) => {
          if (a.releaseYear > b.releaseYear) return 1;
          if (a.releaseYear < b.releaseYear) return -1;
          return 0;
        });

      const film = this.state.entries[this.state.movieOpened];

      return (
        <div className="cinema">
          {/* Top bar */}
          <div className="topbar">
            <p className="year">Year</p>
            {this.state.currentFilter.filteryear === "2010" ? (
              <button className="f2010 activebutton">2010 onwards</button>
            ) : (
              <button
                onClick={() => {
                  this.filter2010();
                }}
                className="f2010"
              >
                2010 onwards
              </button>
            )}
            {this.state.currentFilter.filteryear === "2000" ? (
              <button className="f2000 activebutton">2000-2010</button>
            ) : (
              <button
                onClick={() => {
                  this.filter2000();
                }}
                className="f2000"
              >
                2000-2010
              </button>
            )}
            {this.state.currentFilter.filteryear === "1990" ? (
              <button className="f1990 activebutton">1990-2000</button>
            ) : (
              <button
                onClick={() => {
                  this.filter1990();
                }}
                className="f1990"
              >
                1990-2000
              </button>
            )}

            <p className="type">Type</p>
            {this.state.currentFilter.filtertype === "series" ? (
              <button className="series activebutton">Series</button>
            ) : (
              <button
                onClick={() => {
                  this.filterseries();
                }}
                className="series"
              >
                Series
              </button>
            )}
            {this.state.currentFilter.filtertype === "movie" ? (
              <button className="movie activebutton">Movie</button>
            ) : (
              <button
                onClick={() => {
                  this.filtermovie();
                }}
                className="movie"
              >
                Movie
              </button>
            )}

            <p className="sort">Sort</p>
            {this.state.currentFilter.sortname ? (
              <button className="sname activebutton">Name</button>
            ) : (
              <button
                onClick={() => {
                  this.sortname();
                }}
                className="sname"
              >
                Name
              </button>
            )}
            {this.state.currentFilter.sortyear ? (
              <button className="syear activebutton">Year</button>
            ) : (
              <button
                onClick={() => {
                  this.sortyear();
                }}
                className="syear"
              >
                Year
              </button>
            )}
            {this.state.currentFilter.sorttype ? (
              <button className="stype activebutton">Type</button>
            ) : (
              <button
                onClick={() => {
                  this.sorttype();
                }}
                className="stype"
              >
                Type
              </button>
            )}
          </div>
          <div className="topbar right">
            <button
              onClick={() => {
                this.resettoggles();
              }}
            >
              Reset
            </button>
            <input
              onChange={this.search}
              placeholder="Search for a name......"
            ></input>
          </div>
          {/* MovieDetails */}
          {this.state.movieOpened > -1 && (
            <MovieDetails
              name={film.title}
              type={film.programType}
              image={film.images["Poster Art"].url}
              desc={film.description}
              date={film.releaseYear}
              back={this.UnSetMovieDetails}
            />
          )}
          {/* movie list */}
          <ul id="movielist">
            {tablerendue.map((movie) => (
              <Card
                key={movie.index}
                name={movie.title}
                image={movie.images["Poster Art"].url}
                index={movie.index}
                click={this.SetMovieDetails}
                opened={this.state.movieOpened===movie.index}
              />
            ))}
          </ul>
        </div>
      );
    }
  }
}
function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Cinema />
    </div>
  );
}

export default App;
