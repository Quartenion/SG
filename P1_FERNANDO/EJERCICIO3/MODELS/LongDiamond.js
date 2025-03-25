import * as THREE from '../../../libs/three.module.js';

class LongDiamond extends THREE.Object3D {
    constructor(material) {
        super();

            const diamondShape = new THREE.Shape();
            diamondShape.moveTo(0, 0, 0);
            diamondShape.lineTo(0.8, 1);
            diamondShape.lineTo(0, 2);
            diamondShape.lineTo(-0.8, 1);
            diamondShape.lineTo( 0, 0);

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

        const geometry = new THREE.ExtrudeGeometry(diamondShape, extrudeSettings);

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
        mesh.scale.set(1, 0.5, 1);
        this.add(mesh);
    }
}

export { LongDiamond };
