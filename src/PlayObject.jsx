import React from "react";

class PlayObject extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { className, positionX, positionY, playerScale } = this.props;
        const styles = {
            top: `${positionY * playerScale}px`, 
            left: `${positionX * playerScale}px`,
            width: `${playerScale}px`,
            height: `${playerScale}px`,
        };
        return (
            <div className={className} style={styles}></div>
        )
    }
}

export default PlayObject;