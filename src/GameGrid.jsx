import React from "react";
import GameCell from "./GameCell";

class GameGrid extends React.Component {
    render() {
        const { gridWidth, gridHeight, cellScale, cellSpacing, cells } = this.props;
        const cellComponents = cells.map(item => <GameCell cellIndex={item.cellIndex} isEmpty={item.isEmpty} />);
        const styles = {
            gridTemplateColumns: `repeat(${gridWidth}, ${cellScale - cellSpacing}px)`,
            gridTemplateRows: `repeat(${gridHeight}, ${cellScale - cellSpacing}px)`,
            gap: `${cellSpacing}px`,
            left: `${cellSpacing / 2}px`,
            top: `${cellSpacing / 2}px`,
        }
        return (
            <div class="game-grid" style={styles}>
                {cellComponents}
            </div>
        )
    }
}

export default GameGrid;