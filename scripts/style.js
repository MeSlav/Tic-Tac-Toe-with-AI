/*functions*/

var arr = [...document.getElementsByClassName("item")];
var table = [];
while(arr.length) table.push(arr.splice(0,3));//convert to 2d arr


(function (table){
    table.forEach((row, i) => {
        row.forEach((column, j) => {
            switch(i){
                case 0:
                    column.style.borderTop = "0";
                    break;
                case (table.length-1):
                    column.style.borderBottom = "0";
                    break;
            }
            switch(j){
                case 0:
                    column.style.borderLeft = "0";
                    break;
                case (table.length-1):
                    column.style.borderRight = "0";
                    break;
            }
        });
    });
})(table);

document.getElementById("containter").table = function(){
    this.table = table;
    return this.table;
};//append 2d array to container DOM

