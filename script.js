const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player-1');
const player2= document.querySelector('.player-2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1 : ${currentPlayer}`;
player2.textContent = `Player 2 : ${nextPlayer}`;

const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', (e)=> {
            if(e.target.textContent ===''){
                e.target.textContent = playerTurn;
               if( checkWin()){
                showAlert(`${playerTurn} is a winner!!`);
               }
               else if (checkTie()){
                showAlert('Tie !!');
               }
                changePlayerTurn();
            }
        });
    });
}

const changePlayerTurn = () => {
    if(playerTurn === currentPlayer){
        playerTurn = nextPlayer;
    }
    else{
        playerTurn = currentPlayer;
    }
}

const checkWin = () => {
    const winningCondition =
    [
        [0,1,2],
        [3,4,5],
        [0,3,6],
        [6,7,8],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],   
    ];
    for (let i = 0;  i< winningCondition.length; i++) {
        const [pos1, pos2, pos3] = winningCondition[i];
        
        if(gameCells[pos1].textContent !== '' && gameCells[pos1].textContent === gameCells[pos2].textContent && gameCells[pos2].textContent===gameCells[pos3].textContent){
            return true;
        }
    }
    return false;
}
const checkTie = () => {
    let emptyCells = 0;
    gameCells.forEach(cell => {
        if(cell.textContent === ''){
            emptyCells++;
        }
    });
return emptyCells === 0 &&  !checkWin();
}
const restartGame = () =>{
    gameCells.forEach(cell=>{
        cell.textContent='';
    });
    startGame();

} 
const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(()=>{
        alertBox.style.display ='none';
    },3000);
}
restartBtn.addEventListener('click',restartGame);
startGame();