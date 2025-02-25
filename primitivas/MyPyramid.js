import * as THREE from '../libs/three.module.js'
 
class MyPyramid extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();
    
    this.createGUI(gui, titleGui);

    // Crear la pirámide y añadirla a la escena
    this.pyramid = this.createPyramid();
    this.add(this.pyramid);
  }

  createPyramid() {
    var pyramidGeom = new THREE.ConeGeometry(1, 2, 4); // Tamaño base: radio = 1, altura = 2
    var pyramidMat = new THREE.MeshNormalMaterial();
    var pyramid = new THREE.Mesh(pyramidGeom, pyramidMat);
    return pyramid;
  }
  
  createGUI(gui, titleGui) {
    this.guiControls = {
      base: 1.0,
      height: 2.0,
      rotY: 0.0,
      posX: 0.0,
      posY: 0.0,
      posZ: 0.0,
      
      reset: () => {
        this.guiControls.base = 1.0;
        this.guiControls.height = 2.0;
        this.guiControls.rotY = 0.0;
        this.guiControls.posX = 0.0;
        this.guiControls.posY = 0.0;
        this.guiControls.posZ = 0.0;
        this.updateGeometry();
      }
    } 
    
    var folder = gui.addFolder(titleGui);
    folder.add(this.guiControls, 'base', 0.5, 3.0, 0.1).name('Base: ').listen().onChange(() => this.updateGeometry());
    folder.add(this.guiControls, 'height', 1.0, 5.0, 0.1).name('Altura: ').listen().onChange(() => this.updateGeometry());
    folder.add(this.guiControls, 'rotY', 0.0, Math.PI * 2, 0.01).name('Rotación Y: ').listen();
    folder.add(this.guiControls, 'posX', -5.0, 5.0, 0.1).name('Posición X: ').listen();
    folder.add(this.guiControls, 'posY', 0.0, 5.0, 0.1).name('Posición Y: ').listen();
    folder.add(this.guiControls, 'posZ', -5.0, 5.0, 0.1).name('Posición Z: ').listen();
    folder.add(this.guiControls, 'reset').name('[ Reset ]');
  }

  updateGeometry() {
    this.remove(this.pyramid);
    this.pyramid = new THREE.Mesh(
      new THREE.ConeGeometry(this.guiControls.base, this.guiControls.height, 4),
      new THREE.MeshNormalMaterial()
    );
    this.add(this.pyramid);
  }
  
  update() {
    this.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
    this.rotation.y = this.guiControls.rotY;
  }
}

export { MyPyramid };
