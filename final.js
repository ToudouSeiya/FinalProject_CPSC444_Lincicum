//Morgan Lincicum
//Project 1

document.onmousemove = getMousePosition;

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
let mixers = [];
let playerMixer;
let playerIdle;
let playerWalk;
let walking = false;

// ---------------------------------------------------
// Scene
// ---------------------------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// ---------------------------------------------------
// Camera
// ---------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 20);

// ---------------------------------------------------
// Renderer
// ---------------------------------------------------

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ---------------------------------------------------
// Controls
// ---------------------------------------------------

const controls = new OrbitControls(camera, renderer.domElement);

// ---------------------------------------------------
// Lights
// ---------------------------------------------------
const ambientLight = new THREE.AmbientLight(
    0xff9900,
    0.7
);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(
    0xffaa00,
    0.5
);
dirLight.position.set(0, 20, -20);
//dirLight.castShadow = true;
scene.add(dirLight);

//windows
const win1Light = new THREE.SpotLight(
    0xffffff,
    300
);
win1Light.position.set(-15, 15, -16);
win1Light.angle = Math.PI / 6;
win1Light.penumbra = 0.5;
win1Light.target.position.set(-15, -5, 0);   
win1Light.castShadow = true;
scene.add(win1Light);
scene.add(win1Light.target);

const win2Light = new THREE.SpotLight(
    0xffffff,
    300
);
win2Light.position.set(-8, 15, -16);
win2Light.angle = Math.PI / 6;
win2Light.penumbra = 0.5;
win2Light.target.position.set(-8, -5, 0);   
win2Light.castShadow = true;
scene.add(win2Light);
scene.add(win2Light.target);

const win3Light = new THREE.SpotLight(
    0xffffff,
    300
);
win3Light.position.set(5, 15, -16);
win3Light.angle = Math.PI / 6;
win3Light.penumbra = 0.5;
win3Light.target.position.set(5, -5, 0);   
win3Light.castShadow = true;
scene.add(win3Light);
scene.add(win3Light.target);

//fire light
const fireLight = new THREE.PointLight(
    0xff0000,
    200
);
fireLight.position.set(40, 12, -14);
fireLight.castShadow = true;
scene.add(fireLight);

//backroom window light
const winBLight = new THREE.SpotLight(
    0x9999ff,
    200
);
winBLight.position.set(26, 20, 2);
winBLight.angle = Math.PI / 6;
winBLight.penumbra = 0.1;
winBLight.target.position.set(30, 10, -5);   
winBLight.castShadow = true;
scene.add(winBLight);
scene.add(winBLight.target);

// const helper = new THREE.SpotLightHelper(win1Light, 1);
// scene.add(helper);

//fix shadow artifacts (help from AI)
for (const light of [win1Light, win2Light, win3Light, winBLight, fireLight]) {
    light.shadow.bias = -0.0001;
    light.shadow.normalBias = 0.02;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 50;
}


// ---------------------------------------------------
// Setting
// ---------------------------------------------------
const xBound = 20;
const zBound = 20;

let tavern;
loader.load('models/tavern2.glb', function(gltf) {
    tavern = gltf.scene;
    tavern.position.set(0, 0, 0);
    tavern.scale.set(2, 2, 2);
    scene.add(tavern);

    //enable shadows on all objects in group
    gltf.scene.traverse((object) => {
    if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
    }
    });

    finishLoading();
});

let backroom;
loader.load('models/tavern.glb', function(gltf) {
    backroom = gltf.scene;
    backroom.position.set(38.5, 10, -20);
    backroom.scale.set(4, 4, 4);
    backroom.rotation.y = Math.PI * 2 / 2;
    scene.add(backroom);

    //enable shadows on all objects in group
    gltf.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    backroom.visible = false;
});


// ---------------------------------------------------
// Shapes
// ---------------------------------------------------


// ---------------------------------------------------
// Animal Models
// ---------------------------------------------------
let player;
let king;
let bartender;
let patron;

let position;

loader.load('models/deer.glb', function(gltf) {
    const deer = gltf.scene;
    deer.position.set(-19, 0.1, -12);
    deer.rotation.y = Math.PI / 3;
    deer.scale.set(6, 6, 6);
    scene.add(deer);
    patron = deer;

    //enable shadows on all objects in group
    gltf.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    //animation
    mixers.push(new THREE.AnimationMixer(gltf.scene));
    const action = mixers[mixers.length - 1].clipAction(gltf.animations[0]);
    action.play();
});

//the deer's box
loader.load('models/box.glb', function(gltf){
    const box = gltf.scene;
    box.position.set(-16, 1, -10);
    box.rotation.y = Math.PI * 10 / 3;
    scene.add(box);
    box.castShadow = true;
    box.receiveShadow = true;
});

