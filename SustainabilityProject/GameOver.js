import React, { Component } from "react";
import { View, Text } from "react-native";
import { array, bool } from "prop-types";

export default class GameOver extends Component {
    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        if(this.props.state) {
            return (
                <View style = {{
                        position: "absolute",
                        left: x,
                        top: y,
                }}>
                    <Text style={{fontSize: 100, color: "white"}}>GAME OVER</Text>
                </View>
            );
        } else return null;
    }
}

GameOver.propTypes = {
    position: array,
    state: bool
}
