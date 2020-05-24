import React, { Component } from "react";
import { View, Text } from "react-native";
import { number, array } from 'prop-types';

export default class Score extends Component {
    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View
                style = {{
                    position: "absolute",
                    left: x,
                    top: y,
                }}
            >
                <Text style={{
                    fontSize: 20,
                    color: "white"
                }}>Score: { this.props.value }</Text>
            </View>
        );
    }
}

Score.propTypes = {
    value: number,
    position: array
}
