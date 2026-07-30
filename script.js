/* ==========================================================
   PROYECTO JAZMÍN V2
   script.js
========================================================== */

//==============================
// ELEMENTOS
//==============================

const inicio = document.getElementById("inicio");
const historia = document.getElementById("historia");
const carta = document.getElementById("carta");
const galeria = document.getElementById("galeria");
const final = document.getElementById("final");
const cartaFinal = document.getElementById("cartaFinal");
const cartaLarga = document.getElementById("cartaLarga");
const btnFinal = document.getElementById("btnFinal");

const btnComenzar = document.getElementById("btnComenzar");
const btnFotos = document.getElementById("btnFotos");
const btnCorazones = document.getElementById("btnCorazones");

const storyText = document.getElementById("storyText");
const fotoActual = document.getElementById("fotoActual");

const musica = document.getElementById("musica");

//==============================
// FOTOS
//==============================

const fotos = [
    "img/foto1.jpg",
    "img/foto2.jpg",
    "img/foto3.jpg"
];

//==============================
// HISTORIA
//==============================

const frases = [

    "Hay personas que llegan a tu vida...",

    "Y sin darte cuenta...",

    "Se convierten en tu lugar favorito ❤️"

];

//==============================
// EVENTOS
//==============================

btnComenzar.addEventListener("click", iniciarHistoria);

btnFotos.addEventListener("click", iniciarGaleria);

btnCorazones.addEventListener("click", explosionCorazones);

//==============================
// FUNCIONES
//==============================

mostrarPantalla(cartaFinal);

await cargarCarta();

btnFinal.addEventListener("click",()=>{

    mostrarPantalla(final);

});



    document.querySelectorAll(".pantalla").forEach(p=>{

        p.classList.remove("activa");

    });

    pantalla.classList.add("activa");


//==============================

async function iniciarHistoria(){

    mostrarPantalla(historia);

    for(const frase of frases){

        await escribir(frase);

        await esperar(1700);

    }

    mostrarPantalla(carta);

}

//==============================

function escribir(texto){

    return new Promise(resolve=>{

        storyText.innerHTML="";

        let i=0;

        const intervalo=setInterval(()=>{

            storyText.innerHTML += texto.charAt(i);

            i++;

            if(i>=texto.length){

                clearInterval(intervalo);

                resolve();

            }

        },55);

    });

}

//==============================

function esperar(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

//==============================

async function iniciarGaleria(){

    mostrarPantalla(galeria);

   musica.play().catch(() => {});

    for(let i=0;i<fotos.length;i++){

        fotoActual.style.opacity="0";

        await esperar(400);

        fotoActual.src=fotos[i];

        fotoActual.style.opacity="1";

        await esperar(3000);

    }

    mostrarPantalla(final);

}

//==============================

function explosionCorazones(){

    for(let i=0;i<120;i++){

        crearCorazon();

    }

}

//==============================

function crearCorazon(){

    const corazon=document.createElement("div");

    corazon.innerHTML="❤️";

    corazon.style.position="fixed";

    corazon.style.left=Math.random()*100+"vw";

    corazon.style.bottom="-50px";

    corazon.style.fontSize=(20+Math.random()*30)+"px";

    corazon.style.pointerEvents="none";

    corazon.style.zIndex="999";

    corazon.style.transition="transform 5s linear, opacity 5s linear";

    document.body.appendChild(corazon);

    setTimeout(()=>{

        corazon.style.transform=`translateY(-${window.innerHeight+300}px)`;

        corazon.style.opacity="0";

    },50);

    setTimeout(()=>{

        corazon.remove();

    },5000);

}

async function cargarCarta() {

    try {

        const respuesta = await fetch("carta.txt");

        const texto = await respuesta.text();

        cartaLarga.innerText = texto;

    } catch (error) {

        cartaLarga.innerText = "No se pudo cargar la carta.";

        console.error(error);

    }

}