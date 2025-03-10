import * as THREE from '../../../libs/three.module.js'

class PeonRevolucion extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui, titleGui);

        this.material = new THREE.MeshNormalMaterial({ 
            flatShading: true,
            side: THREE.DoubleSide
         });

        this.createGeometry(); // Crear el peón al inicio
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            resolucion: 10,
            angulo: Math.PI * 2,
            flatShading: true,

            reset: () => {
                this.guiControls.resolucion = 10;
                this.guiControls.angulo = Math.PI * 2;
                this.guiControls.flatShading = true;

                this.updateShading();
                this.updateGeometry();
            },

            hide: () => {
                this.visible = !this.visible; // Alternar visibilidad
            }
        };

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'resolucion', 3, 50, 1).name('Resolución: ').listen().onChange(() => this.updateGeometry());
        folder.add(this.guiControls, 'angulo', 0.1, Math.PI * 2, 0.1).name('Ángulo: ').listen().onChange(() => this.updateGeometry());
        folder.add(this.guiControls, 'flatShading').name('Sombreado plano').listen().onChange(() => this.updateShading());
        folder.add(this.guiControls, 'reset').name('[ Reset ]');
        folder.add(this.guiControls, 'hide').name('[ Mostrar/Ocultar ]');
    }

    createGeometry() {
        const x = 0, y = 0;
        const pawnShape = new THREE.Shape();

        // Definir el perfil del peón
        pawnShape.moveTo( x , y );     
        pawnShape.lineTo( x + 1 , y );
        pawnShape.lineTo( x + 1, y + 0.5 );
        pawnShape.quadraticCurveTo( x + 0.3 , y + 0.5 , x + 0.2, y + 2 );
        pawnShape.bezierCurveTo(x + 1 , y + 2.33 , x + 0.5, y + 3.1, x + 0, y + 3);
        
        const points = pawnShape.getPoints(50);
        
        // Crear la geometría de revolución
        this.latheGeometry = new THREE.LatheGeometry(points, this.guiControls.resolucion, 0, this.guiControls.angulo);
        this.latheMesh = new THREE.Mesh(this.latheGeometry, this.material);
        this.add(this.latheMesh);
    }

    updateGeometry() {
        // Eliminar la geometría anterior antes de agregar la nueva
        this.remove(this.latheMesh);

        // Volver a generar la geometría con los nuevos parámetros
        this.latheGeometry.dispose();
        this.createGeometry();
    }

    updateShading() {
        this.material.flatShading = this.guiControls.flatShading;
        this.material.needsUpdate = true;
    }

    update() {
        // Aquí puedes agregar animaciones si lo necesitas
    }
}

export { PeonRevolucion };
