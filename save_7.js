// --------------------------------------------- IMPORT MODULES -----------------------------------------------
//import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
//import { CSG } from '../utils/CSGMesh'
//import { CSG } from 'https://cdn.jsdelivr.net/gh/Sean-Bradley/THREE-CSGMesh@master/dist/client/CSGMesh.js';
//import { CSG } from './three-csgmesh'
import { CSG } from 'three-csgmesh/dist/client/CSGMesh'














// -------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ INITIALIZE -------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------




// --------------------------------------------- GUI  -----------------------------------------------
var gui;
const parameters = {
  toolheadSize: 1
}


gui = new GUI;
gui.add(parameters, 'toolheadSize', 1, 10 , 1);
    


    
// --------------------------------------------- PARAMETERS -----------------------------------------------

var x_size = 60;
var y_size = 60;
var z_size = 60;

var toolhead_speed = 0.1;

var toolhead_size = parameters.toolheadSize;


var voxel_list = [];





// --------------------------------------------- VOXEL PARAMETERS -----------------------------------------------


// voxel geometry
const voxel_geometry = new THREE.BoxGeometry( 1, 1, 1 );
 
// transparent voxel material
var transparent_material_voxel = new THREE.MeshBasicMaterial( { color: "rgb(111, 151, 216)", wireframe: false, transparent: true, opacity: 0.5} );
var transparent_material_yellow_voxel = new THREE.MeshBasicMaterial( { color: "rgb(150, 150, 0)", wireframe: false, transparent: true, opacity: 0.5} );

// wireframe voxel material
var wireframe_material_voxel = new THREE.MeshBasicMaterial( { color: "rgb(25, 76, 111)", wireframe: true, } );



// --------------------------------------------- RENDERER + CAMERA -----------------------------------------------

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 700 );
camera.position.set( -10, -20, 25 );
camera.lookAt(new THREE.Vector3(0, 0, 0));




camera.up.set(0, 0, 1);   // <=== spin around Z-axis






// --------------------------------------------- SCENE -----------------------------------------------


const scene = new THREE.Scene();

const color = new THREE.Color("rgb(255, 255, 255)");
scene.background = color;




// --------------------------------------------- LIGHT -----------------------------------------------

/*
var ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight( 0xffffff, 3);
directionalLight.position.set(2,5,5);
directionalLight.target.position.set(-1,-1,0);
scene.add( directionalLight );
scene.add(directionalLight.target);
*/

// --------------------------------------------- TOOLHEAD ----------------------------------------------- 


var toolhead_list = [];

// toolhead material
const toolhead_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });



var toolhead_center = new THREE.Vector3(0.5,0.5,0.5);




create_toolhead();






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































// -------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ CONTROLS  -------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------




// -------------------------------------------- MOUSE CONTROL --------------------------------------------
var control = new OrbitControls( camera, renderer.domElement );



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










// ----------------------------------------- TOOLHEAD CONTROLS -----------------------------------------

var key87 = false;
var key83 = false;
var key65 = false;
var key68 = false;
var key38 = false;
var key40 = false;
var key32 = false;
var key16 = false;



// onKeyDown function
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
    if (keyCode == 38) {
        key38 = true;
    }  
    
    // Q low
    if (keyCode == 40) {
        key40 = true;
    }  
    
    // SPACE PAINT
    if (keyCode == 32) {
        key32 = true;
    }

    // SHIFT ERASE
    if (keyCode == 16) {
        key16 = true;
    }


};





// onKeyUp function
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
    if (keyCode == 38) {
        key38 = false;
    }  
    
    // Q low
    if (keyCode == 40) {
        key40 = false;
    }  
    
    // SPACE PAINT
    if (keyCode == 32) {
        key32 = false;
    }

    // SPACE PAINT
    if (keyCode == 16) {
        key16 = false;
    }
  

    //renderer.render( scene, camera );
};


var movement_x = 0;
var movement_y = 0;
var movement_z = 0;










