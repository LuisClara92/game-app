import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function VideoModal(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(true);
 

  return (
    <Modal
      show={show}
      onHide={() => handleClose}
      {...props}
      size="lg"
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <video controls>
          <source src={props.video} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.. Please change your browser(don't buy a Mac xD)
        </video>
      </Modal.Header>
      <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
  );
}


export default function GameDetails(props) {

  const [modalShow, setModalShow] = useState(false);

  if (props.game === undefined) return "loading...please wait";

  return (
    <div
      className="game_container flex-center"
      style={{
        height: "95vh",
        width: "95vw",
        marginTop: 16,
        backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3)
              ),
              url(${props.game.background_image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="home_btn">
        {" "}
        <Link to={"/games"}>
          <HomeIcon fontSize="large" />
          <p>
          Home
          </p>
        </Link>{" "}
      </div>
      <div className="text">
        <h1 className="game_logo"> {props.game.name} </h1>
    </div>
    <div className="btn-container">
        <div className="btn">
          <Button
            variant="contained"
            size="medium"
            onClick={() => setModalShow(true)}
          >
            <Link to={`/games/${props.game.slug}/trailer`}>Watch Trailer</Link>
          </Button>
          <Button
            variant="contained"
            size="medium"
            onClick={props.openModalVideo}
          >
            <Link to={`/screenshots/${props.game.id}`}>Screenshots</Link>
          </Button>
          <Button variant="contained" size="medium" onClick={props.handleDelete}>
            <Link to={"/games"}>Delete this game</Link>
          </Button>
        </div>
      </div>
      <VideoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        video={props.game.clip.clip}
      />
    </div>
  );
}
