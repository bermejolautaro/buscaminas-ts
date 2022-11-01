import { Game } from '@app/game';
import { generateGrid, stringifyGrid, stringifyGrid2 } from '@app/minesweeper';

describe('Game Tests', () => {

    it('new game', () => {
        const columns: number = 5;
        const rows: number = 5;
        const width: number = 50;
        const height: number = 50;
        const totalMines: number = 5;
        const seed = [0, 4, 8, 6, 7];
        const state = Game.newGame(width, height, columns, rows, totalMines, seed);
        Game.onPrimaryCellAction2(state, 0, 0);
        const cell = state.grid[0][0];
        console.log(cell);
        console.log(state);
        expect(!!state).toBe(true);
        // const ctxMock = jasmine.createSpyObj('ctxMock', ['fillRect', 'strokeRect', 'save', 'fillText']) as CanvasRenderingContext2D;
        // cell.reveal(ctxMock, (state));
        // console.log(cell);
    })

    it('asd', () => {
        const grid = generateGrid(1337 ^ 0xDEADBEEF, 4, 4);
        console.log(grid);
        console.log(stringifyGrid(grid, 4, 4))
        console.log(stringifyGrid2(grid))
    })
})