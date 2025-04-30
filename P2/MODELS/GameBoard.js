import * as THREE from 'three';
import { Tablero } from './Tablero.js';
import { Hormiga } from './Hormiga.js';

class GameBoard extends THREE.Object3D {
    constructor() {
        super();
        // Creamos el tablero físico que se ve y además contiene el atributo "board" que es una
        // matriz que contiene el tablero con las posiciones en el espacio de las casillas
        this.tablero = new Tablero();
        this.add(this.tablero);
    }

    startGame(){
        // Ejecutamos la creación de las fichas
        this.setUpNewGameBoard();
        this.currentTurn = null;
        this.nextTurn();
    }

    setUpNewGameBoard(){

        // Si no es la primera vez que se ejecuta se borran todas las piezas
        if (this.white) {
            console.log("Eliminando los objetos porque ya es la segunda vez")
            this.white.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });

            this.black.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            });
        }

        // Creamos nueva matriz del tablero con los objetos donde ocurre el juego
        this.tableroPiezas = [
            [new Hormiga("xN1"), new Hormiga("xN2"), new Hormiga("xN3"), new Hormiga("xN4"),
                new Hormiga("xN5"), new Hormiga("xN6"), new Hormiga("xN7"), new Hormiga("xN8")],
            [new Hormiga("pN1"), new Hormiga("pN2"), new Hormiga("pN3"), new Hormiga("pN4"),
                new Hormiga("pN5"), new Hormiga("pN6"), new Hormiga("pN7"), new Hormiga("pN8")],
            [],
            [],
            [],
            [],
            [new Hormiga("pB1"), new Hormiga("pB2"), new Hormiga("pB3"), new Hormiga("pB4"),
                new Hormiga("pB5"), new Hormiga("pB6"), new Hormiga("pB7"), new Hormiga("pB8")],
            [new Hormiga("xB1"), new Hormiga("xB2"), new Hormiga("xB3"), new Hormiga("xB4"),
                            new Hormiga("xB5"), new Hormiga("xB6"), new Hormiga("xB7"), new Hormiga("xB8")]];

        // Colocamos las piezas en su posición correspondiente con la correspondencia del tablero dibujado
        for (let i = 0; i < this.tableroPiezas.length; i++) {
            for (let j = 0; j < this.tableroPiezas[i].length; j++) {
                this.tableroPiezas[i][j].position.set(this.tablero.board[i][j][0], 0, this.tablero.board[i][j][1]);
            }
        }

        // Creamos el grupo de las white y asignamos las piezas
        this.white = new THREE.Group();

        for (let i = 6; i < this.tableroPiezas.length; i++) {
            for (let j = 0; j < this.tableroPiezas[i].length; j++) {
                this.white.add(this.tableroPiezas[i][j]);
            }
        }

        // Creamos el grupo de las black y asignamos las piezas
        this.black = new THREE.Group();

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < this.tableroPiezas[i].length; j++) {
                this.black.add(this.tableroPiezas[i][j]);
            }
        }

        // Las piezas tienen un nombre único como identificador que luego permite buscarlas
        this.add(this.white);
        this.add(this.black);
        /*
        // todo quitar esto, es solo para probar cosas, pero se puede ver las distintas formas de sacar de la matriz
        let fila = this.tableroPiezas.find(fila => fila.find(hormiga => hormiga.name === 'pN1'));
        let filaIndex  = this.tableroPiezas.findIndex(fila => fila.find(hormiga => hormiga.name === 'pN1'));
        console.log(fila.find(hormiga => hormiga.name === 'pN1'));
        console.log(`${filaIndex} ${fila.findIndex(hormiga => hormiga.name === 'pN1')}`);
        */
    }

    // Hace el turno, espera a que se ejecute selectPiece
    nextTurn(){

        if (this.currentTurn != null) { // Si es white se pone a black y si es black se pone a white
            (this.currentTurn === "white") ? this.currentTurn = "black" : this.currentTurn = "white";
        }
        else{ // Primer turno
            this.currentTurn = "white";
        }

        switch(this.currentTurn){
            case('white'):
                this.turnColor = this.white;
                break;
            case('black'):
                this.turnColor = this.black;
                break;
            default: break;
        }
    }

    selectPiece(name){
        console.log(`SELECCIONANDO PIEZA ${name}`);
        this.selectedPiece = name;
        // Devolvería los movimientos posibles
    }

    // Recibe un movimiento de los posibles que se han obtenido con selectPiece
    makeMovement(movement, name){
        console.log(`MOVIENDO PIEZA ${name}`);
        // Se realiza el movimiento en concreto, el movimiento puede ser una casilla o algo (un par de índices)
        // El movimiento consiste en dos cosas, cambiar la matriz, poniendo a undefined la casilla origen y asignando
        // la pieza a la casilla destino, y luego la otra cosa es aplicar una animación utilizando las coordenadas origen
        // y destino
    }

    update(){
        if (this.tableroPiezas) {
            for (let i = 0; i < this.tableroPiezas.length; i++) {
                for (let j = 0; j < this.tableroPiezas[i].length; j++) {
                    if (this.tableroPiezas[i][j]) this.tableroPiezas[i][j].update();
                }
            }
        }
    }

}

export {GameBoard};