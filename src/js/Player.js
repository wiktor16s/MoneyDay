import { settings } from "./constans.js";
import { walkableTiles } from "./tiles.js";
import * as easystarjs from "easystarjs";

class Player {
  constructor(p, grid) {
    this.p = p;
    this.map = [];
    this.pos = { x: 5, y: 5 };
    this.size = settings.global.size;
    this.speed = 5;
    this.stepSize = 0.01;
    this.finder = new easystarjs.js();
    this.movement = {
      path: [],
      actualTarget: null,
      arrivedX: true,
      arrivedY: true,
      inTravel: false,
    };
    window.player = this;
  }

  setMap(map) {
    this.map = map;
  }

  rotateArray(a) {
    let w = a.length || 0;
    let h = a[0] instanceof Array ? a[0].length : 0;

    if (h === 0 || w === 0) {
      return [];
    }

    let i,
      j,
      t = [];
    for (i = 0; i < h; i++) {
      t[i] = [];
      for (j = 0; j < w; j++) {
        t[i][j] = a[j][i];
      }
    }
    return t;
  }

  findWay(x, y) {
    const map = this.rotateArray(this.map);

    return new Promise((resolve, reject) => {
      this.finder.setGrid(map);
      this.finder.setAcceptableTiles(walkableTiles);
      this.finder.findPath(this.pos.x, this.pos.y, x, y, (path) => {
        if (path) {
          resolve(path);
        }
        reject("Cannot find way");
      });
      this.finder.calculate();
    });
  }

  drawPath() {
    for (let i = 1; i < this.movement.path.length; i++) {
      this.p.stroke(255, 0, 0);
      this.p.strokeWeight(2);
      this.p.line(
        this.movement.path[i - 1].x * this.size + this.size / 2,
        this.movement.path[i - 1].y * this.size + this.size / 2,
        this.movement.path[i].x * this.size + this.size / 2,
        this.movement.path[i].y * this.size + this.size / 2
      );
    }
    this.p.stroke(0);
    this.p.strokeWeight(1);
  }

  async move(x, y) {
    console.log(this.pos.x, this.pos.y, "=>", x, y);
    const path = await this.findWay(x, y);
    this.movement.path = path;
    console.table(this.map);
    this.movement.inTravel = true;
    if (
      this.pos.x === this.movement.path[0].x &&
      this.pos.y === this.movement.path[0].y
    ) {
      this.movement.path.shift();
    }
  }

  movePlayer() {  
    if (
      this.movement.path.length > 0 &&
      this.movement.arrivedX &&
      this.movement.arrivedY
    ) {
      this.movement.actualTarget = this.movement.path.shift();
      this.movement.arrivedX = false;
      this.movement.arrivedY = false;
      console.log(this.movement);
    } else {
    }

    if (this.movement.inTravel) {
      if (!this.movement.arrivedX) {
        if (this.pos.x === this.movement.actualTarget.x) {
          this.movement.arrivedX = true;
        } else if (this.pos.x < this.movement.actualTarget.x) {
          this.pos.x += this.stepSize * this.speed;
          this.pos.x = parseFloat(this.pos.x.toFixed(2));
        } else if (this.pos.x > this.movement.actualTarget.x) {
          this.pos.x -= this.stepSize * this.speed;
          this.pos.x = parseFloat(this.pos.x.toFixed(2));
        }
      }

      if (!this.movement.arrivedY) {
        if (this.pos.y === this.movement.actualTarget.y) {
          this.movement.arrivedY = true;
        } else if (this.pos.y < this.movement.actualTarget.y) {
          this.pos.y += this.stepSize * this.speed;
          this.pos.y = parseFloat(this.pos.y.toFixed(2));
        } else if (this.pos.y > this.movement.actualTarget.y) {
          this.pos.y -= this.stepSize * this.speed;
          this.pos.y = parseFloat(this.pos.y.toFixed(2));
        }
      }
    }
  }

  update(map) {
    this.map = map;
    this.p.fill(255, 0, 100);
    this.p.ellipse(
      this.pos.x * this.size + this.size / 2,
      this.pos.y * this.size + this.size / 2,
      this.size,
      this.size
    );
  }
}

export default Player;
