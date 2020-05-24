import React, { Component } from "react";
import { View } from "react-native";
import { array, object } from 'prop-types';

export default class Hook extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        return [
            <View
                style = {{
                    position: "absolute",
                    left: this.props.body.position.x,
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
                    backgroundColor: "gray"
                }}
            />
        ];
    }
}

Hook.propTypes = {
    size: array,
    body: object
}
