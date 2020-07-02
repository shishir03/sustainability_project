import React from 'react';
import Fish from "./Fish";
import Hook from "./Hook";
import Physics from "./Physics";
import Update from "./Update";
import Constants from "./Constants";
import Score from "./Score";
import { GameEngine } from "react-native-game-engine";
import { Dimensions, StyleSheet, StatusBar, View, Text } from 'react-native';

const width = Constants.WIDTH;
const height = Constants.HEIGHT;
const boxSize = Math.trunc(Math.max(width, height) * 0.035);

export default function App() {
    let entities = {
        hook: {
            size: [boxSize/4, boxSize],
            position: [width/3, height/2],
            color: Constants.COLORS[Math.floor(Math.random()*6)],
            renderer: Hook
        },

        score: {
            value: 0,
            position: [width/20, height/20],
            renderer: Score
        }
    }

    for(let i = 0; i < 50; i++) {
        let n = Math.random();

        entities["fish" + i] = {
            size: [boxSize, boxSize],
            position: [Math.random() * width, height/2 + (i + 1)*(2*height/3)/11],
            speed: (n < 0.5 ? 1 : -1)*(Math.random() + 0.75),
            color: Constants.COLORS[Math.floor(Math.random()*6)],
            wraparound: true,
            renderer: Fish
        }
    }

    return (
        <GameEngine
            ref={(ref) => { gameEngine = ref; }}
            style={styles.container}
            systems={[Physics, Update]}
            entities={entities}>
            <StatusBar hidden={true}/>
        </GameEngine>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
});
