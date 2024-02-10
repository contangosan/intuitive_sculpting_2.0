// --------------------------------------------- IMPORT MODULES -----------------------------------------------
//import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';













// --------------------------------------------- RENDERER + CAMERA -----------------------------------------------

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( -20, -20, 30 );
camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.up.set(0, 0, 1);   // <=== spin around Z-axis






// --------------------------------------------- SCENE -----------------------------------------------


const scene = new THREE.Scene();

const color = new THREE.Color("rgb(255, 255, 255)");
scene.background = color;






// --------------------------------------------- CONTROLS ----------------------------------------------- 

//CREATE MOUSE CONTROL
var control = new OrbitControls( camera, renderer.domElement );





// Toolhead
const toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
const toolhead_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
toolhead.position.set(0.5,0.5,0.5);
scene.add(toolhead);



// movement if Toolhead
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
        // up
    if (keyCode == 87) {
        toolhead.position.y += 0.21;
        // down
    } else if (keyCode == 83) {
        toolhead.position.y -= 0.21;
        // left
    } else if (keyCode == 65) {
        toolhead.position.x -= 0.21;
        // right
    } else if (keyCode == 68) {
        toolhead.position.x += 0.21;
        // space
    } else if (keyCode == 32) {
        toolhead.position.x = 0.0;
        toolhead.position.y = 0.0;
    }
    //renderer.render( scene, camera );
};





// --------------------------------------------- AXES HELPER ----------------------------------------------- 


const axesHelper = new THREE.AxesHelper( 5 );


axesHelper.position.set(-5, -5 , 0);
scene.add( axesHelper );
// The X axis is red. The Y axis is green. The Z axis is blue.




// --------------------------------------------- HELPER LINES ----------------------------------------------- 

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );



for (let i = 0; i<= 20; i++) {

    const points = [];
    points.push( new THREE.Vector3( 0, i, 0 ) );
    points.push( new THREE.Vector3( 20, i, 0 ) ); 

    const buffer_geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( buffer_geometry, material );

    scene.add( line );
}


for (let i = 0; i<= 20; i++) {

    const points = [];
    points.push( new THREE.Vector3( i, 0, 0 ) );
    points.push( new THREE.Vector3( i, 20, 0 ) ); 

    const buffer_geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( buffer_geometry, material );

    scene.add( line );
}




// --------------------------------------------- VOXELS GRID ----------------------------------------------- 

const voxel_grid = [];

for (let x = 0; x< 20; x++) {

    const x_list = [];

    for (let y = 0; y< 20; y++) {

        const voxel_value = 0;

        /*
        const voxel_geometry = new THREE.BoxGeometry( 1, 1, 1 );
        //const voxel_wireframe = new THREE.WireframeGeometry ( voxel_geometry); 

        var transparent_material = new THREE.MeshBasicMaterial( { color: "rgb(111, 151, 216)", wireframe: false, transparent: true, opacity: 0.5} );
        //outline_material.opacity = 0.5;
        var outline_material = new THREE.MeshBasicMaterial( { color: "rgb(25, 76, 111)", wireframe: true, } );

        const voxel_cube = new THREE.Mesh( voxel_geometry, transparent_material ); 
        const voxel_cube2 = new THREE.Mesh( voxel_geometry, outline_material ); 
        voxel_cube.position.set( x+ 0.5, y + 0.5 , 0 + 0.5);
        voxel_cube2.position.set( x+ 0.5, y + 0.5 , 0 + 0.5);
        scene.add( voxel_cube );
        scene.add( voxel_cube2 );
        */

        x_list.push(voxel_value);
    }

    voxel_grid.push(x_list);

}

/*
document.onkeydown = function (e) {


    if (e.keydown == 68){

        console.log("arrowup");
    }
    console.log(e);

}
*/







// --------------------------------------------- ANIMATE ----------------------------------------------- 

function animate() {

    requestAnimationFrame( animate );
  
    control.update();
  
    renderer.render( scene, camera );

    paint();

}





animate();











// --------------------------------------------- FUNCTIONS ----------------------------------------------- 



function paint() {

    

    if (   voxel_grid [Math.floor(toolhead.position.x)] [Math.floor(toolhead.position.y)]  == 0  ) {

        //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
        //console.log("000")

        // den wert im voxel grid auf 1 setzen
        voxel_grid[Math.floor(toolhead.position.x)][Math.floor(toolhead.position.y)] = 1



        console.log("voxel created");



        // eine voxel geometrie erstellen

        const voxel_geometry = new THREE.BoxGeometry( 1, 1, 1 );
        //const voxel_wireframe = new THREE.WireframeGeometry ( voxel_geometry); 

        var transparent_material = new THREE.MeshBasicMaterial( { color: "rgb(111, 151, 216)", wireframe: false, transparent: true, opacity: 0.5} );
        //outline_material.opacity = 0.5;
        var outline_material = new THREE.MeshBasicMaterial( { color: "rgb(25, 76, 111)", wireframe: true, } );

        
        const voxel_cube = new THREE.Mesh( voxel_geometry, transparent_material ); 
        const voxel_cube2 = new THREE.Mesh( voxel_geometry, outline_material ); 
        voxel_cube.position.set( Math.floor(toolhead.position.x) + 0.5 , Math.floor(toolhead.position.y) + 0.5, 0 + 0.5);
        voxel_cube2.position.set( Math.floor(toolhead.position.x) + 0.5, Math.floor(toolhead.position.y) + 0.5 , 0 + 0.5);
        scene.add( voxel_cube );
        scene.add( voxel_cube2 );
        


    }
    //console.log(toolhead.position);

}