import * as THREE from '../../libs/three.module.js'
import * as CSG from '../../libs/three-bvh-csg.js';
import TWEEN from "../../libs/tween.module.js";
import { Insect } from "./Insect.js";


class Avispa extends Insect{
   constructor(name, type, team){
       super(name, type, team);


       this.radialSegments = 20;
       this.evaluator = new CSG.Evaluator();
       this.ratioScale = new THREE.Vector3(10,10,10);
       this.promise = null;


       this.createAnimations();


       // La escala de la avispa está en el metro, es decir, entra dentro de un cubo
       // de un metro y luego se puede escalar a proporción




       // Creamos y colocamos el torso
       this.torso = this.createTorso();
       //this.torso.scale.set(this.ratioScale.x, this.ratioScale.y, this.ratioScale.z);
       this.torso.translateY(0.17);


       // Creamos y colocamos el Aguijon
       this.rot1 = new THREE.Vector3(10,0,0);
       this.rot2 = new THREE.Vector3(20,0,0);
       this.rot3 = new THREE.Vector3(10,0,0);
       this.sting = this.createSting();
       //this.sting.scale.set(this.ratioScale.x, this.ratioScale.y, this.ratioScale.z);
       this.add(this.sting);




       // Creamos y colocamos los brazos son un THREE.Group
       this.rotArmR =      new THREE.Vector3(-40,0,30);
       this.rotForearmR =  new THREE.Vector3( 30,0,0);
       this.rotArmL =      new THREE.Vector3(-40,-0,-30);
       this.rotForearmL =  new THREE.Vector3( 30,-0,-0);




       this.armRight = this.createArm();
       this.armRight.name = "right";
       this.armRight.position.x += 0.17;
       this.armRight.position.y += 0.31;
       this.armRight.position.z += 0;


       this.armLeft = this.createArm();
       this.armLeft.name = "left";
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




       this.moveArm(this.armLeft, this.rotArmL, this.rotForearmL);
       this.moveArm(this.armRight, this. rotArmR, this.rotForearmR);
       this.upper.rotateX(Math.PI / 180 * -15);
       this.moveSting();
       this.add(this.upper);


       this.scale.set(0.15,0.15,0.15);
       this.translateY(0.08);
   }


