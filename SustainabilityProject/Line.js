import React, { Component } from "react";
import { View } from "react-native";
import { array } from "prop-types";

export default class Line extends Component {
    render() {
        const x1 = this.props.start[0];
        const y1 = this.props.start[1];
        const x2 = this.props.end[0];
        const y2 = this.props.end[1];

        const length = Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));
        const angle = Math.atan((x2 - x1)/(y1 - y2)) * 360 / (2*Math.PI);

        return (
            <View
                style = {{
                    position: "absolute",
                    left: (x1 + x2)/2,
                    top: (y1 + y2)/2 - length/2,
                    width: 1,
                    height: length,
                    backgroundColor: "black",
                    transform: [{ rotate: angle + "deg" }]
                }}
            />
        );
    }
}

Line.propTypes = {
    start: array,
    end: array
}
