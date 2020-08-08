import { tiles } from "./tiles.js";
import { settings } from "./constans.js";

class Grid {
  constructor(p) {
    this.p = p;
    this.cols = settings.grid.cols;
    this.rows = settings.grid.rows;
    this.size = settings.global.size;
    this.map = [];
  }

  createGrid() {
    this.map = new Array(this.cols);
    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new Array(this.rows);
    }
  }

  generateEmptyMap() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.map[i][j] = tiles.floor;
      }
    }
  }

  generateMapStructs(curvesAmount) {
    const path = {
      start: {
        //x: Math.floor(this.p.random(0, this.rows)),
        //y: Math.floor(this.p.random(0, this.cols))
        x: 7,
        y: this.cols - 1,
      },
      curves: {
        // amount: Math.floor(this.p.random(0, curvesAmount))
        amount: 3,
        minLength: 5,
      },
    };

    for(let i = 0; i < path.curves.amount; i++){

    }
  }

  setPlayerPosition(x, y) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.map[i][j] === tiles.player) {
          this.map[i][j] = tiles.floor;
        }
      }
    }
    this.map[x][y] = tiles.player;
  }

  draw() {
    this.p.background(0);
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const x = i * this.size;
        const y = j * this.size;
        const color = this.getColor(this.map[i][j]);
        this.p.fill(color.r, color.g, color.b);
        this.p.rect(x, y, this.size, this.size);
      }
    }
  }

  getColor(type) {
    switch (type) {
      case tiles.blank:
        return {r:0, g:0, b:0};
        case tiles.door:
        return {r:255, g:210, b:12};
        case tiles.floor:
        return {r:200, g:200, b:200};
        case tiles.player:
        return {r:12, g:128, b:255};
        case tiles.wall:
        return {r:110, g:50, b:0};
        default:
          console.table(this.map)
          console.log(type)
          break;
    }
  }
}

export default Grid;
