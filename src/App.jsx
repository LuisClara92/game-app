import React, { useState, useEffect } from "react";
import { BrowserRouter as Router , Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";
import Screenshots from "./components/Screenshots";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [games, setGames] = useState([]);
  const [currentSelected, setCurrentSelected] = useState();
  const [sortRatingIsOn, setSortRating] = useState(false);
  let [displayedGames] = useState([]);
  // const [selectedGenre, setGenreSelection] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('');

  useEffect(() => {
    fetch("https://wild-games.herokuapp.com/api/v1")
      .then((response) => response.json())
      .then((data) => setGames(data));
      // create here the filter of genre to get them all
      //selectedGenre will receive the new array
      //use setGenreSelection to render new data
  }, []);

  function handleClick(index) {
    // console.log(index);
    setCurrentSelected(index);
  }
  // console.log(currentSelected);
  function handleDelete() {
    // console.log(currentSelected);
    displayedGames.splice(currentSelected, 1);
  }
  function handleSortRating() {
    setSortRating(!sortRatingIsOn);
  }

  function handleGenreSelection() {
    setCurrentGenre(currentGenre);
  }

  let sortBtnText = {};

  if (!sortRatingIsOn) {
    sortBtnText.btn = "Best Rated Games";
    sortBtnText.header = "Current Games";
    displayedGames = games;
  } else {
    displayedGames = games
      .filter((element) => element.rating >= 4.5)
      .sort((element1, element2) => element1.rating - element2.rating)
      .reverse();
    sortBtnText.btn = "Current Games";
    sortBtnText.header = "Best Rated Games";
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/games"
          component={() => (
            <GameList
              games={displayedGames}
              handleClick={handleClick}
              handleSortRating={handleSortRating}
              currentGenre={handleGenreSelection}
              btn_text={sortBtnText}
            />
          )}
        />
        <Route
          path="/games/:slug"
          component={() => (
            <GameDetails
              game={displayedGames[currentSelected]}
              handleDelete={handleDelete}
            />
          )}
        />
        <Route
          path="/screenshots/:id"
          component={() => <Screenshots game={displayedGames[currentSelected]} />}
        />
        <Redirect to="/games" />
      </Switch>
    </Router>
  );
}

export default App;
