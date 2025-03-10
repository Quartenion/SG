import * as THREE from '../../../libs/three.module.js'

class Base extends THREE.Object3D
{
    constructor() {
        super();
        this.material = new THREE.MeshStandardMaterial({ 
            flatShading: false,
            side: THREE.DoubleSide,
            color: 0x342104
         });
        
        const resolucion = 100;
        this.createGeometry(resolucion); // Crear el peón al inicio
    }

    createGeometry(resolucion) {
        const x = 0, y = 0;
        const base = new THREE.Shape();
    
        // Definir el perfil del peón
        base.moveTo( x , y );
        base.lineTo( x + 0.5 , y );   
        base.bezierCurveTo(x + 0.2, y, x + 0.05 , y + 0.2, x + 0.05, y + 1);
            
        const points = base.getPoints(50);
        this.latheGeometry = new THREE.LatheGeometry(points, resolucion, 0, Math.PI * 2);
        this.latheMesh = new THREE.Mesh(this.latheGeometry, this.material);
        // Crear la geometría de revolución
        this.add(this.latheMesh);
    }
}

export { Base };