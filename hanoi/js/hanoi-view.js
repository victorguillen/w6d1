class HanoiView  {
  constructor (game, hanoi) {
    this.game = game;
    this.$hanoi = hanoi;
    this.setupTowers();
    this.render();
  }

  setupTowers() {


    const $ul = $("<ul>");
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const $li = $("<li>");
        $li.data("pos", [i,j]);

        if (i === 0 & j === 0) {
          $li.addClass("disk1");
        } else if (i === 1 & j === 0) {
          $li.addClass("disk2");
        } else if (i === 2 & j === 0) {
          $li.addClass("disk3");
        }
        $ul.append($li);
        // console.log($li.data("pos"));
      }
    }
    this.$hanoi.append($ul);
  }

  render() {
    $(".disk1").removeClass("disk1");
    $(".disk2").removeClass("disk2");
    $(".disk3").removeClass("disk3");
    let towers = this.game.towers;
    const li = this.$hanoi.find("ul");

    towers.forEach(function (tower, towerIdx) {

      console.log(tower);
      tower.forEach(function (disk, diskIdx) {
        if (disk === 3) {
          console.log(disk);
          let lis = li.find("li").eq((towerIdx + diskIdx)).addClass("disk3");
          console.log(lis);
        }
        else if (disk === 2) {
          let lis = li.find("li").eq((towerIdx + diskIdx)).addClass("disk2");
        } else if (disk === 1) {
          let lis = li.find("li").eq((towerIdx + diskIdx)).addClass("disk1");
        }
      });
    });

    // for (var i = 0; i < 3; i++) {
    //   for (var j = 0; j < 3; j++) {
    //     if (towers[i][j] !== []) {
    //       let pos = this.$hanoi.find(":data([i,j])");
    //       // console.log(pos.data("pos"));
    //       // let target = this.$hanoi.find("li").data("pos", [i, j]);
    //       // target.text(towers[i][j]);
    //
    //     }
    //     // towers[i][j]
    //   }
    // }
  }
}


module.exports = HanoiView;
