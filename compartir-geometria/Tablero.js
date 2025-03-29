import * as THREE from '../../libs/three.module.js'
import { Peon } from './Peon.js'

class Tablero extends THREE.Object3D {
  
  constructor () {
    super();
    
    const blancas = new THREE.MeshStandardMaterial ({color: 0xFFFFFF});
    const negras  = new THREE.MeshStandardMaterial ({color: 0x7F7F7F});
    
    var unPeon;
    for (var i = 0; i < 8; i++) {
      unPeon = new Peon (blancas);
      unPeon.position.x = i*0.15 - 0.525;
      unPeon.position.z = -0.15;
      this.add (unPeon);
      
      unPeon = new Peon (negras);
      unPeon.position.x = i*0.15 - 0.525;
      unPeon.position.z = 0.15;
      this.add (unPeon);
    }
  }
  
  update () {
    // nada
  }
}

export { Tablero }
