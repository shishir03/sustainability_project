import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { string } from "prop-types";

export default class Water extends Component {
    render() {
        const { width, height } = Dimensions.get("screen");

        return (
            <View
                style = {{
                    position: "absolute",
                    left: 0,
                    top: height/3,
                    width: width,
                    height: 2*height/3,
                    backgroundColor: this.props.color || "pink"
                }}
            />
        );
    }
}

Water.propTypes = {
    color: string
}
