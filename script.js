'use strict';
var direct = 'up';
var speed = 600;
var pole = [];
var screen; 
var snake;
var game = 1;
var game1;
class Game{
	constructor(){
		screen =document.getElementById('snake');
		this.scrscore = document.getElementById('score');
		snake = new Snake();
		this.score = 0;
		this.isfail=false;
		this.sit;
	}
	start(){
		this.sit = setInterval(function () {
			snake.move();
		},200);
	}
	stop(){
		clearInterval(this.sit);
	}
	incScore(){
		this.score++;
		this.scrscore.textContent=this.score;

	}
	fail(){
		clearInterval(this.sit);
	}
	renew(){

	}
}

class Snake {
	constructor() {
		for(let i = 0;i<20;i++){
			pole.push(new Array(20).fill(0));
		}
		this.sbody = [];
		this.head = [10,10];
		this.dtail=[10,13];
		this.tail =3;
		this.shead = 0;
		this.atail = []
		this.ind = 1;
		this.ind1 = 0;
		this.ind2 =1;
		this.mul = -1;
		this.isstep = false;	
		this.feed;
		let cell;
		for(let i =10; i<14;i++){
			pole[10][i]=1;
			this.atail.push([10,i]);
			cell= document.createElement('div');
			cell.className=i==10?'head':'cbody';
			cell.style.left= 10*15+'px';
			cell.style.top = i*15 + 'px';
			screen.appendChild(cell);
			this.sbody.push(cell);
		}
		this.createFeed();
	}

	createFeed() {
		let i,j;
		while (true) {
			i = Math.floor(Math.random() * 20);
			j = Math.floor(Math.random() * 20);
			if(pole[i][j]==0){
				pole[i][j]=2;
				break;
			}
		}
		this.feed = document.createElement('div');
		this.feed.className='cbody';
		this.feed.style.top	= j*15+'px';
		this.feed.style.left = i*15+'px';
		screen.appendChild(this.feed);
	}

	setVar(ind,mul,dir){
		this.ind = ind;
		this.mul = mul;
		direct = dir;
		this.isstep = false;
	}

	changeDir(dir) {
		if(this.isstep){
			switch(dir.keyCode) {
				case 38:
					if (direct!='down'){
						this.setVar(1,-1,'up');
					}					
					break;
				case 40:
					if (direct!='up') {
						this.setVar(1,1,'down');
					}
					break;
				case 37:
					if (direct!='right') {
						this.setVar(0,-1,'left');
					}
					break;
				case 39:
					if(direct!='left'){
						this.setVar(0,1,'right');
					}
					break;
				case 32:
					game = Math.abs(game)-1;
					game= Math.abs(game);
					if(game == 1){
						game1.start();
					}
					else {
						game1.stop();
					}
			}
		}
	}

	step(x=0,y=0){
		this.head[this.ind] = this.head[this.ind]+this.mul;
		pole[this.atail[this.tail][0]] [this.atail[this.tail][1]]=0;
		this.atail[this.tail][0]=this.head[0];
		this.atail[this.tail][1]=this.head[1];	
		this.sbody[this.tail].style.left = this.head[0]*15+x+'px';
		this.sbody[this.tail].style.top = this.head[1]*15+y+'px';
	}

	check(){
		if (pole[this.atail[this.tail][0]] [this.atail[this.tail][1]]==2){
			
		}
		switch (pole[this.head[0]][this.head[1]]) {
			case 2:
				this.sbody.push(this.feed);
				this.atail.push([this.head[0],this.head[1]]);
				pole[this.head[0]][this.head[1]]=1;
				game1.incScore();
				this.createFeed();
				break;
			case 1:
				game1.fail();
			default:
				pole[this.head[0]][this.head[1]]=1;
				break;
		}
	}

	move(){
		switch(direct){
			case 'up':
			case 'left':
				if (this.head[this.ind]!=0) {					
					this.step();
					this.check();	
				}
				else {
					game1.fail();
				}
				break;
			case 'right':
			case 'down':
				if (this.head[this.ind]!=19) {					
					this.step();
					this.check();	
				}
				else{
					game1.fail();
				}
				break;
		}
		this.isstep =true;
		this.sbody[this.tail].className='cbody';
		this.sbody[this.shead].className='cbody';
		this.shead = this.shead!=0?this.shead-1:this.sbody.length-1;
		this.tail=this.tail!=0?this.tail-1:this.sbody.length-1;
		/*if (this.tail!=0){
			this.tail--;
		}
		else{
			this.tail = this.sbody.length-1;
		}*/	
		this.sbody[this.shead].className='head';
	}
}


