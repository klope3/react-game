import React from "react";

class GameGrid extends React.Component {
    render() {
        const { gridWidth, gridHeight, cellScale, cellSpacing } = this.props;
        const cells = [];
        const totalCells = gridWidth * gridHeight;
        for (let i = 0; i < totalCells; i++) {
            cells.push(<div key={`cell-${i}`} className="game-cell"></div>);
        }
        const styles = {
            gridTemplateColumns: `repeat(${gridWidth}, ${cellScale - cellSpacing}px)`,
            gridTemplateRows: `repeat(${gridHeight}, ${cellScale - cellSpacing}px)`,
            gap: `${cellSpacing}px`,
            left: `${cellSpacing / 2}px`,
            top: `${cellSpacing / 2}px`,
        }
        return (
            <div class="game-grid" style={styles}>
                {cells}
            </div>
        )
    }
}

export default GameGrid;