var clamp = function(x,min,max){
	if(x < min ){
		return min;
	}
	else{
		if(x > max)
			return max;
		else{
			return x;
		}
	}
};
var Q = Quintus()
		.include('Sprites,Anim,Input,Scenes')
		.setup({width:900,height:580})
		.controls();
Q.Sprite.extend('Player',{
	init:function(p){
		this._super(p,{
			asset:'../player.png',
			sprite:'player',
			x:Q.el.width/2,
			y:Q.el.height-60,
			type:Q.SPRITE_FRIENDLY,
			speed:10
		});
		this.add('Gun');
	},
	step:function(dt){
		if(Q.inputs['left'])
			this.p.x -= this.p.speed;
		if(Q.inputs['right'])
			this.p.x += this.p.speed;
		
		this.p.x = clamp(this.p.x,0+(this.p.w/3),Q.el.width - (this.p.w/3) );
		
	}
});	
Q.Sprite.extend('Alien',{
	init:function(p){
		this._super(p,{
			asset:'../Alienship.png',
			sprite:'alien',
			x:Q.el.width/2,
			speed:200,	
		});
		this.p.y = this.p.h;
		this.add('BasicAI');
		this.on('hit', function(col){
			//console.log(col.obj.p.type & Q.SPRITE_FRIENDLY);
			if(col.obj.isA("Shot")&& ((col.obj.p.type & Q.SPRITE_FRIENDLY)==Q.SPRITE_FRIENDLY)){
				console.log(col.obj.isA('Shot'));
				this.destroy();
				col.obj.destroy();
			}
		});
	},
	step : function(dt){
		this.stage.collide(this);
	}	
});
Q.Sprite.extend('Shot',{
	init:function(p){
		this._super(p,{
			sprite:'shot',
			asset:'../rocket.png',
			speed:200
		})
	},
	step:function(dt){
		this.p.y -= this.p.speed * dt;
		
		if(this.p.y > Q.el.height || this.p.y < 0){
			this.destroy();
		}
			
	}
});
Q.Sprite.extend('Bullet',{
	init:function(p){
		this._super(p,{
			sprite:'bullet',
			asset:'../bullet.png',
			speed:200
		})
	},
	step:function(dt){
		this.p.y -= this.p.speed * dt;
		
		if(this.p.y > Q.el.height || this.p.y < 0){
			this.destroy();
		}		
	}
});
Q.component('BasicAI',{
		added:function(){
			this.entity.changeDirections();
			this.entity.on('step','move');
			this.entity.on('step','tryToFire');
			this.entity.add('Gun');
		},
		extend :{
			changeDirections:function(){
			var entity= this;
			var numberOfseconds = Math.floor((Math.random()*5)+1);
			setTimeout(function(){
				entity.p.speed = - entity.p.speed;
				entity.changeDirections();
			},numberOfseconds*1000 );
			},
			move : function(dt){
			var entity = this;
			entity.p.x -= entity.p.speed * dt;
			//turn around when arrive to edge 
			if(entity.p.x > Q.el.width-(entity.p.w/2) || entity.p.x < 0 +(entity.p.w/2) ){
				entity.p.speed = -entity.p.speed;
			}
			},
			tryToFire: function(){
			var entity = this;
			var player = Q('Player').first();
			if(!player)
				return;
			if(player.p.x + player.p.w > entity.p.x && player.p.x - player.p.w < entity.p.x ){
				this.fire(Q.SPRITE_ENIMY);
				}
			}	
		}	
});
Q.component('Gun',{
		added : function(){
			this.entity.p.shots = [];
			//*******
			this.entity.p.bullets = [];
			this.entity.p.canFire=true;
			this.entity.on('step','handleFiring');
		},
		extend:{
		handleFiring:function(dt){
			 var entity = this;
			 
			/*for(var i = entity.p.shots.length - 1; i >= 0 ; i--){
				if(entity.p.shots[i].isDestroyed){
					entity.p.shots.splice(i,1);
					console.log("removed shot!");
				}
			}
			//*******
		for(var i = entity.p.bullets.length - 1; i >= 0 ; i--){
				if(entity.p.bullets[i].isDestroyed){
					entity.p.bullets.splice(i,1);
					console.log("removed bullet!");
				}
			}			
			*/
			if(Q.inputs['fire'] && entity.p.type == Q.SPRITE_FRIENDLY){
				console.log(entity.p.shots);
				this.fire(Q.SPRITE_FRIENDLY);
			}			
		},	
		fire:function(type){
			
				var entity = this;
				if(!entity.p.canFire){
					return;
				}
				var shot;
				//***
				var bullet;
				if(type==Q.SPRITE_FRIENDLY){
shot = Q.stage().insert(new Q.Shot({x:entity.p.x+2,y:entity.p.y-101,speed:300,type:Q.SPRITE_DEFAULT|Q.SPRITE_FRIENDLY}));
				}
				else{
bullet = Q.stage().insert(new Q.Bullet({x:entity.p.x+2,y:entity.p.y + entity.p.h-20,speed:-300,type:Q.SPRITE_DEFAULT|Q.SPRITE_ENIMY}));
				}
				 
				entity.p.shots.push(shot);
				//******
				entity.p.bullets.push(bullet);
				entity.p.canFire=false;
			setTimeout(function(){
				entity.p.canFire=true;
			},500 );		
		}
		}
});
Q.scene('firstLevel',function(stage){
	Q.gravity=0;
	stage.insert(new Q.Sprite({asset:'../space_background.jpg',x:Q.el.width/2,y:Q.el.height/2,type:Q.SPRITE_NONE}));
	stage.insert(new Q.Player());
	stage.insert(new Q.Shot());
	//****
	stage.insert(new Q.Bullet());
	stage.insert(new Q.Alien());
});	
Q.load(['../space_background.jpg','../player.png','../rocket.png','../bullet.png','../Alienship.png'],function(){
	Q.stageScene('firstLevel');
});		