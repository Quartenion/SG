import * as THREE from '../../../libs/three.module.js'
 
class MyBox extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Se crea la geometría de la caja y se almacena en una variable
    var cubo = this.createBox();
    this.add (cubo);

    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    cubo.position.y = 0.5;
  }

  createBox () {
    // Un Mesh se compone de geometría y material
    var boxGeom = new THREE.BoxGeometry (1,1,1);
    // Como material se crea uno a partir de un color
    var boxMat = new THREE.MeshNormalMaterial({flatShading: true});
    
    // Ya podemos construir el Mesh
    var box = new THREE.Mesh (boxGeom, boxMat);
    // Y añadirlo como hijo del Object3D (el this)
    return box;
  }
  
  createGUI (gui,titleGui) {
    this.guiControls = {
      sizeX : 1.0,
      sizeY : 1.0,
      sizeZ : 1.0,
      
      rotX : 0.0,
      rotY : 0.0,
      rotZ : 0.0,
  
      reset : () => {
        this.guiControls.sizeX = 1.0;
        this.guiControls.sizeY = 1.0;
        this.guiControls.sizeZ = 1.0;
        
        this.guiControls.rotX = 0.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.rotZ = 0.0;

        this.visible = true; // Asegurarse de que el objeto no está oculto

      },
  
      hide : () => {
        this.visible = !this.visible; // Alternar visibilidad del objeto hijo (la caja)
      }
    } 
  
    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.01).name('Tamaño X : ').listen();
    folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.01).name('Tamaño Y : ').listen();
    folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.01).name('Tamaño Z : ').listen();
    
    folder.add(this.guiControls, 'rotX', 0.0, Math.PI/2, 0.01).name('Rotación X : ').listen();
    folder.add(this.guiControls, 'rotY', 0.0, Math.PI/2, 0.01).name('Rotación Y : ').listen();
    folder.add(this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.01).name('Rotación Z : ').listen();
    
    folder.add(this.guiControls, 'reset').name('[ Reset ]');
    folder.add(this.guiControls, 'hide').name('[ Mostrar/Ocultar ]'); // Botón para alternar visibilidad
  }
  
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
   
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { MyBox };