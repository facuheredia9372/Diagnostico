const TAMANO = 10;
const CANTIDAD_CASAS = 5;

// --------------------------------------------------
// Generador pseudoaleatorio determinista
// --------------------------------------------------

function crearGenerador(semilla) {
    let estado = semilla;

    return function () {
        estado = (estado * 9301 + 49297) % 233280;
        return estado / 233280;
    };
}

// --------------------------------------------------
// Crear tablero inicial 10x10
// --------------------------------------------------

function crearTablero() {
    return Array.from(
        { length: TAMANO },
        () => Array(TAMANO).fill(0)
    );
}

// --------------------------------------------------
// Colocar una casa en una posición aleatoria
// dentro de un rango de filas
// --------------------------------------------------

function colocarCasaAleatoria(tablero, random, filaMin, filaMax) {
    let colocada = false;

    while (!colocada) {
        const fila =
            Math.floor(random() * (filaMax - filaMin + 1)) + filaMin;

        const columna =
            Math.floor(random() * TAMANO);

        if (tablero[fila][columna] === 0) {
            tablero[fila][columna] = 1;
            colocada = true;
        }
    }
}

// --------------------------------------------------
// Generar las 5 casas usando una semilla
// --------------------------------------------------

function generarCasas(tablero, semilla) {
    const random = crearGenerador(semilla);

    // 2 casas del lado del jugador 1
    colocarCasaAleatoria(tablero, random, 0, 3);
    colocarCasaAleatoria(tablero, random, 0, 3);

    // 1 casa en el centro
    tablero[5][5] = 1;

    // 2 casas del lado del jugador 2
    colocarCasaAleatoria(tablero, random, 6, 9);
    colocarCasaAleatoria(tablero, random, 6, 9);
}

// --------------------------------------------------
// Calcular movimientos válidos
// --------------------------------------------------

function movimientosValidos(tablero, fila, columna) {
    const movimientos = [];

    const direcciones = [
        [-1, 0], // Arriba
        [1, 0],  // Abajo
        [0, -1], // Izquierda
        [0, 1]   // Derecha
    ];

    for (const [df, dc] of direcciones) {
        const nuevaFila = fila + df;
        const nuevaColumna = columna + dc;

        // Comprobar que esté dentro del tablero
        if (
            nuevaFila >= 0 &&
            nuevaFila < TAMANO &&
            nuevaColumna >= 0 &&
            nuevaColumna < TAMANO
        ) {
            // Comprobar que no haya una casa
            if (tablero[nuevaFila][nuevaColumna] === 0) {
                movimientos.push({
                    fila: nuevaFila,
                    columna: nuevaColumna
                });
            }
        }
    }

    return movimientos;
}

// --------------------------------------------------
// Mostrar tablero
// --------------------------------------------------

function mostrarTablero(tablero, jugador = null) {
    for (let fila = 0; fila < TAMANO; fila++) {
        let linea = "";

        for (let columna = 0; columna < TAMANO; columna++) {
            if (
                jugador &&
                jugador.fila === fila &&
                jugador.columna === columna
            ) {
                linea += "P ";
            } else if (tablero[fila][columna] === 1) {
                linea += "H ";
            } else {
                linea += ". ";
            }
        }

        console.log(linea);
    }
}

// --------------------------------------------------
// Programa principal
// --------------------------------------------------

const semilla = 12345;

const tablero = crearTablero();

generarCasas(tablero, semilla);

const jugador = {
    fila: 5,
    columna: 5
};

console.log("=== TABLERO 10x10 ===");
console.log(`Semilla utilizada: ${semilla}`);
console.log(`Cantidad de casas: ${CANTIDAD_CASAS}`);
console.log();

mostrarTablero(tablero, jugador);

console.log();
console.log("=== MOVIMIENTOS VÁLIDOS ===");

const movimientos = movimientosValidos(
    tablero,
    jugador.fila,
    jugador.columna
);

console.log(movimientos);