// calculate the resulting movement from all buttons that are pressed and applying it on the toolhead
function update_toolhead() {

    //console.log("update_toolhead");

    movement_x = 0;
    movement_y = 0;
    movement_z = 0;

 
    //console.log(key32);

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

    if (key38 == true) {
        movement_z += toolhead_speed;
    }      

    if (key40 == true) {
        movement_z -= toolhead_speed;
    }  



    // create empty variables for adding up the sum of coordinates
    var sum_of_points_x = 0;
    var sum_of_points_y = 0;
    var sum_of_points_z = 0;

    //console.log(sum_of_points_x);


    for (let i = 0; i < toolhead_list.length; i++) {

        // TOOLHEAD KOORDINATEN WERDEN GEÄNDERT
        toolhead_list[i].position.x += movement_x;
        toolhead_list[i].position.y += movement_y;
        toolhead_list[i].position.z += movement_z;


        // adding up the sum of coordinates
        sum_of_points_x += toolhead_list[i].position.x;
        sum_of_points_y += toolhead_list[i].position.y;
        sum_of_points_z += toolhead_list[i].position.z;

    }



    // calculating the average coordinates
    var average_of_points_x = sum_of_points_x / (toolhead_size**3 );
    var average_of_points_y = sum_of_points_y / (toolhead_size**3 );
    var average_of_points_z = sum_of_points_z / (toolhead_size**3 );

    // refreshing the toolhead center
    toolhead_center.x = average_of_points_x
    toolhead_center.y = average_of_points_y
    toolhead_center.z = average_of_points_z


    //console.log(toolhead_center);






    //console.log(toolhead_size);
    //console.log(sum_of_points_x);


    //console.log( sum_of_points_x / (toolhead_size * toolhead_size * toolhead_size) );
    //console.log( sum_of_points_y / (toolhead_size * toolhead_size * toolhead_size) );
    //console.log( sum_of_points_z / (toolhead_size * toolhead_size * toolhead_size) );
    

/*
    toolhead_center.x = sum_of_points_x / (toolhead_size * toolhead_size * toolhead_size) ;
    toolhead_center.y = sum_of_points_y / (toolhead_size * toolhead_size * toolhead_size) ;
    toolhead_center.z = sum_of_points_z / (toolhead_size * toolhead_size * toolhead_size) ;
*/
    //console.log(toolhead_center);



    /*
    toolhead.position.x += movement_x;
    toolhead.position.y += movement_y;
    toolhead.position.z += movement_z;
    */


}









































// -------------------------------------------------------------------------------------------------------------
// ------------------------------------------------ FUNCTIONS -------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------






// --------------------------------------------- PAINT FUNCTION ----------------------------------------------- 

function paint() {



    // function should only be executed when the painting button is pressed
    if( key32 == true ) {




        // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen 
        
        for (let i = 0; i < toolhead_list.length; i++) {
            
            


            const var_x = Math.floor(toolhead_list[i].position.x)
            const var_y = Math.floor(toolhead_list[i].position.y)
            const var_z = Math.floor(toolhead_list[i].position.z)


            // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
            if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){



                if (   voxel_grid [var_x] [var_y] [var_z]  == 0  ) {

                    //console.log( voxel_grid[Math.floor ( toolhead.position.x ) ][ Math.floor(toolhead.position.y)]  );
                    //console.log("000")

                    // den wert im voxel grid auf 1 setzent


                    voxel_grid[var_x][var_y][var_z] = 1



                    //console.log("voxel created");


                    
                    
                    // old way to create voxels
                    const voxel_cube = new THREE.Mesh( voxel_geometry, transparent_material_voxel ); 
                    //const voxel_cube2 = new THREE.Mesh( voxel_geometry, wireframe_material_voxel );


                    voxel_cube.position.set( var_x + 0.5 , var_y + 0.5, var_z + 0.5);
                    //voxel_cube2.position.set( var_x + 0.5, var_y + 0.5 , var_z + 0.5);

                    voxel_list.push(voxel_cube);

                    scene.add( voxel_cube );
                    //scene.add( voxel_cube2 );

                    console.log("voxel created");
                        
                        
                    





        
                

                }
                

            }


        }

    }

}






// --------------------------------------------- ERASE FUNCTION ----------------------------------------------- 


