import React from "react";
import "whatwg-fetch";

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

     render() {               

        return (
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.props.onSomeEvent}>{this.props.genre.name}</button>
        );
    }
}







              