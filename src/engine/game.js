export default class Game {

    constructor(size) {
        this.size = size;   // dimensions of board
        let newBoard = new Array(size ** 2).fill(0);  // array representing the board

        // initialize first two random tiles
        newBoard = addTile(newBoard);
        newBoard = addTile(newBoard);

        this.gameState = {
            board: newBoard,    // number[] represents the value of each tile on the board
            score: 0,           // number   score of the current game
            won: false,         // boolean  if user has made a 2048 tile
            over: false         // boolean  if board is in state where no legal moves can be made
        };

        this.moveCallback = [];
        this.winCallback = [];
        this.loseCallback = [];
    };

    /**
     * Resets the game back to a random starting position.
     */
    setupNewGame() {
        let newGame = new Game(this.size);
        this.gameState = {
            board: newGame.gameState.board,
            score: 0,
            won: false,
            over: false
        }
    };

    /**
     * Loads that given state
     * @param {object} gameState 
     */
    loadGame(gameState) {
        this.gameState = gameState;
    };

    /**
     * Given "up", "down", "left", or "right" as string input, 
     *   it makes the appropriate shifts and adds a random tile
     * @param {string} direction 
     */
    move(direction) {
        switch (direction) {
            case 'left':
                if (!this.gameState.over) {

                    let boardAsRows = getBoardAsRows(this.gameState.board, this.size); // get the current board as rows
                    let previousBoard = getBoardAsRows(this.gameState.board, this.size) // get the past board so we can compare after shift

                    // combine the values
                    combineLeftAndUp(boardAsRows, this.gameState);

                    // see if any changes were made
                    let noChange = boardAsRows.flat().every((value, index) => value === previousBoard.flat()[index]);

                    if (!noChange) {
                        // check if won
                        let didWin = boardAsRows.flat().includes(2048)

                        if (didWin) {
                            this.gameState.board = boardAsRows.flat();
                            handleWin(this.gameState, this.moveCallback, this.winCallback); // handles win process
                        } else {

                            lastStep(boardAsRows, this.gameState, this.size, this.moveCallback, this.loseCallback);

                        }
                    }
                } 
                break;

            case 'right':
                if (!this.gameState.over) {

                    let boardAsRows = getBoardAsRows(this.gameState.board, this.size); // get the current board as rows
                    let previousBoard = getBoardAsRows(this.gameState.board, this.size) // get the past board so we can compare after shift

                    // combine the values
                    combineRightAndDown(boardAsRows, this.gameState);

                    // see if any changes were made
                    let noChange = boardAsRows.flat().every((value, index) => value === previousBoard.flat()[index]);

                    if (!noChange) {
                        // check if won
                        let didWin = boardAsRows.flat().includes(2048)

                        if (didWin) {
                            this.gameState.board = boardAsRows.flat();
                            handleWin(this.gameState, this.moveCallback, this.winCallback); // handles win process;
                        } else {

                            lastStep(boardAsRows, this.gameState, this.size, this.moveCallback, this.loseCallback);
                        }
                    }
                }
                break;

            case 'up':
                if (!this.gameState.over) {

                    let boardAsCols = getBoardAsCols(this.gameState.board, this.size); // get the current board as columns
                    let previousBoard = getBoardAsCols(this.gameState.board, this.size) // get the past board so we can compare after shift

                    // combine the values
                    combineLeftAndUp(boardAsCols, this.gameState);

                    // see if any changes were made
                    let noChange = boardAsCols.flat().every((value, index) => value === previousBoard.flat()[index]);

                    if (!noChange) {
                        // check if won
                        let didWin = boardAsCols.flat().includes(2048);

                        if (didWin) {
                            this.gameState.board = boardAsCols.flat();
                            handleWin(this.gameState, this.moveCallback, this.winCallback); // handles win process
                        } else {

                            // rearrange the columns into rows
                            let boardRearranged = rearrangeBoardFromColsToRows(boardAsCols, this.size);

                            lastStep(boardRearranged, this.gameState, this.size, this.moveCallback, this.loseCallback);
                        }
                    }
                }
                break;

            case 'down':
                if (!this.gameState.over) {

                    let boardAsCols = getBoardAsCols(this.gameState.board, this.size); // get the current board as columns
                    let previousBoard = getBoardAsCols(this.gameState.board, this.size) // get the past board so we can compare after shift

                    // combine the values
                    combineRightAndDown(boardAsCols, this.gameState);

                    // see if any changes were made
                    let noChange = boardAsCols.flat().every((value, index) => value === previousBoard.flat()[index]);

                    if (!noChange) {
                        // check if won
                        let didWin = boardAsCols.flat().includes(2048);

                        if (didWin) {
                            this.gameState.board = rearrangeBoardFromColsToRows(boardAsCols, this.size).flat();
                            handleWin(this.gameState, this.moveCallback, this.winCallback); // handles win process
                        } else {

                            // rearrange the columns into rows
                            let boardRearranged = rearrangeBoardFromColsToRows(boardAsCols, this.size);

                            lastStep(boardRearranged, this.gameState, this.size, this.moveCallback, this.loseCallback);
                        }
                    }
                }
                break;
            default:
                // nothing
                break;
        }
    };

    /**
     * Takes a callback function as input and registers that function as a listener to the move event.
     * Every time a move is made, the game should call all previously registered move callbacks, 
     *   passing in the game's current gameState as an argument to the function.
     * @param {function} callback 
     */
    onMove(callback) {
        this.moveCallback.push(callback);
    };

    /**
     * Takes a callback function as input and registers that function as a listener to the move event.
     * When the game transitions into a state where no more valid moves can be made, 
     *   the game should call all previously registered lose callbacks, 
     *   passing in the game's current gameState as an argument to the function.
     * @param {function} callback 
     */
    onLose(callback) {
        this.loseCallback.push(callback);
    };

    /**
     * Takes a callback function as input and registers that function as a listener to the win event. 
     * When the player wins the game (by making a 2048 tile), 
     *   the game should call all previously registered win callbacks, 
     *   passing in the game's current gameState as an argument to the function.
     * @param {function} callback 
     */
    onWin(callback) {
        this.winCallback.push(callback);
    };

    /**
     * Returns a accurate gameState object representing the current game state.
     */
    getGameState() {
        return this.gameState;
    };

    /**
     * Returns a string representation of the game as text/ascii
     */
    toString() {
        let boardString = ``;
        for (let index = 0; index < this.gameState.board.length; index++) {
            if (index % this.size === 0) {
                boardString += `\n`;
            }
            if (this.gameState.board[index] === 0) {
                boardString += ` [   ] `;
            } else {
                boardString += ` [ ${this.gameState.board[index]} ] `;
            }
        }

        return `${boardString} \nscore: ${this.gameState.score} \nwon: ${this.gameState.won} \nover: ${this.gameState.over}\n`
    };
}