function erase(){



    // es wird nur etwas ausgeführt wenn der löschen key gedrückt wird
    if (key16 == true) {



        // durch die toolhead liste durch iterieren um an jeder position einen voxel zu erstellen       
        for (let i = 0; i < toolhead_list.length; i++) {
                    
            // alle koordinaten werden gerundet   
            const var_x = Math.floor(toolhead_list[i].position.x)
            const var_y = Math.floor(toolhead_list[i].position.y)
            const var_z = Math.floor(toolhead_list[i].position.z)


            // checken ob die coordinaten innerhalb des workspaces liegen. wenn nicht, wird nichts gemacht.
            if (var_x >= 0 && var_y >= 0 && var_z >= 0 && var_x < x_size && var_y < y_size && var_z < z_size){


                // jetzt wird geschaut ob an der stelle im grid ein voxel ist
                if (   voxel_grid [var_x] [var_y] [var_z]  == 1  ) {

                    
                    //falls ja, wird der wert an dieser stelle wieder auf 1 gesetzt
                    voxel_grid[var_x][var_y][var_z] = 0


                    
                    //console.log("voxel created");


                    console.log("voxel erased");
                        
                        
                    
                    



                

                }
                

            }


        }


    }


}



  
// --------------------------------------------- BOOLEANUNION FUNCTION ----------------------------------------------- 





//var _csg1;
//var _csg2;


function booleanUnion(){

    if(voxel_list.length > 3){




        //csg_list = [];

        //var voxel_singles = voxel_list;
        //var voxel_unions = [];

        /*
        for ( let i = 0 ; i<voxel_list.length  ; i++ ){
            const cylinderCSG1 = CSG.fromMesh(voxel_list[i], i)
            csg_list.push(cylinderCSG1);
            console.log("csg created");

        }
        */


        var _csg1 = CSG.fromMesh(voxel_list[0], object_index);
        //csg_list.push(_csg1);
        //console.log("csg 1 created");
        object_index += 1;

        var _csg2 = CSG.fromMesh(voxel_list[1],object_index);
        //csg_list.push(_csg2);
        //console.log("csg 2 created");
        object_index += 1;

        var _csg3 = CSG.fromMesh(voxel_list[2], object_index);
        //csg_list.push(_csg2);
        //console.log("csg 2 created");
        object_index += 1;

        var _csg4 = CSG.fromMesh(voxel_list[3], object_index);
        //csg_list.push(_csg2);
        //console.log("csg 2 created");
        object_index += 1;


        //var _csg2 = CSG.fromMesh

        //console.log(object_index);


    

        if(boolean_list.length>0){
            var unionCSG1 = csg_list[0].union(_csg1.union(_csg2.union(_csg3)));
            //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
            var unionMesh1 = CSG.toMesh(
                unionCSG1,
                new THREE.Matrix4(),
                transparent_material_yellow_voxel,
            )
        
            removeObject( boolean_list[0]);

            boolean_list = [];
            //console.log("length of boolean list : " + boolean_list.length);

            
            //removeObject( boolean_list[1]);
            

            boolean_list.push(unionMesh1);
            scene.add(unionMesh1);


            csg_list = [];
            csg_list.push(unionCSG1);


        }



        else{
            var unionCSG2 = _csg1.union(_csg2.union(_csg3));
        //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
        var unionMesh2 = CSG.toMesh(
            unionCSG2,
            new THREE.Matrix4(),
            transparent_material_yellow_voxel,
        )

        csg_list.push(unionCSG2);
        boolean_list.push(unionMesh2);
        scene.add(unionMesh2);

        }
        
         
        /*
        unionMesh.material = [
            transparent_material_yellow_voxel,
        ]
        */


        //unionMesh.position.set(toolhead_list[0].position);
        //unionMesh.position.set(-1,-1,0);
        //console.log(toolhead_list[0].position);


        
        // remove all voxels from scene
        for ( let i = 0 ; i<voxel_list.length-1  ; i++ ){
            removeObject( voxel_list[i]);
            console.log("voxel removed");
            
        }
        voxel_list = voxel_list.slice(-1);



        // empty the voxel_list
        //voxel_list = [];

        //voxel_list.push(unionMesh);
        

        console.log("length of boolean list : " + boolean_list.length);

        
            


        /*
        for ( let i = 0 ; i<csg_list.length  ; i++ ){
            const unionCSG = csg_list[i].union(csg_list[i+1]

        }
        */




        /*
        const cylinderCSG1 = CSG.fromMesh(cylinderMesh1, 2)
        const cylinderCSG2 = CSG.fromMesh(cylinderMesh2, 3)
        const cylinderCSG3 = CSG.fromMesh(cylinderMesh3, 4)
        const cylindersUnionCSG = cylinderCSG1.union(
            cylinderCSG2.union(cylinderCSG3)
        )

        const cylindersUnionMesh = CSG.toMesh(
            cylindersUnionCSG,
            new THREE.Matrix4()
        )
        cylindersUnionMesh.material = [
            cylinderMesh1.material,
            cylinderMesh2.material,
            cylinderMesh3.material,
        ]
        cylindersUnionMesh.position.set(2.5, 0, -3)
        scene.add(cylindersUnionMesh)
        */




        /*
        for ( let i = 0 ; i<voxel_singles.length -1 ; i+2 ){

        

            var voxel_union = voxel_singles[i].union(voxel_singles[i+1]);
            voxel_unions.push(voxel_union);

        }


        for ( let i = 0 ; i<voxel_unions.length  ; i++ ){
            const union_mesh = new THREE.Mesh( voxel_unions[i], transparent_material_voxel );
            scene.add(union_mesh);

        }
    
        //voxel_single = voxel_union;
        //var voxel_union = [];
        */

    }



}





