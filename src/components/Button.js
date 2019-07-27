import React from "react";

export default class Button extends React.Component {
    render() {
        return (
            <div>
                <h5 onClick={() => window.location = this.props.download}>
                    <span>Download</span><span>{this.props.name}</span>
                </h5>
            </div>
        );
    }
};