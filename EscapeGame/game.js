enchant();
enchant.Sound.enabledInMobileSafari = true;

window.onload = function() {
	var core = new Core(380, 480);

	core.fps = 60;

	core.preload(
		'./img/betty.png'
	);

	core.onload = function() {
		var player = new Sprite(48,48);
		player.image = core.assets['./img/betty.png'];
		player.x = core.width / 2;
		player.y = core.height / 2;
		core.rootScene.addChild(player);

		core.rootScene.backgroundColor = '#000000';
	};
	core.start();
};