   createAnimations(){
       // Interpolación de posición para el combate
       this.currentPos = null
       this.currentPosCopy = new THREE.Vector3(0, 0, 0);
       this.destinationPos = null;


       // POSICIONES INICIALES ANIMACIÓN BACK-UP
       this.originalRewindPos = new THREE.Vector3(0, 0, 0);
       this.originalRewindRotation = null;


       // POSICIONES INICIALES ANIMACIÓN PUNCH
       this.rewindPos = new THREE.Vector3(0, 0, 0);
       this.rewindRotation = null;
       this.rewindArmRotation = null;
       this.rewindForearmRotation = null;


       // POSICIONES INICIALES ANIMACIÓN CHARGE
       this.rewindChargeRotationR = null;
       this.rewindChargeArmRotationR = null;
       this.rewindChargeArmRotationL = null;
       this.rewindChargeForearmRotationL = null;


       // STEP 1 - BACKING UP
       this.combatAnim = this.createTween(
           600,
           () => {
               this.currentPos = this.from;
               this.originalRewindPos = this.currentPos.clone();
               this.originalRewindRotation = this.rotation.clone();




               this.currentPosCopy.set(this.currentPos.x, this.currentPos.y, this.currentPos.z);
               if (this.team === "white"){
                   this.destinationPos = new THREE.Vector3(this.currentPos.x,this.currentPos.y + 0.07,this.currentPos.z + 0.05);
                   this.destinationRotation = new THREE.Vector3(this.rotation.x +(Math.PI/180)*-15,this.rotation.y,this.rotation.z);
               }
               else{
                   this.destinationPos = new THREE.Vector3(this.currentPos.x,this.currentPos.y + 0.07,this.currentPos.z - 0.05);
                   this.destinationRotation = new THREE.Vector3(this.rotation.x +(Math.PI/180)*15,this.rotation.y,this.rotation.z);
               }
               this.currentRotationCopy.set(this.currentRotation.x, this.currentRotation.y, this.currentRotation.z);
           },
           (t) => {
               this.currentPos.lerpVectors(this.currentPosCopy, this.destinationPos, t);
               this.currentRotation.lerpVectors(this.currentRotationCopy, this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y, this.rotation.z);
           },
       )


       // STEP 2 - CHARGING RIGHT ARM
       const chargeRightArmAnim = this.createTween(
           450,
           () => {
               this.rotArmCopyR      = this.rotArmR.clone();
               this.rotForearmCopyR  = this.rotForearmR.clone();
               this.rotArmCopyL      = this.rotArmL.clone();
               this.rotForearmCopyL  = this.rotForearmL.clone();


               this.rewindChargeRotationR = this.currentRotation.clone();
               this.rewindChargeArmRotationR = this.rotArmR.clone();
               this.rewindChargeForearmRotationR = this.rotForearmR.clone();
               this.rewindChargeArmRotationL = this.rotArmL.clone();
               this.rewindChargeForearmRotationL = this.rotForearmL.clone();


               // Modificar sumando o restando lo que se quiera
               this.destinationArmRotationR      = new THREE.Vector3    (0,  -110,0 );
               this.destinationForearmRotationR  = new THREE.Vector3(0,  90,  0 );
               this.destinationArmRotationL      = new THREE.Vector3    (-90,0,   0 );
               this.destinationForearmRotationL  = new THREE.Vector3(90, 0,   0 );


               this.currentRotationCopy.set(this.currentRotation.x, this.currentRotation.y, this.currentRotation.z);
               this.destinationRotation = new THREE.Vector3(this.rotation.x,this.rotation.y + (Math.PI / 180) * -30,this.rotation.z);
           },
           (t) => {
               // BRAZO DERECHO
               this.rotArmR.lerpVectors(this.rotArmCopyR, this.destinationArmRotationR, t);
               this.rotForearmR.lerpVectors(this.rotForearmCopyR, this.destinationForearmRotationR, t);
               this.moveArm(this.armRight, this.rotArmR, this.rotForearmR);


               // BRAZO IZQUIERDO
               this.rotArmL.lerpVectors(this.rotArmCopyL, this.destinationArmRotationL, t);
               this.rotForearmL.lerpVectors(this.rotForearmCopyL, this.destinationForearmRotationL, t);
               this.moveArm(this.armLeft, this.rotArmL, this.rotForearmL);


               // CUERPO
               this.currentRotation.lerpVectors(this.currentRotationCopy,this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.currentRotation.z);
           },
       )


       // STEP 3 - RIGHT PUNCH
       const rightPunchAnim = this.createTween(
           300,
           () => {
               this.rewindPos = this.currentPos.clone();
               this.rewindRotation = this.currentRotation.clone();
               this.rewindArmRotation = this.rotArmR.clone();
               this.rewindForearmRotation = this.rotForearmR.clone();


               this.currentPosCopy.set(this.currentPos.x, this.currentPos.y, this.currentPos.z);
               if (this.team === "white"){
                   this.destinationPos = new THREE.Vector3(this.currentPos.x,this.currentPos.y - 0.07,this.currentPos.z - 0.07);
               }
               else{
                   this.destinationPos = new THREE.Vector3(this.currentPos.x,this.currentPos.y - 0.07,this.currentPos.z + 0.07);
               }


               this.rotArmCopyR = this.rotArmR.clone();
               this.rotForearmCopyR = this.rotForearmR.clone();
               // Modificar sumando o restando lo que se quiera
               this.destinationArmRotationR = new THREE.Vector3(-20,30,0 );
               this.destinationForearmRotationR = new THREE.Vector3(0,30,0 );


               this.currentRotationCopy = this.currentRotation.clone();
               this.destinationRotation = new THREE.Vector3(this.rotation.x,this.rotation.y+(Math.PI/180)*60,this.rotation.z);
           },
           (t) => {
               // BRAZO
               this.rotArmR.lerpVectors(this.rotArmCopyR, this.destinationArmRotationR, t);
               this.rotForearmR.lerpVectors(this.rotForearmCopyR, this.destinationForearmRotationR, t);
               this.moveArm(this.armRight, this.rotArmR, this.rotForearmR);


               // CUERPO
               this.currentRotation.lerpVectors(this.currentRotationCopy,this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.rotation.z);


               // POSICION
               this.currentPos.lerpVectors(this.currentPosCopy, this.destinationPos, t);
           },
       )


       const rightRewindPunchAnim = this.createTween(
           300,
           () => {
               this.currentPosCopy.set(this.currentPos.x, this.currentPos.y, this.currentPos.z);
               this.currentRotationCopy = this.currentRotation.clone();
               this.rotArmCopyR = this.rotArmR.clone();
               this.rotForearmCopyR = this.rotForearmR.clone();


               this.destinationPos = this.rewindPos.clone();
               this.destinationRotation = this.rewindRotation.clone();
               this.destinationArmRotationR = this.rewindArmRotation.clone();
               this.destinationForearmRotationR = this.rewindForearmRotation.clone();
           },
           (t) => {
               // BRAZO
               this.rotArmR.lerpVectors(this.rotArmCopyR, this.destinationArmRotationR, t);
               this.rotForearmR.lerpVectors(this.rotForearmCopyR, this.destinationForearmRotationR, t);
               this.moveArm(this.armRight, this.rotArmR, this.rotForearmR);


               // CUERPO
               this.currentRotation.lerpVectors(this.currentRotationCopy,this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.rotation.z);


               // POSICION
               this.currentPos.lerpVectors(this.currentPosCopy, this.destinationPos, t);
           },
       )


       const rightRewindChargeAnim = this.createTween(
           450,
           () => {
               this.rotArmCopyR      = this.rotArmR.clone();
               this.rotForearmCopyR  = this.rotForearmR.clone();
               this.rotArmCopyL      = this.rotArmL.clone();
               this.rotForearmCopyL  = this.rotForearmL.clone();
               this.currentRotationCopy.set(this.currentRotation.x, this.currentRotation.y, this.currentRotation.z);


               // Modificar sumando o restando lo que se quiera
               this.destinationArmRotationR      = this.rewindChargeArmRotationR.clone();
               this.destinationForearmRotationR  = this.rewindChargeForearmRotationR.clone();
               this.destinationArmRotationL      = this.rewindChargeArmRotationL.clone();
               this.destinationForearmRotationL  = this.rewindChargeForearmRotationL.clone();
               this.destinationRotation = this.rewindChargeRotationR.clone();
           },
           (t) => {
               // BRAZO DERECHO
               this.rotArmR.lerpVectors(this.rotArmCopyR, this.destinationArmRotationR, t);
               this.rotForearmR.lerpVectors(this.rotForearmCopyR, this.destinationForearmRotationR, t);
               this.moveArm(this.armRight, this.rotArmR, this.rotForearmR);


               // BRAZO IZQUIERDO
               this.rotArmL.lerpVectors(this.rotArmCopyL, this.destinationArmRotationL, t);
               this.rotForearmL.lerpVectors(this.rotForearmCopyL, this.destinationForearmRotationL, t);
               this.moveArm(this.armLeft, this.rotArmL, this.rotForearmL);


               // CUERPO
               this.currentRotation.lerpVectors(this.currentRotationCopy,this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.currentRotation.z);
           },
       )


       // STEP 4 - CHARGING LEFT ARM
       const chargeLeftArmAnim = this.createTween(
           450,
           () => {
               this.rotArmCopyL     = this.rotArmL.clone();
               this.rotForearmCopyL = this.rotForearmL.clone();
               this.rotArmCopyR     = this.rotArmR.clone();
               this.rotForearmCopyR = this.rotForearmR.clone();


               this.rewindChargeRotationR = this.currentRotation.clone();
               this.rewindChargeArmRotationR = this.rotArmR.clone();
               this.rewindChargeForearmRotationR = this.rotForearmR.clone();
               this.rewindChargeArmRotationL = this.rotArmL.clone();
               this.rewindChargeForearmRotationL = this.rotForearmL.clone();


               this.destinationArmRotationL     = new THREE.Vector3(0, 110, 0);
               this.destinationForearmRotationL = new THREE.Vector3(0, -90, 0);
               this.destinationArmRotationR     = new THREE.Vector3(-20, -90, 0);
               this.destinationForearmRotationR = new THREE.Vector3(0, 90, 0);


               this.currentPosCopy = this.currentPos.clone();
               if (this.team === "white"){
                   this.destinationPos = new THREE.Vector3(this.currentPos.x,this.currentPos.y + 0.07,this.currentPos.z + 0.07);
               }
               else{
                   this.destinationPos = new THREE.Vector3(this.currentPos.x,this.currentPos.y + 0.07,this.currentPos.z - 0.07);
               }


           },
           (t) => {
               // BRAZO DERECHO
               this.rotArmR.lerpVectors(this.rotArmCopyR, this.destinationArmRotationR, t);
               this.rotForearmR.lerpVectors(this.rotForearmCopyR, this.destinationForearmRotationR, t);
               this.moveArm(this.armRight, this.rotArmR, this.rotForearmR);


               // BRAZO IZQUIERDO
               this.rotArmL.lerpVectors(this.rotArmCopyL, this.destinationArmRotationL, t);
               this.rotForearmL.lerpVectors(this.rotForearmCopyL, this.destinationForearmRotationL, t);
               this.moveArm(this.armLeft, this.rotArmL, this.rotForearmL);


               // POSICION
               this.currentPos.lerpVectors(this.currentPosCopy, this.destinationPos, t);
           }
       );


       // STEP 5 - LEFT PUNCH
       const leftPunchAnim = this.createTween(
           300,
           () => {
               this.rewindPos = this.currentPos.clone();
               this.rewindRotation = this.currentRotation.clone();
               this.rewindArmRotation = this.rotArmL.clone();
               this.rewindForearmRotation = this.rotForearmL.clone();


               this.currentPosCopy.copy(this.currentPos);
               if (this.team === "white"){
                   this.destinationPos.set(this.currentPos.x,this.currentPos.y - 0.07,this.currentPos.z - 0.07);
               }
               else{
                   this.destinationPos.set(this.currentPos.x,this.currentPos.y - 0.07,this.currentPos.z + 0.07);
               }


               this.rotArmCopyL = this.rotArmL.clone();
               this.rotForearmCopyL = this.rotForearmL.clone();


               this.destinationArmRotationL = new THREE.Vector3(-20, -30, 0);
               this.destinationForearmRotationL = new THREE.Vector3(0, -30, 0);


               this.currentRotationCopy = this.currentRotation.clone();
               this.destinationRotation.set(this.rotation.x,this.rotation.y + (Math.PI / 180) * -60,this.rotation.z);
           },
           (t) => {
               this.rotArmL.lerpVectors(this.rotArmCopyL, this.destinationArmRotationL, t);
               this.rotForearmL.lerpVectors(this.rotForearmCopyL, this.destinationForearmRotationL, t);
               this.moveArm(this.armLeft, this.rotArmL, this.rotForearmL);


               this.currentRotation.lerpVectors(this.currentRotationCopy, this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y, this.rotation.z);


               this.currentPos.lerpVectors(this.currentPosCopy, this.destinationPos, t);
           }
       );


       const leftRewindPunchAnim = this.createTween(
           300,
           () => {
               this.currentPosCopy.set(this.currentPos.x, this.currentPos.y, this.currentPos.z);
               this.currentRotationCopy = this.currentRotation.clone();
               this.rotArmCopyL = this.rotArmL.clone();
               this.rotForearmCopyL = this.rotForearmL.clone();


               this.destinationPos = this.rewindPos.clone();
               this.destinationRotation = this.rewindRotation.clone();
               this.destinationArmRotationL = this.rewindArmRotation.clone();
               this.destinationForearmRotationL = this.rewindForearmRotation.clone();
           },
           (t) => {
               // BRAZO
               this.rotArmL.lerpVectors(this.rotArmCopyL, this.destinationArmRotationL, t);
               this.rotForearmL.lerpVectors(this.rotForearmCopyL, this.destinationForearmRotationL, t);
               this.moveArm(this.armLeft, this.rotArmL, this.rotForearmL);


               // CUERPO
               this.currentRotation.lerpVectors(this.currentRotationCopy,this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.rotation.z);


               // POSICION
               this.currentPos.lerpVectors(this.currentPosCopy, this.destinationPos, t);
           },
       )


       const leftRewindChargeAnim = this.createTween(
           450,
           () => {
               this.rotArmCopyL     = this.rotArmL.clone();
               this.rotForearmCopyL = this.rotForearmL.clone();
               this.rotArmCopyR     = this.rotArmR.clone();
               this.rotForearmCopyR = this.rotForearmR.clone();
               this.currentRotationCopy.set(this.currentRotation.x, this.currentRotation.y, this.currentRotation.z);


               // Modificar sumando o restando lo que se quiera
               this.destinationArmRotationL     = this.rewindChargeArmRotationL.clone();
               this.destinationForearmRotationL = this.rewindChargeForearmRotationL.clone();
               this.destinationArmRotationR     = this.rewindChargeArmRotationR.clone();
               this.destinationForearmRotationR = this.rewindChargeForearmRotationR.clone();
               this.destinationRotation = this.rewindChargeRotationR.clone();
           },
           (t) => {
               // BRAZO DERECHO
               this.rotArmR.lerpVectors(this.rotArmCopyR, this.destinationArmRotationR, t);
               this.rotForearmR.lerpVectors(this.rotForearmCopyR, this.destinationForearmRotationR, t);
               this.moveArm(this.armRight, this.rotArmR, this.rotForearmR);


               // BRAZO IZQUIERDO
               this.rotArmL.lerpVectors(this.rotArmCopyL, this.destinationArmRotationL, t);
               this.rotForearmL.lerpVectors(this.rotForearmCopyL, this.destinationForearmRotationL, t);
               this.moveArm(this.armLeft, this.rotArmL, this.rotForearmL);


               // CUERPO
               this.currentRotation.lerpVectors(this.currentRotationCopy,this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.rotation.z);
           },
       )


       const originalRewindAnim = this.createTween(
           600,
           () => {
               this.currentPosCopy.set(this.currentPos.x, this.currentPos.y, this.currentPos.z);
               this.currentRotationCopy.set(this.currentRotation.x, this.currentRotation.y, this.currentRotation.z);


               this.destinationPos = this.originalRewindPos.clone();
               this.destinationRotation = this.originalRewindRotation.clone();
           },
           (t) => {
               this.currentPos.lerpVectors(this.currentPosCopy, this.destinationPos, t);
               this.currentRotation.lerpVectors(this.currentRotationCopy, this.destinationRotation, t);
               this.rotation.set(this.currentRotation.x, this.currentRotation.y, this.rotation.z);
           },
       )
       // LAST STEP - UNDO MOVEMENTS
      
       this.combatAnim.chain(chargeRightArmAnim);
       chargeRightArmAnim.chain(rightPunchAnim);
       rightPunchAnim.chain(rightRewindPunchAnim);
       rightRewindPunchAnim.chain(rightRewindChargeAnim);
       rightRewindChargeAnim.chain(chargeLeftArmAnim);
       chargeLeftArmAnim.chain(leftPunchAnim);
       leftPunchAnim.chain(leftRewindPunchAnim);
       leftRewindPunchAnim.chain(leftRewindChargeAnim);
       leftRewindChargeAnim.chain(originalRewindAnim);
       // volver a posición original
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
       // rango: [-90, 90]  eje Zº
       arm.rotation.set((Math.PI/180)*rotArm.x, (Math.PI/180)*rotArm.y, (Math.PI/180)*rotArm.z);


       // Buscamos el antebrazo
       let forearm = arm.getObjectByName("forearm");


       // Rotación del antebrazo
       forearm.rotation.set(Math.PI/180 * rotForearm.x, Math.PI/180 * rotForearm.y,
           Math.PI/180 * rotForearm.z);
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




       // CODO Y ANTEBRAZO Y MANOS
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


       const handBrush = new CSG.Brush(this.createHand(), this.boxingGloveMaterial);
       handBrush.geometry.translate(0,0,-height*2.2 / 2 - 0.05);


       const part3 = this.evaluator.evaluate(part2, handBrush, CSG.ADDITION);




       part3.translateZ(-height*2.7 -height/2);
       part1.name = "arm";
       part3.name = "forearm";




       const result = new THREE.Group();
       result.add(part1);
       result.add(part3);


       return result;
   }


