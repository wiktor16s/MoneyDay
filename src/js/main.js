import p5 from "p5";
import "../css/style.scss";
import * as Matter from "matter-js";
import Grid from "./Grid.js";
import Player from "./Player.js";
import Terminal from "./Terminal.js";
import Room from "./Room.js";

let canvas;
let grid;
let player;
let terminal;

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;

const sketch = (p) => {
  p.setup = () => {
    grid = new Grid(p);
    player = new Player(p, grid.map);
    terminal = new Terminal(player);
    terminal.init();
    grid.createGrid();
    grid.generateEmptyMap();
    new Room(3, 3, 5, 5, grid.map, 2);
    new Room(10, 1, 17, 21, grid.map, 2);
    new Room(12, 3, 13, 15, grid.map, 2);
    new Room(15, 6, 7,7, grid.map, 2);

    player.setMap(grid.map);
    canvas = p.createCanvas(p.windowWidth - 300, p.windowHeight);
  };

  p.draw = () => {
    window.map = grid.map;
    grid.draw();
    grid.setPlayerPosition(Math.round(player.pos.x), Math.round(player.pos.y));
    player.update(grid.map);
    player.drawPath();
    player.movePlayer();
  };
};

new p5(sketch);
