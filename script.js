let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;//tamanho do pixel
let snake = [];//cria a cobra como vetor já que trabalhamos com cordenadas
snake[0] = {//define tamanho incial
    x: 8*box,
    y: 8*box
}
let direction = "right";//variavel de direçao
let food = {//variavel da comida/aparecimento
    x: Math.floor(Math.random()*15+1)*box,
    y: Math.floor(Math.random()*15+1)*box
}

function createBG(){//cria background
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);

}

function createSnake(){//cria a cobra
    for(i = 0; i< snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){//funcao comida
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}
document.addEventListener('keydown', update);
function update(event){//definindo movimento pelo teclado
    if(event.keyCode == 37 && direction != "right"){ direction = "left";}
    if(event.keyCode == 38 && direction != "up"){ direction ="down";}
    if(event.keyCode == 39 && direction != "left"){ direction ="right";}
    if(event.keyCode == 40 && direction != "down"){ direction ="up";}

}

function startGame(){

    
    
    //tela sem limites
    if(snake[0].x > 15*box && direction == "right"){snake[0].x = 0;}
    if(snake[0].x < 0 && direction == "left"){snake[0].x = 16*box;}
    if(snake[0].y > 15*box && direction == "up"){snake[0].y = 0;}
    if(snake[0].y < 0 && direction == "down"){snake[0].y = 16*box;}
    
    for( i = 1; i<snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over :(')
        } 
    }

    createBG();//cria background
    createSnake();//cria a cobrinha
    drawFood();//cria a comida

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //da direcionamento de direçao
    if(direction == "right") snakeX+= box;
    if(direction == "left") snakeX-= box;
    if(direction == "up") snakeY+=box;
    if(direction == "down") snakeY-=box;
    //crescimento 
    if(snakeX != food.x || snakeY != food.y){//remvoe a comida
        snake.pop();
    }else{//faz crescer
        food.x = Math.floor(Math.random()*15+1)*box;
        food.y = Math.floor(Math.random()*15+1)*box;
    }
    

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)

}
let game = setInterval(startGame, 100);

