// Game Variables
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

let playerScore = 0;
let aiScore = 0;
const ballRadius = 10;

// Ball Object
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 2,
  dy: -2,
};

// Paddle Objects
let paddleWidth = 10;
let paddleHeight = 100;
let playerPaddle = { x: 0, y: (canvas.height - paddleHeight) / 2 };
let aiPaddle = { x: canvas.width - paddleWidth, y: (canvas.height - paddleHeight) / 2 };

// Event Listeners
document.addEventListener('mousemove', (event) => {
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  playerPaddle.y = Math.max(Math.min(mouseY - paddleHeight / 2, canvas.height - paddleHeight), 0);
});

// Update the Game
function update() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball Collision with Top and Bottom
  if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
    ball.dy = -ball.dy;
  }

  // Ball Collision with Paddles
  if (ball.x - ballRadius < playerPaddle.x + paddleWidth && 
      ball.y > playerPaddle.y && 
      ball.y < playerPaddle.y + paddleHeight) {
    ball.dx = -ball.dx;
  }
  if (ball.x + ballRadius > aiPaddle.x && 
      ball.y > aiPaddle.y && 
      ball.y < aiPaddle.y + paddleHeight) {
    ball.dx = -ball.dx;
  }

  // Scoring
  if (ball.x + ballRadius < 0) {
    aiScore++;
    resetBall();
  } else if (ball.x - ballRadius > canvas.width) {
    playerScore++;
    resetBall();
  }

  // AI Paddle Movement
  aiPaddle.y += (ball.y - (aiPaddle.y + paddleHeight / 2)) * 0.1;
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
}

// Draw Function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000000';
  ctx.fillRect(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight);
  ctx.fillRect(aiPaddle.x, aiPaddle.y, paddleWidth, paddleHeight);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('Player: ' + playerScore, 10, 20);
  ctx.fillText('AI: ' + aiScore, canvas.width - 50, 20);
}

// Main Game Loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();