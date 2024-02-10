// --------------------------------------------- IMPORT MODULES -----------------------------------------------
//import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';





// --------------------------------------------- PARAMETERS -----------------------------------------------

var x_size = 100;
var y_size = 100;
var z_size = 100;

var toolhead_speed = 0.1;


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

/*

// movement of Toolhead
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
   
    var keyCode = event.which;

    

    // single keys

        // W up
    if (keyCode == 87) {
        toolhead.position.y += 0.21;
    }  

        // S down
    if (keyCode == 83) {
        toolhead.position.y -= 0.21;
    }  

        // A left
    if (keyCode == 65) {
        toolhead.position.x -= 0.21;
    }  
    
        // D right
    if (keyCode == 68) {
        toolhead.position.x += 0.21;
    }  
    
        // E high
    if (keyCode == 69) {
        toolhead.position.z += 0.21;
    }  
    
        // Q low
    if (keyCode == 81) {
        toolhead.position.z -= 0.21;
    }  
    
        // SPACE reset
    if (keyCode == 32) {
        toolhead.position.x = 0.5;
        toolhead.position.y = 0.5;
        toolhead.position.z = 0.5;
    }


    // double Keys

  
    


    //renderer.render( scene, camera );
};

*/



var key87 = false;
var key83 = false;
var key65 = false;
var key68 = false;
var key69 = false;
var key81 = false;
var key32 = false;

// movement of Toolhead
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
   
    var keyCode = event.which;

    //console.log("check keydown");

    // single keys

        // W up
    if (keyCode == 87) {
        key87 = true;
        //console.log(key87);
    }  

        // S down
    if (keyCode == 83) {
        key83 = true;
    }  

        // A left
    if (keyCode == 65) {
        key65 = true;
    }  
    
        // D right
    if (keyCode == 68) {
        key68 = true;
    }  
    
        // E high
    if (keyCode == 69) {
        key69 = true;
    }  
    
        // Q low
    if (keyCode == 81) {
        key81 = true;
    }  
    
        // SPACE reset
    if (keyCode == 32) {
        key32 = true;
    }


};





// movement of Toolhead
document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
   
    var keyCode = event.which;

    //console.log("check keyup");

    // single keys

        // W up
    if (keyCode == 87) {
        key87 = false;
    }  

        // S down
    if (keyCode == 83) {
        key83 = false;
    }  

        // A left
    if (keyCode == 65) {
        key65 = false;
    }  
    
        // D right
    if (keyCode == 68) {
        key68 = false;
    }  
    
        // E high
    if (keyCode == 69) {
        key69 = false;
    }  
    
        // Q low
    if (keyCode == 81) {
        key81 = false;
    }  
    
        // SPACE reset
    if (keyCode == 32) {
        key32 = false;
    }
  

    //renderer.render( scene, camera );
};


var movement_x = 0;
var movement_y = 0;
var movement_z = 0;


function update_toolhead() {

    console.log("update_toolhead");

    movement_x = 0;
    movement_y = 0;
    movement_z = 0;

    if (key87 == true) {
        movement_y += toolhead_speed;
    }  
    
    if (key83 == true) {
        movement_y -= toolhead_speed;
    }  

    if (key65 == true) {
        movement_x -= toolhead_speed;
    }  
    
    if (key68 == true) {
        movement_x += toolhead_speed;
    }  

    if (key69 == true) {
        movement_z += toolhead_speed;
    }      

    if (key81 == true) {
        movement_z -= toolhead_speed;
    }  


    toolhead.position.x += movement_x;
    toolhead.position.y += movement_y;
    toolhead.position.z += movement_z;


}
// --------------------------------------------- AXES HELPER ----------------------------------------------- 


const axesHelper = new THREE.AxesHelper( 5 );


axesHelper.position.set(-5, -5 , 0);
scene.add( axesHelper );
// The X axis is red. The Y axis is green. The Z axis is blue.




// --------------------------------------------- HELPER LINES ----------------------------------------------- 

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );



for (let i = 0; i<= y_size; i++) {

    const points = [];
    points.push( new THREE.Vector3( 0, i, 0 ) );
    points.push( new THREE.Vector3( x_size, i, 0 ) ); 

    const buffer_geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( buffer_geometry, material );

    scene.add( line );
}


for (let i = 0; i<= x_size; i++) {

    const points = [];
    points.push( new THREE.Vector3( i, 0, 0 ) );
    points.push( new THREE.Vector3( i, y_size, 0 ) ); 

    const buffer_geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( buffer_geometry, material );

    scene.add( line );
}





// --------------------------------------------- VOXELS GRID ----------------------------------------------- 

const voxel_grid = [];

for (let x = 0; x< x_size; x++) {

    const x_list = [];

    for (let y = 0; y< y_size; y++) {

        const y_list = [];

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

        for (let z = 0; z< z_size; z++) {

            const voxel_value = 0;

            y_list.push(voxel_value);


        }

        x_list.push(y_list);

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

    update_toolhead();

    paint();

    

}





animate();











// --------------------------------------------- FUNCTIONS ----------------------------------------------- 



function paint() {

    const var_x = Math.floor(toolhead.position.x)
    const var_y = Math.floor(toolhead.position.y)
    const var_z = Math.floor(toolhead.position.z)



    if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



        if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {

            //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
            //console.log("000")

            // den wert im voxel grid auf 1 setzent


            voxel_grid[var_x][var_y][var_z] = 1



            //console.log("voxel created");



            // eine voxel geometrie erstellen

            const voxel_geometry = new THREE.BoxGeometry( 1, 1, 1 );
            //const voxel_wireframe = new THREE.WireframeGeometry (voxel_geometry); 

            var transparent_material = new THREE.MeshBasicMaterial( { color: "rgb(111, 151, 216)", wireframe: false, transparent: true, opacity: 0.5} );
            //outline_material.opacity = 0.5;
            var outline_material = new THREE.MeshBasicMaterial( { color: "rgb(25, 76, 111)", wireframe: true, } );

            
            const voxel_cube = new THREE.Mesh( voxel_geometry, transparent_material ); 
            const voxel_cube2 = new THREE.Mesh( voxel_geometry, outline_material ); 
            voxel_cube.position.set( Math.floor(toolhead.position.x) + 0.5 , Math.floor(toolhead.position.y) + 0.5, Math.floor(toolhead.position.z) + 0.5);
            voxel_cube2.position.set( Math.floor(toolhead.position.x) + 0.5, Math.floor(toolhead.position.y) + 0.5 , Math.floor(toolhead.position.z) + 0.5);
            scene.add( voxel_cube );
            scene.add( voxel_cube2 );
                
                
            
            



        

        }
        //console.log(toolhead.position);


    }


}