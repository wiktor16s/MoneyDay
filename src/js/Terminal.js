class Terminal {
    constructor(player) {
      this.player = player;
      this.input = document.getElementById("console");
      this.output = document.getElementById("output");
  
      this.syntax = {
        move: async (x, y) => {
          this.correctCommand(`move x:${x}, y: ${y}`);
           await this.player.move(parseInt(x), parseInt(y));
        },
      };
    }

    correctCommand(val){
      this.input.value = "";
      this.output.innerHTML += val + "</br>";  
    }
  
    async init() {
      const self = this;
      this.input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();

          const syntax = event.target.value.split(" ");
          self.syntax[syntax[0]](syntax[1], syntax[2]);
        }
      });
    }
  }
  
  export default Terminal;
  