//Morgan Lincicum
//Project 1

document.onmousemove = getMousePosition;

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
let mixers = [];
let playerMixer;

// ---------------------------------------------------
// Scene
// ---------------------------------------------------

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x99ccff);

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
    0xFFDD00, 1, Math.PI/6
);
dirLight.position.set(-50, 50, 50);
scene.add(dirLight);



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
    finishLoading();
});

let backroom;
loader.load('models/tavern.glb', function(gltf) {
    backroom = gltf.scene;
    backroom.position.set(38.5, 10, -20);
    backroom.scale.set(4, 4, 4);
    backroom.rotation.y = Math.PI * 2 / 2;
    scene.add(backroom);
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

loader.load('models/deer.glb', function(gltf) {
    const deer = gltf.scene;
    deer.position.set(-19, 0.1, -12);
    deer.rotation.y = Math.PI / 3;
    deer.scale.set(6, 6, 6);
    scene.add(deer);
    patron = deer;

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
});

loader.load('models/puma.glb', function(gltf) {
    const puma = gltf.scene;
    puma.scale.set(5, 5, 5);
    //puma.rotation.y = Math.PI * 3 / 2; 
    puma.position.set(40, 8, 3);
   
    scene.add(puma);
    king = puma;

    //animation
    mixers.push(new THREE.AnimationMixer(gltf.scene));
    const action = mixers[mixers.length - 1].clipAction(gltf.animations[3]);
    action.play();

    puma.visible = false;
});

loader.load('models/coyote.glb', function(gltf) {
    const coyote = gltf.scene;
    coyote.position.set(-3, 0.1, 22);
    coyote.rotation.y = Math.PI;
    coyote.scale.set(5, 5, 5);
    scene.add(coyote);
    player = coyote;

    //animation
    playerMixer = new THREE.AnimationMixer(gltf.scene);
    const action = playerMixer.clipAction(gltf.animations[0]);
    action.play();
});

loader.load('models/bison.glb', function(gltf) {
    const bison = gltf.scene;
    bison.position.set(8, 0.2, 4);
    bison.rotation.y = Math.PI * 3 / 2 * 1.23;
    bison.scale.set(0.035, 0.035, 0.035);
    scene.add(bison);
    bartender = bison;

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

   if (isPressed("W")) 
   {
   }

   if (isPressed("A")) 
  {
   }

   if (isPressed("S")) 
   {
   }

   if (isPressed("D")) 
   {
   }

   if (isPressed("E")){

   }
}


// ---------------------------------------------------
// Animation
// ---------------------------------------------------
let position = [0, 2, 0];
let animation = 0;
let mouseX = 0;
let mouseY = 0;
let walking = false;


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