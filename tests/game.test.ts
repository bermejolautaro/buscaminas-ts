import { Game } from './../src/game';

describe('Game Tests', () => {

    it('new game', () => {
        const columns: number = 10;
        const rows: number = 10;
        const width: number = 100;
        const height: number = 100;
        const totalMines: number = 5;
        const seed = [0, 4, 8, 6, 7];
        const state = Game.newGame(width, height, columns, rows, totalMines, seed);
        // const cell = state.grid[0][0];
        // console.log(cell);
        // const ctxMock = jasmine.createSpyObj('ctxMock', ['fillRect', 'strokeRect', 'save', 'fillText']) as CanvasRenderingContext2D;
        // cell.reveal(ctxMock, (state));
        // console.log(cell);
    })
})