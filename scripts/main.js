"use strict";
var grid = new Array(9);
for (var k = 0; k < grid.length; k++) { 
    grid[k] = new Array(9); 
}
function loaded() {
    var el = document.getElementById("grid");
    el.innerHTML = '<input class="square"/>';
    var gridTxt = '';
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            gridTxt += '<input id="' + i + j + '" class="square"/>';
            if (j % 3 == 2) gridTxt += '<span class="hrdiv"> </span>';
        }
        if (i % 3 === 2) gridTxt += '<br/><div class="hrdiv" style="height:5px"></div>';
        else gridTxt += '<br/>';
    }
    el.innerHTML = gridTxt;
}
function loadValues() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (document.getElementById(i.toString() + j.toString()).value != "") {
                grid[i][j] = parseInt(document.getElementById(i.toString() + j.toString()).value);
                document.getElementById(i.toString() + j.toString()).disabled = true;
            }
            else
                grid[i][j] = 0;
        }
    }
}

function solve() {
    if (solveSudoku(grid, 0, 0))
        printGrid(grid)
    else
        alert("the problem is wrong!!")
}

function solveSudoku(grid, row, col) {
    var cell = findUnassignedLocation(grid, row, col);
    row = cell[0];
    col = cell[1];
    if (row == -1) {
        return true;
    }

    for (var num = 1; num <= 9; num++) {

        if (noConflicts(grid, row, col, num)) {
            grid[row][col] = num;

            if (solveSudoku(grid, row, col)) {
                return true;
            }  
            grid[row][col] = 0;
        }
    }
    return false;
}


function findUnassignedLocation(grid, row, col) {
    var done = false;
    var res = [-1, -1];

    while (!done) {
        if (row == 9) {
            done = true;
        }
        else {
            if (grid[row][col] == 0) {
                res[0] = row;
                res[1] = col;
                done = true;
            }
            else {
                if (col < 8) {
                    col++;
                }
                else {
                    row++;
                    col = 0;
                }
            }
        }
    }

    return res;
}

function noConflicts(grid, row, col, num) {
    return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num);
}

function isRowOk(grid, row, num) {
    for (var col = 0; col < 9; col++)
        if (grid[row][col] == num)
            return false;

    return true;
}
function isColOk(grid, col, num) {
    for (var row = 0; row < 9; row++)
        if (grid[row][col] == num)
            return false;

    return true;
}
function isBoxOk(grid, row, col, num) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
            if (grid[row + r][col + c] == num)
                return false;

    return true;
}

function printGrid(grid) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            document.getElementById(i.toString() + j.toString()).value =grid[i][j];
        }
    }
}