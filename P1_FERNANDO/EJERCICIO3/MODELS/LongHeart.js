import * as THREE from '../../../libs/three.module.js';

class LongHeart extends THREE.Object3D {
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

        const path = new THREE.LineCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 8, 0)
        );

        const segments = 100;  // Número de divisiones a lo largo del camino
        const twistAmount = Math.PI * 2; // Giro total (360°)
        const extrudeSettings = {
            steps: segments,
            bevelEnabled: false,
            extrudePath: path
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

        const position = geometry.attributes.position;
        const vertex = new THREE.Vector3();
        const center = new THREE.Vector3(0, 0, 0); // Centro de rotación
        const rotationMatrix = new THREE.Matrix4();

        for (let i = 0; i < position.count; i++) {
            vertex.fromBufferAttribute(position, i);

            // Proporción de la altura dentro del modelo (0 en la base, 1 en la cima)
            const t = (vertex.y - 0) / (5 - 0);
            const angle = t * twistAmount; // Ángulo de giro progresivo

            vertex.sub(center);
            rotationMatrix.makeRotationY(angle);
            vertex.applyMatrix4(rotationMatrix);
            vertex.add(center); // Volver a su posición original

            // Guardar la nueva posición del vértice
            position.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }

        position.needsUpdate = true; // Notificar a Three.js que la geometría cambió

        // Crear la malla con el material dado
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.5, 0.5, 0.5);
        this.add(mesh);
    }
}

export { LongHeart };
