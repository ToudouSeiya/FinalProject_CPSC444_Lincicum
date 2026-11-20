//Morgan Lincicum
//Project 1

document.onmousemove = getMousePosition;

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
let mixer;
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
// Floor
// ---------------------------------------------------
const xBound = 20;
const zBound = 20;

loader.load('models/tavern2.glb', function(gltf) {
    const tavern = gltf.scene;
    tavern.position.set(0, 0, 0);
    tavern.scale.set(2, 2, 2);
    scene.add(tavern);
    objects.push(tavern);
});


// ---------------------------------------------------
// Shapes
// ---------------------------------------------------


// ---------------------------------------------------
// Animal Models
// ---------------------------------------------------
let player;
loader.load('models/deer.glb', function(gltf) {
    player = gltf.scene;
    player.position.set(-10, 2, 10);
    player.scale.set(5, 5, 5);
    scene.add(player);
    objects.push(player);
});

loader.load('models/puma.glb', function(gltf) {
    const puma = gltf.scene;
    puma.position.set(-15, 2, 15);
    puma.scale.set(5, 5, 5);
    scene.add(puma);
    objects.push(puma);
});

loader.load('models/coyote.glb', function(gltf) {
    const coyote = gltf.scene;
    coyote.position.set(-15, 2, 15);
    coyote.scale.set(5, 5, 5);
    scene.add(coyote);
    objects.push(coyote);
});

loader.load('models/bison.glb', function(gltf) {
    const bison = gltf.scene;
    bison.position.set(-15, 2, 15);
    bison.scale.set(0.025, 0.025, 0.025);
    scene.add(bison);
    objects.push(bison);
});

//----------------------------------------------------------------------------
// Scene
//----------------------------------------------------------------------------

let sceneObjects = [];



//----------------------------------------------------------------------------
// Keyboard Event Functions
//----------------------------------------------------------------------------

//This array will hold the pressed or unpressed state of every key
var currentlyPressedKeys = [];

//Store current state of shift key
var shift;

document.onkeydown = function handleKeyDown(event) {
   currentlyPressedKeys[event.keyCode] = true;
   shift = event.shiftKey;

   //Get unshifted key character
   var c = event.keyCode;
   var key = String.fromCharCode(c);

	//Place key down detection code here
}

document.onkeyup = function handleKeyUp(event) {
   currentlyPressedKeys[event.keyCode] = false;
   shift = event.shiftKey;
   
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

   if (!shift && isPressed("W")) 
   {
    //   if(position[2] <= zBound && position[2] >= (-1 * zBound)){
    //     position[2]-=12 * delta;
    //     if (position[2] < -zBound){
    //         position[2] = -zBound;
    //     }
    //   }
    //   updateChar(position, animation);
    //   //check for collision
    //   let colliding = false;
    //   sceneObjects.forEach( obj => {
    //     if(isColliding(char, obj)) {
    //         colliding = true;
    //     }
    //   })
    //   if(colliding){
    //     position[2] += 12 * delta;
    //   }
    //   direction = 0;
    //   walking = true;
   }

   if (!shift && isPressed("A")) 
  {
//        if(position[0] <= xBound && position[0] > (-1 * xBound)){
//         position[0]-=12 * delta;
//         if (position[0] < -xBound){
//             position[0] = -xBound;
//         }
//       }
//       updateChar(position, animation);
//       //check for collision
//       let colliding = false;
//       sceneObjects.forEach( obj => {
//         if(isColliding(char, obj)) {
//             colliding = true;
//         }
//       })
//       if(colliding){
//         position[0] += 12 * delta;
//       }
//       direction = 1;
//       walking = true;
   }

   if (!shift && isPressed("S")) 
   {
    //    if(position[2] < zBound && position[2] >= (-1 * zBound)){
    //     position[2]+=12 * delta;
    //     if (position[2] > zBound){
    //         position[2] = zBound;
    //     }
    //   }
    //   updateChar(position, animation);
    //    //check for collision
    //   let colliding = false;
    //   sceneObjects.forEach( obj => {
    //     if(isColliding(char, obj)) {
    //         colliding = true;
    //     }
    //   })
    //   if(colliding){
    //     position[2] -= 12 * delta;
    //   }
    //   direction = 2;
    //   walking = true;
   }

   if (!shift && isPressed("D")) 
   {
    //     if(position[0] < xBound && position[0] >= (-1 * xBound)){
    //     position[0]+=12 * delta;
    //     if (position[0] > xBound){
    //         position[0] = xBound;
    //     }
    //   }
    //   updateChar(position, animation);
    //    //check for collision
    //   let colliding = false;
    //   sceneObjects.forEach( obj => {
    //     if(isColliding(char, obj)) {
    //         colliding = true;
    //     }
    //   })
    //   if(colliding){
    //     position[0] -= 12 * delta;
    //   }
    //   direction = 3;
    //   walking = true;
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

    renderer.render(scene, camera);
}

animate();


function getMousePosition(event){
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// function isColliding(obj1, obj2){
//     let obj1Bounds = new THREE.Box3();
//     obj1Bounds.setFromObject(obj1);

//     let obj2Bounds = new THREE.Box3();
//     obj2Bounds.setFromObject(obj2);

//     let isColliding = obj1Bounds.intersectsBox(obj2Bounds);

//     return isColliding;
// }


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