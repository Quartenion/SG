import * as THREE from '../../libs/three.module.js'
import TWEEN from "../../libs/tween.module.js";
class Insect extends THREE.Object3D{
    constructor(name, type, team){
        super();
        this.name = name;
        this.type = type;
        this.team = team;
        // TORO PARA LA SELECCIÓN
        const geometry = new THREE.TorusGeometry(0.4, 0.02, 30);
        const material = new THREE.MeshNormalMaterial();
        this.halo = new THREE.Mesh(geometry, material);
        this.halo.rotation.x = Math.PI / 2;

        // Definimos los materiales
        if(team === 'black'){
            this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x8B0000, // DarkRed, sangre oscura y fuerte
                roughness: 0.5,        // Ligera rugosidad para evitar un acabado demasiado brillante
                metalness: 0.0,        // No metálico
                clearcoat: 0.2,        // Brillo superficial sutil
                clearcoatRoughness: 0.1,
            });
        }
        else {
            this.OriginalMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x0b0c2a, // Azul casi negro con un tinte púrpura
                roughness: 0.5,
                metalness: 0.0,
                clearcoat: 0.2,
                clearcoatRoughness: 0.1,
            });
        }
        this.OriginalMaterialYellow = new THREE.MeshPhysicalMaterial({
            color: 0xffc400,       // Amarillo brillante
            roughness: 0.5,        // Similar a las rayas negras
            metalness: 0.0,        // No metálico
            clearcoat: 0.2,        // Brillo superficial sutil
            clearcoatRoughness: 0.1,
        });
        this.wingMaterial  = new THREE.MeshPhysicalMaterial({
            color: 0x958542,
            transmission: 0.9,
            ior: 1.2,
            thickness: 0.1,
            roughness: 0.1,
            metalness: 0.0,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
        });
        this.boxingGloveMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x4a0d0d,
            roughness: 0.5,
            metalness: 0.0,
            clearcoat: 0.2,
            clearcoatRoughness: 0.1,
        });

        this.promise = null;
        this.createTween = (duration, onStart, onUpdate, resolve=null) => {
             const begin = {t: 0.0};
             const end = {t: 1.0};

             return new TWEEN.Tween(begin)
                 .to(end, duration)
                 .onStart(onStart)
                 .onUpdate(() =>{
                     onUpdate(begin.t);
                 })
                 .onComplete(() => {
                     begin.t = 0.0;
                     if (resolve){
                         resolve();
                     }
                 })
                 .easing(TWEEN.Easing.Quadratic.InOut);
        }


        this.from = null;
        this.fromRef = new THREE.Vector3(0, 0, 0);
        this.to = null;
        this.to90 = null;
        this.currentRotation = null;
        this.currentRotationCopy = new THREE.Vector3(0, 0, 0);
        this.destinationRotation = null;

        // ANIMACIÓN MOVIMIENTO RECTILINEO
        this.straightMove = this.createTween(
            1000,
            () => {
            },
            (t) => {
                this.from.lerpVectors(this.fromRef, this.to90, t);
            },
        )

        this.straightMoveP2 = this.createTween(
            1000,
            () => {
                this.fromRef.set(this.from.x, this.from.y, this.from.z);
            },
            (t) => {
                this.from.lerpVectors(this.fromRef, this.to, t);
            },
        )
        // ANIMACIÓN ROTACIÓN PARA DIRIGIRSE
        this.rotationMoveStart = this.createTween(
            1000,
            () =>{
                // Determinar el sentido al que debe mirar
                const dz = Math.sign(this.from.z - this.to.z); // -1, 0, +1
                const dx = Math.sign(this.from.x - this.to.x); // -1, 0, +1

                const key = `${dz}_${dx}`;

                let rotationMap;
                if (this.team === 'white'){
                    rotationMap = {
                      '1_-1': -45,   // Frente derecha
                      '1_0': 0,      // Frente
                      '1_1': +45,    // Frente izquierda
                      '0_-1': -90,   // Derecha
                      '0_0': 0,      // Nada
                      '0_1': +90,    // Izquierda
                      '-1_-1': -135, // Atrás derecha
                      '-1_0': 180,   // Atrás
                      '-1_1': +135,  // Atrás izquierda
                    };
                }
                else{ // Las blancas están al revés, su funcionamiento de keys es opuesto
                    rotationMap = {
                      '1_-1': -135,  // Atrás izquierda
                      '1_0': 180,    // Frente
                      '1_1': +135,   // Atrás derecha
                      '0_-1': -90,   // Izquierda
                      '0_0': 0,      // Nada
                      '0_1': +90,    // Derecha
                      '-1_-1': -45,  // Frente izquierda
                      '-1_0': 0,     // Atrás
                      '-1_1': +45,   // Frente derecha
                    };
                }

                this.rotationTo = rotationMap[key];


                // Establecer parámetros para rotar
                this.currentRotation = new THREE.Vector3(this.rotation.x,
                    this.rotation.y, this.rotation.z);
                this.currentRotationCopy.set(this.currentRotation.x, this.currentRotation.y, this.currentRotation.z);
                this.destinationRotation = new THREE.Vector3(
                    this.rotation.x,
                    this.rotation.y + (Math.PI / 180) * this.rotationTo,
                    this.rotation.z);
            },
            (t) => {
                 this.currentRotation.lerpVectors(this.currentRotationCopy,this.destinationRotation, t);
                 this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.currentRotation.z);
            },
        )

        // ANIMACIÓN ROTACIÓN PARA VOLVER A ESTADO INICIAL
        this.rotationMoveEnd = this.createTween(
            1000,
            () =>{
                // Establecer parámetros para rotar
                this.currentRotation = new THREE.Vector3(this.rotation.x,
                    this.rotation.y, this.rotation.z);
                this.destinationRotation = new THREE.Vector3(
                    this.rotation.x,
                    this.rotation.y + (Math.PI / 180) * -this.rotationTo,
                    this.rotation.z);
            },
            (t) => {
                this.currentRotation.lerpVectors(this.currentRotation,this.destinationRotation, t);
                this.rotation.set(this.currentRotation.x, this.currentRotation.y,this.rotation.z);
            },
            () => this.promise(),
        )

        this.straightMove.chain(this.rotationMoveEnd);
        this.rotationMoveStart.chain(this.straightMove);

        /*
        this.straightMoveP2.chain(this.rotationMoveEnd);
        this.straightMove.chain(this.rotationMoveEnd);
        this.rotationMoveStart.chain(this.straightMove);
        */
    }

    move(from, to, to90, time=1000, promise=null){
        if (!this.rotationMoveStart.isPlaying()){
            // SETTING STRAIGHT MOVE
            this.from = from;
            this.fromRef.set(this.from.x, this.from.y, this.from.z);
            this.to90 = to90;
            this.to = to;
            this.rotationMoveStart.duration = time;
            this.promise = promise;

            this.rotationMoveStart.start();
        }
    }

    select() {
        this.add(this.halo);
    }

    unselect() {
        this.remove(this.halo);
    }
}

export { Insect };