import * as TWEEN from '../../../../libs/tween.module.js';

class LegAnimator {
    constructor(pata, eje = 'x', angulo = Math.PI / 6, tiempo = 500) {
        this.pata = pata;
        this.eje = eje;
        this.angulo = angulo;
        this.tiempo = tiempo;

        this.tween = new TWEEN.Tween({ rot: -angulo })
            .to({ rot: angulo }, this.tiempo)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .yoyo(true)
            .repeat(Infinity)
            .onUpdate(obj => {
                this.pata.rotation[this.eje] = obj.rot;
            });
    }

    start() {
        this.tween.start();
    }
}

export { LegAnimator };