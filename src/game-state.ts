import { Cell } from './cell';
import { make2DArray } from './utils';

export class GameState {
  // UI
  public readonly width: number;
  public readonly height: number;
  public readonly scaleX: number;
  public readonly scaleY: number;
  public readonly gridOffset: number = 50;

  // Application
  public running: boolean; // Mutable

  // Domain
  public readonly columns: number;
  public readonly rows: number;
  public readonly totalMines: number;
  public readonly grid: Cell[][]; // Mutable;
  public readonly options: [number, number][]; // Mutable;
  public totalFlags: number; // Mutable
  public revealedCells: number; // Mutable
  public timer: number = 0; // Mutable


  public constructor(
    width: number,
    height: number,
    columns: number,
    rows: number,
    totalMines?: number
  ) {
    this.width = width;
    this.height = height;
    this.columns = columns;
    this.rows = rows;
    this.revealedCells = columns * rows;
    this.scaleY = Math.floor((height - 100) / rows);
    this.scaleX = Math.floor((width - 100) / columns);
    this.totalMines = totalMines ?? Math.floor(columns * rows / 10);
    this.totalFlags = this.totalMines;
    this.running = true;
    this.grid = make2DArray(columns, rows);
    this.options = [];
  }
}
