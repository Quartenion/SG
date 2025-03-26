import * as THREE from '../../../libs/three.module.js'

class Beetle_shape extends THREE.Object3D {
    constructor()
    {
        super();
        let shapePoints = this.createShape();
        let geometry = new THREE.BufferGeometry().setFromPoints(shapePoints);
        let material = new THREE.LineBasicMaterial({color: 0x000000 });

        let shapeMesh = new THREE.Line(geometry, material);

        this.add(shapeMesh);
    }

    createShape()
    {
        let shape = new THREE.Shape();
        let x, y;

        x = y = 0;
        shape.moveTo(x,y);
        shape.bezierCurveTo(x+0.6,y+0.33 ,x+0.6, y+0.66, x,y+1);
        shape.bezierCurveTo(x+0.4,y+1.25 ,x+0.4, y+1.50, x,y+1.75);
        shape.bezierCurveTo(x+0.1,y+1.8 ,x+0.1, y+1.88, x,y+2);

        return shape.getPoints(50);
    }

    getShapePoints()
    {
        return this.createShape();
    }

    update(){}
}

export { Beetle_shape };