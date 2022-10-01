import React from "react";

class GameCell extends React.Component {
    render() {
        const { cellIndex } = this.props;
        return (
            <div key={`cell-${cellIndex}`} className="game-cell"></div>
        )
    }
}

export default GameCell;