import * as THREE from 'three';

class Tablero extends THREE.Object3D {
  constructor() {
    super();

    const size = 0.1; 
    const rojo = new THREE.Color(0xff0000);   // rojo fuerte
    const blanco = new THREE.Color(0xffffff); // blanco
    const rosa = new THREE.Color(0xffcccc);    // rosita claro
    const mantel = 8;

    for (let i = 0; i < mantel; i++) {       
      for (let j = 0; j < mantel; j++) {      
        const geometry = new THREE.BoxGeometry(size, 0.01, size);

        let color;
        if (i % 2 === 0) { // Fila par (0, 2, 4, 6)
          color = (j % 2 === 0) ? rojo : rosa;
        } else {           // Fila impar (1, 3, 5, 7)
          color = (j % 2 === 0) ? rosa : blanco;
        }

        const material = new THREE.MeshLambertMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);

        cube.position.set(j * size, 0, i * size);
        this.add(cube);
      }
    }

    this.position.x = -(8 * size) / 2 + size / 2;
    this.position.z = -(8 * size) / 2 + size / 2;
  }
}

export { Tablero };