loader.load('models/puma.glb', function(gltf) {
    const puma = gltf.scene;
    puma.scale.set(5, 5, 5);
    //puma.rotation.y = Math.PI * 3 / 2; 
    puma.position.set(40, 8, 3);
   
    scene.add(puma);
    king = puma;

    //enable shadows on all objects in group
    gltf.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    //animation
    mixers.push(new THREE.AnimationMixer(gltf.scene));
    const action = mixers[mixers.length - 1].clipAction(gltf.animations[3]);
    action.play();

    puma.visible = false;
});

loader.load('models/coyote.glb', function(gltf) {
    const coyote = gltf.scene;
    coyote.scale.set(5, 5, 5);

    //fix the fact that the coyote was off center by making a separate "root" to control it from, help from AI
    coyote.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(coyote);
    const center = bounds.getCenter(new THREE.Vector3());
    const pivotOffset = new THREE.Vector3(center.x, bounds.min.y, center.z);

    const playerRoot = new THREE.Group();
    playerRoot.position.set(-3, 0.1, 22);
    playerRoot.rotation.y = Math.PI;

    // Put the model's feet-center at the root's origin.
    coyote.position.sub(pivotOffset);

    // Preserve the character's current visible position.
    playerRoot.position.add(pivotOffset.clone().applyEuler(playerRoot.rotation));

    playerRoot.add(coyote);
    scene.add(playerRoot);
    player = playerRoot;

    //enable shadows on all objects in group
    gltf.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    //animation
    playerMixer = new THREE.AnimationMixer(gltf.scene);
    playerIdle = playerMixer.clipAction(gltf.animations[0]);
    playerIdle.play();
    playerWalk = playerMixer.clipAction(gltf.animations[1]);

    position = player.position.clone();
});

loader.load('models/bison.glb', function(gltf) {
    const bison = gltf.scene;
    bison.position.set(8, 0.2, 4);
    bison.rotation.y = Math.PI * 3 / 2 * 1.23;
    bison.scale.set(0.035, 0.035, 0.035);
    scene.add(bison);
    bartender = bison;

    //enable shadows on all objects in group
    gltf.scene.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

    //animation
    mixers.push(new THREE.AnimationMixer(gltf.scene));
    const action = mixers[mixers.length - 1].clipAction(gltf.animations[0]);
    action.play();
});

//----------------------------------------------------------------------------
// Keyboard Event Functions
//----------------------------------------------------------------------------

//This array will hold the pressed or unpressed state of every key
var currentlyPressedKeys = [];

document.onkeydown = function handleKeyDown(event) {
   currentlyPressedKeys[event.keyCode] = true;

   //Get unshifted key character
   var c = event.keyCode;
   var key = String.fromCharCode(c);

	//Place key down detection code here
}

document.onkeyup = function handleKeyUp(event) {
   currentlyPressedKeys[event.keyCode] = false;
   
   //Get unshifted key character
   var c = event.keyCode;
   var key = String.fromCharCode(c);

	//Place key up detection code here
}

//isPressed(c)
//Utility function to lookup whether a key is pressed
//Only works with unshifted key symbol
// ie: use "E" not "e"
//     use "5" not "%"
function isPressed(c)
{
   var code = c.charCodeAt(0);
   return currentlyPressedKeys[code];
}

//handleKeys()
//Continuously called from animate to cause model updates based on
//any keys currently being held down
function handleKeys(delta) 
{
   //Place continuous key actions here - anything that should continue while a key is
   //held

   let x = 0;
   let z = 0;
   walking = false;

   if (isPressed("W")) {
        z -= 10;
   }

   if (isPressed("A")) {
        x -= 10;
   }

   if (isPressed("S")) 
   {
        z += 10;
   }

   if (isPressed("D")) {
        x+= 10;
   }

   if(x != 0 || z != 0){
        walking = true;
        walk(x, z, delta);
   }

   if (isPressed("E")){
        //interact
   }
}


// ---------------------------------------------------
// Animation
// ---------------------------------------------------
let mouseX = 0;
let mouseY = 0;


let previousTime;

function animate(now) {

    requestAnimationFrame(animate);

    const delta = previousTime === undefined ? 0 : (now - previousTime) / 1000; 
    previousTime = now;

    controls.update(delta);

    handleKeys(delta);

    //update animation mixers
    for (const mixer of mixers) {
        mixer.update(delta);
    }

    //stop walking animation if not walking
    if(player && !walking){
        playerWalk.stop();
        playerIdle.play();
    }

    //update player mixer
    if (playerMixer) {
        playerMixer.update(delta);
    }

    renderer.render(scene, camera);
}

animate();


function getMousePosition(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// ---------------------------------------------------
// Resize
// ---------------------------------------------------
{
window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
}

function finishLoading(){
    document.getElementById("loadingScreen").style.visibility = "hidden";
}

function walk(x, z, delta){
    if(!position){
        return;
    }
    position.x += x * delta;
    position.z += z * delta;

    //set rotation
    if (x !== 0 || z !== 0) {
        player.rotation.y = -Math.atan2(z, x) + Math.PI / 2;
    }

    //animate
    playerIdle.stop();
    playerWalk.play();

    //check for bounds

    //check for collision

    player.position.copy(position);
}