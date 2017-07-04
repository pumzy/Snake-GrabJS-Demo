

$g.ready(() => {

  const canvas = $g("canvas").elements[0]
  const context = canvas.getContext("2d")
  const width = 500
  const height = 500

  var snakeArray = [];
  var direction;
  var food;
  var score;
  var level;

  const gameStart = () => {
    direction = "right"
    createSnake();
    createFood();
    score = 0;
    level = 1;

    if(typeof game_loop !== "undefined") clearInterval(game_loop);
    game_loop = setInterval(move, 100);
  }



  const fillCell = (x,y,color) => {
    context.fillStyle = color;
    context.fillRect(x*10, y*10, 10, 10)
    context.strokeStyle="white"
    context.strokeRect(x*10, y*10, 10, 10)
  }

  const checkCollision = (x,y,arr) => {

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].x === x && arr[i].y === y) return true;
    }
    return false;
  }

  const createSnake = () => {
    for (var i = 4; i >= 0; i--) {
      snakeArray.push({x:i, y:0})
    }
  }

  const createFood = () => {
    food = {
      x: Math.round(Math.random()*49),
      y: Math.round(Math.random()*49)
    }
  }

  const move = () => {

    context.fillStyle = "white"
    context.fillRect(0,0,width,height)
    context.strokeStyle = "black";
		context.strokeRect(0, 0, width, height);

    let headX = snakeArray[0].x
    let headY = snakeArray[0].y

    switch(direction){
      case "right":
        headX += 1;
        break;
      case "left":
        headX -= 1;
        break;
      case "up":
        headY += 1;
        break;
      case "down":
        headY -= 1;
        break;
      default:
        break;
    }


    if(headX === -1 || headX === 50 || headY === -1 || headY === 50 || checkCollision(headX, headY, snakeArray) ) {
      snakeArray = [];
      gameStart()

      return;
    }

    let newCell;
    if(food.x === headX && food.y === headY){
       newCell = {x: headX, y:headY}
      score += 1;
      createFood();
    } else {
      newCell = {x: headX, y:headY}
      snakeArray.pop();
    }

    snakeArray.unshift(newCell)

    snakeArray.forEach(el => {
      fillCell(el.x, el.y, "blue")
    })

    fillCell(food.x, food.y, "red")

    context.fillText(`Score: ${score}`, 5, height-5)
    context.fillText(`Level: ${level}`, 60, height-5)

  }




  gameStart();


  $g.keydown( (e) => {
    let key = e.which;

    if((key === 37 || key === 65 ) && direction !== "right") direction = "left";
    else if((key === 38 || key === 87) && direction !== "up") direction = "down";
    else if((key === 39 || key === 68 )&& direction !== "left") direction = "right";
    else if((key === 40 || key === 83) && direction !== "down") direction = "up";
  })
})
