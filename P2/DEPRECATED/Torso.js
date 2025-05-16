import * as THREE from 'three';

class Torso extends THREE.Object3D {
  constructor() {
    super();

    let height = 0.4;
    let width = 0.4;

    this.torsoShape = new THREE.Shape();
    this.torsoShape.moveTo(0, -height/2, 0);
    this.torsoShape.bezierCurveTo(width/2 * 0.6, -height/2 * 0.8, width/2 * 0.5, -height * 0.5,width/2 * 0.8, 0);
    this.torsoShape.quadraticCurveTo(width/2 * 0.95, height/2 * 1.02, width/2 * 0.5, height/2 );
    this.torsoShape.lineTo(0, height/2 , 0);

    this.drawSolid();
  }

  drawLines() {
    const points = this.torsoShape.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.OriginalMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const object = new THREE.Line(geometry, this.OriginalMaterial);

    this.add(object);
  }

  drawSolid() {
    this.OriginalMaterial = new THREE.MeshPhysicalMaterial({ color: 0x2a1b0a });

    const points = this.torsoShape.getPoints(50);
    const geo = new THREE.LatheGeometry(points, 50);
    const mesh = new THREE.Mesh(geo, this.OriginalMaterial);

    this.add(mesh);
  }
}

export { Torso };
