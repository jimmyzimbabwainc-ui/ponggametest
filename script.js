// Pong Game JavaScript Logic

const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Create the pong paddle and the pong ball
const user = { x: 0, y: 0, width: 10, height: 100, color: "white", score: 0 };
const computer = { x: canvas.width - 10, y: 0, width: 10, height: 100, color: "white", score: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, width: 10, height: 10, speed: 5, velocityX: 5, velocityY: 5, color: "white" };

// Draw the paddle
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Draw the ball
function drawArc(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

// Update the canvas
function update() {
    // Move the paddle
    if (upPressed && user.y > 0) {
        user.y -= 8;
    }
    else if (downPressed && (user.y < canvas.height - user.height)) {
        user.y += 8;
    }

    // Move the computer paddle
    if (computer.y < ball.y) {
        computer.y += 4;
    }
    else if (computer.y > ball.y) {
        computer.y -= 4;
    }

    // Move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom
    if (ball.y + ball.height >= canvas.height || ball.y <= 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball collision with paddles
    let player = (ball.x < canvas.width / 2) ? user : computer;
    if (collision(ball, player)) {
        ball.velocityX = -ball.velocityX;
    }

    // Reset ball if it goes out of bounds
    if (ball.x < 0) {
        computer.score++;
        resetBall();
    } else if (ball.x > canvas.width) {
        user.score++;
        resetBall();
    }
}

// Collision detection
function collision(ball, paddle) {
    return ball.x < paddle.x + paddle.width &&
           ball.x + ball.width > paddle.x &&
           ball.y < paddle.y + paddle.height &&
           ball.y + ball.height > paddle.y;
}

// Render the game
function render() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawArc(ball.x, ball.y, ball.width, ball.color);
    context.font = "40px Arial";
    context.fillText(user.score, canvas.width / 4, canvas.height / 5);
    context.fillText(computer.score, 3 * canvas.width / 4, canvas.height / 5);
}

function game() {
    update();
    render();
}

setInterval(game, 1000 / 60);

// Event listeners for user controls
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "ArrowDown") {
        downPressed = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowUp") {
        upPressed = false;
    } else if (event.key === "ArrowDown") {
        downPressed = false;
    }
});