// value array for a tile with 90% for a 2 and 10% for a 4 
const chances = new Array(10).fill(2);
chances[0] = 4;

/**
 * Function to add a new, random tile with a random value to the board
 * @param {number[]} board represents all the tiles and its value
 * @returns board with new tile added
 */
 export function addTile(board) {
    const randomChoice = chances[Math.floor(Math.random() * chances.length)]; // get rand value

    // find all indexes where value is 0
    const filteredBoard = board.reduce((allIndex, tile, index) => {
        if (tile === 0) {
            allIndex.push(index);
        }
        return allIndex;
    }, [])

    if (filteredBoard.length !== 0) {
        const randomIndex = filteredBoard[Math.floor(Math.random() * filteredBoard.length)];  // get rand index
        board[randomIndex] = randomChoice;
    }

    return board;
}

/**
 * Function to seperate the game board into seperate rows to make logic easier
 * @param {number[]} currentBoard represents the game board 
 * @param {number} size represents the dimensions of the board
 * @returns an array of arrays with each arrays as a row
 */
 export function getBoardAsRows(currentBoard, size) {
    let boardAsRows = [];
    for (let index = 0; index < currentBoard.length; index += size) {
        boardAsRows.push(currentBoard.slice(index, index + size));
    }

    return boardAsRows;
}

/**
 * Function to seperate the game board into seperate columns to make logic easier
 * @param {number[]} currentBoard represents the game board 
 * @param {number} size represents the dimensions of the board 
 * @returns an array of arrays with each arrays as a column
 */
 export function getBoardAsCols(currentBoard, size) {   // maybe need to confirm????
    let boardAsCols = [];
    for (let colNumber = 0; colNumber < size; colNumber++) {
        let col = [];
        for (let index = 0; index < currentBoard.length; index += size) {
            col.push(currentBoard[index + colNumber])
        }
        boardAsCols.push(col);
    }

    return boardAsCols;
}

/**
 * Function to combine the values in a row starting at the left end
 * @param {number[]} board represents the game board 
 * @param {object} gameState represents the game object
 */
 export function combineLeftAndUp(board, gameState) {
    for (let rowNumber = 0; rowNumber < board.length; rowNumber++) {
        let currentRow = board[rowNumber].filter(number => number); // creates new array without any zeros

        // goes through the new array and does the shifting starting from the left
        for (let index = 0; index < currentRow.length - 1; index++) {
            if (currentRow[index] === currentRow[index + 1]) {
                currentRow[index] += currentRow[index + 1];
                gameState.score += currentRow[index];
                currentRow[index + 1] = 0;
                index++;
            }
        }

        let combinedRow = currentRow.filter(number => number); // creates new array after combining with no zeros
        let diff = board[rowNumber].length - combinedRow.length; // amount of zeros needed to add
        board[rowNumber] = shiftLeftAndUp(combinedRow, diff) // adds the new zeros to the right 
    }
}

/**
 * Function to shift non zero numbers to left and adds zeros to the right
 * @param {number[]} currentRow represent the row that is being shifted
 * @param {number} diff represents the number of zeros needed to be added to shifted row  
 * @returns shifted array
 */
 export function shiftLeftAndUp(row, diff) {
    let zerosToAdd = new Array(diff).fill(0);
    return row.concat(zerosToAdd);
}

