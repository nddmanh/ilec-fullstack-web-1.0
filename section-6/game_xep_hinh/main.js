let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

const ROW = 18;
const COL = 10;
const SQ = 40;
const COLOR = "WHITE";

let score = 0;

function drawSquare( x, y, color) {
    context.fillStyle = color;
    context.fillRect (x * SQ, y * SQ, SQ, SQ);

    context.strokeStyle = "#ccc";
    context.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

let board = [];
for ( let r = 0; r < ROW; r++) {
    board[r] = [];
    for ( let c = 0; c <COL; c++) {
        board[r][c] = COLOR;
    }
}


function drawBoard() {
    for ( let r = 0; r < ROW; r++) {
        for ( let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

class Piece {
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0;
        this.activeTetromino = this.tetromino[this.tetromnoN];

        this.x = 3;
        this.y = -2;
    }

    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    draw() {
        this.fill(this.color);
    }

    unDraw() {
        this.fill(COLOR);
    }

    moveDown() {
        // if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        // } else {
        //     this.lock();
        //     p = randomPiece();
        // }
    }

    // moveLeft() {
    //     if (!this.collision(-1, 0, this.activeTetromino)) {
    //         this.unDraw();
    //         this.x--;
    //         this.draw();
    //     }
    // }
    
    // moveRight() {
    //     if (!this.collision(1, 0, this.activeTetromino)) {
    //         this.unDraw();
    //         this.x++;
    //         this.draw();
    //     }
    // }
    
    // collision (x, y, piece) {
    //     for (let r = 0; r < piece.length; r++) {
    //         for (let c = 0; c < piece.length; c++) {
    //             if (!piece[r][c]) {
    //                 continue;
    //             }

    //             let newX = this.x + c + x;
    //             let newY = this.y + r + y;

    //             if (newX < 0 || newX >= COL || newY >= ROW) {
    //                 return true;
    //             }

    //             if (newY < 0 ) {
    //                 continue;
    //             }

    //             if (board[newY][newX] != COLOR) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false
    // }

    // lock() {
    //     for (let r = 0; r < this.activeTetromino.length; r++) {
    //         for (let c = 0;  c < this.activeTetromino.length; c++) {
    //             if (!this.activeTetromino[r][c]) {
    //                 continue;
    //             }

    //             if (this.y + r < 0) {
    //                 alert('Game Over')
    //                 gameOver = true;
    //                 break
    //             }

    //             board[this.y + r][this.x + c] = this.color;
    //         }
    //     }

    //     // Xử lý ăn điểm
    //     for (let r = 0; r < ROW; r++) {
    //         let isFull = true;
    //         for (let c = 0; c < COL; c++) {
    //             isFull = isFull && ((board[r][c] != COLOR))
    //         }

    //         if(isFull) {
    //             for (let y = r; y > 1; y--) {
    //                 for (let c = 0; c < COL; c++) {
    //                     board[y][c] = board[y - 1][c];
    //                 }
    //             }

    //             for (let c = 0; c < COL; c++) {
    //                 board[0][c] = COLOR;
    //             }

    //             score += 10;
    //         }
    //     }

    //     drawBoard();

    //     document.getElementById('score').innerHTML = score;
    // }
    
    // rotate() {
    //     let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromno.length];
    //     let move = 0;
    //     if (this.collision(0, 0, nextPattern)) {
    //         if (this.x > COL /2) {
    //             move = -1;
    //         } else {
    //             move = 1;
    //         }
    //     }
    //     if (!this.collision(0, 0, nextPattern)) {
    //        this.unDraw();
    //        this.x += move;
    //        this.tetrominoN = (this.tetromino + 1) % this.tetromino.length;
    //        this.activeTetromino = this.tetromino[this.tetromnoN];
    //        this.draw();
    //     }
    // }
}


const PIECES = [
    [I, "#f9c74f"],
    [J, "#f9844a"],
    [T, "#f94144"],
    [O, "#4d908e"],
    [S, "#577590"],
    [L, "#43aa8b"]
];

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();
console.log(p);

document.addEventListener('keydown', function(e) {
    if(e.keyCode === 37) {
        p.moveLeft();
    } else if ( e.keyCode === 39) {
        p.moveRight();
    } else if ( e.keyCode === 38) {
        p.rotate();
    } else if ( e.keyCode === 40) {
        p.moveDown();
    }
})

let gameOver = false;
let interval;

function drop() {
    interval = setInterval(function() {
        if(!gameOver) {
            p.moveDown();
        } else {
            clearInterval(interval);
        }
    }, 1000)
}

drop();