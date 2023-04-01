class Deque {
    constructor() {
      this.items = [];
    }
  
    // Agrega un elemento al inicio de la doble cola
    push_front(element) {
       this.items.unshift(element);
    }
  
    // Agrega un elemento al final de la doble cola
    push_back(element) {
      this.items.push(element);
    }
  
    // Elimina y devuelve el elemento al inicio de la doble cola
    pop_front() {
      return this.items.shift();
    }
  
    // Elimina y devuelve el elemento al final de la doble cola
    pop_back() {
        return this.items.pop();
    }

    front(){
        return this.items[0];
    }

    back(){
        return this.items[this.items.length - 1];
    }
    // Devuelve el tamaño de la doble cola
    size() {
      return this.items.length;
    }
}


const gameContainer = document.querySelector('.game-container');
let gameCells = [];
const snake = new Deque();
let snakeX, snakeY, foodX, foodY, score = 0;
let actualDirection = 'right'; 
let bestScore = localStorage.getItem("bestScore") || 0;
let elementBestScore = document.querySelector('#best-score');
let elementScore = document.querySelector('#actual-score');
const botones = document.querySelectorAll('.fa-solid');

initComponents();
document.addEventListener('keydown', changeDirection);

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        changeDirection({key: boton.id});
    });
});

const intervalId = setInterval(handleGame, 100);






function initComponents(){
    //Inicializa las celdas
    for(let i = 0; i<20 * 20; ++i){
        let div = document.createElement('div');
        div.className = 'game-cell';
        gameContainer.appendChild(div);
        gameCells.push(div);
    }
    //El jugador inicia en 0,0
    snakeX = 0, snakeY = 0;
    gameCells[snakeY * 20 + snakeX].className += ' is-snake';
    snake.push_back({x:snakeX, y:snakeY});
    elementBestScore.textContent = "Best Score: " + bestScore;
    generateFood();

}

function generateFood(){

    foodX = Math.floor(Math.random() * 20);
    foodY = Math.floor(Math.random() * 20);

    for(let e of snake.items){
        if(foodX == e.x || foodY == e.y){
            generateFood();
        }
    }

    gameCells[foodY * 20 + foodX].className += ' is-food';

}


function handleGame(){
    if(actualDirection == 'right'){
        snake.push_front({x:snakeX + 1, y:snakeY})
        
    }else if(actualDirection == 'left'){
        snake.push_front({x:snakeX - 1, y:snakeY})
        
    }else if(actualDirection == 'up'){
        snake.push_front({x:snakeX, y:snakeY-1})
        
    }else{
        snake.push_front({x:snakeX, y:snakeY+1})
    }

    //El de adelante lo coloreamos:
    snakeX = snake.front().x, snakeY = snake.front().y;

    handleGameOver();
    growUp();

    gameCells[snake.front().y * 20 + snake.front().x].className = 'game-cell is-snake';
    gameCells[snake.back().y * 20 + snake.back().x].className = 'game-cell';
    snake.pop_back();
}

function changeDirection(event){
    if(event.key === 'ArrowUp') {
        actualDirection = 'up';
    } else if(event.key === 'ArrowDown') {
        actualDirection = 'down';
    } else if(event.key === 'ArrowLeft') {
        actualDirection = 'left';
    } else if(event.key === 'ArrowRight') {
        actualDirection = 'right';
    }
}


function gameOver(){
    location.reload();
}

function handleGameOver(){
    //Pierdes si te saliste o si hay alguna posicion repetida (Te comiste a ti mismo)
    if(snakeX < 0 || snakeX >= 20 || snakeY < 0 || snakeY >= 20){
        gameOver();
    }
    for(let i=1; i<snake.items.length; ++i){
        if(snakeX == snake.items[i].x && snakeY == snake.items[i].y){
            gameOver();
        }
    }
}

function growUp(){

    if(snakeX == foodX && snakeY == foodY){
        if(actualDirection == 'right'){
            snake.push_front({x:snakeX + 1, y:snakeY})
            
        }else if(actualDirection == 'left'){
            snake.push_front({x:snakeX - 1, y:snakeY})
            
        }else if(actualDirection == 'up'){
            snake.push_front({x:snakeX, y:snakeY-1})
            
        }else{
            snake.push_front({x:snakeX, y:snakeY+1})
        }
        gameCells[snakeY * 20 + snakeX].className = 'game-cell is-snake';
        snakeX = snake.front().x, snakeY = snake.front().y;
        
        generateFood();
        score++;
        elementScore.textContent = "Score: " + score;
        if(score > bestScore){
            localStorage.setItem("bestScore", score);
            elementBestScore.textContent = "Best Score: " + score;
        }
    }
   
}



  

