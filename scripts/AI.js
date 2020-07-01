let player = "o", opponent = "x";

function movesLeft(board){
    for (let i = 0; i<3; i++) 
        for (let j = 0; j<3; j++) 
            if (board[i][j]=='_') return true; 
    return false;
}

//evaluate function ======================================================================
function evaluate(board){
    let horizontalx = false;
    let horizontaly = false;
    let horizontal = 0;
    let vertical = 0;
    let diagonal = 0;
    let verticalArrx = [0,0,0];
    let verticalArry = [0,0,0];
    
    //check for winner
    board.forEach((row, i) => {
        row.forEach((column, j) => {
            if(!horizontal){//check horizontally
                horizontalx = row.every(function(elem){
                    if(elem === player) return true;
                });
                horizontaly = row.every(function(elem){
                    if(elem === opponent) return true;
                });
                if(horizontalx) horizontal = 10;
                if(horizontaly) horizontal = -10;

            }
            if(!vertical){//check vertical
                if((board[i][j] === player)){
                    verticalArrx[j]++;
                }
                if((board[i][j] === opponent)){
                    verticalArry[j]++;
                }

                if(verticalArrx.some((elem) => elem===3)) vertical = 10;
                if(verticalArry.some((elem) => elem===3)) vertical = -10;
            }
            if(!diagonal){//check diagonally
                //check both diagonals for player
                if (board[0][0]==board[1][1] && board[1][1]==board[2][2]){
                    if(board[0][0] === player) diagonal = 10;
                    if(board[0][0] === opponent) diagonal = -10;
                }
                //check both diagonals for opponent
                if(board[0][2]==board[1][1] && board[1][1]==board[2][0]){
                    if(board[0][2] === player) diagonal = 10;
                    if(board[0][2] === opponent) diagonal = -10;
                }
            }
        });
    });

    if(vertical || horizontal || diagonal) return vertical || horizontal || diagonal;

    return 0;
}


//minimax function ==============================================================
function minimax(board, depth, isMax){
    
    let score = evaluate(board);
    if(score === 10 || score === -10 || !movesLeft(board)) return score;

    if(isMax){
        let best = -Infinity;

        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                if(board[i][j] === "_"){
                    board[i][j] = player;
                    best = Math.max(best, minimax(board, depth+1, !isMax));
                    board[i][j] = "_";
                }
            }
        }
        return best;
    }else{
        let best = Infinity;

        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                if(board[i][j] === "_"){
                    board[i][j] = opponent;
                    best = Math.min(best, minimax(board, depth+1, !isMax));
                    board[i][j] = "_";
                }
            }
        }
        return best;
    }
}

//find best move function
function findBestMove(board){
    let bestVal = -Infinity; 
    let bestMove = {
        row: 0,
        col: 0
    }
    let moveVal;

    for (let i = 0; i<3; i++)
        for (let j = 0; j<3; j++){
            if (board[i][j]=='_'){
                board[i][j] = player;
                moveVal = minimax(board, 0, false);
                board[i][j] = "_";

                if (moveVal > bestVal){ 
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                } 
            }
        }
    
    return bestMove;
}

//make move and check winneer
function makeMove(board, table){
    updateTable();
    if(!evaluate(board) && !isTied){
        if([...p2.classList].indexOf("active") != -1){
            table[findBestMove(board).row][findBestMove(board).col].innerHTML = o.outerHTML;
            //switch player
            ([...p1.classList].indexOf("active") != -1)? currPlayer=p1 : currPlayer=p2;
            ([...p1.classList].indexOf("active") != -1)? p1.classList = "p1 neon"  : p1.classList = "p1 neon active";
            ([...p2.classList].indexOf("active") != -1)? p2.classList = "p2 neon"  : p2.classList = "p2 neon active";
        }
    }
}

document.body.addEventListener("click", function(){
    updateTable();
});