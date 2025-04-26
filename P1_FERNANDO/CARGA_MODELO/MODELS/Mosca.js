import * as THREE from '../../../libs/three.module.js'
import { MTLLoader } from '../../../libs/MTLLoader.js'
import { OBJLoader } from '../../../libs/OBJLoader.js'

class Mosca extends THREE.Object3D {
    constructor() {
        super();

        const materialLoader = new MTLLoader();
        const objectLoader = new OBJLoader();

        materialLoader.load('./MODELS/Blank.mtl', (materials) => {
            objectLoader.setMaterials(materials);
            objectLoader.load('./MODELS/19912_Horse_fly_V1_.obj', (object) => {
                this.add(object);
            }, null, null);
        }, null, null); // Cierra correctamente materialLoader.load
    }
}

export { Mosca };
