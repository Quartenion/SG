import * as THREE from '../../libs/three.module.js'
import * as CSG from '../../libs/three-bvh-csg.js';

class Avispa extends THREE.Object3D{
    constructor(name, type, team){
        super();
        this.name = name;
        this.type = type;
        this.team = team;

        const geometry = new THREE.TorusGeometry(0.4, 0.02, 30);
        const material = new THREE.MeshNormalMaterial();
        this.halo = new THREE.Mesh(geometry, material);
        this.halo.rotation.x = Math.PI / 2;

        // Definimos los materiales
        if(team === 'black'){
            this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x2a1b00,
                roughness: 0.1,
                metalness: 0.3,
            });
        }
        else {
            this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xF8F6F0,
                roughness: 0.1,
                metalness: 0.3,
            });
        }
        
        this.OriginalMaterialYellow = new THREE.MeshPhysicalMaterial({
            color: 0xffe135,
            roughness: 0.2,
            metalness: 0.6,
        });
        this.radialSegments = 20;
        this.evaluator = new CSG.Evaluator();
        this.ratioScale = new THREE.Vector3(10,10,10);

        // La escala de la avispa está en el metro, es decir, entra dentro de un cubo
        // de un metro y luego se puede escalar a proporción


        // Creamos y colocamos el torso
        this.torso = this.createTorso();
        //this.torso.scale.set(this.ratioScale.x, this.ratioScale.y, this.ratioScale.z);
        this.torso.geometry.translate(0,0.17,0);

        // Creamos y colocamos el Aguijon
        let rot1 = {"rotX": 10, "rotY": 0, "rotZ": 0};
        let rot2 = {"rotX": 20, "rotY": 0, "rotZ": 0};
        let rot3 = {"rotX": 10, "rotY": 0, "rotZ": 0};
        this.sting = this.createSting();
        this.moveSting(this.sting, rot1, rot2, rot3);
        //this.sting.scale.set(this.ratioScale.x, this.ratioScale.y, this.ratioScale.z);
        this.add(this.sting);


        // Creamos y colocamos los brazos son un THREE.Group
        let rotArmR = {"rotX": -40, "rotY": 0, "rotZ": 30};
        let rotForearmR = {"rotX": 30, "rotY": 0, "rotZ": 0};
        let rotArmL = {"rotX": -40, "rotY": 0, "rotZ": 0};
        let rotForearmL = {"rotX": 30, "rotY": 0, "rotZ": -30};

        this.armRight = this.createArm();
        this.moveArm(this.armRight, rotArmR, rotForearmR);
        this.armRight.position.x += 0.17;
        this.armRight.position.y += 0.31;
        this.armRight.position.z += 0;

        this.armLeft = this.createArm();
        this.moveArm(this.armLeft, rotArmL, rotForearmL);
        this.armLeft.position.x += -0.17;
        this.armLeft.position.y += 0.31;
        this.armLeft.position.z += 0;


        this.head = this.createHead();
        this.head.scale.set(1.2,1.2,1.2);
        this.head.position.x += 0;
        this.head.position.y += 0.37;
        this.head.position.z += 0;

        this.upper = new THREE.Group();
        this.upper.add(this.head);
        this.upper.add(this.torso);
        this.upper.add(this.armRight);
        this.upper.add(this.armLeft);

        this.upper.rotateX(Math.PI / 180 * -15);

        this.add(this.upper);

        this.scale.set(0.15,0.15,0.15);
        this.translateY(0.08);
    }

    createHead(){
        // La cabeza va a tener 5 piezas distintas y tres de ellas se duplican

        const height = 0.2;
        const width = 0.15;

        // Cuello
        const neck = new THREE.CylinderGeometry(0.4/12,0.4/12,
            height/2, this.radialSegments);
        neck.translate(0,height/4,0);

        // Cabeza
        const head = new THREE.SphereGeometry(width/2, this.radialSegments +10);
        head.scale(1, 0.6, 1.35);
        head.rotateX(Math.PI/180 * -30);
        head.translate(0,width/2 * 0.5 + height/4,-width/2 * 0.4);

        // Ojos
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.07, 0, 0.04, 0.1, 0, 0.1);
        const points = shape.getPoints(50);

        // Crear geometrías
        const geoOjoIzq = new THREE.LatheGeometry(points, 50);
        geoOjoIzq.scale(0.4, 1, 0.7);
        geoOjoIzq.rotateZ(-Math.PI / 2);
        geoOjoIzq.rotateY(Math.PI/180 * 90);
        geoOjoIzq.rotateX(Math.PI/180 * -30);
        geoOjoIzq.translate(-0.035,width/2 * 0.4 + height/2,-width/2* 0.2);

        const geoOjoDer = new THREE.LatheGeometry(points, 50);
        geoOjoDer.scale(0.4, 1, 0.7);
        geoOjoDer.rotateZ(-Math.PI / 2);
        geoOjoDer.rotateY(Math.PI/180 * 90);
        geoOjoDer.rotateX(Math.PI/180 * -30);
        geoOjoDer.translate(0.035,width/2 * 0.4 + height/2,-width/2 * 0.2);

        // ANTENAS
        const shapeAntenna = new THREE.Shape();
        shapeAntenna.moveTo(0, 0);
        shapeAntenna.lineTo(0, 0.5);
        shapeAntenna.quadraticCurveTo(0.5, 0.5, 0.5, 0.3);

        const pointsAntenna = shapeAntenna.getPoints(100);
        const curve = new THREE.CatmullRomCurve3(
            pointsAntenna.map(p => new THREE.Vector3(p.x, p.y, 0))
        );
        const geometryAntenna = new THREE.TubeGeometry(curve, 100, 0.02,
                                                        16, false);
        geometryAntenna.scale(0.25, 0.25, 0.25);
        geometryAntenna.rotateY(Math.PI/180 * 90);
        geometryAntenna.rotateX(Math.PI/180 * -30);
        geometryAntenna.translate(0.035,width/2 * 0.4 + height/2, 0);

        const geometryAntenna2 = new THREE.TubeGeometry(curve, 100, 0.02,
                                                        16, false);
        geometryAntenna2.scale(0.25, 0.25, 0.25);
        geometryAntenna2.rotateY(Math.PI/180 * 90);
        geometryAntenna2.rotateX(Math.PI/180 * -30);
        geometryAntenna2.translate(-0.035,width/2 * 0.4 + height/2, 0);


        // BOCAS

        const tooth1 = this.createTooth();
        const tooth2 = this.createTooth();
        tooth1.scale.set(0.1,0.1,0.1);
        tooth2.scale.set(0.1,0.1,0.1);

        tooth1.rotateX(Math.PI);
        tooth1.rotateZ(Math.PI);
        tooth2.rotateZ(Math.PI);

        tooth1.rotateZ(Math.PI/180 * 30);
        tooth1.translateY(width * 0.8);
        tooth1.translateX(-width * 0.6);

        tooth2.rotateZ(Math.PI/180 * -30);
        tooth2.translateY(-width * 0.8);
        tooth2.translateX(-width * 0.6);


        const complete = new THREE.Group();
        complete.add(new THREE.Mesh(neck, this.OriginalMaterialYellow));
        complete.add(new THREE.Mesh(head, this.OriginalMaterialYellow));
        complete.add(new THREE.Mesh(geoOjoIzq, this.OriginalMaterial));
        complete.add(new THREE.Mesh(geoOjoDer, this.OriginalMaterial));
        complete.add(new THREE.Mesh(geometryAntenna, this.OriginalMaterial));
        complete.add(new THREE.Mesh(geometryAntenna2, this.OriginalMaterial));
        complete.add(tooth1);
        complete.add(tooth2);


        return complete;
    }

    createTooth(){
        const baseShape = new THREE.Shape();
        baseShape.moveTo(0.5, 0);
        baseShape.quadraticCurveTo(0.25, 0.5, -0.5, 0);
        baseShape.lineTo(0.5, 0);

        const extrudeSettings ={
            steps: 100,
            depth: 0.1,
            bevelEnabled: true,
            bevelSize: 0.1,
            bevelSteps: 50,
            bevelThickness: 0.05,
        }
        const base = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
        base.rotateX(Math.PI/180 * 90);
        base.translate(0,0.05,0);

        const hole = new THREE.BoxGeometry(2, 0.5, 2);
        hole.translate(0, 0, -1);

        const createTooth = x => {
            const geo = new THREE.BoxGeometry(0.15, 0.7, 0.15);
            geo.rotateY(Math.PI / 4);
            geo.translate(x, 0, 0);
            return geo;
        };

        const toothPositions = [0.35, 0.15, -0.15, -0.35];
        const evaluator = new CSG.Evaluator();

        let result = new CSG.Brush(base, this.OriginalMaterial);
        result = evaluator.evaluate(result, new CSG.Brush(hole, this.OriginalMaterial), CSG.SUBTRACTION);

        for (const pos of toothPositions) {
            const tooth = createTooth(pos);
            result = evaluator.evaluate(result, new CSG.Brush(tooth, this.OriginalMaterial), CSG.SUBTRACTION);
        }
        result.rotateY(Math.PI/180 * 90);

        return result;
    }

    moveArm(arm, rotArm, rotForearm) {
        // Rotación del brazo
        // rango: [-110, 90] eje x
        // rango: [-90,20]   eje y
        // rango: [-90, 90]  eje Z
        arm.rotation.set((Math.PI/180)*rotArm["rotX"], (Math.PI/180)*rotArm["rotY"], (Math.PI/180)*rotArm["rotZ"]);

        // Buscamos el antebrazo
        let forearm = arm.getObjectByName("forearm");

        // Rotación del antebrazo
        forearm.geometry.rotateX(Math.PI/180 * rotForearm["rotX"]);
        forearm.geometry.rotateY(Math.PI/180 * rotForearm["rotY"]);
        forearm.geometry.rotateZ(Math.PI/180 * rotForearm["rotZ"]);
    }

    createArm(){

        // Vamos a crear 5 piezas, hombro, parte1, codo, parte2 y puño
        // El brazo llo vamos a crear como si fuera el derecho apuntando hacia -Z, luego para ser izquierdo se invierte

        // HOMBRO
        // variables
        let height = 0.07;
        let width = 0.1;
        // Creación de shape y Geometría
        const shape1 = new THREE.Shape();
        shape1.moveTo(-width/2 * 0.9, -height/2);
        shape1.quadraticCurveTo(-width/2 * 1.26, 0,-width/2 * 0.9, height/2);
        shape1.lineTo(0, height/2);
        shape1.lineTo(0, -height/2);
        shape1.lineTo(-width/2 * 0.9, -height/2);
        const s1 = new THREE.LatheGeometry(shape1.getPoints(50), this.radialSegments);
        s1.rotateX(Math.PI/2);


        // BICEPS
        // Creación de geometría
        const biceps = new THREE.CylinderGeometry(width/2 * 0.9, width/2 * 0.7,
                                                                height*2.7, this.radialSegments);
        biceps.scale(0.9,1,1);
        biceps.rotateX(Math.PI/2);
        biceps.translate(0,0,-(height*(2.7/2)) - height/2);

        // Creamos la primera parte, compuesta del hombro y el biceps
        const shoulderBrush = new CSG.Brush(s1, this.OriginalMaterialYellow);
        const bicepsBrush = new CSG.Brush(biceps, this.OriginalMaterial);
        const part1 = this.evaluator.evaluate(shoulderBrush, bicepsBrush, CSG.ADDITION);


        // CODO Y ANTEBRAZO
        const elbow = new THREE.SphereGeometry(width/2 * 0.65, this.radialSegments);
        elbow.scale(0.9,1,1);

        const forearm = new THREE.CylinderGeometry(width/2 * 0.7, width/2 * 0.55,
                                                                    height*2.2, this.radialSegments);
        forearm.scale(0.9,1,1);
        forearm.rotateX(Math.PI/2);
        forearm.translate(0,0,-height*2.2 / 2);

        const elbowBrush = new CSG.Brush(elbow, this.OriginalMaterial);
        const forearmBrush = new CSG.Brush(forearm, this.OriginalMaterialYellow);
        const part2 = this.evaluator.evaluate(elbowBrush, forearmBrush, CSG.ADDITION);

        part2.translateZ(-height*2.7 -height/2);
        part1.name = "arm";
        part2.name = "forearm";


        const result = new THREE.Group();
        result.add(part1);
        result.add(part2);

        return result;
    }

    createTorso(){

        // TORSO - PARTE PRINCIPAL
        // variables
        let height = 0.4;
        let width = 0.4;

        const shape1 = new THREE.Shape();
        shape1.moveTo(0, -height/2, 0);
        shape1.bezierCurveTo(width/2 * 0.6, -height/2 * 0.8, width/2 * 0.5, -height * 0.5,width/2 * 0.8, 0);
        shape1.quadraticCurveTo(width/2 * 0.95, height/2 * 1.02, width/2 * 0.5, height/2 );
        shape1.lineTo(0, height/2 , 0);

        const s1 = new THREE.LatheGeometry(shape1.getPoints(50), this.radialSegments+20);

        // CUELLO
        const s2 = new THREE.CylinderGeometry(width/12, width/4,
            height/8, this.radialSegments+20);
        s2.translate(0, height/2 + height/16, 0);

        const brush1 = new CSG.Brush(s1, this.OriginalMaterial);
        const brush2 = new CSG.Brush(s2, this.OriginalMaterial);
        const result = this.evaluator.evaluate(brush1, brush2, CSG.ADDITION);
        result.geometry.scale(1,1,0.7);
        return result;
    }

    moveSting(sting, rot1, rot2, rot3){
        // Las transformaciones se aplican luego, a el grupo general para mover la pieza
        // se aplican aa temp3 que tiene name="part2" para la segunda parte
        // luego dentro de temp3 se puede buscar "stinguer" para moverlo

        // Rotación de toda la pieza
        sting.rotation.set((Math.PI/180)*rot1["rotX"], (Math.PI/180)*rot1["rotY"], (Math.PI/180)*rot1["rotZ"]);

        // Rotación part2
        let part2 = sting.getObjectByName("part2");
        part2.rotation.set((Math.PI/180)*rot2["rotX"], (Math.PI/180)*rot2["rotY"], (Math.PI/180)*rot2["rotZ"]);

        // Rotación stinger
        let st = part2.getObjectByName("stinger");
        st.rotateX((Math.PI/180) * rot3.rotX);
        st.rotateY((Math.PI/180) * rot3.rotY);
        st.rotateZ((Math.PI/180) * rot3.rotZ);
    }

    createSting(){
        // El aguijón se compone de 6 partes distintas, 3 principales

        // Conector (cilindro simple)
        let heightConector = 0.05;
        const conector = new THREE.CylinderGeometry(0.025, 0.025, heightConector, this.radialSegments);

        // Aguijón (cono simple)
        let heightSting = 0.1;
        const sting = new THREE.ConeGeometry(0.025, heightSting, this.radialSegments);

        // Cuerpo (son cuatro piezas)

        // PRIMERA PIEZA - Definimos parametros iniciales, los anchos se repiten
        // las altura son únicas para usarlas luego en transformaciones
        let heightS1 = 0.1;
        let widthTop = 0.1;
        let widthBottom = 0.15;
        const shape1 = new THREE.Shape();
        // Movimientos del shape
        shape1.moveTo(-widthBottom / 2, -heightS1 / 2);
        shape1.quadraticCurveTo(-widthBottom / 2, 0, -widthTop / 3, heightS1 / 2);
        shape1.lineTo(0, heightS1 / 2);
        shape1.lineTo(0, -heightS1 / 2);
        shape1.lineTo(-widthBottom / 2, -heightS1 / 2);
        // Definición de geometría
        const s1 = new THREE.LatheGeometry(shape1.getPoints(50), this.radialSegments);
        s1.translate(0, -heightS1 / 2 , 0); // Trasladamos para ponerla debajo

        // SEGUNDA PIEZA - Nueva variable de altura y se cambian parametros de anchos
        let heightS2 = heightS1;
        widthTop = widthTop+0.05;
        // Definición de geometría
        const s2 = new THREE.CylinderGeometry(widthTop/2, widthBottom/2, heightS2, this.radialSegments);
        s2.translate(0, -heightS2 / 2 - heightS1, 0);


        // Unión del conector con las 2 primeras piezas (TIENE UN MOVIMIENTO
        const brushS1 = new CSG.Brush(s1, this.OriginalMaterialYellow);
        const brushS2 = new CSG.Brush(s2, this.OriginalMaterial);
        let temp = this.evaluator.evaluate(brushS1, brushS2, CSG.ADDITION );
        temp.geometry.translate(0, -heightConector, 0);

        conector.translate(0, -heightConector/2, 0);
        const brushConector = new CSG.Brush(conector, this.OriginalMaterial);
        temp = this.evaluator.evaluate(brushConector, temp, CSG.ADDITION );
        // temp.geometry.rotate([-10,90],0,0) rotación de 100 grados en eje X

        let heightPART1 = heightS1 + heightS2 + heightConector;


        // TERCERA PIEZA
        let heightS3 = heightS1;
        widthBottom = widthBottom - 0.05;
        // Creación del shape
        const shape3 = new THREE.Shape();
        shape3.moveTo(-widthBottom / 2, -heightS3 / 2);
        shape3.quadraticCurveTo(-widthTop / 2, 0, -widthTop / 2, heightS3 / 2);
        shape3.lineTo(0, heightS3 / 2);
        shape3.lineTo(0, -heightS3 / 2);
        shape3.lineTo(-widthBottom / 2, -heightS3 / 2);
        // Definimos la geometría
        const s3 = new THREE.LatheGeometry(shape3.getPoints(50), this.radialSegments);


        // CUARTA PIEZA
        let heightS4 = heightS2;
        widthTop = widthTop - 0.05;
        widthBottom = widthBottom - 0.05;
        // Definimos el shape
        const shape4 = new THREE.Shape();
        shape4.moveTo(-widthBottom / 2, -heightS4 / 2);
        shape4.quadraticCurveTo(-widthTop / 2, 0, -widthTop / 2, heightS4 / 2);
        shape4.lineTo(0, heightS4 / 2);
        shape4.lineTo(0, -heightS4 / 2);
        shape4.lineTo(-widthBottom / 2, -heightS4 / 2);
        // Definimos la geometría
        const s4 = new THREE.LatheGeometry(shape4.getPoints(50), this.radialSegments);

        s3.translate(0, -heightS3/2, 0);
        s4.translate(0, -heightS4/2 - heightS3, 0);
        sting.rotateX(Math.PI);


        // Fusiones
        const compensator = new THREE.SphereGeometry(widthTop/2 * 1.4, this.radialSegments);

        const brushS3 = new CSG.Brush(s3, this.OriginalMaterialYellow);
        const brushS4 = new CSG.Brush(s4, this.OriginalMaterial);
        const brushC = new CSG.Brush(compensator, this.OriginalMaterialYellow);
        const temp2 = this.evaluator.evaluate(brushS3, brushS4, CSG.ADDITION );
        const temp2_5 = this.evaluator.evaluate(temp2, brushC, CSG.ADDITION );

        sting.translate(0, -heightSting/2, 0);
        const stinger = new THREE.Mesh(sting, this.OriginalMaterialYellow);
        stinger.translateY(- heightS4 - heightS3);
        // Al mesh del stinger le puedes añadir trasnformaciones luego para el movimiento

        stinger.name = "stinger";
        temp2_5.name = "part2_1";

        let temp3 = new THREE.Group();
        temp3.add(temp2_5);
        temp3.add(stinger);

        temp.name = "part1"; // No lo vamos a buscar
        temp3.name = "part2";

        temp3.translateY(-heightPART1);

        const piezas = new THREE.Group();
        piezas.add(temp);
        piezas.add(temp3);


        return piezas;
    }


    select() {
        this.add(this.halo);
    }

    unselect() {
        this.remove(this.halo);
    }

    update() {
        // Lógica de actualización futura
    }
}

export {Avispa}