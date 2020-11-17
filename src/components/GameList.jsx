import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  Container,
} from "@material-ui/core";

import Header from "../components/Header";

export default function GameList({
  games,
  handleClick,
  handleSortRating,
  btn_text,
//   selectedGenre,
  handleGenreSelection,
}) {

  function renderGame(game) {
    return (
      <Grid item xs={6} md={4} key={game.id}>
        <Card
          style={{ minHeight: 400 }}
          onClick={() => {
            const index = games.findIndex((element) => element.id === game.id);
            handleClick(index);
          }}
        >
          <Link to={`/games/${game.slug}`} style={{ textDecoration: "none" }}>
            <CardActionArea>
              <CardMedia
                image={game.background_image}
                style={{ height: 250, width: 350, marginLeft: 25, marginTop: 10,borderRadius:10 }}
              />
            </CardActionArea>

            <CardContent style={{ marginLeft:15 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {game.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Released: {game.released}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Rating: {game.rating} ⭐
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Genres:{" "}
                {game.genres.map((genre) => (
                  <span style={{ paddingLeft: 5 }}>{genre.name}</span>
                ))}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </Grid>
    );
  }

  if (games === undefined) return "loading...please wait";

  
  return (
      
    <div>
      <Header games={games} />
      <Container style={{ marginTop: 16 }}>
        <Grid container direction="column" spacing={4}>
          <Grid item className="games_list_header">
            <h1> {btn_text.header}</h1>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleSortRating}>
              {" "}
              {btn_text.btn}{" "}
            </Button>
          </Grid>
          {/* Try implementing select a game by genre */}
          <Grid style={{ width: '500px', marginBottom:'20px', marginLeft:'20px',fontSize:'1em' }}>
                        <label style={{fontSize:'1.1em'}} for="genre">Choose a genre:</label>
                            <select style={{fontSize:'1em', marginLeft:'10px'}} onChange={handleGenreSelection} id="genre">
                                <option>Select All</option>
                                <option>Shooter</option>
                                <option>Action</option>
                                <option>Puzzle</option>
                                <option>RPG</option>
                                <option>Adventure</option>
                                <option>Platformer</option>
                                <option>Massively Multiplayer</option>
                                {/*I need create a new array
                                first filter games to get all different genres available on array of
                                check if the genre it's same don't get item
                                something like this to start
                                {game.}
                                {selectedGenre.includes((genre === genre => renderGame(genre)
                                    ))}
                                function to get selected option and check new array and display new data*/}
                            </select>
                    </Grid>
          <Grid item>
            <Grid container spacing={2} justify="space-around">
              {games.map((game) => renderGame(game))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
