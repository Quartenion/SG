import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/three-bvh-csg.js'


class Cascos extends THREE.Object3D {
    constructor() {
        super();

        // Crear material
        var material = new THREE.MeshNormalMaterial();
        // Crear geometrías base
        var Altavoz = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
        var Tela = new THREE.CircleGeometry(0.5, 32);
        var Almohadilla = new THREE.TorusGeometry(0.5, 0.1, 16, 100);

        Tela.rotateX(Math.PI / 2);
        Almohadilla.rotateX(Math.PI / 2);

        let AltavozBrush = new CSG.Brush(Altavoz, material);
        let TelaBrush = new CSG.Brush(Tela, material);
        let AlmohadillaBrush = new CSG.Brush(Almohadilla, material);

        let evaluator = new CSG.Evaluator();
        let Pieza = evaluator.evaluate(AltavozBrush, TelaBrush, CSG.ADDITION);
        let Casco = evaluator.evaluate(Pieza, AlmohadillaBrush, CSG.ADDITION);
        
        Casco.scale.set(1.5,1,1);
        Casco.rotateZ(Math.PI / 2);
        Casco.translateY(1);

        this.add(Casco);

        var CascoDerecho = Casco.clone();

        CascoDerecho.rotateX(Math.PI);
        CascoDerecho.translateY(2);

        var Diadema = new THREE.TorusGeometry(1.2, 0.1, 16, 100, Math.PI, Math.PI);
        Diadema.translate(0, 0.6, 0);

        var DiademaMesh = new THREE.Mesh(Diadema, material);

        this.add(DiademaMesh);

        this.add(CascoDerecho);
    }
}

export { Cascos };
