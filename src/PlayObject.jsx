import React from "react";

class PlayObject extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { className, positionX, positionY } = this.props;
        console.log(positionX + ", " + positionY);
        return (
            <div className={className} style={{top: `${positionY * 50}px`, left: `${positionX * 50}px`}}></div>
        )
    }
}

export default PlayObject;