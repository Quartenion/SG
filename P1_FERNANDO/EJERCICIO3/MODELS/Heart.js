import * as THREE from '../../../libs/three.module.js';

class Heart extends THREE.Object3D {
    constructor(material) {
        super();
        
        const heartShape = new THREE.Shape();

        heartShape.moveTo( 0.75, 0.75 );
        heartShape.bezierCurveTo( 0.75, 0.75, 0.6, 0, 0, 0 );
        heartShape.bezierCurveTo( -0.9, 0, -0.9, 1.05, -0.9, 1.05 );
        heartShape.bezierCurveTo( -0.9, 1.65, -0.3, 2.31, 0.75, 2.85 );
        heartShape.bezierCurveTo( 1.8, 2.31, 2.4, 1.65, 2.4, 1.05 );
        heartShape.bezierCurveTo( 2.4, 1.05, 2.4, 0, 1.5, 0 );
        heartShape.bezierCurveTo( 1.05, 0, 0.75, 0.75, 0.75, 0.75 );

        const extrudeSettings = { 
            depth: 0.3,  // Give it some thickness
            bevelEnabled: true, 
            bevelSegments: 2, 
            steps: 2, 
            bevelSize: 0.1,  // Smaller bevel for a clean look
            bevelThickness: 0.1 
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        
        // Use the provided material instead of creating a new one
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0.4, 3.2, -0.08);
        mesh.rotateZ(Math.PI);
        mesh.scale.set(0.5, 0.5, 0.5);

        this.add(mesh);
    }
}

export { Heart };
