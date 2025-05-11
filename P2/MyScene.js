
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import  Stats from '../libs/stats.module.js'

// Clases de mi proyecto

import { Suelo } from './MODELS/Suelo.js'
import { GameBoard } from './MODELS/GameBoard.js'
import { Hormiga } from './MODELS/Hormiga/Hormiga.js'
import { Saltamontes } from './MODELS/Saltamontes/Saltamontes.js'


class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    this.renderer = this.createRenderer(myCanvas);
    this.gui = this.createGUI ();
    this.initStats();
    this.createLights ();
    this.createCamera ();
    
    // Construimos los distinos elementos que tendremos en la escena
    this.axis = new THREE.AxesHelper (2);
    this.axis.position.set(0,0,0);
    this.add (this.axis);

    // Orientación inicial del juego es de +z a -z, que será primero turno de "blancas"
    // Creamos el tablero y el suelo que se colocarán uno encima de otro y justo debajo de los ejes (las piezas
    // se tendrán que mover con un valor de y = 0 siempre y cuando estén justo por encima del eje)
    this.gameBoard = new GameBoard();
    this.add (this.gameBoard);

    this.suelo = new Suelo();
    this.add (this.suelo);

    // Elementos para el raycasting
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.gameStarted = false;    // Indica que ha empezado la partida
    this.canPick = false;        // Permite hacer el pick
    this.objectSelected = false; // Para detectar cuando hay una pieza elegida
  }

  // Función que llamará y hará lo necesario en la creación de una partida
  newGame(){
    this.gameBoard.unselectPiece(); // Quitamos pieza del pick por si había
    this.gameBoard.startGame();
    // Establecemos la cámara a la posición inicial
    this.camera.position.set(this.whiteCameraPosition.x, this.whiteCameraPosition.y, this.whiteCameraPosition.z);
    this.gameStarted = true; // Establecemos las variables iniciales
    this.canPick = false;
    this.objectSelected = false;
  }


  onMouseClick(MouseEvent) {
    if (this.gameStarted)
    {
      if (this.canPick) {
        this.mouse.x = (MouseEvent.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(MouseEvent.clientY / window.innerHeight) * 2 + 1;

        // Actualizamos el raycaster con la posición del ratón y la cámara
        this.raycaster.setFromCamera(this.mouse, this.camera);

        let intersects = this.raycaster.intersectObjects(this.gameBoard.turnColor.children);
        let tile_intersects;

        this.gameBoard.unselectPiece();
        if (this.objectSelected && intersects.length === 0) {
          // En caso de que no se haga select de otro object
          tile_intersects = this.raycaster.intersectObjects(this.gameBoard.ableMovements,);
          this.objectSelected = false;
          if (tile_intersects.length > 0) {
            let tile = tile_intersects[0].object;
            let pos ={"pos" : tile.position, "row" : tile.row, "col" : tile.col};
            this.gameBoard.makeMovement(pos);
          }
        }
        else {
          if (intersects.length > 0) {
            let object = intersects[0].object;
            this.gameBoard.selectPiece(object);
            this.objectSelected = true;
          }
        }
      }
      else{
        this.canPick = true;
      }
    }
  }




  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano


    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);

    // Definimos las posiciones fijas (por ahora) de la cámara, la inicial será la de blancas
    this.whiteCameraPosition = new THREE.Vector3 (0, 1, 1.3);
    this.blackCameraPosition = new THREE.Vector3 (0, 1, -1.3);
    this.lookPoint = new THREE.Vector3 (0, 0, 0);

    this.camera.position.set (this.whiteCameraPosition.x, this.whiteCameraPosition.y, this.whiteCameraPosition.z);
    this.camera.lookAt(this.lookPoint);
    this.add (this.camera);

    /*
    // Por ahora quitado el control del ratón (si se pone hay que descomentar una cosa de update también)
    // TrackballControls (mover con el ratón)
    */
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    this.cameraControl.target = this.lookPoint;

  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante un objeto de control
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = {
      // En el contexto de una función   this   alude a la función
      lightPower : 500.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 0.5,
      axisOnOff : true,

      startGame : () => {
        this.newGame();
      },

      nextTurn : () => {
        if (this.gameStarted) {
          this.gameBoard.nextTurn();
          if (this.gameBoard.currentTurn === "black") {
            this.camera.position.set(this.blackCameraPosition.x, this.blackCameraPosition.y, this.blackCameraPosition.z);
          }
          else{
            this.camera.position.set(this.whiteCameraPosition.x, this.whiteCameraPosition.y, this.whiteCameraPosition.z);
          }
        }
      }
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPower', 0, 1000, 20)
      .name('Luz puntual : ')
      .onChange ( (value) => this.setLightPower(value) );
    
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ')
      .onChange ( (value) => this.setAmbientIntensity(value) );
      
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );


    let folderGame = gui.addFolder ('GameBoard');
    folderGame.add (this.guiControls, 'startGame').name ('[ Start Game ]');
    folderGame.add (this.guiControls, 'nextTurn').name ('[ Next Turn ]');

    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add (this.ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.pointLight = new THREE.PointLight( 0xffffff );
    this.pointLight.power = this.guiControls.lightPower;
    this.pointLight.position.set( 2, 3, 1 );
    this.add (this.pointLight);
  }
  
  setLightPower (valor) {
    this.pointLight.power = valor;
  }

  setAmbientIntensity (valor) {
    this.ambientLight.intensity = valor;
  }  
  
  setAxisVisible (valor) {
    this.axis.visible = valor;
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0x87CEEB), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    
    if (this.stats) this.stats.update();
    
    // Se actualizan los elementos de la escena para cada frame
    
    // Actualizamos la cámara
    this.cameraControl.update();

    // Se actualiza el resto del modelo   
    this.gameBoard.update();

    // Configuramos el render con la cámara
    this.renderer.render (this, this.getCamera());

    // Configuramos la actualización automatica del update
    requestAnimationFrame(() => this.update())
  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ('click', (MouseEvent) => scene.onMouseClick(MouseEvent));

  // Que no se nos olvide, la primera visualización.
  scene.update();
});