function booleanUnion2(){






    // boolean union should only be executed when there is at least 1 new voxel
    if(voxel_list.length > 1){



        voxel_list[0].updateMatrix();
        var _csg1 = CSG.fromMesh(voxel_list[0], object_index);
        //csg_list.push(_csg1);
        //console.log("csg 1 created");
        object_index += 1;

        voxel_list[1].updateMatrix();
        var _csg2 = CSG.fromMesh(voxel_list[1],object_index);
        //csg_list.push(_csg2);
        //console.log("csg 2 created");
        object_index += 1;


    


        // condition for when we already have a boolean mesh
        if(boolean_list.length>0){
            var unionCSG1 = csg_list[0].union(_csg1.union(_csg2));
            //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
            var unionMesh1 = CSG.toMesh(
                unionCSG1,
                new THREE.Matrix4(),
                transparent_material_yellow_voxel,
            )
        
            // remove old mesh from scene
            removeObject( boolean_list[0]);
            // add new mesh into scene
            scene.add(unionMesh1);

            // remove old mesh from boolean list
            boolean_list = [];
            // add new mesh in the boolean list
            boolean_list.push(unionMesh1);
            //console.log("length of boolean list : " + boolean_list.length);
            

            // remove csg object from csg list
            csg_list = [];
            // ut new csg object into list
            csg_list.push(unionCSG1);


        }




        // condition for the first boolean mesh
        else {
            var unionCSG2 = _csg1.union(_csg2);
            //const unionMesh = CSG.toMesh(unionCSG, transparent_material_voxel);
            var unionMesh2 = CSG.toMesh(
                unionCSG2,
                new THREE.Matrix4(),
                transparent_material_yellow_voxel,
            );


            // put first boolean mesh into boolean list
            boolean_list.push(unionMesh2);

            // put first boolean mesh into scene
            scene.add(unionMesh2);

            // put first csg object into csg list
            csg_list.push(unionCSG2);

       

        }
        
         
        

        // remove all voxels from scene
        for ( let i = 0 ; i<voxel_list.length  ; i++ ){
            removeObject( voxel_list[i]);
            console.log("voxel removed");
            
        }
        //voxel_list = voxel_list.slice(-1);
        voxel_list = [];
        

        console.log("length of boolean list : " + boolean_list.length);






    }



}






var object_index = 0;
var csg_list = [];
var boolean_list = [];
var csg_voxel_list = [];
var safety_num = 0;
var csg_union_list = [];
var boolean_mesh_list = [];
var safety_num_limit = 1000;






