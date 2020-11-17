import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "../App.css";
import Button from "./botoes.png";

export default function Header(props) {

  if (props.games === undefined) return "loading...please wait";

  let carouselItem = props.games.map((element) => (
    <Carousel.Item className="carousel" key={element.id}>
      <img className="d-block w-100" src={element.background_image} alt={element.name} />
      <Carousel.Caption className="info">
        <h3>{element.name}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ));

  return (
    <div>
      <Carousel interval={2000}>{carouselItem}</Carousel>
      <div className="app">
      <hr />
        <div>
          <h1>Game App </h1>
          <img className="logo" src={Button} alt={"command buttons"} />
        </div>
        <hr />
      </div>
    </div>
  );
}
