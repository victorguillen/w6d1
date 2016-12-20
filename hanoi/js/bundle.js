/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);