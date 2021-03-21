import React, { useState } from 'react'
import Game from './engine/game.js';
import { Tile } from './Components/Tile.js';

function App() {

  const game = new Game(4);

  const [gameModel, updateGameModel] = useState(game);
  const [board, updateBoard] = useState(game.gameState.board);
  const [gameState, updateGameState] = useState(game.gameState);

  const handleMove = (event) => {
    event.preventDefault();

    switch (event.key) {
      case 'ArrowUp':
        gameModel.move("up")
        updateGameModel(gameModel);
        updateGameState(gameModel.gameState);
        updateBoard(gameState.board);
        break;
      case 'ArrowLeft':
        gameModel.move("left")
        updateGameModel(gameModel);
        updateGameState(gameModel.gameState);
        updateBoard(gameState.board);
        break;
      case 'ArrowRight':
        gameModel.move("right")
        updateGameModel(gameModel);
        updateGameState(gameModel.gameState);
        updateBoard(gameState.board);
        break;
      case 'ArrowDown':
        gameModel.move("down")
        updateGameModel(gameModel);
        updateGameState(gameModel.gameState);
        updateBoard(gameState.board);
        break;
      case 'r':
        handleReset();
        break;
      default:
        break;
    }
  }

  const handleReset = () => {
    gameModel.setupNewGame();
    updateGameModel(gameModel);
    updateGameState(gameModel.gameState);
    updateBoard(gameModel.gameState.board);
  }

  return (
    <div className="outer-container bg-primary flex flex-wrap content-center justify-center text-center" tabIndex="1" onKeyDown={handleMove}>
      <div className="space-y-6">
        <h1 className="text-5xl font-black font-title">2048</h1>
        <div className="inner-container">
          <div className="ml-6 grid-rows-4">
            <h1 className="text-3xl pb-4 font-bold w-40">Score: {gameState.score}</h1>
            <h1 className="text-3xl pb-4 font-semibold">{gameState.over ? "Game Over" : ""}</h1>
            <h1 className="text-3xl pb-4 font-semibold">{gameState.won ? "You won" : ""}</h1>
            <button className="border-solid border-2 p-2 rounded font-medium" onClick={handleReset}>RESET</button>
          </div>
          <div className="grid grid-cols-4 gap-2 rounded-sm"  >
            {
              board.map((tile, index) => {
                return (
                  <div key={index}>
                    <Tile value={tile} />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="">
          <h1 className="text-3xl p-6 pb-2 pt-0">How To Play</h1>
          <p className="container mx-auto text-center">Use your <strong>arrow keys</strong> to move the tiles. Press <strong>r</strong> to reset.
           Tiles with the <strong>same number</strong> merge into one when they touch.
           Add them up to reach <strong>2048</strong>!</p>
        </div>
        <footer className="flex justify-evenly">
          <h1>Created by: <span className="font-title text-red-400">Minh Truong</span></h1>
          <a className="underline text-red-400" rel="noopener noreferrer" target="_blank" href="https://github.com/minh100/2048">Github</a>
        </footer>
      </div>


    </div>
  );
}

export default App;
