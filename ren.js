var fs = require('fs')
var str = fs.readFileSync("data.txt", 'utf8')
var res = str.split(' E ')
var data = []
var i
for (i = 0; i < res.length; i++) {
  var tem = res[i].split(' - ')
  var j
  var fin = []
  for (j = 0; j < tem.length; j++) {
    var tem2 = tem[j].split(' ')
    tem2.pop()
    fin.push(tem2)
  }
  data.push(fin)
}
console.log(data[0])

//  variables

var board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var player = 1

/////////////

//functions
var winning_sets = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]]
function checkwinner(board, player){
  var qw = false
  for(var i = 0; i < 9; i++){
    if(board[i] == 0){
      qw = true
    }
  }
  if(!qw){
    return 3
  }
  for(var i = 0; i < winning_sets.length; i++){
    var bl = true
    for(var j = 0; j < winning_sets[i].length; j++){
      if(board[winning_sets[i][j]] != player){
        bl = false
        break;
      }
    }
    if(bl){
      return player
    }
  }
  return 0
}

function checkmove(board){
  var i = 0
  for(i = 0; i < data.length; i++){
    var tr = true
    var tem = data[i][0]
    for(var j = 0; j < tem.length; j++){
      if(board[j] != tem[j]){
        tr = false
      }
    }
    if(tr){
      return i
    }
  }
}

function pos(bd1, bd2){
  for(var i = 0; i < bd1.length; i++){
    if(bd1[i] != bd2[i]){
      return i
    }
  }
}

function nxtMove(board){
  var num = checkmove(board)
  var moves = []
  for(var i = 1; i < data[num].length; i++){
    moves.push(pos(board, data[num][i]) )
  }
  var item = moves[Math.floor(Math.random()*moves.length)]
  return item
}
/////////////

var winner = 0

function boxClick(x, can){
  if(board[x] == 0 && !winner){
    if(player == 1){
      board[x] = 1
      drawX(can)
      winner = checkwinner(board, 1)
      if(winner){
        dis(winner)
      }else{
        var nxt = nxtMove(board)
        draw(nxt)
        board[nxt] = 2
      }
      winner = checkwinner(board, 2)
      if(winner){
        dis(winner)
      }
      //console.log(nxt + board)
      console.log("winner"+winner)
      //player = 2
    }
  }
  console.log(x)
  console.log("brd"+board)
}

function drawX(can){
  var dr = document.getElementById(can)
  var ctx = dr.getContext("2d")
  ctx.moveTo(20,20)
  ctx.lineTo(60,60)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#4dffc3'
  ctx.stroke()
  var ctx2 = dr.getContext('2d')
  ctx2.moveTo(60,20)
  ctx2.lineTo(20,60)
  ctx2.lineWidth = 2
  ctx2.strokeStyle = '#4dffc3'
  ctx2.stroke()
}

function drawO(can,q){
  console.log("O"+q)
  var dr = document.getElementById(can)
  var ctx = dr.getContext("2d")
  ctx.beginPath()
  ctx.arc(40, 40, 20, 0, 2 * Math.PI)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#4dffc3'
  ctx.stroke()
}

function draw(nxt) {
  var can
  switch(nxt){
    case 0:
      can = 'can0'
      break
    case 1:
      can = 'can1'
      break
    case 2:
      can = 'can2'
      break
    case 3:
      can = 'can3'
      break
    case 4:
      can = 'can4'
      break
    case 5:
      can = 'can5'
      break
    case 6:
      can = 'can6'
      break
    case 7:
      can = 'can7'
      break
    case 8:
      can = 'can8'
      break
    }
  console.log("ca"+nxt)
  drawO(can,1)
}

//reset function
function clearblock(can){
  var c=document.getElementById(can)
  var ctx = c.getContext("2d")
  ctx.clearRect(0,0,80,80)
  ctx.beginPath()
}

function reset() {
  clearblock('can0')
  clearblock('can1')
  clearblock('can2')
  clearblock('can3')
  clearblock('can4')
  clearblock('can5')
  clearblock('can6')
  clearblock('can7')
  clearblock('can8')
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  winner = 0
  document.getElementById('dis').innerHTML = ''
}

function dis(winner){
  var de = document.getElementById('dis')
  if(winner == 3){
    de.innerHTML = "Draw! Better Luck next TIME"
  }else{
    if(winner == 2){
      de.innerHTML = "Oh! Poor Boy... CPU WON"
    }
    else{
      de.innerHTML = 'Seriously! you finally made it'
    }
  }
}






















/*var value = 0
var cmd = require('node-run-cmd')
var fs = require('fs')
var next_move

cmd.run('python Python/te.py')
console.log('python programm started')

fs.writeFileSync('Resources/data1.txt', 'yes')
fs.writeFileSync('Resources/data2.txt', '')

var interval = setInterval(function(){
  next_move = fs.readFileSync('Resources/data2.txt', 'utf8')
  while(next_move == ''){
    next_move = fs.readFileSync('Resources/data2.txt', 'utf8')
  }
  if(next_move == 'exit'){
    console.log('Terminated')
    clearInterval(interval)
    return
  }
  document.getElementById("ch").innerHTML = next_move
  console.log("step "+next_move)
  fs.writeFileSync('Resources/data2.txt', '')
  fs.writeFileSync('Resources/data1.txt', 'yes')
}, 10)*/
