class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (event => {
      const $square = $(event.currentTarget);
      this.makeMove($square);
    }));
  }

  makeMove($square) {
    const pos = $square.data("pos");
    const player = this.game.currentPlayer;
    $square.css("background-color", "white");
    $square.append(player);
    if (player === "x") {
      $square.css("color", "red");
    }

    try {
      this.game.playMove(pos);
    } catch(e) {
      alert("Nope");
      return;
    }

    if (this.game.isOver()) {
      if(this.game.winner() !== null) {
        alert("you won!");
      } else {
        alert("you tied");
      }
    }
  }

  setupBoard() {

    const $ul = $("<ul>");

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let $li = $("<li>");
        $li.data("pos", [i, j]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}



module.exports = View;
