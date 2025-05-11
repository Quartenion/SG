import * as THREE from '../../libs/three.module.js'
import * as CSG from 'csg';

class Avispa extends THREE.Object3D{
    constructor(){
        super();

        // Definimos los materiales
        this.OriginalMaterialBlack = new THREE.MeshBasicMaterial({color:0x000822});
        //this.OriginalMaterialBlack = new THREE.MeshNormalMaterial({})

        this.OriginalMaterialYellow = new THREE.MeshBasicMaterial({color:0xffe135});

        this.radialSegments = 20;
        this.evaluator = new CSG.Evaluator();
        this.ratioScale = new THREE.Vector3(10,10,10);

        // La escala de la avispa está en el metro, es decir, entra dentro de un cubo
        // de un metro y luego se puede escalar a proporción


        // Creamos y colocamos el torso
        this.torso = this.createTorso();
        //this.torso.scale.set(this.ratioScale.x, this.ratioScale.y, this.ratioScale.z);
        this.torso.geometry.translate(0,0.17,0);
        this.add(this.torso);

        // Creamos y colocamos el Aguijon
        this.sting = this.createSting();
        // Translate y add
        //this.sting.scale.set(this.ratioScale.x, this.ratioScale.y, this.ratioScale.z);
        this.add(this.sting);



    }

    createTorso(){

        // TORSO - PARTE PRINCIPAL
        // variables
        let height = 0.4;
        let width = 0.4;

        const shape1 = new THREE.Shape();
        shape1.moveTo(0, -height/2, 0);
        shape1.bezierCurveTo(-width/2 * 0.6, -height/2 * 0.8, -width/2 * 0.5, -height * 0.5,
                                    -width/2 * 0.8, 0);

        shape1.quadraticCurveTo(-width/2 * 0.95, height/2 * 1.02, -width/2 * 0.5, height/2 );
        shape1.lineTo(0, height/2 , 0);
        shape1.lineTo(0, -height/2, 0);

        const s1 = new THREE.LatheGeometry(shape1.getPoints(50), this.radialSegments+20);

        // CUELLO
        const s2 = new THREE.CylinderGeometry(width/12, width/4,
            height/8, this.radialSegments+20);
        s2.translate(0, height/2 + height/16, 0);

        const brush1 = new CSG.Brush(s1, this.OriginalMaterialBlack);
        const brush2 = new CSG.Brush(s2, this.OriginalMaterialYellow);
        const result = this.evaluator.evaluate(brush1, brush2, CSG.ADDITION);
        result.geometry.scale(1,1,0.7);

        return result;
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
        const brushS2 = new CSG.Brush(s2, this.OriginalMaterialBlack);
        let temp = this.evaluator.evaluate(brushS1, brushS2, CSG.ADDITION );
        temp.geometry.translate(0, -heightConector, 0);

        conector.translate(0, -heightConector/2, 0);
        const brushConector = new CSG.Brush(conector, this.OriginalMaterialBlack);
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


        const compensator = new THREE.SphereGeometry(widthTop/2 * 0.95, this.radialSegments);

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

        s3.translate(0, -heightS3/2 , 0);
        s4.translate(0, -heightS4/2 - heightS3 , 0);
        sting.rotateX(Math.PI);
        // sting.geometry.rotate([0,45],0,0) rotación de 100 grados en eje X
        sting.translate(0, -heightSting/2 - heightS4 - heightS3 , 0);

        const brushS3 = new CSG.Brush(s3, this.OriginalMaterialYellow);
        const brushS4 = new CSG.Brush(s4, this.OriginalMaterialBlack);
        const brushSting = new CSG.Brush(sting, this.OriginalMaterialYellow);

        let temp2 = this.evaluator.evaluate(brushS4, brushS3, CSG.ADDITION );
        let temp3 = this.evaluator.evaluate(temp2, brushSting, CSG.ADDITION );

        const brushC = new CSG.Brush(compensator, this.OriginalMaterialYellow);
        let temp4 = this.evaluator.evaluate(temp3, brushC, CSG.ADDITION );

        //temp4.geometry.rotateX(45*(Math.PI/180),0,0); // Rotación de 0 a 45 grados
        temp4.geometry.translate(0, - heightPART1, 0);

        let result = this.evaluator.evaluate(temp, temp4, CSG.ADDITION);
        //result.geometry.rotateX(40*(Math.PI/180)); // rotación entre -10 y 60

        return  result;
    }

}

export {Avispa}