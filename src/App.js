import React from 'react';
import './App.css';
import "./styles.css"
import PlayObject from './PlayObject';
import GameGrid from './GameGrid';

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(otherVector) {
    const {x: otherX, y: otherY} = otherVector;
    this.x += otherX;
    this.y += otherY;
    console.log("Now " + this.x + ", " + this.y);
  }
}

const inputDirections = new Map([
  ["w", new Vector2(0, -1)],
  ["a", new Vector2(-1, 0)],
  ["s", new Vector2(0, 1)],
  ["d", new Vector2(1, 0)],
])

class App extends React.Component {
  constructor() {
    super();
    window.onkeydown = event => { this.takeKeyInput(event.key); };

    this.state = {
      playerPosition: new Vector2(0, 0),
    };
    const cellScale = 60;
    this.constants = Object.freeze({
      gridWidth: 8,
      gridHeight: 6,
      cellScale: cellScale,
      cellSpacing: 10,
      playerScale: cellScale,
    })
  }

  takeKeyInput = key => {
    if (!inputDirections.has(key)) { return; }
    this.movePlayer(inputDirections.get(key));
    this.setState(state => ({playerPosition: state.playerPosition}));
  }

  movePlayer = direction => {
    const { playerPosition } = this.state;
    if (!this.canMove(playerPosition, direction)) { return; }
    playerPosition.add(direction);
  }

  canMove = (startPosition, direction) => {
    const { x, y } = startPosition;
    const nextPosition = new Vector2(x, y);
    nextPosition.add(direction);
    return this.isInBounds(nextPosition);
  }

  isInBounds = position => {
    const { x, y } = position;
    const { gridWidth: leftBound, gridHeight: botBound } = this.constants;
    console.log(x + ", " + y + "; " + leftBound + ", " + botBound);
    return x >= 0 && x < leftBound && y >= 0 && y < botBound;
  }

  render() {
    const { playerPosition } = this.state;
    const { gridWidth, gridHeight, cellScale, cellSpacing, playerScale } = this.constants;
    return (
      <div className="App">
        <GameGrid
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          cellScale={cellScale}
          cellSpacing={cellSpacing} />
        <PlayObject
          className="player"
          positionX={playerPosition.x}
          positionY={playerPosition.y}
          playerScale={playerScale} />
      </div>
    );
  }
}

export default App;
