import * as THREE from 'three';

class Tablero extends THREE.Object3D {
  constructor() {
    super();

    const size = 0.1; 
    const negro = new THREE.Color(0x000000);  // negro
    const blanco = new THREE.Color(0xffffff); // blanco
    const board_tiles = 8;
    const board_size = board_tiles * size;

    // Posiciones iniciales de la construcción para que no haya que hacer la transformación posterior
    const x = -board_size/2 + size/2;
    const z = -board_size/2 + size/2;

    // Grupo de three que tiene todas las pieza
    this.tiles = new THREE.Group();

    // Representación matricial del tablero, en el bucle for se le asignan los valores de cada casilla
    this.board = [[[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
                  [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
                  [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
                  [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
                  [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
                  [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
                  [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
                  [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]]];


    for (let i = 0; i < board_tiles; i++) {
      for (let j = 0; j < board_tiles; j++) {
        const geometry = new THREE.BoxGeometry(size, 0.05, size);
        const color = (i % 2 === 0) ? ( (j % 2 === 0) ? blanco : negro ) : ( (j % 2 === 0) ? negro : blanco );


        const material = new THREE.MeshBasicMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        cube.row = i;
        cube.col = j;

        this.board[i][j][0] = x + j * size; // Componente x de la casilla
        this.board[i][j][1] = z + i * size; // Componente z de la casilla
        cube.position.set(x + j * size, -0.025, z + i * size);
        this.tiles.add(cube);
      }
    }
    this.add(this.tiles);
  }


}

export { Tablero };

