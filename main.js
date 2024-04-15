// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultodo = null;
let segundoResultado = null;
let movimientos = 0; 
let aciertos = 0;
let temporizador = false;
let timer = 25;
let timerInicial = 25;
let tiempoRegresivoId = null;


// Apundo a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('t-restante')

// generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);


function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
    timer--;
    mostrartiempo.innerHTML = `tiempo: ${timer} segundos`
    if(timer == 0){
    clearInterval(tiempoRegresivoId);
    bloquearTarjetas();
      }
    },1000);
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros [i];
        tarjetaBloqueada.disabled = true;
    }
}

// funcion principal
function destapar(id){

if(temporizador == false){
    contarTiempo();
    temporizador = true;
}


tarjetasDestapadas++;
console.log(tarjetasDestapadas);

if(tarjetasDestapadas == 1){
tarjeta1 = document.getElementById(id);
primerResultodo = numeros[id];
tarjeta1.innerHTML = primerResultodo;

// deshabilitar primer boton
tarjeta1.disabled = true;
}else if(tarjetasDestapadas == 2){
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id]
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;

    movimientos++;

    mostrarMovimientos.innerHTML = `movimientos: ${movimientos}`;

    if(primerResultodo == segundoResultado){
        tarjetasDestapadas = 0;

        aciertos++;
        mostrarAciertos.innerHTML = `aciertos: ${aciertos}`;

        if(aciertos == 8){
            clearInterval(tiempoRegresivoId);
            mostrarAciertos.innerHTML = `aciertos: ${aciertos}😮`;
            mostrartiempo.innerHTML = `Fantastico! 🎉demoraste ${timerInicial - timer} segundos`
            mostrarMovimientos.innerHTML =  `movimientos: ${movimientos}😎`;

        }

    }else{
        setTimeout(()=>{
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },800);
    }
}
}