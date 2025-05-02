import * as THREE from '../../libs/three.module.js'
import * as CSG from '../../libs/three-bvh-csg.js'

class Caballo extends  THREE.Object3D {
    constructor() {
        super();

        // Material común
        this.material = new THREE.MeshNormalMaterial();

        // Evaluador común
        this.evaluator = new CSG.Evaluator();

        // Creamos la base y el caballo
        let base = this.createBase();
        let caballo = this.createCaballo();
        caballo.geometry.translate(0,0.75,0);

        let caballoCompleto = this.evaluator.evaluate(base,caballo,CSG.ADDITION);
        this.add(caballoCompleto);
    }

    createBase() // Devuelve el brush resultante
    {
        let width = 7;
        let height = 1.5;
        let base = new THREE.BoxGeometry(width,height,width);

        let esquina = new THREE.CylinderGeometry(width/4,width/4,height*2);
        esquina.translate(width/2,0,-width/2)

        let brush1 = new CSG.Brush(base, this.material);
        let brush2 = new CSG.Brush(esquina, this.material);
        base = this.evaluator.evaluate(brush1, brush2, CSG.SUBTRACTION);

        esquina = new THREE.CylinderGeometry(width/4,width/4,height*2);
        esquina.translate(width/2,0,width/2);
        brush2 = new CSG.Brush(esquina, this.material);
        base = this.evaluator.evaluate(base, brush2, CSG.SUBTRACTION);

        esquina = new THREE.CylinderGeometry(width/4,width/4,height*2);
        esquina.translate(-width/2,0,width/2)
        brush2 = new CSG.Brush(esquina, this.material);
        base = this.evaluator.evaluate(base, brush2, CSG.SUBTRACTION);

        esquina = new THREE.CylinderGeometry(width/4,width/4,height*2);
        esquina.translate(-width/2,0,-width/2)
        brush2 = new CSG.Brush(esquina, this.material);
        base = this.evaluator.evaluate(base, brush2, CSG.SUBTRACTION);

        base.geometry.translate(0,height/2,0);

        return base;
    }

    createCaballo()
    {
        let radiusTop = 1;
        let radiusBottom = 2;
        let height = 8;

        // Definimos las 4 piezas que componenen el caballo (sin contar la extrusion de la cabeza)
        let body = new THREE.CylinderGeometry(radiusTop,radiusBottom, height, 15, 15);
        let face = new THREE.CylinderGeometry(radiusTop/2,radiusBottom/2 *0.9, height/2, 15,15);
        let head = new THREE.SphereGeometry(radiusTop);
        let nose = new THREE.SphereGeometry(radiusTop/2);

        // Movemos la cabeza arriba del body y hacemos add
        head.translate(0,height/2,0);

        let brush1 = new CSG.Brush(body, this.material);
        let brush2 = new CSG.Brush(head, this.material);
        let bodyHead = this.evaluator.evaluate(brush1, brush2, CSG.ADDITION);


        // Movemos la nariz en el tope de la cara y hacemos add
        nose.translate(0,height/4,0);

        brush1 = new CSG.Brush(face, this.material);
        brush2 = new CSG.Brush(nose, this.material);
        let faceNose = this.evaluator.evaluate(brush1, brush2, CSG.ADDITION);


        // Colocamos el faceNose en su sitio y se lo añadimos
        faceNose.geometry.translate(0,height/4,0);
        faceNose.geometry.rotateX(120*(Math.PI/180));
        faceNose.geometry.translate(0,height/2,0);

        let caballo = this.evaluator.evaluate(faceNose, bodyHead, CSG.ADDITION);


        // Ahora vamos a crear la coleta y ponersela

        // Curva que va a seguir
        const curve = new THREE.CatmullRomCurve3([
             new THREE.Vector3(-0.3,-0.06,0),
              new THREE.Vector3(-0.2,-0.05,0),
              new THREE.Vector3(-0.1,-0.04,0),
              new THREE.Vector3(-0.05,-0.03,0),
              new THREE.Vector3(0, -0.02, 0),
              new THREE.Vector3(0.1, 0, 0),
              new THREE.Vector3(0.2, 0, 0),
              new THREE.Vector3(0.3, 0, 0),
              new THREE.Vector3(0.4, 0, 0),
              new THREE.Vector3(0.5, 0, 0),
              new THREE.Vector3(0.6, -0.5, 0),
              new THREE.Vector3(0.65, -0.15, 0),
              new THREE.Vector3(0.68, -0.3, 0),
              new THREE.Vector3(0.69, -0.6, 0),
              new THREE.Vector3(0.71, -0.9, 0),
              new THREE.Vector3(0.73, -1.1, 0),
              new THREE.Vector3(0.75, -1.3, 0),
              new THREE.Vector3(0.77, -1.5, 0),
              new THREE.Vector3(0.87, -1.7, 0),
              new THREE.Vector3(0.97, -1.9, 0),
        ])

        // Settings para la extrusion que va a seguir la curva
        const extrudeSettings = {
            steps: 100,
            curveSegments: 50,
            bevelEnabled: false,
            extrudePath: curve,
        }

        // Pequeño shape circular que va a recorrer la curva
        let shape = new THREE.Shape();
        let radius = 0.08;
        shape.absarc(0,0,radius,0,Math.PI * 2);

        let coleta = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        coleta.scale(2.5,2.5,2);
        coleta.rotateY(90*(Math.PI/180));
        coleta.translate(0,height/2+radiusTop-0.1,0.5);

        brush1 = new CSG.Brush(coleta, this.material);
        caballo = this.evaluator.evaluate(caballo, brush1, CSG.ADDITION);

        caballo.geometry.translate(0,height/2,0);

        return caballo;
    }

    update() {}

}

export {Caballo};
