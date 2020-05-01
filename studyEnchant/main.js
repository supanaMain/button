enchant();
enchant.Sound.enabledInMobileSafari = true;
//おまじにゃい

var Coin = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y) {
		enchant.Sprite.call(this, 32, 32);
		this.x = x;
		this.y = y;
		this.image = core.assets['./img/piece.png'];
		this.tick = 0;

		this.anime = [8, 9, 10, 11];

		this.addEventListener('enterframe', function(e) {
			if(this.tick <= 8) {
				this.frame = this.tick;
			} else {
				this.frame = this.anime[this.tick % 4];
			}
			this.tick++;
		});
	}
});

//プレイヤークラス
var Player = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y, map) {
		//「Sprite」クラス継承
		enchant.Sprite.call(this, 48, 48);

		//スプライトで表示する画像をせていする
		this.image = core.assets['./img/betty.png'];
		//表示するフレーム
		this.frame = 3;
		this.x = x;
		this.y = y;
		this.tick = 0;
		this.hp = 1000;

		this.addEventListener('enterframe', function(e) {
			if(core.input.left) {
				this.x -= 4;
				//マップの当たり判定がある場合は移動しない
				if(map.hitTest(this.x + 16, this.y + 40)) this.x += 4;
				this.frame = this.tick % 4 * 4 + 1;
				this.tick++;
			}
			if(core.input.right) {
				this.x += 4;
				if(map.hitTest(this.x + 24, this.y + 40)) this.x -= 4;
				this.frame = this.tick % 4 * 4 + 3;
				this.tick++;
			}
			if(core.input.up) {
				this.y -= 4;
				if(map.hitTest(this.x + 24, this.y + 40)) this.y += 4;
				this.frame = this.tick % 4 * 4 + 2;
				this.tick++;
			}
			if(core.input.down) {
				this.y += 4;
				if(map.hitTest(this.x + 24, this.y + 40)) this.y -= 4;
				this.frame = this.tick % 4 * 4;
				this.tick++;
			}
		});

		this.addEventListener('touchmove', function(e) {
			this.x = e.x - this.width / 2;
			this.y = e.y - this.height / 2;
		});
	}
});

