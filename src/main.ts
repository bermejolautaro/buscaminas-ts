import { Game } from './game';
import { GameState } from './game-state';
import './style.css'
import { getMousePosition } from './utils';

type MouseButton = 'left' | 'right';

function main() {
  const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement | null;
  const buttonGenerate: HTMLElement | null = document.getElementById("btnGenerate");

  if (!canvas) {
    throw new Error('Canvas element with id "canvas" does not exist');
  }

  if (!buttonGenerate) {
    throw new Error('Element with id btnGenerate does not exist');
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error('CanvasRenderingContext2D does not exist');
  }
  const width: number = 800;
  const height: number = 800;
  let gameState = new GameState(10, 10, width, height);

  canvas.addEventListener('click', event => {
    if (gameState.running) {
      Game.onPrimaryCellAction(gameState, getMousePosition(canvas, event), ctx);
    }
  })

  canvas.addEventListener('contextmenu', event => {
    if (gameState.running) {
      event.preventDefault();
      event.stopPropagation();
      Game.onSecondaryCellAction(gameState, getMousePosition(canvas, event));
    }

    return false;
  })

  buttonGenerate.addEventListener('click', () => {
    const inputRows = parseInt((document.getElementById("inputRows") as HTMLInputElement)?.value) ?? 30;
    const inputColumns = parseInt((document.getElementById("inputCols") as HTMLInputElement)?.value) ?? 30;
    const inputMines = parseInt((document.getElementById("inputMines") as HTMLInputElement)?.value) ?? inputRows * inputColumns;

    gameState = Game.newGame(width, height, inputRows, inputColumns, inputMines);

    canvas.setAttribute("width", width.toString());
    canvas.setAttribute("height", height.toString());

    //Pintar fondo
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, width, height);

    //Color de borde de celda
    ctx.strokeStyle = "#000";

    //Pintar celdas
    for (let h = 0; h < 5; h++) { //Solucionar estupido error de alfa y antialiasing de Canvas js
      for (let i = 0; i < gameState.grid.length; i++) {
        for (let j = 0; j < gameState.grid[0].length; j++) {
          gameState.grid[i][j].draw(ctx);
        }
      }
    }
  });
}

main();



