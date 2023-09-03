import react, { useState } from "react";
import Box from "./Box";
import Modal from "./Modal";

function Game(props) {
  function mark(i, j) {
    props.mark(i, j);
  }

  return (
    <div id="game">
      <div className="game-name-score">
        <div style={{ color: "green", fontSize: "large" }}>
          {props.yourName.name}
        </div>
        <img src="monster4.png" alt="" />
      </div>
      <div>
        {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            </button> */}
        {props.confirm[0] ? !props.again[0] ?
            <Modal again={props.again} winner={props.confirm[1]} playAgain={props.playAgain}></Modal>
        : <div style={{color: 'white'}}>{props.again}</div>
        : <div id="middle-box">
        <div id="box">
            {props.game.map((e, i) => {
                return e.map((t, j) => {
                    return <Box key={i + j} i={i} j={j} mark={mark} t={t}></Box>;
                });
            })}
        </div>
        <div style={{color: 'white'}} id="middle-box-turn">{props.turn}</div>
        </div>}
      </div>
      <div className="game-name-score">
        <div style={{ color: "white", fontSize: "large" }}>
          {props.opponentName.name}
        </div>
        <img src="monster2.png" alt="" />
      </div>
    </div>
  );
}

export default Game;
