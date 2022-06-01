import { Application, Container, Text, AnimatedSprite, Spritesheet, Texture, Resource } from 'pixi.js';

const app: Application = new Application({ width: 750, height: 550, backgroundColor: 0x000000 });
app.view.style.position = 'absolute';
app.view.style.display = 'block';
document.body.appendChild(app.view);
let keyDiv;
let keys = new Map<number, boolean>();
const stage: Container = new Container();
let isMoving = false;
let isStanding = true;
let sheet: Spritesheet;
	window.addEventListener('keydown', keysDown);
	window.addEventListener('keyup', keysUp);
	app.loader.add('./sprites/space_marine_actions.json').load(setup);
	app.renderer.render(stage);
	keyDiv = document.querySelector('#keys');
	function setup() {
		// get a reference to the sprite sheet we've just loaded:
	sheet = app.loader.resources["./sprites/space_marine_actions.json"].spritesheet;
	const animatedCapguy = new AnimatedSprite(sheet.animations['stand']);
	animatedCapguy.textures = sheet.animations['stand'];
	animatedCapguy.animationSpeed = 0.05;
	animatedCapguy.scale.set(0.3, 0.3);
	animatedCapguy.anchor.x = 0.5;
	animatedCapguy.position.set(app.view.width / 2 - animatedCapguy.width / 2, app.view.height / 2 - animatedCapguy.height / 2);
	stage.addChild(animatedCapguy);
	gameLoop(animatedCapguy);
}

function keysDown(e: any) {
	keys.set(e.keyCode, true);
}

function keysUp(e: any) {
	console.log(e.keyCode);
	keys.set(e.keyCode, false);
}

function gameLoop(animatedCapGuy: AnimatedSprite): void {
	requestAnimationFrame(() => gameLoop(animatedCapGuy));
	animatedCapGuy.play();
	console.log(animatedCapGuy.scale);
	if (keys.get(39)) {
		if (!isMoving) {
			isMoving = true;
			isStanding = false;
			animatedCapGuy.textures = sheet.animations['move'];
			animatedCapGuy.play();
		}
		animatedCapGuy.animationSpeed = 0.3;
		animatedCapGuy.anchor.x = 0.5;
		animatedCapGuy.scale.x = 0.3;
		animatedCapGuy.x += 5;
	} else if (keys.get(37)) {
		if (!isMoving) {
			isMoving = true;
			isStanding = false;
			animatedCapGuy.textures = sheet.animations['move'];
			animatedCapGuy.play();
		}
		animatedCapGuy.animationSpeed = 0.3;
		animatedCapGuy.anchor.x = 0.5;
		animatedCapGuy.scale.x = -0.3;
		animatedCapGuy.x -= 5;
	} else {
		if (!isStanding) {
			isStanding = true;
			isMoving = false;
			animatedCapGuy.textures = sheet.animations['stand'];
			animatedCapGuy.play();
			animatedCapGuy.animationSpeed = 0.05;
		}
	}
	app.renderer.render(stage);
}

