import Room from "./Room.js";
import { tiles } from "./tiles.js";

const { floor, random, min, max } = Math;

const randomRange = (min, max) => floor(random() * (max - min) + min);
const randomElement = (array) => array[floor(random() * array.length)];

class Location {
  constructor(grid, options) {
    this.grid = grid;
    this.size = { x: this.grid.rows, y: this.grid.rows };

    this.minRoomSize = options.minRoomSize || 5;
    this.maxRoomSize = options.maxRoomSize || 15;
    this.maxNumRooms = options.maxNumRooms || 50;
    this.maxRoomArea = options.maxRoomArea || 150;

    this.rooms = [];
    this.roomGrid = [];
  }


  generate() {
    this.rooms = [];
    this.grid.generateEmptyMap();
    this.roomGrid = this.grid.map;
  }
}

export default Location;
