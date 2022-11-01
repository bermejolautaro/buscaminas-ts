export function make2DArray<T>(columns: number, rows: number): T[][] {
    const arr = new Array(columns);

    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }

    return arr;
}

export function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}

export function isOnBounds<T>(i: number, j: number, grid: T[][]): boolean {
    return i > -1 && i < grid.length && j > -1 && j < grid[0].length;
}

export function clamp(value: number, max: number, min: number) {
    return Math.max(Math.min(value, min), max);
}