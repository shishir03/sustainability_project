import Constants from "./Constants";

const Physics = (entities, { touches }) => {
    for(let i = 0; i < 50; i++) {
        let currentFish = entities["fish" + i];

        if(currentFish.wraparound) {
            currentFish.position[0] += currentFish.speed;
            currentFish.position[1] -= 0.5;
        }
    }

    let hook = entities.hook;
    let move = touches.find(y => y.type === "move");
    if(move) hook.position[0] = Math.max(0, Math.min(hook.position[0] + move.delta.pageX, Constants.WIDTH));
    return entities;
}

export default Physics;
