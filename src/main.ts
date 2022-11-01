import '@app/style.css'
import { GameState } from '@app/game-state';
import { Game } from '@app/game';
import { getMousePosition } from '@app/utils';

function getByIdOrThrow<T extends HTMLElement>(doc: Document, id: string): T {
  const element = doc.getElementById(id);

  if(!element) {
    throw new Error(`Element with id #${id} does not exist`);
  }

  return element as T;
}

function main() {
  const getByIdOrThrow2 = <T extends HTMLElement>(id: string) => getByIdOrThrow<T>(document, id);

  const canvas: HTMLCanvasElement = getByIdOrThrow2("canvas");
  const buttonGenerate: HTMLElement = getByIdOrThrow2("btnGenerate");
  const inputRows: HTMLInputElement = getByIdOrThrow2("inputRows");
  const inputColumns: HTMLInputElement = getByIdOrThrow2("inputCols");
  const inputMines: HTMLInputElement = getByIdOrThrow2("inputMines");
  const timerElement: HTMLElement = getByIdOrThrow2("timer");

  inputRows.placeholder = '30';
  inputColumns.placeholder = '30';
  inputMines.placeholder = '90';

  const ctx = canvas.getContext("2d");
  let interval: NodeJS.Timer | null = null;

  if (!ctx) {
    throw new Error('CanvasRenderingContext2D does not exist');
  }
  
  const width: number = 800;
  const height: number = 800;
  let gameState = new GameState(10, 10, width, height);

  canvas.addEventListener('click', event => {
    if (!interval) {
      throw new Error('Timer was not initialized');
    }

    if (gameState.running) {
      Game.onPrimaryCellAction(gameState, getMousePosition(canvas, event), ctx, interval);
    }
  })

  canvas.addEventListener('contextmenu', event => {
    if (!interval) {
      throw new Error('Timer was not initialized');
    }

    if (gameState.running) {
      event.preventDefault();
      event.stopPropagation();
      Game.onSecondaryCellAction(gameState, getMousePosition(canvas, event), ctx);
    }
  })

  buttonGenerate.addEventListener('click', () => {
    const [state, timer] = onNewGame(inputRows, inputColumns, inputMines, interval, gameState, width, height, canvas, timerElement, ctx);
    gameState = state;
    interval = timer;

  });

  document.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === 'r' || event.key === 'R') {
      const [state, timer] = onNewGame(inputRows, inputColumns, inputMines, interval, gameState, width, height, canvas, timerElement, ctx);
      gameState = state;
      interval = timer;
    }
  })
}

function onNewGame(
  inputRows: HTMLInputElement,
  inputColumns: HTMLInputElement,
  inputMines: HTMLInputElement,
  interval: NodeJS.Timer | null,
  gameState: GameState,
  width: number,
  height: number,
  canvas: HTMLCanvasElement,
  timerElement: HTMLElement,
  ctx: CanvasRenderingContext2D,

): [GameState, NodeJS.Timer] {
  const inputRowsValue = +(inputRows.value ?? inputRows.placeholder) || 30;
  const inputColumnsValue = +(inputColumns.value ?? inputColumns.placeholder) || 30;
  const inputMinesValue = +(inputMines.value ?? inputMines.placeholder) || (inputRowsValue * inputColumnsValue) / 10;

  if (interval) {
    clearInterval(interval);
  }

  gameState = Game.newGame(width, height, inputRowsValue, inputColumnsValue, inputMinesValue);

  canvas.setAttribute("width", width.toString());
  canvas.setAttribute("height", height.toString());

  timerElement.textContent = `${gameState.timer}`;
  interval = setInterval(() => {
    gameState.timer += 1;
    timerElement.textContent = `${gameState.timer}`;
  }, 1000)

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

  return [gameState, interval];
}


main();



