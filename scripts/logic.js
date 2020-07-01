const p1 = document.getElementsByTagName("h2")[0];
let currPlayer = p1;
const Table = [...document.getElementById("containter").table()];//get  2d arr from prototype
const messageButtons = document.getElementsByClassName("buttons")[0].children;
let state = 0;
let isTied = false;
let currPlayerClass;
let board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
];

//update table function
function updateTable(){
    table.forEach((row, i) => {
        row.forEach((column, j) => {
            if(table[i][j].hasChildNodes()) board[i][j] = table[i][j].firstChild.className;
            else board[i][j] = "_";
        });
    });
}

//check winner handler
function checkWinner(table, currPlayer){
    let horizontal = false;
    let vertical = false;
    let diagonal = false;
    let verticalArr = [0,0,0];
    let mDiagCount = 0;
    let sDiagCount = 0;
    currPlayerClass = (currPlayer.classList[0]==="p1")?"x":"o";
    isTied = [...document.getElementById("containter").children].every(elem=>elem.hasChildNodes());
    let returnVal = 0;

    table.forEach((row, i) => {
        row.forEach((column, j) => {
            if(!horizontal){//check horizontally
                horizontal = row.every(function(elem){
                    return (elem.hasChildNodes() && (elem.firstChild.className === currPlayerClass));
                });
            }
            if(!vertical){//check vertical
                if(table[i][j].hasChildNodes() && (table[i][j].firstChild.className === currPlayerClass)){
                    verticalArr[j]++;
                }
                if(verticalArr.some((elem) => elem===3)) vertical = true;
            }
            if(!diagonal){//check diagonally
                if(i===j && table[i][j].hasChildNodes() && (table[i][j].firstChild.className === currPlayerClass)){
                    mDiagCount++;
                }
                if(i+j===2 && table[i][j].hasChildNodes() && (table[i][j].firstChild.className === currPlayerClass)){
                    sDiagCount++;
                }
                if(mDiagCount === 3 || sDiagCount === 3){
                    diagonal = true;
                }
            }
        });
    });
    
    if(horizontal || vertical || diagonal){
        console.log(currPlayerClass, "won!");
        document.getElementById("game").className = "hide";
        document.getElementById("winner").childNodes[1].innerHTML = `${currPlayerClass} WON!`;
        document.getElementById("msg").classList = "show";
        currPlayer.children[currPlayer.children.length-1].innerHTML = parseInt(currPlayer.children[currPlayer.children.length-1].innerHTML) +  1;
        if(currPlayerClass === "x") return 10;
        else return -10;
    }
    if(isTied){
        console.log("tied");
        document.getElementById("game").className = "hide";
        document.getElementById("winner").childNodes[1].innerHTML = "Tied!";
        document.getElementById("msg").classList = "show";
    }
    return 0;
}


//check for winners
document.body.addEventListener("click", ()=>{
    updateTable();
    if(document.body.className === "ai" && !checkWinner(table, currPlayer)){
        makeMove(board, table);
    }
    checkWinner(table, currPlayer);
    updateTable();
});

//reset game
function reset(){
    window.location.reload();
}
//continue game
function continueGame(){
    [...document.getElementById("containter").children].forEach(e=>e.innerHTML="");
    document.getElementById("msg").classList = "hide";
    p1.classList = "p1 neon active";
    p2.classList = "p2 neon";
    document.getElementById("game").className = "show";
}


//vs ai
document.getElementById("pvp-btn").addEventListener("click", function(){
    document.body.className = "";
    document.getElementById("menu-msg").className = "hide";
    document.getElementById("game").className = "show";
});

//vs human
document.getElementById("ai-btn").addEventListener("click", function(){
    document.body.className = "ai";
    document.getElementById("menu-msg").className = "hide";
    document.getElementById("game").className = "show";
});


//reset game on click
document.getElementById("reset").addEventListener("click", ()=>reset());
messageButtons[0].addEventListener("click", ()=>reset());
messageButtons[1].addEventListener("click", ()=>continueGame());