function booleanUnion3(){



    safety_num = 0;


    // boolean union should only be executed when there is at least 1 new voxel
    if(voxel_list.length > 0){


        //consition for if there is no boolean mesh yet
        if (boolean_mesh_list.length == 0){



            // we have to unite all the voxels that were created in the last iteration (the ones in the voxel list)
            // fist we transform all new voxels into csg objects
            for ( let i = 0 ; i<voxel_list.length  ; i++ ){

                voxel_list[i].updateMatrix();
                var _csg = CSG.fromMesh(voxel_list[i], object_index);
                object_index += 1;
                csg_voxel_list.push(_csg);

            }



            // after we copied all the voxels into csg objects we can clean the voxel_list      
            // remove all voxels from scene
            for ( let i = 0 ; i < voxel_list.length  ; i++ ){
                removeObject( voxel_list[i]);
                console.log("voxel removed");
            
            }
            // clean the voxel list
            voxel_list = [];
            
            



            // if we have only 1 voxel created this one should be the new boolean geometry
            if (csg_voxel_list.length == 1){
                var unionMesh = CSG.toMesh(
                    csg_voxel_list[0],
                    new THREE.Matrix4(),
                    transparent_material_yellow_voxel,
                    
                );

                console.log("csg_voxel_list.length == 1");
                boolean_mesh_list.push(unionMesh);
                // append the new single csg voxel union mesh into the union_mesh_list
                csg_union_list.push(csg_voxel_list[0]);
                scene.add(unionMesh);

            }




            // if there are multiple voxels created they should be united
            else{


                // connect the first two voxels to the first union
                var csg_union = csg_voxel_list[0].union(csg_voxel_list[1]);
                // removing the first two objects from the csg list
                csg_voxel_list = csg_voxel_list.slice(2);
                csg_union_list.push(csg_union);



                // now we can unite all csg objects
                while(safety_num < safety_num_limit && csg_voxel_list.length > 0){

                    // adding 1 to the safety number
                    safety_num += 1;

                    // union the 
                    var csg_union = csg_union_list[0].union(csg_voxel_list[0]);
                    // removing the first object from the csg list
                    csg_voxel_list = csg_voxel_list.slice(1);

                    //clean the csg_union_list 
                    csg_union_list = []
                    // append the new csg union into the csg_union_list
                    csg_union_list.push(csg_union);

                }


                // now all of the vopxels are united as a csg object in the csg_union_list
                // so we can now transform this one csg_object into a mesh 
                var unionMesh = CSG.toMesh(
                    csg_union_list[0],
                    new THREE.Matrix4(),
                    transparent_material_yellow_voxel,
                );
                // and put it into the boolean_mesh_list
                boolean_mesh_list.push(unionMesh);
                scene.add(unionMesh);

                
            }



        }


        

        //consition for if there already is a boolean mesh
        else{

        
            csg_voxel_list = [];


            // we have to unite all the voxels that were created in the last iteration (the ones in the voxel list)
            // fist we transform all new voxels into csg objects
            for ( let i = 0 ; i<voxel_list.length  ; i++ ){

                voxel_list[i].updateMatrix();
                var _csg = CSG.fromMesh(voxel_list[i], object_index);
                object_index += 1;
                csg_voxel_list.push(_csg);

            }



            // after we copied all the voxels into csg objects we can clean the voxel_list      
            // remove all voxels from scene
            for ( let i = 0 ; i < voxel_list.length  ; i++ ){
                removeObject( voxel_list[i]);
                console.log("voxel removed");
            
            }



            // clean the voxel list
            voxel_list = [];




            // if we have only 1 voxel created this one should be directly added to the union mesh
            if (csg_voxel_list.length == 1){
                

                var csg_union = csg_union_list[0].union(csg_voxel_list[0]);

                // clean the csg_union_list
                csg_union_list = [];
                // append the new csg_union into the csg_union list
                csg_union_list.push(csg_union);


                var unionMesh = CSG.toMesh(
                    csg_union,
                    new THREE.Matrix4(),
                    transparent_material_yellow_voxel,
                );


                // remove the old boolean mesh from scene
                removeObject( boolean_mesh_list[0]);
                // clean the boolean_mesh_list
                boolean_mesh_list = [];

                // append the new union mesh into the boolean mesh list
                boolean_mesh_list.push(unionMesh);
                // add the new union mesh to the scene
                scene.add(unionMesh);

            }




            // if there are multiple voxels created they should be united
            else{


                var old_csg_object = csg_union_list[0];

                //clean the csg_union_list
                csg_union_list = [];

                
                // connect the first two voxels to the first union
                var csg_union = csg_voxel_list[0].union(csg_voxel_list[1]);

                // removing the first two objects from the csg list
                csg_voxel_list = csg_voxel_list.slice(2);
                
                



                csg_union_list.push(csg_union);



                


                // now we can unite all csg objects
                while(safety_num < safety_num_limit && csg_voxel_list.length > 0){

                    // adding 1 to the safety number
                    safety_num += 1;

                    // union the 
                    var csg_union = csg_union_list[0].union(csg_voxel_list[0]);
                    // removing the first object from the csg list
                    csg_voxel_list = csg_voxel_list.slice(1);

                    //clean the csg_union_list 
                    csg_union_list = []
                    // append the new csg union into the csg_union_list
                    csg_union_list.push(csg_union);

                }


                // now all of the toolhead vopxels are united as a csg object in the csg_union_list
                // now we can unite the toolhead voxels with the boolean mesh
                var csg_union = csg_union_list[0].union(old_csg_object);


                // now we clean and set the right csg object into the csg_union_list
                //clean the csg_union_list 
                csg_union_list = []
                // append the new csg union into the csg_union_list
                csg_union_list.push(csg_union);



                // so we can now transform this one csg_object into a mesh 
                var unionMesh = CSG.toMesh(
                    csg_union_list[0],
                    new THREE.Matrix4(),
                    transparent_material_yellow_voxel,
                );


                // remove the old boolean mesh from scene
                removeObject( boolean_mesh_list[0]);
                // clean the boolean_mesh_list
                boolean_mesh_list = [];

                // append the new union mesh into the boolean mesh list
                boolean_mesh_list.push(unionMesh);
                // add the new union mesh to the scene
                scene.add(unionMesh);


                
            }



        }




        console.log("boolean_mesh_list.length is : " + boolean_mesh_list.length);
        console.log("csg_union_list.length is : " + csg_union_list.length);

    }



}





