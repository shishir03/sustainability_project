import React from 'react';
import Box from "./Box";
import Water from "./Water";
import Line from "./Line";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import { Dimensions, StyleSheet, StatusBar } from 'react-native';

const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.035);
var hook = Matter.Bodies.rectangle(width/2, height/2, boxSize/4, boxSize, { frictionAir: 0 });

export default function App() {
    var fish = [];
    for(var i = 0; i < 10; i++) fish.push(Matter.Bodies.rectangle(Math.random() * width, height/3 + (i + 1)*(2*height/3)/11, boxSize, boxSize, { frictionAir: 0 }));

    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    world.gravity.y = 0;

    for(var i = 0; i < 10; i++) {
        var n = Math.random();
        Matter.Body.setVelocity(fish[i], {x: (n < 0.5 ? 1 : -1)*(Math.random() + 0.75), y: 0});
    }

    var colors = ["red", "orange", "yellow", "green", "skyblue", "purple"];
    var fishColors = [];
    for(var i = 0; i < 10; i++) fishColors.push(colors[Math.floor(Math.random()*6)]);

    var boat = Matter.Bodies.rectangle(width/2, height/3 - boxSize/2, boxSize*6, boxSize, { isStatic: true });

    var entities = {
        physics: {
            engine: engine,
            world: world
        },

        water: {
            color: "blue",
            renderer: Water
        },

        boat: {
            size: [boxSize*6, boxSize],
            body: boat,
            color: "brown",
            renderer: Box
        },

        hook: {
            size: [boxSize/4, boxSize],
            body: hook,
            color: "gray",
            renderer: Box
        },

        line: {
            start: [width/2, height/5],
            end: [hook.position.x, hook.position.y - boxSize/2],
            renderer: Line
        }
    }

    for(var i = 0; i < 10; i++) {
        entities["fish" + i] = {
            size: [boxSize, boxSize],
            body: fish[i],
            color: fishColors[i],
            renderer: Box
        }
    }

    Matter.World.add(world, fish);
    Matter.Events.on(engine, "beforeUpdate", function() {
        for(var i = 0; i < 10; i++) {
            if(fish[i].position.x > width + boxSize/2) Matter.Body.translate(fish[i], {x: -width - boxSize, y: 0});
            else if(fish[i].position.x < -boxSize/2) Matter.Body.translate(fish[i], {x: width + boxSize, y: 0});
        }
    });

    return (
        <GameEngine style={styles.container} systems={[Physics, MoveHook]} entities={entities}>
            <StatusBar hidden={true}/>
        </GameEngine>
    );
}

const Physics = (entities, { time }) => {
    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
}

const MoveHook = (entities, { touches }) => {
    let move = touches.find(y => y.type === "move");
    if(move) Matter.Body.setPosition(hook, {x: Math.max(0, Math.min(hook.position.x + move.delta.pageX, width)), y: hook.position.y});
    return entities;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