   createHand(){
       const baseShape = new THREE.Shape();
       baseShape.moveTo(0, 0);
       baseShape.lineTo(-0.01,0);
       baseShape.lineTo(-0.01,0.04);
       baseShape.lineTo(0,0.04);
       baseShape.lineTo(0,0);


       const extrudeSettings ={
           steps: 50,
           depth: 0.1,
           bevelEnabled: true,
           bevelSize: 0.03,
           bevelThickness: 0.04,
           bevelSteps: 50,
       }
       const base = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
       base.translate(0.005,-0.02,-0.05);


       return base;
   }


   createWing(){
       const alaShape = new THREE.Shape();
       alaShape.moveTo(0, 0); // base ancha y redondeada
       alaShape.lineTo(0.1, 0);
       alaShape.quadraticCurveTo(0.2, 0.5, 0.1, 1);
       alaShape.lineTo(0, 1.1);
       alaShape.lineTo(0,0);


       const extrudeSettings = {
           depth: 0.01,
           bevelEnabled: false,
       };


       return new THREE.ExtrudeGeometry(alaShape, extrudeSettings);
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
       const body = this.evaluator.evaluate(brush1, brush2, CSG.ADDITION);


       const wing1 = this.createWing();
       wing1.name = "rightWing";
       const wing2 = this.createWing();
       wing2.name = "leftWing";


       wing1.translate(0,0,-0.005);
       wing2.translate(0,0,-0.005);


       wing2.rotateY((Math.PI/180)*180);


       wing1.rotateX((Math.PI/180)*-240);
       wing2.rotateX((Math.PI/180)*-240);


       wing1.rotateY(Math.PI/180 * 20);
       wing2.rotateY(Math.PI/180 * -20);


       wing1.translate(0,height/2-0.03, width/4);
       wing2.translate(0,height/2-0.03, width/4);


       const result = new THREE.Group();
       result.add(body);
       result.add(new THREE.Mesh(wing1, this.wingMaterial));
       result.add(new THREE.Mesh(wing2, this.wingMaterial));


       result.scale.set(1,1,0.7);
       return result;
   }


