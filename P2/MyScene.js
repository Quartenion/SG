
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import  Stats from '../libs/stats.module.js'

// Clases de mi proyecto

import { Hormiga } from './MODELS/Hormiga.js'
import { Tablero } from './MODELS/Tablero.js'
import { Suelo } from './MODELS/Suelo.js'


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
    this.tablero = new Tablero();
    this.add (this.tablero);

    this.suelo = new Suelo();
    this.add (this.suelo);

    // Matriz que representa las posiciones en el espacio.
    this.boardMatrix =  this.tablero.get_board_positions();

    // Lanzamos el set-up de las tropas
    this.createAndSetTroops();
  }

  // Created functions
  createAndSetTroops(){
    // Creamos el grupo de las piezas blancas
    this.blancas = new THREE.Group();

    // Las posiciones iniciales de las blancas serán las de las dos últimas filas de boardMatrix
    // las negras tendrán las 2 primeras filas.

    /* todo hay que hacer la clase GameBoard que será un controller y MyScene será la vista
       La clase GameBoard no tendrá directamente las piezas, será un tablero que podrá tener las posiciones
       y los objetos metidos del tablero de juego virtual, es decir, que se creará en MyScene y se le pasará
       todos los datos desde aqui.

       Entonces en cada turno se accederá al GameBoard que dará las piezas que se tienen
       y en un Group, luego se hará raycasting para escoger una pieza, en el momento que se tenga pieza seleccionada
       se mostrará la misma con un resalto y el GameBoard calculará que posibles movimientos tiene la pieza seleccionada
       entonces se podrá clicar otra pieza o una casilla objetivo, para confirmar será con una tecla no con el clic.

       Una vez está seleccionado y se ha ejecutado un movimiento se le pasa la decisión al gameBoard con algo como:
       ejecutarMovimiento(pieza, movimiento[2]) asumiendo que por cada pieza lo que se puede obtener es un vector
       de movimientos o lo que se hace es pasar las coordenadas objetivo. El tablero hará el cambio y devolverá
       El nuevo tablero con los cambios.

       Otra opción de hacerlo si esa no es muy viable, es que el tablero solo tenga la representación pero las funciones
       de movimiento las haga el myscene y luego haga los cambios en el board para tener la representación actualizada, de
       esta forma lo controlan las cosas desde esta clase y puede lanzar las animaciones.


       He modificado un pelin la hormiga pero no he hecho nada realmente, era solo para probar
    */


    for (let i = 0; i < 8; i++) {
      let peonBlanco = new Hormiga();
      peonBlanco.position.set(this.boardMatrix[6][i][0], 0, this.boardMatrix[6][i][1]);
      this.blancas.add(peonBlanco);
    }

    this.blancas.add (this.peonBlanco);

    this.add (this.blancas);
  }

  // Original functions
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
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    this.cameraControl.target = this.lookPoint;
    */
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
      axisOnOff : true
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
    // this.cameraControl.update();
    
    // Se actualiza el resto del modelo   
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
