import Matter from "matter-js";
import Constants from "./Constants";

const Physics = (entities, { touches, time }) => {
    let engine = entities["physics"].engine;
    let hook = entities.hook.body;
    let move = touches.find(y => y.type === "move");
    if(move)
        Matter.Body.setPosition(hook, {x: Math.max(0, Math.min(hook.position.x + move.delta.pageX, Constants.WIDTH)), y: hook.position.y});

    Matter.Engine.update(engine, time.delta);
    return entities;
}

export default Physics;
