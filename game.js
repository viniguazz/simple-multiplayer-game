export default function createGame() {

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            heigth: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId]
    }

    function movePlayer(command) {
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptedMoves = {
            ArrowUp(player) {
                console.log('game.movePlayer().arrowUp() -> moving player Up')
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1;
                }
            },
            ArrowRight(player) {
                console.log('moving player Right')
                if (player.x + 1 < state.screen.width) {
                    player.x = player.x + 1;
                }
            },
            ArrowDown(player) {
                console.log('moving player Down')
                if (player.y + 1 < state.screen.heigth) {
                    player.y = player.y + 1;
                }

            },
            ArrowLeft(player) {
                console.log('moving player Left')
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1;
                }
            }
        }

        const keyPressed = command.keyPressed;
        const playerId = command.playerId
        const player = state.players[command.playerId];
        const moveFunction = acceptedMoves[keyPressed];

        if (player && moveFunction) {
            moveFunction(player);
            checkForFruitCollision(playerId)
        }

        function checkForFruitCollision() {

            for (const fruitId in state.fruits) {
                const fruit = state.fruits[fruitId]
                console.log(`Checking ${playerId} and ${fruitId}`)

                if (player.x === fruit.x && player.y === fruit.y) {
                    console.log(`Collision between ${playerId} and ${fruitId}`)
                    removeFruit({ fruitId: fruitId })
                }
            }
        }


    }

    return { // camada pública do objeto retornado ---> são os métodos da nossa factory que deixamos públicos
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }

}