// --------------------------------------------- TOOLHEAD FUNCTIONS ----------------------------------------------- 




function create_toolhead(){


    toolhead_list = [];




    if (toolhead_size  == 1){

        // Toolhead geometry
        var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
        var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);

        //console.log(toolhead_center);

        toolhead.position.set(toolhead_center.x,toolhead_center.y, toolhead_center.z );


        //console.log(toolhead.position);


        scene.add(toolhead);

        toolhead_list.push(toolhead);



        //toolhead_center = toolhead.position;

    }



    else if (toolhead_size >= 2) {


        var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
        
        //toolhead_center = new THREE.Vector3(toolhead_size / 2,toolhead_size / 2,toolhead_size / 2 )

        for (let x = - toolhead_size / 2 ; x < toolhead_size / 2 ; x++){

            for (let y = -toolhead_size / 2; y < toolhead_size / 2 ; y++){

                for (let z = -toolhead_size / 2; z< toolhead_size / 2 ; z++){

                    var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                    toolhead.position.set( toolhead_center.x + x + 0.5   , toolhead_center.y + y + 0.5 , toolhead_center.z + z+ 0.5);
                    scene.add(toolhead);

                    toolhead_list.push(toolhead);

                    

                } 


            } 


        }
        
        
    }

    /*
    else if (toolhead_size == 2) {


        var toolhead_geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
        


        for (let x = -1; x <= 1 ; x++){

            for (let y = -1; y<= 1 ; y++){

                for (let z = -1; z<= 1 ; z++){

                    var toolhead = new THREE.Mesh(toolhead_geometry, toolhead_material);
                    toolhead.position.set(x,y,z);
                    scene.add(toolhead);

                    toolhead_list.push(toolhead);

                } 


            } 


        }
        
        
    }
    */


}







function remove_toolhead(){

    for (let i = 0; i < toolhead_list.length; i++) {


        removeObject( toolhead_list[i]);

    }

}







// --------------------------------------------- REMOVE OBJECT ----------------------------------------------- 






//  REMOVE OBJECTS AND CLEAN THE CACHES
function removeObject(sceneObject){
    if (!(sceneObject instanceof THREE.Object3D)) return;
  
  
    //Remove geometries to free GPU resources
    if (sceneObject.geometry) sceneObject.geometry.dispose();
  
    /*
    //Remove materials to free GPU resources
    if (sceneObject.material) {
        if (sceneObject.material instanceof Array) {
            sceneObject.material.forEach(material => material.dispose());
        } else {
            sceneObject.material.dispose();
        }
    }
    */
  
    //Remove object from scene
    sceneObject.removeFromParent()
};



































// -------------------------------------------------------------------------------------------------------------
// ------------------------------------------------  ANIMATE  -------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------

function animate() {

    

    requestAnimationFrame( animate );
  
    control.update();

    if (toolhead_size != parameters.toolheadSize){

        toolhead_size = parameters.toolheadSize;

        remove_toolhead();
        create_toolhead();

    }
  
    renderer.render( scene, camera );

    update_toolhead();

    paint();
    erase();
    booleanUnion3();

    

}





animate();
















// -------------------------------------------------------------------------------------------------------------
// ------------------------------------------------  NOTIZEN  -------------------------------------------------- 
// -------------------------------------------------------------------------------------------------------------

