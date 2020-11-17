import React from "react";
import { GridList, GridListTile, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBack from "@material-ui/icons/ArrowBack";

export default function Screenshots(props) {

  if (props.game === undefined) return "loading...please wait";

  return (

    <Container>
      <div>
        <Link to={`/games/${props.game.slug}`}>
          <ArrowBack fontSize="large" /> Go Back to the Game
        </Link>
      </div>
      <GridList cellHeight={300} cols={3}>
        {props.game.short_screenshots.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.image} alt={tile.id} />
          </GridListTile>
        ))}
      </GridList>
    </Container>
  );
}