/**
 * Function to combine the values in a row starting at the right end
 * @param {number[]} board represents the game board 
 * @param {object} gameState represents the game object
 */
 export function combineRightAndDown(board, gameState) {
    for (let rowNumber = 0; rowNumber < board.length; rowNumber++) {
        let currentRow = board[rowNumber].filter(number => number);// creates new array without any zeros

        // goes through the new array and does the shifting starting from the right
        for (let index = currentRow.length - 1; index >= 0; index--) {
            if (currentRow[index] === currentRow[index - 1]) {
                currentRow[index] += currentRow[index - 1];
                gameState.score += currentRow[index];
                currentRow[index - 1] = 0;
                index--;
            }
        }

        let combinedRow = currentRow.filter(number => number); // creates new array after combining with no zeros
        let diff = board[rowNumber].length - combinedRow.length; // amount of zeros needed to add
        board[rowNumber] = shiftRightAndDown(combinedRow, diff) // adds the new zeros to the right 
    }
}

/**
 * Function to shift non zero numbers to right and adds zeros to the left
 * @param {number[]} currentRow represent the row that is being shifted
 * @param {number} diff represents the number of zeros needed to be added to shifted row  
 * @returns shifted array
 */
 export function shiftRightAndDown(currentRow, diff) {
    let zerosToAdd = new Array(diff).fill(0);
    return zerosToAdd.concat(currentRow);
}

/**
 * Function to rearrange the board in the state of columns into the state of rows
 * @param {number[]} boardAsCols represents the current board in the state of columns
 * @param {number} size the dimensions of the board
 * @returns an array of arrays with the arrays as rows
 */
 export function rearrangeBoardFromColsToRows(boardAsCols, size) {
    let boardRearranged = [];
    for (let indexOfArray = 0; indexOfArray < size; indexOfArray++) {
        let row = [];
        for (let currentArray = 0; currentArray < size; currentArray++) {
            row.push(boardAsCols[currentArray][indexOfArray]);
        }
        boardRearranged.push(row);
    }

    return boardRearranged;
}

/**
 * Function to check if any other possible moves are available
 * @param {number[]} board represents the game board 
 * @returns boolean true if any other moves are possible, false if none
 */
 export function anyOtherMoves(board, size) {
    let boardAsRows = getBoardAsRows(board, size);
    let boardAsCols = getBoardAsCols(board, size);

    for (let rowNumber = 0; rowNumber < boardAsRows.length; rowNumber++) {
        let currentRow = boardAsRows[rowNumber];
        let currentCol = boardAsCols[rowNumber];
        for (let index = 0; index < boardAsRows.length - 1; index++) {
            if (currentRow[index] === currentRow[index + 1] || currentCol[index] === currentCol[index + 1]) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Function to process the last steps after a move
 *   Either the move was valid and we update the board
 *   or no change was made and the board was left the same
 *   or there are no possible moves left   
 * @param {number[]} board represents the game board 
 * @param {object} gameState represents the game state
 * @param {number} size represents the dimensions of the board 
 * @param {function} moveCallback represents the callback function for move 
 * @param {function} loseCallback represents the callback function for lose
 */
 export function lastStep(board, gameState, size, moveCallback, loseCallback) {
    // compare shifted and combined board with adding one new tile
    let tileAddedBoard = addTile(board.flat());
    let isSame = tileAddedBoard.every((value, index) => value === board.flat()[index]);

    if (!isSame) {
        gameState.board = tileAddedBoard;

        if (!anyOtherMoves(tileAddedBoard, size) && tileAddedBoard.filter(number => number === 0).length === 0) {
            handleLose(gameState, moveCallback, loseCallback);
        } else {
            moveCallback.forEach(callback => {
                callback(gameState);
            });
        }

    } else {

        if (!anyOtherMoves(tileAddedBoard, size) && tileAddedBoard.filter(number => number === 0).length === 0) {
            handleLose(gameState, moveCallback, loseCallback);
        }
    }
}

/**
 * Function to handle win process
 * @param {object} gameState represents the game state 
 * @param {function} moveCallback represents the callback function for move 
 * @param {function} winCallback represents the callback function for win
 */
 export function handleWin(gameState, moveCallback, winCallback) {
    gameState.won = true;
    moveCallback.forEach(callback => {
        callback(gameState);
    });
    winCallback.forEach(callback => {
        callback(gameState);
    })
}

/**
 * Function to handle lose process
 * @param {*} gameState represents the game state
 * @param {function} moveCallback represents the callback function for move 
 * @param {function} loseCallback represents the callback function for lose
 */
 export function handleLose(gameState, moveCallback, loseCallback) {
    gameState.over = true;
    moveCallback.forEach(callback => {
        callback(gameState);
    });
    loseCallback.forEach(callback => {
        callback(gameState);
    })
}