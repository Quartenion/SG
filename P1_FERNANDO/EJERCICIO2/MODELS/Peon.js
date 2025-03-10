import * as THREE from '../../../libs/three.module.js'

class Peon extends THREE.Object3D
{
    constructor() {
        super();
        this.material = new THREE.MeshNormalMaterial({ 
            flatShading: false,
         });
        
        const resolucion = 10;
        this.createGeometry(resolucion); // Crear el peón al inicio
    }

    createGeometry(resolucion) {
        const x = 0, y = 0;
        const pawnShape = new THREE.Shape();
    
        // Definir el perfil del peón
        pawnShape.moveTo( x , y );     
        pawnShape.lineTo( x + 1 , y );
        pawnShape.lineTo( x + 1, y + 0.5 );
        pawnShape.quadraticCurveTo( x + 0.3 , y + 0.5 , x + 0.2, y + 2 );
        pawnShape.bezierCurveTo(x + 1 , y + 2.33 , x + 0.5, y + 3.1, x + 0, y + 3);
            
        const points = pawnShape.getPoints(50);
            
        // Crear la geometría de revolución
        this.latheGeometry = new THREE.LatheGeometry(points, resolucion, 0, Math.PI * 2);
        this.latheMesh = new THREE.Mesh(this.latheGeometry, this.material);
        this.add(this.latheMesh);
    }
}

export { Peon };