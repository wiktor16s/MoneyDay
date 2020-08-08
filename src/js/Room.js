import { tiles } from "./tiles.js";

export default class Room {
  constructor(x, y, w, h, map, doorsAmount) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.map = map;
    this.doorsAmount = doorsAmount;
    this.doors = [];
    this.canBeDoor = [];

    this.create();
    this.createDoors();
  }

  create() {
    for (let i = 0; i < this.w; i++) {
      this.map[this.x + i][this.y] = tiles.wall;
      this.map[this.x + i][this.y + this.h] = tiles.wall;
      this.canBeDoor.push({ x: this.x + i, y: this.y });
      this.canBeDoor.push({ x: this.x + i, y: this.y + this.h });
    }
    for (let i = 0; i < this.h + 1; i++) {
      this.map[this.x][this.y + i] = tiles.wall;
      this.map[this.x + this.w][this.y + i] = tiles.wall;
      this.canBeDoor.push({ x: this.x, y: this.y + i });
      this.canBeDoor.push({ x: this.x + this.w, y: this.y + i });
    }
  }

  createDoors() {
    for (let i = 0; i < this.doorsAmount; i++) {
      this.doors.push(
        this.canBeDoor[Math.floor(Math.random() * this.canBeDoor.length)]
      );
    }

    for (let i = 0; i < this.doors.length; i++) {
      console.log("door: ", this.doors[i]);
      this.map[this.doors[i].x][this.doors[i].y] = tiles.door;
    }
  }
}
