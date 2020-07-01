let x = document.createElement("div");
x.className = "x";
let o = document.createElement("div");
o.className = "o";
const p2 = document.getElementsByTagName("h2")[1];//p1 is declared in logic.js

//fill table with x/o shapes on click
document.getElementById("containter").addEventListener("click", function(element){
    const validSelection = (element.target.className != "x" && element.target.className != "o" && element.target.className != "containter");
    const hasChild = element.target.hasChildNodes();
    if(validSelection && !hasChild){
        ([...p1.classList].indexOf("active") != -1)? element.target.innerHTML = x.outerHTML : element.target.innerHTML = o.outerHTML;
        //switch active player
        ([...p1.classList].indexOf("active") != -1)? currPlayer=p1 : currPlayer=p2;
        ([...p1.classList].indexOf("active") != -1)? p1.classList = "p1 neon"  : p1.classList = "p1 neon active";
        ([...p2.classList].indexOf("active") != -1)? p2.classList = "p2 neon"  : p2.classList = "p2 neon active";
    }
});