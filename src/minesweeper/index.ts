export enum State {
  IDLE = 'IDLE',
  REVEALED = 'REVEALED',
  FLAGGED = 'FLAGGED'
}

interface PartialCell {
  state: State,
  hasMine: boolean,
  minesCount: number
}

class Cell {
  constructor(
    public readonly state: State,
    public readonly hasMine: boolean,
    public readonly minesCount: number) { }
}

const sfc32 = (a: number, b: number, c: number, d: number) => () => {
  a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
  var t = (a + b) | 0;
  a = b ^ b >>> 9;
  b = c + (c << 3) | 0;
  c = (c << 21 | c >>> 11);
  d = d + 1 | 0;
  t = t + d | 0;
  c = c + t | 0;
  return (t >>> 0) / 4294967296;
}

const generateRandom = (seed: number) => sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed);

const safeAccess = <T>(array: T[], index: number, action: (element: T) => void) => {
  if (array[index]) {
    action(array[index])
  }
}

const access2dTo1d = (x: number, y: number, width: number) =>
  x >= 0 && y >= 0 && width > 0
    ? x + width * y
    : -1;

export const generateGrid = (seed: number, width: number, height: number): Cell[] => {
  const rand = generateRandom(seed);

  const result: PartialCell[] =
    new Array(width * height)
      .fill(undefined)
      .map(() => ({ state: State.IDLE, hasMine: false, minesCount: 0 }));

  for (let i = 0; i < result.length; i++) {
    const hasMine = rand() > .6;

    if (hasMine) {
      const x = Math.floor(i % width);
      const y = Math.floor(i / height);
      result[i].hasMine = true;
      safeAccess(result, access2dTo1d(x + 1, y + 0, width), elem => elem.minesCount += 1);
      safeAccess(result, access2dTo1d(x - 1, y + 0, width), elem => elem.minesCount += 1);
      safeAccess(result, access2dTo1d(x + 0, y + 1, width), elem => elem.minesCount += 1);
      safeAccess(result, access2dTo1d(x + 0, y - 1, width), elem => elem.minesCount += 1);
      safeAccess(result, access2dTo1d(x + 1, y + 1, width), elem => elem.minesCount += 1);
      safeAccess(result, access2dTo1d(x - 1, y + 1, width), elem => elem.minesCount += 1);
      safeAccess(result, access2dTo1d(x + 1, y - 1, width), elem => elem.minesCount += 1);
      safeAccess(result, access2dTo1d(x - 1, y - 1, width), elem => elem.minesCount += 1);
    }
  }

  return result.map(x => new Cell(x.state, x.hasMine, x.minesCount));
}

const strinfigyCell = (cell: Cell) => {
  return cell.hasMine ? 'X' : String(cell.minesCount)
}

export const stringifyGrid = (grid: Cell[], width: number, height: number) => {
  let result = '';
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      result += strinfigyCell(grid[access2dTo1d(x, y, width)]);
    }
    result += '\n';
  }

  return result;
}

export const stringifyGrid2 = (grid: Cell[]) => {
  const padding: number = String(grid.length).length;
  let result = grid.map((_, index) => String(index).padStart(padding)).join(' ');
  result += '\n';
  result += grid.map(x => strinfigyCell(x).padStart(padding)).join(' ');
  return result;
}

