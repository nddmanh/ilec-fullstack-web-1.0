let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let ball = {
    x: 20,
    y: 250,
    dx: 5,
    dy: 4,
    radius: 15,
    point: 5,
}

let paddle = {
    width: 70,
    height: 20,
    x: 0,
    y: canvas.height - 20,
    speed: 15,
    
    isMovingLeft: false,
    isMovingRight: false,
}

let BrickConfig = {
    offsetX: 25,
    offsetY: 25,
    margin: 25,
    width: 70,
    height: 15,
    totalRow: 4,
    totalCol: 5
}
let isGameOver = false; 
let isGameWin = false;
let UserScore = 0;

let btnPlay = document.getElementById('btnPlay');
let score = document.getElementById('score');


function getSelectValue() {
    selectLevel = document.getElementById('select').value;

    if ( selectLevel === "1") {
        ball.dx = 3;
        ball.dy = 2;
        BrickConfig.totalRow = 4;
    } else if (selectLevel === "2") {
        ball.dx = 6;
        ball.dy = 5;
        BrickConfig.totalRow = 5;
    } else if (selectLevel === "3") {
        ball.dx = 6;
        ball.dy = 9;
        BrickConfig.totalRow = 6;
    }
// }
    let MaxScore = BrickConfig.totalCol * BrickConfig.totalRow * ball.point;

    let BrickList = [];

    for (let i = 0; i < BrickConfig.totalRow; i++) {
        for (let j = 0; j < BrickConfig.totalCol; j++) {
            BrickList.push({
                x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.margin),
                y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.margin),
                isBroken: false
            });
        }
    }


    document.addEventListener('keyup', function (e) {
        if(event.keyCode === 37) {
            paddle.isMovingLeft = false;
        } else if (event.keyCode === 39) {
            paddle.isMovingRight = false;
        }
    })

    document.addEventListener('keydown', function (event) {
        if(event.keyCode === 37) {
            paddle.isMovingLeft = true;
        } else if (event.keyCode === 39) {
            paddle.isMovingRight = true;
        }
    })

    function drawBall () {
        context.beginPath();
        context.arc( ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = '#e76f51';
        context.fill();
        context.closePath();
    }

    function drawPaddle() {
        context.beginPath();
        context.rect( paddle.x, paddle.y, paddle.width, paddle.height);
        context.fillStyle = '#264653';
        context.fill();
        context.closePath();
    }

    function drawBricks() {
        BrickList.forEach( function (b) {
            if(!b.isBroken) {
                context.beginPath();
                context.rect( b.x, b.y, BrickConfig.width, BrickConfig.height);
                context.fillStyle = "#2a9d8f";
                context.fill();
                context.closePath();
            }
        });
    }

    function handleBallCollideBounds() {
        if ( ball.x < ball.radius  || ball.x > canvas.width - ball.radius) {
            ball.dx = -ball.dx;
        }

        if ( ball.y < ball.radius ) {
            ball.dy = -ball.dy;
        }
    }

    function handleBallCollideBricks() {
        BrickList.forEach(function (b) {
            if (!b.isBroken) {
                if ( (ball.x >= b.x) && (ball.x <= b.x + BrickConfig.width) 
                && (ball.y + ball.radius >= b.y)  && (ball.y - ball.radius <= b.y + BrickConfig.height) ) {
                    ball.dy = -ball.dy;
                    b.isBroken = true;
                    UserScore += ball.point;
                    if (UserScore >= MaxScore) {
                        isGameOver = true;
                        isGameWin = true;
                    }
                }
            }
        });
    }

    function handleBallCollidePaddle() {
        if ( ( ball.x + ball.radius >=  paddle.x ) 
            && (ball.x + ball.radius <= paddle.x + paddle.width ) 
            && (ball.y + ball.radius >= canvas.height - paddle.height ) ) {
                ball.dy = -ball.dy;
        }
    }

    function updatePaddlePosition() {
        if (paddle.isMovingLeft) {
            paddle.x -= paddle.speed;
        } else if (paddle.isMovingRight) {
            paddle.x += paddle.speed;
        }

        if (paddle.x < 0) {
            paddle.x = 0;
        } else if ( paddle.x > canvas.width - paddle.width) {
            paddle.x = canvas.width - paddle.width;
        }
    }

    function updateBallPosition() {
        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    function checkGameOver() {
        if ( ball.y > canvas.height - ball.radius) {
            isGameOver = true;
        }
    }

    function handleGameOver() {
        if (isGameWin) {
            alert(" Xin chúc mừng bạn đã thắng! Ấn F5 để chơi lại");
        } else {
            alert(" Bạn đã thua! Ấn F5 để chơi lại");
        }
        
    }

    function draw() {
        if (!isGameOver) {
            context.clearRect( 0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();
            drawBricks();

            handleBallCollideBounds();
            handleBallCollidePaddle();
            handleBallCollideBricks();
            updateBallPosition();
            updatePaddlePosition();
            score.innerHTML += "";
            score.innerHTML = UserScore;
            checkGameOver();

            requestAnimationFrame(draw);
        } else {
            handleGameOver();
        }
        
    }

    btnPlay.addEventListener ('click', function ()  {
        let black = document.getElementById('black');
        black.classList.remove('origin');
        black.classList.add('disappear');
        
        draw();
    })
}

