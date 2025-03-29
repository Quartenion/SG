import * as THREE from '../libs/three.module.js'

class Peon extends THREE.Object3D {
    
  // Usamos una variable de clase para la única geometría 
  // que van a compartir todos los peones
  static geometria = null;
  
  constructor(material) {
    super();
    
    if (Peon.geometria == null)
        Peon.geometria = this.crearGeometria ();
    
    const meshPeonNuevo = new THREE.Mesh (Peon.geometria, material);
    
    this.add (meshPeonNuevo);
  }
  
  crearGeometria () {
    const geoPeon = new THREE.ConeGeometry (0.05, 0.1);
    // Queremos que su origen de coordenadas local esté en el centro de la base
    // Como el cono se ha creado con el origen centrado, 
    // subimos el cono la mitad de su altura
    geoPeon.translate (0, 0.05, 0);
    return geoPeon;
  }
  
  update () {
    // No hay nada que actualizar ya que no hay nodos que cambien continuamente entre frames
  }
}

export { Peon }
