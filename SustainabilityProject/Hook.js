import React, { Component } from "react";
import { View } from "react-native";
import { array, string } from 'prop-types';

export default class Hook extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.position[0] - width / 2;
        const y = this.props.position[1] - height / 2;

        return [
            <View
                style = {{
                    position: "absolute",
                    left: this.props.position[0],
                    top: 0,
                    width: 1,
                    height: y,
                    backgroundColor: "black"
                }}
            />,
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
        ];
    }
}

Hook.propTypes = {
    size: array,
    position: array,
    color: string
}
