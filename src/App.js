import React from 'react';
import './App.css';
import "./styles.css"
import PlayObject from './PlayObject';

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
  }

  takeKeyInput = key => {
    if (!inputDirections.has(key)) { return; }
    this.movePlayer(inputDirections.get(key));
    this.setState(state => ({playerPosition: state.playerPosition}));
  }

  movePlayer = direction => {
    const { playerPosition } = this.state;
    playerPosition.add(direction);
  }

  render() {
    const { playerPosition } = this.state;
    return (
      <div className="App">
        <PlayObject
          className="player"
          positionX={playerPosition.x}
          positionY={playerPosition.y} />
      </div>
    );
  }
}

export default App;
