import * as THREE from '../../../../libs/three.module.js';
import { OBJLoader } from '../../../../libs/OBJLoader.js';
import { Insect } from '../Insect.js';

class EscarabajoRinoceronte extends Insect {
    constructor(name, type, team) {
        super(name, type, team);
       
        const objectLoader = new OBJLoader();

        // Crear material brillante
        const material = new THREE.MeshStandardMaterial({
            color: 0x0a1a2f,
            roughness: 0.2,   
            metalness: 0.6,  
        });

        // Cargar y aplicar material
        objectLoader.load('./FILES/EscarabajoRinoceronte/15925_Rhinoceros_Beetle_v1.obj', (object) => {
            object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = this.OriginalMaterial;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            object.scale.set(0.005, 0.005, 0.005);
            object.rotation.x = -Math.PI / 2;
            object.rotation.z = Math.PI;

            this.add(object);
        });
    }

    update() {
        // Lógica de actualización futura
    }
}

export { EscarabajoRinoceronte };