   moveSting(){
       // Las transformaciones se aplican luego, a el grupo general para mover la pieza
       // se aplican aa temp3 que tiene name="part2" para la segunda parte
       // luego dentro de temp3 se puede buscar "stinguer" para moverlo


       // Rotación de toda la pieza
       this.sting.rotation.set((Math.PI/180)*this.rot1.x, (Math.PI/180)*this.rot1.y, (Math.PI/180)*this.rot1.z);


       // Rotación part2
       let part2 = this.sting.getObjectByName("part2");
       part2.rotation.set((Math.PI/180)*this.rot2.x, (Math.PI/180)*this.rot2.y, (Math.PI/180)*this.rot2.z);


       // Rotación stinger
       let st = part2.getObjectByName("stinger");
       st.rotateX((Math.PI/180) * this.rot3.x);
       st.rotateY((Math.PI/180) * this.rot3.y);
       st.rotateZ((Math.PI/180) * this.rot3.z);
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




   move(from, to, to90,time=1000, promise=null) {
       // Encadenar animaciones
       this.straightMove.chain(this.rotationMoveEnd);
       this.rotationMoveStart.chain(this.straightMove);
       super.move(from, to, to90, time, promise);
   }


   moveCombat(from, to, to90, time=1000, promise=null){
       // Encadenar animaciones
       this.straightMoveP2.chain(this.rotationMoveEnd);
       //this.leftPunchAnim.chain(this.straightMoveP2);
       this.straightMove.chain(this.combatAnim);
       this.rotationMoveStart.chain(this.straightMove);
       super.move(from, to, to90, time, promise);
   }
   update() {
       TWEEN.update();
   }
}


export {Avispa}

