import Constants from "./Constants";

const width = Constants.WIDTH;
const height = Constants.HEIGHT;
const boxSize = Math.trunc(Math.max(width, height) * 0.035);

const Update = (entities, {}) => {
    if(!entities.gameOver.state) {
        for(let i = 0; i < 50; i++) {
            let currentFish = entities["fish" + i];
            let hook = entities.hook;

            if(currentFish.wraparound) {
                if(currentFish.position[0] > width + boxSize/2) currentFish.position[0] -= (width + boxSize);
                else if(currentFish.position[0] < -boxSize/2) currentFish.position[0] += (width + boxSize);
            }

            if((currentFish.position[0] <= hook.position[0] + 5*boxSize/8 && currentFish.position[0] >= hook.position[0] - 5*boxSize/8)
             && (currentFish.position[1] >= hook.position[1] - boxSize && currentFish.position[1] <= hook.position[1] + boxSize)) {
                  if(currentFish.color == hook.color) {
                      entities.score.value += 10;
                      currentFish.wraparound = false;
                      currentFish.position[0] = width*2;
                      hook.color = Constants.COLORS[Math.floor(Math.random()*6)];
                  } else entities.gameOver.state = true;

                  break;
            }
        }
    }

    return entities;
}

export default Update;
