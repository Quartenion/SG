import * as THREE from 'three';
import * as TWEEN from 'tween';
import { Tablero } from './Tablero.js';
import { Hormiga } from './Hormiga/Hormiga.js';
import { Saltamontes } from './Saltamontes/Saltamontes.js';
import { EscarabajoPelotero } from './EscarabajoPelotero/EscarabajoPelotero.js';
import { StraightAnimator } from './Animator.js';
import { Avispa } from './Avispa.js';

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
            console.log("Eliminando los objetos porque ya es la segunda vez");
            this.white.children.forEach(child => {
                child.children[0].geometry.dispose();
                child.children[0].material.dispose();
                this.white.remove(child);
            })

            this.black.children.forEach(child => {
                child.children[0].geometry.dispose();
                child.children[0].material.dispose();
                this.black.remove(child);
            })

            this.remove(this.white);
            this.remove(this.black);
        }

        // Creamos nueva matriz del tablero con los objetos donde ocurre el juego
        this.tableroPiezas = [
            [new EscarabajoPelotero("xN1", "rook", "black"), new Saltamontes("xN2", "horse", "black"), new Avispa("xN3", "bishop", "black"), new Hormiga("xN4", "queen", "black"),
                new Hormiga("xN5", "king", "black"), new Avispa("xN6", "bishop", "black"), new Saltamontes("xN7", "horse", "black"), new EscarabajoPelotero("xN8", "rook", "black")],
            [new Hormiga("pN1", "pawn", "black"), new Hormiga("pN2", "pawn", "black"), new Hormiga("pN3", "pawn", "black"), new Hormiga("pN4", "pawn", "black"),
                new Hormiga("pN5", "pawn", "black"), new Hormiga("pN6", "pawn", "black"), new Hormiga("pN7", "pawn", "black"), new Hormiga("pN8", "pawn", "black")],
            [],
            [],
            [],
            [],
            [new Hormiga("pB1", "pawn", "white"), new Hormiga("pB2", "pawn", "white"), new Hormiga("pB3", "pawn", "white"), new Hormiga("pB4", "pawn", "white"),
                new Hormiga("pB5", "pawn", "white"), new Hormiga("pB6", "pawn", "white"), new Hormiga("pB7", "pawn", "white"), new Hormiga("pB8", "pawn", "white")],
            [new EscarabajoPelotero("xB1", "rook", "white"), new Saltamontes("xB2", "horse", "white"), new Avispa("xB3", "bishop", "white"), new Hormiga("xB4", "queen", "white"),
                            new Hormiga("xB5", "king", "white"), new Avispa("xB6", "bishop", "white"), new Saltamontes("xB7", "horse", "white"), new EscarabajoPelotero("xB8", "rook", "white")]];

        // Colocamos las piezas en su posición correspondiente con la correspondencia del tablero dibujado
        for (let i = 0; i < this.tableroPiezas.length; i++) {
            for (let j = 0; j < this.tableroPiezas[i].length; j++) {
                this.tableroPiezas[i][j].position.set(this.tablero.board[i][j][0], this.tableroPiezas[i][j].position.y, this.tablero.board[i][j][1]);
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
                this.tableroPiezas[i][j].rotateY(Math.PI);
                this.black.add(this.tableroPiezas[i][j]);
            }
        }

        // Verificación inicial de las piezas
        this.tableroPiezas.forEach(piezas => {
            piezas.forEach(pieza => {
                if (pieza){
                    this.verifyPiece(pieza);
                }
            })
        })

        // Las piezas tienen un nombre único como identificador que luego permite buscarlas
        this.add(this.white);
        this.add(this.black);



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


    verifyPiece(piece) {
        if (!(piece.type === "pawn") && !(piece.type === "rook") && !(piece.type === "bishop") && !(piece.type === "horse")
            && !(piece.type === "king") && !(piece.type === "queen")){
            throw new Error (`La pieza: |${piece}| no tiene un 'type' correcto, el type es: |${piece.type}|`);
        }
        if (!piece.name){
            throw new Error(`La pieza: |${piece}| no tiene un 'nombre' correcto`);
        }
        if (!(piece.team === "white") && !(piece.team === "black")){
            throw new Error(`La pieza: |${piece}| no tiene un 'team' correcto, el team es: |${piece.team}| `);
        }

    }

    getParentByChild(child){
        if (child.team !== null && (child.team === "white" || child.team === "black"))
            return child;
        else if(child.parent != null){
            return this.getParentByChild(child.parent);
        }
        else return null;
    }

    selectPiece(piece){
        piece = this.getParentByChild(piece);
        this.lastSelectedPiece = piece; // Registramos la última pieza seleccionada
        piece.select();          // Dejamos que la pieza haga los cambios pertinentes visuales
                                        // Mostramos de manera visual los movimientos (También devolver algo
                                        //                                   para hacer pick de las posiciones)

        // Extraemos la fila y columna de la pieza en la matriz tableroPiezas
        const fila = this.tableroPiezas.find(fila => fila.find(p => p !== undefined && p.name === piece.name));
        const r  = this.tableroPiezas.findIndex(fila => fila.find(p =>  p !== undefined && p.name === piece.name));
        const c = fila.findIndex(p =>  p !== undefined && p.name === piece.name);

        // Algoritmo sobre matriz tableroPiezas para ver que posibles movimientos
        this.ableMovements = []; // Los movimientos posibles será un grupo de movimientos
        let tile;

        // Para un peón hacemos la comprobación de moverse 1 casilla (2 si está en la fila de inicio)
        // además de los posibles movimientos de comer, que estarán disponibles siempre que esté ocupada



        const initial = (piece.team === "white") ? 6 : 1;
        const value = (piece.team === "white") ? -1 : 1;


        switch (piece.type) {
            case "pawn":
                {

                if (r + value > 0 && this.tableroPiezas[r + value][c] === undefined) {
                    // Movimiento inicial de moverse hacia adelante
                    this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                        return (tile.row === r + value && tile.col === c);
                    })[0]);
                    this.setAsMoveTile(tile, true);

                    // Movimiento de dos casillas hacia adelante en caso de ser el inicial
                    if (r === initial) { // Está en la fila inicial
                        if (this.tableroPiezas[r + value * 2][c] === undefined) {
                            this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                                return (tile.row === r + value * 2 && tile.col === c);
                            })[0]);
                            this.setAsMoveTile(tile, true);
                        }
                    }
                }

                // Movimiento de Moverse a los lados para comer, por lo que tiene que estár ocupada
                if (r + value <= 7 && r + value >= 0 && c + value >= 0 && c + value <= 7 && !(this.tableroPiezas[r + value][c + value] === undefined)) {
                    if (this.tableroPiezas[r + value][c + value].team !== piece.team) {
                        this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                            return (tile.row === r + value && tile.col === c + value);
                        })[0]);
                        this.setAsMoveTile(tile, false);
                    }
                }

                if (r + value <= 7 && r + value >= 0 && c - value >= 0 && c - value <= 7 && !(this.tableroPiezas[r + value][c - value] === undefined)) {
                    if (this.tableroPiezas[r + value][c - value].team !== piece.team) {
                        this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                            return (tile.row === r + value && tile.col === c - value);
                        })[0]);
                        this.setAsMoveTile(tile, false);
                    }
                }
                break
                }
            case "bishop":
                {
                // Tiene movimiento diagonal infinito
                // Se puede hacer un bucle  que compruebe cada diagonal hasta llegar al limite o ficha
                let i = 1;
                //  Diagonal derecha
                while (r + value*i <= 7 && r + value*i >= 0 && c - value*i >= 0 && c - value*i <= 7) {
                    if (!(this.tableroPiezas[r + value*i][c - value*i] === undefined)){
                        if (this.tableroPiezas[r + value*i][c - value*i].team !== piece.team) {
                            this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                                return (tile.row === r + value*i && tile.col === c - value*i);
                            })[0]);
                            this.setAsMoveTile(tile, false);
                        }
                        break; // Salimos porque ha encontrado un choque
                    }
                    else{
                        this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                            return (tile.row === r + value*i && tile.col === c - value*i);
                        })[0]);
                        this.setAsMoveTile(tile, true);
                    }
                    i++
                }

                i = 1;
                //  Diagonal izquierda
                while (r + value*i <= 7 && r + value*i >= 0 && c + value*i >= 0 && c + value*i <= 7) {
                    if (!(this.tableroPiezas[r + value*i][c + value*i] === undefined)){
                        if (this.tableroPiezas[r + value*i][c + value*i].team !== piece.team) {
                            this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                                return (tile.row === r + value*i && tile.col === c + value*i);
                            })[0]);
                            this.setAsMoveTile(tile, false);
                        }
                        break; // Salimos porque ha encontrado un choque
                    }
                    else{
                        this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                            return (tile.row === r + value*i && tile.col === c + value*i);
                        })[0]);
                        this.setAsMoveTile(tile, true);
                    }
                    i++
                }

                i = 1;
                //  Diagonal derecha abajo
                while (r - value*i <= 7 && r - value*i >= 0 && c - value*i >= 0 && c - value*i <= 7) {
                    if (!(this.tableroPiezas[r - value*i][c - value*i] === undefined)){
                        if (this.tableroPiezas[r - value*i][c - value*i].team !== piece.team) {
                            this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                                return (tile.row === r - value*i && tile.col === c - value*i);
                            })[0]);
                            this.setAsMoveTile(tile, false);
                        }
                        break; // Salimos porque ha encontrado un choque
                    }
                    else{
                        this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                            return (tile.row === r - value*i && tile.col === c - value*i);
                        })[0]);
                        this.setAsMoveTile(tile, true);
                    }
                    i++
                }

                i = 1;
                //  Diagonal izquierda abajo
                while (r - value*i <= 7 && r - value*i >= 0 && c + value*i >= 0 && c + value*i <= 7) {
                    if (!(this.tableroPiezas[r - value*i][c + value*i] === undefined)){
                        if (this.tableroPiezas[r - value*i][c + value*i].team !== piece.team) {
                            this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                                return (tile.row === r - value*i && tile.col === c + value*i);
                            })[0]);
                            this.setAsMoveTile(tile, false);
                        }
                        break; // Salimos porque ha encontrado un choque
                    }
                    else{
                        this.ableMovements.push(tile = this.tablero.tiles.children.filter(tile => {
                            return (tile.row === r - value*i && tile.col === c + value*i);
                        })[0]);
                        this.setAsMoveTile(tile, true);
                    }
                    i++
                }
                break
                }
            case "rook":
                break;
            case "horse":
                break
            case "queen":
                break
            case "king":
                break
            default: console.log("Something wrong with the types of the pieces");
                break
        }

        //console.log(ableMovements);
    }

    setAsMoveTile(tile, empty){
        if (empty) {
            tile.material = new THREE.MeshBasicMaterial({color: 0x0000ff});
        }
        else {
            tile.material = new THREE.MeshBasicMaterial({color: 0xff0000});
        }
    }

    unsetMoveTiles(){
        let color;
        if (this.ableMovements) {
            this.ableMovements.forEach(tile => {
                (tile.row % 2 === 0) ? (tile.col % 2 === 0 ? color = 0xffffff : color = 0x000000) :
                    (tile.col % 2 === 0 ? color = 0x000000 : color = 0xffffff)

                tile.material = new THREE.MeshBasicMaterial({color: color});
            });
        }
    }

    unselectPiece(){
        if (this.lastSelectedPiece) {
            this.lastSelectedPiece.unselect(); // Lo opuesto, eliminar lo que se pasó
            this.unsetMoveTiles();
        }
    }


    // Recibe una posición a la que moverse [position, row, col]
    makeMovement(pos){
        if (this.lastSelectedPiece){
            // Extraemos la fila y columna de la pieza en la matriz tableroPiezas
            const fila = this.tableroPiezas.find(fila => fila.find(p =>  p !== undefined && p.name === this.lastSelectedPiece.name));
            const r  = this.tableroPiezas.findIndex(fila => fila.find(p =>  p !== undefined && p.name === this.lastSelectedPiece.name));
            const c = fila.findIndex(p =>  p !== undefined && p.name === this.lastSelectedPiece.name);

            if (!(this.tableroPiezas[pos["row"]][pos["col"]] === undefined)){
                if (this.tableroPiezas[pos["row"]][pos["col"]].team === "black")
                    this.black.remove(this.tableroPiezas[pos["row"]][pos["col"]]);
                else
                    this.white.remove(this.tableroPiezas[pos["row"]][pos["col"]]);
            }
            this.tableroPiezas[pos["row"]][pos["col"]] = this.lastSelectedPiece;
            this.tableroPiezas[r][c] = undefined;

            let anim = new StraightAnimator();
            let finPos = new THREE.Vector3();

            let wait = $.Deferred();
            let t = 1000;
            finPos.x = pos["pos"].x;
            finPos.y = this.lastSelectedPiece.position.y;
            finPos.z = pos["pos"].z;

            console.log(this.lastSelectedPiece.position);
            console.log(finPos);

            anim.setAndStart(this.lastSelectedPiece.position, finPos, t, wait);
            wait.done (() => {
                // console.log ('Este mensaje no sale hasta que la animación termine');
            });  
        }
    }
    
    update(){
        if (this.tableroPiezas) {
            for (let i = 0; i < this.tableroPiezas.length; i++) {
                for (let j = 0; j < this.tableroPiezas[i].length; j++) {
                    if (this.tableroPiezas[i][j]) this.tableroPiezas[i][j].update();
                }
            }
        }

        TWEEN.update();
    }

}

export {GameBoard};