import React, { Component } from "react";
import { View } from "react-native";
import { array, number, string, bool } from 'prop-types';

export default class Fish extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.position[0] - width / 2;
        const y = this.props.position[1] - height / 2;

        return (
            <View
                style = {{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color || "pink"
                }}
            />
        );
    }
}

Fish.propTypes = {
    size: array,
    position: array,
    speed: number,
    color: string,
    wraparound: bool
}
