import { Cell } from './cell';
import { clamp, isOnBounds } from './utils';
import { MousePosition } from "./mouse-position";
import { GameState } from "./game-state";


export class Game {
  public static onPrimaryCellAction(state: GameState, mousePosition: MousePosition, ctx: CanvasRenderingContext2D): void {
    const { scaleX, scaleY, gridOffset, grid } = state;

    const i = Math.floor((mousePosition.x - gridOffset) / scaleX);
    const j = Math.floor((mousePosition.y - gridOffset) / scaleY);

    if (isOnBounds(i, j, grid)) {
      console.log(grid[i][j]);
      if (grid[i][j].contains(mousePosition) && !grid[i][j].flagged) {
        grid[i][j].reveal(ctx, state);
      }
    }
  }

  public static onSecondaryCellAction(state: GameState, mousePosition: MousePosition): void {
    const { scaleX, scaleY, gridOffset, grid, totalFlags } = state;

    const i = Math.floor((mousePosition.x - gridOffset) / scaleX);
    const j = Math.floor((mousePosition.y - gridOffset) / scaleY);

    if (isOnBounds(i, j, grid)) {
      if (grid[i][j].contains(mousePosition) && !grid[i][j].revealed) {
        if (grid[i][j].flagged) {
          state.totalFlags += 1;
          grid[i][j].flag();
        }
        else if (totalFlags > 0) {
          state.totalFlags -= 1;
          grid[i][j].flag();
        }

        window.navigator.vibrate(100);
      }
    }
  }

  public static newGame(width: number,
    height: number,
    inputRows: number,
    inputColumns: number,
    inputMines: number,
    seed?: number[]): GameState {
    const state = new GameState(width, height, inputColumns, inputRows, inputMines);

    //Llenar la grid de Cell
    for (let i = 0; i < state.grid.length; i++) {
      for (let j = 0; j < state.grid[0].length; j++) {
        //Inicializar cada cell
        state.grid[i][j] = new Cell(i, j, state.scaleX, state.scaleY, state.gridOffset);
        //Todas las posibilidades donde puede ir a parar una mina
        state.options.push([i, j]);
      }
    }

    for (let n = 0; n < state.totalMines; n++) {
      let index = !!seed 
        ? clamp(seed[n], 0, state.options.length) 
        : Math.floor(Math.random() * state.options.length);
      let choice = state.options[index];
      let i = choice[0];
      let j = choice[1];

      state.options.splice(index, 1);

      state.grid[i][j].hasMine = true;
    }

    for (let i = 0; i < state.grid.length; i++) {
      for (let j = 0; j < state.grid[0].length; j++) {
        state.grid[i][j].countNeighbours(state);
      }
    }

    state.running = true;

    return state;
  }

  public static win(): void {
  }

  public static lose(): void {
  }
}
