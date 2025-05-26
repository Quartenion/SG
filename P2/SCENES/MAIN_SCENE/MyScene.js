
// Clases de la biblioteca

import * as THREE from '../../../libs/three.module.js'
import { GUI } from '../../../libs/dat.gui.module.js'
import { TrackballControls } from '../../../libs/TrackballControls.js'
import  Stats from '../../../libs/stats.module.js'
import TWEEN from "../../../libs/tween.module.js";

// Clases de mi proyecto

import { Suelo } from '../../FILES/Suelo.js'
import { GameBoard } from '../../FILES/GameBoard.js'

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
    this.animationFlag = false;



    // Animaciones de la escena
    let startPowerBlue =  this.guiControls.lightPowerBlue;
    let startPowerRed =  this.guiControls.lightPowerRed;
    let objetiveLightValueBlue = null;
    let objetiveLightValueRed = null;

    const cameraCurveWB = new THREE.CubicBezierCurve3(
      new THREE.Vector3(this.whiteCameraPosition.x, this.whiteCameraPosition.y, this.whiteCameraPosition.z),
      new THREE.Vector3(this.whiteCameraPosition.x-0.7, this.whiteCameraPosition.y, this.whiteCameraPosition.z*0.5),
      new THREE.Vector3(this.whiteCameraPosition.x-0.7, this.whiteCameraPosition.y, this.blackCameraPosition.z*0.5),
      new THREE.Vector3(this.blackCameraPosition.x, this.blackCameraPosition.y, this.blackCameraPosition.z)
    );

    const cameraCurveBW = new THREE.CubicBezierCurve3(
      new THREE.Vector3(this.blackCameraPosition.x, this.blackCameraPosition.y, this.blackCameraPosition.z),
      new THREE.Vector3(this.whiteCameraPosition.x+0.7, this.whiteCameraPosition.y, this.blackCameraPosition.z*0.5),
      new THREE.Vector3(this.whiteCameraPosition.x+0.7, this.whiteCameraPosition.y, this.whiteCameraPosition.z*0.5),
      new THREE.Vector3(this.whiteCameraPosition.x, this.whiteCameraPosition.y, this.whiteCameraPosition.z)
    );

    /*
    const curvePoints = cameraCurveWB.getPoints(50);
    const curveGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const curveMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const visualizedCurve = new THREE.Line(curveGeometry, curveMaterial);
    this.add(visualizedCurve);


    const curvePoints2 = cameraCurveBW.getPoints(50);
    const curveGeometry2 = new THREE.BufferGeometry().setFromPoints(curvePoints2);
    const curveMaterial2 = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const visualizedCurve2 = new THREE.Line(curveGeometry2, curveMaterial2);
    this.add(visualizedCurve2);
    */

    let chosenCurve = null;



    this.lightPromise = null;
    const begin = {t: 0.0};
    const end = {t: 1.0};
    this.lightChangeAnim = new TWEEN.Tween(begin)
        .to(end, 1500)
        .onStart(()=>  {
          startPowerBlue =  this.guiControls.lightPowerBlue;
          startPowerRed =  this.guiControls.lightPowerRed
          if (this.gameBoard.currentTurn === "white"){
            objetiveLightValueBlue = 100.0;
            objetiveLightValueRed = 0.0;
            chosenCurve = cameraCurveBW;
          }
          else{
            objetiveLightValueBlue = 0.0;
            objetiveLightValueRed = 100.0;
            chosenCurve = cameraCurveWB;
          }
        })
        .onUpdate(() =>{
          this.guiControls.lightPowerBlue = THREE.MathUtils.lerp(startPowerBlue,
              objetiveLightValueBlue, begin.t);
          this.guiControls.lightPowerRed = THREE.MathUtils.lerp(startPowerRed,
              objetiveLightValueRed, begin.t);

          this.setLightPowerBlue(this.guiControls.lightPowerBlue);
          this.setLightPowerRed(this.guiControls.lightPowerRed);

          const position = chosenCurve.getPoint(begin.t);
          this.camera.position.copy(position);
        })
        .onComplete (() => {
          begin.t = 0.0;
          if (this.lightPromise) {
            this.lightPromise();
          }
        })
        .easing(TWEEN.Easing.Quadratic.InOut);

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
    this.animationFlag = false;

    this.guiControls.lightPowerRed = 0.0;
    this.guiControls.lightPowerBlue = 100.0;

    this.pointLightRed.power = this.guiControls.lightPowerRed;
    this.pointLightBlue.power = this.guiControls.lightPowerBlue;



  }

  async nextTurn(){
    if (this.gameStarted) {
      this.gameBoard.nextTurn();
      /*
      if (this.gameBoard.currentTurn === "black") {
        console.log("changingToBlack")
        this.camera.position.set(this.blackCameraPosition.x, this.blackCameraPosition.y, this.blackCameraPosition.z);
      }
      else{
        console.log("changingToWhite")
        this.camera.position.set(this.whiteCameraPosition.x, this.whiteCameraPosition.y, this.whiteCameraPosition.z);
      }
      */

      return new Promise((resolve) => {
        if (!this.lightChangeAnim.isPlaying()) {
            this.lightPromise = resolve;
            this.lightChangeAnim.start();
        }
      })
    }
  }

  async onMouseClick(MouseEvent) {
    if (this.gameStarted && !this.animationFlag)
    {
      if (this.canPick) {
        this.mouse.x = (MouseEvent.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(MouseEvent.clientY / window.innerHeight) * 2 + 1;

        // Actualizamos el raycaster con la posición del ratón y la cámara
        this.raycaster.setFromCamera(this.mouse, this.camera);

        let intersects = this.raycaster.intersectObjects(this.gameBoard.turnColor.children);
        let tile_intersects;

        this.gameBoard.unselectPiece();

        this.remove(this.spotLightWhite);

        // CASO DE QUE YA ESTÉ SELECCIONADA PIEZA Y SE HAYA CLICADO PERO NO EN UNA PIEZA
        if (this.objectSelected && intersects.length === 0) {
          // En caso de que no se haga select de otro object
          // SE COMPRUEBA SI ERA UNA CASILLA OBJETIVO
          tile_intersects = this.raycaster.intersectObjects(this.gameBoard.ableMovements);
          this.objectSelected = false;
          if (tile_intersects.length > 0) {
            let tile = tile_intersects[0].object;
            let pos ={"pos" : tile.position, "row" : tile.row, "col" : tile.col};
            this.animationFlag = true;
            this.add(this.spotLightWhite);
            await this.gameBoard.makeMovement(pos);
            this.animationFlag = false;
            await this.nextTurn();
            // this.remove(this.spotLightWhite); opcional -> Quitar la luz al final del movimiento
          }
        }
        else { // CASO DE QUE SE HAYA SELECCIONADO UNA PIEZA
          if (intersects.length > 0) {
            let object = intersects[0].object;
            console.log(object);

            this.spotLightWhite.target = object;
            this.add(this.spotLightWhite);

            this.gameBoard.selectPiece(object);
            this.objectSelected = true;
          }
          else{
            this.objectSelected = false;
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
    this.whiteCameraPosition = new THREE.Vector3 (0, 1, 0.9);
    this.blackCameraPosition = new THREE.Vector3 (0, 1, -0.9);
    this.lookPoint = new THREE.Vector3 (0, 0, 0);

    this.camera.position.set (this.whiteCameraPosition.x, this.whiteCameraPosition.y, this.whiteCameraPosition.z);
    this.camera.lookAt(this.lookPoint);
    this.add (this.camera);

    // Crear la otra cámara??


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
      lightPowerRed : 0.0,  // La potencia de esta fuente de luz se mide en lúmenes
      lightPowerBlue : 100.0,  // La potencia de esta fuente de luz se mide en lúmenes
      ambientIntensity : 0.3,
      axisOnOff : true,

      startGame : () => {
        this.newGame();
      },

      passTurn : async () => {
        if (!this.lightChangeAnim.isPlaying()) {
          await this.nextTurn();
        }
      }
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPowerRed', 0, 200, 20)
      .name('Luz puntual Roja:  ')
      .listen()
      .onChange ( (value) => this.setLightPowerRed(value) );

    // Se le añade un control para la potencia de la luz puntual
    folder.add (this.guiControls, 'lightPowerBlue', 0, 200, 20)
      .name('Luz puntual azul:  ').listen()
      .onChange ( (value) => this.setLightPowerBlue(value) );
    
    // Otro para la intensidad de la luz ambiental
    folder.add (this.guiControls, 'ambientIntensity', 0, 1, 0.05)
      .name('Luz ambiental: ').listen()
      .onChange ( (value) => this.setAmbientIntensity(value) );
      
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff')
      .name ('Mostrar ejes : ')
      .onChange ( (value) => this.setAxisVisible (value) );


    let folderGame = gui.addFolder ('GameBoard');
    folderGame.add (this.guiControls, 'startGame').name ('[ Start Game ]');
    folderGame.add (this.guiControls, 'passTurn').name ('[ Pass Turn ]');

    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight('white', this.guiControls.ambientIntensity);
    // La añadimos a la escena
    this.add(this.ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.pointLightRed = new THREE.PointLight(new THREE.Color(1, 0.2, 0.3), 4);
    this.pointLightBlue = new THREE.PointLight(new THREE.Color(0.2, 0.3, 1), 4);

    this.spotLightWhite = new THREE.SpotLight(0xffffff, 15);
    this.spotLightWhite.angle = Math.PI / 100;
    this.spotLightWhite.position.set(0,2.1,0);


    this.pointLightRed.power = this.guiControls.lightPowerRed;
    this.pointLightBlue.power = this.guiControls.lightPowerBlue;

    this.pointLightBlue.position.set(0, 2.1, -0.7);
    this.pointLightRed.position.set(0, 2.1, 0.7);

    this.add(this.pointLightRed);
    this.add(this.pointLightBlue);
  }
  
  setLightPowerRed (valor) {
    this.pointLightRed.power = valor;
  }
  setLightPowerBlue (valor) {
    this.pointLightBlue.power = valor;
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
    this.camera.lookAt(this.lookPoint);

    // Se actualiza el resto del modelo   
    this.gameBoard.update();

    // Configuramos el render con la cámara
    this.renderer.render (this, this.getCamera());

    TWEEN.update();
    // Configuramos la actualización automatica del update
    requestAnimationFrame(() => this.update());
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
