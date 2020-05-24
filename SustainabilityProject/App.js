import React from 'react';
import Fish from "./Fish";
import Matter from "matter-js"; // Physics engine
import Hook from "./Hook";
import Physics from "./Physics";
import Constants from "./Constants";
import Score from "./Score";
import { GameEngine } from "react-native-game-engine";
import { Dimensions, StyleSheet, StatusBar, View, Text } from 'react-native';

const width = Constants.WIDTH;
const height = Constants.HEIGHT;
const boxSize = Math.trunc(Math.max(width, height) * 0.035);
var fish = [];
var fishColors = [];

var hook = Matter.Bodies.rectangle(width/3, height/2, boxSize/4, boxSize, { frictionAir: 0 });

var score = 0;

export default function App() {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    world.gravity.y = 0;

    initFish();
    Matter.World.add(world, fish);

    let entities = {
        physics: {
            engine: engine,
            world: world
        },

        hook: {
            size: [boxSize/4, boxSize],
            body: hook,
            renderer: Hook
        },

        score: {
            value: score,
            position: [width/20, height/20],
            renderer: Score
        }
    }

    for(let i = 0; i < 50; i++) {
        entities["fish" + i] = {
            size: [boxSize, boxSize],
            body: fish[i],
            color: fishColors[i],
            renderer: Fish
        }
    }

    return (
        <GameEngine style={styles.container} systems={[Physics, CheckFish]} entities={entities}>
            <StatusBar hidden={true}/>
        </GameEngine>
    );
}

// Populates the array of fish and fish colors
function initFish() {
    // Adds fish (Matter-js bodies) at random x-positions throughout the screen and evenly spaced y-positions through the water
    for(let i = 0; i < 50; i++)
        fish.push(Matter.Bodies.rectangle(Math.random() * width, height/3 + (i + 1)*(2*height/3)/11, boxSize, boxSize, { frictionAir: 0 }));

    for(let i = 0; i < 50; i++) {
        let n = Math.random();
        Matter.Body.setVelocity(fish[i], {x: (n < 0.5 ? 1 : -1)*(Math.random() + 0.75), y: -0.5});
    }

    for(let i = 0; i < 50; i++) fishColors.push(Constants.COLORS[Math.floor(Math.random()*6)]);
}

// Handles wraparound behavior and checks whether any fish are touching the hook
const CheckFish = (entities, {}) => {
    entities.score.value = score;

    for(let i = 0; i < fish.length; i++) {
        let currentFish = fish[i];
        if(currentFish.position.x > width + boxSize/2) Matter.Body.translate(fish[i], {x: -width - boxSize, y: 0});
        else if(currentFish.position.x < -boxSize/2) Matter.Body.translate(fish[i], {x: width + boxSize, y: 0});

        if((currentFish.position.x <= hook.position.x + 5*boxSize/8 && currentFish.position.x >= hook.position.x - 5*boxSize/8)
         && (currentFish.position.y >= hook.position.y - boxSize && currentFish.position.y <= hook.position.y + boxSize)) {
            score += 10;
            fish.splice(i, 1);
            entities["fish" + i].color = "blue";
            break;
        }
    }

    return entities;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
});