window.onload = function() {
	//ゲームオブジェクトを作成する
	core = new Core(320,320);

	//ゲーム初期化処理

	//fps（デフォルトは１６ｆｐｓ）
	core.fps = 16;

	//スコアを保存するプロパティを追加
	core.score = 0;
	//経過時間を保持するプロパティを追加
	core.time = 0;
	core.life = 3;

	core.preload(
		'./img/betty.png',
		'./img/flowers.png',
		'./img/map1.png',
		'./img/piece.png',
		'./sound/one_0.mp3',
		'./sound/Ready.wav'
	);

	//BGM用のsoundを読み込む
	core.bgm = DOMSound.load('./sound/one_0.mp3');
	//SE用のsoundを読み込む
	core.se = DOMSound.load('./sound/Ready.wav');

	core.onload = function () {

		//マップの作製
		var map = new Map(16,16);
		map.image = core.assets['./img/map1.png'];

		map.loadData([
			[1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 83, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,100,116,116,116,116,116,116,116,116,116,116],
			[1,  1,  1,  1,  1, 16, 17, 18, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1, 32, 33, 34, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1, 48, 49, 50, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1, 20, 20,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1, 16, 18,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1, 48, 50,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
			[1,  1,  1,  1,  1,  1,  1,  1, 99,101,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
		],
		[
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,23,23,23,23,23,23,-1,-1,-1],
			[-1,23,23,23, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1, 7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,-1,-1,-1],
			[-1,-1,-1,-1,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,28,-1,-1,-1,-1,-1,-1,-1,-1,28,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,28,-1],
			[-1,28,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
		]);
		//マップの当たり判定
		map.collisionData = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0],
			[0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

		//rootSceneにマップを追加
		core.rootScene.addChild(map);

		//トラップのスプライトを作成
		var trap = new Sprite(16, 16);
		trap.image = core.assets['./img/map1.png'];
		trap.frame = 43;
		trap.x = 136;
		trap.y = 152;
		core.rootScene.addChild(trap);

		//プレイヤーのスプライトを作成
		var player = new Player(120, 50, map);

		core.rootScene.addChild(player);

		//ラベルの作成
		var infoLabel = new Label('enchant.js てんぷら');

		infoLabel.x = 16;
		infoLabel.y = 0;
		infoLabel.color = '#0000FF';
		infoLabel.font = '14px sens-serif';

		core.rootScene.addChild(infoLabel);

		var is_bgm = false;

		core.rootScene.addEventListener('enterframe', function(e) {
			if(player.x > 300) {
				core.pushScene(core.field(player.x, player.y));
				player.x = 280;
			}

			//トラップに当たったら
			if(player.within(trap, 30)) {
				lifeLabel.life = -- core.life;
				player.x = 120;
				player.y = 50;
				if(core.life == 0) core.stop();
			}

			//BGMのボリュームを設定する(0~1)
			core.rootScene.addEventListener('touchstart', function(e) {
				if(is_bgm) return;
				core.bgm.volum = 0.5;
				core.bgm.play();
				core.se.play();
				is_bgm = true;
			});
		});

		var lifeLabel = new LifeLabel(180, 0, core.life);
		core.rootScene.addChild(lifeLabel);

		//バーチャルパッドを作成
		var pad = new Pad();
		pad.x = 220;
		pad.y = 220;
		core.rootScene.addChild(pad);

	};

	//新しいSceneを作成する関数
	core.field = function(px, py) {
		//新しいSceneを作成
		var scene = new Scene();

		//マップを作成
		var map = new Map(16, 16);
		map.image = core.assets['./img/map1.png'];
		map.loadData([
			[37,37,37,37,37,37,37,37,37,37,37,37,32,33,33,33,33,33,33,33],
		    [37,37,37,37,37,37,37,37,37,37,37,37,48,49,49,49,49,49,49,49],
		    [3,3,23,23,23,23,23,23,23,23,7,37,37,20,37,37,37,37,37,37],
		    [84,84,84,84,84,84,84,84,84,84,7,37,37,37,37,37,37,37,37,37],
		    [116,116,116,116,116,116,116,116,100,100,7,37,37,37,37,37,37,37,37,37],
		    [37,37,23,23,23,23,23,7,100,100,7,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,7,100,100,7,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,7,100,100,7,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,7,100,100,7,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,7,100,100,23,23,23,23,23,23,23,23,37,37],
		    [37,37,37,37,37,37,37,7,100,100,100,84,84,84,84,84,84,84,84,84],
		    [37,37,37,23,23,23,23,23,100,100,116,116,116,116,116,116,116,116,116,116],
		    [37,37,37,37,37,37,37,37,100,100,37,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,37,100,100,37,37,37,37,37,37,37,37,37,37],
		    [37,37,23,23,23,23,23,7,100,100,37,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,7,100,100,37,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,7,100,100,37,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,7,100,100,37,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,23,100,100,37,37,37,37,37,37,37,37,37,37],
		    [37,37,37,37,37,37,37,37,100,100,37,37,37,37,37,37,37,37,37,37]
		]);

		map.collisionData = [
			[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
		    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
		    [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
		    [0,0,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0],
		    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		];

		//Sceneにマップを追加する
		scene.addChild(map);

		var coins = [];
		for(var i = 0; i < 10; i++) {
			var coin = new Coin(128, 80 + 16 *i);
			scene.addChild(coin);
			coins[i] = coin;
		}

		var player = new Player(0, py, map);

		scene.addChild(player);

		scene.addEventListener('enterframe', function(e) {
			if(player.x < -20) core.popScene();

			for(var i in coins) {
				if(player.within(coins[i], 16)) {
					//コインをとったスコアを加算して更新する
					core.score = scoreLabel.score += 100;
					//とったコインを削除する
					scene.removeChild(coins[i]);
					delete coins[i];
				}
			}

			core.time = timeLabel.time;
		});

		//スコアをフォントで表示するラベルを作成する
		//引数はラベル表示のxy座標
		var scoreLabel = new ScoreLabel(16, 0);
		//初期値セット
		scoreLabel.score = core.score;
		scene.addChild(scoreLabel);

		var timeLabel = new TimeLabel(16, 304);
		timeLabel.time = core.time;
		scene.addChild(timeLabel);

		//バーチャルパッドを作成
		var pad = new Pad();
		pad.x = 220;
		pad.y = 220;
		scene.addChild(pad);

		return scene;
	};

	//ゲームスタート
	core.start();
};
