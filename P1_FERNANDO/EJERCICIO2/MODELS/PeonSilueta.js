import * as THREE from '../../../libs/three.module.js'

class PeonSilueta extends THREE.Object3D {
    constructor() {
        super();
        
        const x = 0, y = 0;

        const pawnShape = new THREE.Shape();

        pawnShape.moveTo( x , y );     
        pawnShape.lineTo( x + 1 , y );
        pawnShape.lineTo( x + 1, y + 0.5 );
        pawnShape.quadraticCurveTo( x + 0.3 , y + 0.5 , x + 0.2, y + 2 );
        pawnShape.bezierCurveTo(x + 1 , y + 2.33 , x + 0.5, y + 3.1, x + 0, y + 3);

        // Convertimos la forma en contornos (líneas)
        const points = pawnShape.getPoints(50); // Más puntos para una curva suave
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        // Material de solo líneas
        const material = new THREE.LineBasicMaterial({ color: 0x000000 });

        // Crear la línea en lugar de un mesh
        const line = new THREE.Line(geometry, material);

        this.add(line);
    }
}

export { PeonSilueta };
