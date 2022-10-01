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
  }
}

class Cell {
  constructor(cellIndex) {
    this.isEmpty = false;
    this.cellIndex = cellIndex;
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

    const cellScale = 60;
    this.constants = Object.freeze({
      gridWidth: 8,
      gridHeight: 6,
      cellScale: cellScale,
      cellSpacing: 10,
      playerScale: cellScale,
    });
    const { gridWidth, gridHeight } = this.constants;
    this.state = {
      playerPosition: new Vector2(0, 0),
      cells: this.createCellArray(gridWidth, gridHeight),
    };
  }

  createCellArray = (width, height) => {
    const cells = [];
    for (let i = 0; i < width * height; i++) {
      const cell = new Cell(i);
      cell.isEmpty = Math.random() < 0.2;
      cells.push(cell);
    }
    return cells;
  }

  cellIndexToCoords = index => {
    const { gridWidth, gridHeight } = this.constants;
    return new Vector2(index % gridWidth, Math.trunc(index / gridHeight));
  }

  coordsToCellIndex = coords => coords.x + coords.y * this.constants.gridWidth;

  getCellAt = (coords) => {
    const cellIndex = this.coordsToCellIndex(coords);
    const { cells } = this.state;
    if (cellIndex < 0 || cellIndex >= cells.length) { return null; }
    return cells[cellIndex];
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
    const nextCell = this.getCellAt(nextPosition);
    if (nextCell !== null && nextCell.isEmpty) { return false; }
    return this.isInBounds(nextPosition);
  }

  isInBounds = position => {
    const { x, y } = position;
    const { gridWidth: leftBound, gridHeight: botBound } = this.constants;
    return x >= 0 && x < leftBound && y >= 0 && y < botBound;
  }

  render() {
    const { playerPosition, cells } = this.state;
    const { gridWidth, gridHeight, cellScale, cellSpacing, playerScale } = this.constants;
    return (
      <div className="App">
        <GameGrid
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          cellScale={cellScale}
          cellSpacing={cellSpacing}
          cells={cells} />
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
