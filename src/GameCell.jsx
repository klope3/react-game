import React from "react";

class GameCell extends React.Component {
    render() {
        const { cellIndex, isEmpty } = this.props;
        const style = {
            opacity: isEmpty ? 0 : 1,
        }
        return (
            <div key={`cell-${cellIndex}`} className="game-cell" style={style}></div>
        )
    }
}

export default GameCell;