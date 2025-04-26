import * as THREE from '../../../libs/three.module.js';
import { MTLLoader } from '../../../libs/MTLLoader.js';
import { OBJLoader } from '../../../libs/OBJLoader.js';

class Abeja extends THREE.Object3D {
    constructor() {
        super();

        const materialLoader = new MTLLoader();
        const objectLoader = new OBJLoader();

        materialLoader.load('./MODELS/BEE.MTL', (materials) => {
            objectLoader.setMaterials(materials);
            objectLoader.load('./MODELS/BEE.OBJ', (object) => {
                object.scale.set(100, 100, 100); // <--- Aquí escalas la abeja
                this.add(object);
            }, null, null);
        }, null, null);
    }
}

export { Abeja };
