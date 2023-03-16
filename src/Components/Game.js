import gsap from "https://cdn.skypack.dev/gsap";
import { render } from "@testing-library/react";
import React, { Fragment, useState,useEffect,useRef } from "react";
import Timer from "./Timer";

//constants
const Moles = ({ children }) => <div>{children}</div>;
const Mole = ({ onWhack }) => {
  let buttonRef = useRef(null);
  useEffect(() => {
    gsap.set(buttonRef.current, { yPercent: 100 });
    gsap.to(buttonRef.current, {
      yPercent: 0,
      yoyo: true,
      repeat: -1,
    });
  }, []);
  return (
    <div className="mole-hole">
      <button
        className="mole"
        ref={buttonRef}
        onClick={() => onWhack(MOLE_SCORE)}
      >
        Mole
      </button>
    </div>
  );
};
const Score = ({ value }) => <div>{`Score: ${value}`}</div>;

const TIME_LIMIT = 30000;
const MOLE_SCORE = 100;

function Game() {
  //screen and score
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const endGame = () => {
    setPlaying(false);
    setFinished(true);
  };

  const startGame = () => {
    setScore(0);
    setPlaying(true);
    setFinished(false);
  };

  const onWhack = (points) => setScore(score + points);

  return (
    <Fragment>
      {!playing && !finished && (
        <Fragment>
          <h1>Lets go!</h1>
          <button onClick={startGame}>Start Game</button>
        </Fragment>
      )}

      {playing && (
        <Fragment>
          <button className="end-game" onClick={endGame}>
            End Game
          </button>
          <Score value={score} />
          <Timer time={TIME_LIMIT} onEnd={endGame} />
          <Moles>
            <Mole onWhack={onWhack} />
            <Mole onWhack={onWhack} />
            <Mole onWhack={onWhack} />
            <Mole onWhack={onWhack} />
            <Mole onWhack={onWhack} />
            <Mole onWhack={onWhack} />
          </Moles>
        </Fragment>
      )}
      {finished && (
        <Fragment>
          <Score value={score} />
          <button onClick={startGame}>Play again</button>
        </Fragment>
      )}
    </Fragment>
  );
}
export default Game;
