// Configuración de las rarezas con sus probabilidades y rutas de carpetas
const cartasPorRareza = {
  comun: {
    carpeta: "imagenes/comun/",
    probabilidad: 80, // 75% de aparecer
    borde: "3px solid green",
    numCartas: 97, // Número total de cartas para la rareza común
    mejora: "raro"
  },
  raro: {
    carpeta: "imagenes/raro/",
    probabilidad: 15, // 20% de aparecer
    borde: "3px solid blue",
    numCartas: 29, // Número total de cartas para la rareza rara
    mejora: "legendario"
  },
  legendario: {
    carpeta: "imagenes/legendario/",
    probabilidad: 4.5, // 4.5% de aparecer
    borde: "3px solid red",
    numCartas: 18, // Número total de cartas para la rareza legendaria
    mejora: "kks"
  },
  kks: {
    carpeta: "imagenes/kks/",
    probabilidad: 0.5, // 0.5% de aparecer
    borde: "3px solid gold",
    numCartas: 5, // Número total de cartas para la rareza kks
  },
};

// Función para obtener una rareza aleatoria basada en probabilidades
function obtenerRarezaAleatoria() {
  const rnd = Math.random() * 100; // Número entre 0 y 100
  let acumulador = 0;

  for (const rareza in cartasPorRareza) {
    acumulador += cartasPorRareza[rareza].probabilidad;
    if (rnd < acumulador) return rareza;
  }
}

// Generar nombre aleatorio dinámico dentro del folder respectivo
function generarNombreCarta(carpeta, numCartas) {
  const numeroAleatorio = Math.floor(Math.random() * numCartas) + 1; // Número aleatorio entre 1 y numCartas
  let nombreCarta;

  if (carpeta.includes("comun")) {
    nombreCarta = `${numeroAleatorio}.jpg`; // Para las comunes, la carta es solo el número
  } else if (carpeta.includes("raro")) {
    nombreCarta = `rara${numeroAleatorio}.jpg`; // Para las raras, el nombre es 'raraX.jpg'
  } else if (carpeta.includes("legendario")) {
    nombreCarta = `legendaria${numeroAleatorio}.jpg`; // Para las legendarias, 'legendariaX.jpg'
  } else if (carpeta.includes("kks")) {
    nombreCarta = `kks${numeroAleatorio}.jpg`; // Para las kks, 'kksX.jpg'
  }

  return `${carpeta}${nombreCarta}`; // Devuelve la ruta completa de la imagen
}

// Función para mejorar una carta con 1% de probabilidad
function intentarMejorarCarta(rareza) {
  if (Math.random() < 0.01 && cartasPorRareza[rareza].mejora) {
    console.log(`¡Carta mejorada! ${rareza} -> ${cartasPorRareza[rareza].mejora}`);
    return cartasPorRareza[rareza].mejora;
  }
  return rareza;
}

// Función para abrir el sobre y mostrar cartas una por una
function abrirSobre(sobreElement) {
  const contenedorCartas = document.getElementById("cartas");
  contenedorCartas.innerHTML = ""; // Limpiar cartas anteriores

  let cartas = [];

  // Deshabilitar todos los sobres para que no se pueda abrir otro hasta que termine el actual
  const sobres = document.querySelectorAll(".sobreCERRADO-wrapper");
  sobres.forEach(sobre => {
      sobre.style.pointerEvents = "none"; // Desactivar el click en los sobres
  });
  
  // Generar las 5 cartas aleatorias
  for (let i = 0; i < 5; i++) {
      let rareza = obtenerRarezaAleatoria();
      let nuevaRareza = intentarMejorarCarta(rareza);
      const { carpeta, borde, numCartas } = cartasPorRareza[nuevaRareza];
      const imagenCarta = generarNombreCarta(carpeta, numCartas);

      // Crear elemento carta
      const cartaDiv = document.createElement("div");
      cartaDiv.classList.add("carta");
      cartaDiv.style.border = borde;
      cartaDiv.style.display = "none"; // Inicialmente oculta

      // Si la carta mejora, añadir animación de mejora
      if (nuevaRareza !== rareza) {
          cartaDiv.classList.add("animacion-mejora");
      }

      // Si la carta es legendaria o kks, añadir la animación
      if (nuevaRareza === "legendario" || nuevaRareza === "kks") {
          cartaDiv.classList.add("animacion-legendaria");
      }

      // Si es kks, añadir animación de brillos
      if (nuevaRareza === "kks") {
          cartaDiv.classList.add("animacion-kks");
      }

      const img = document.createElement("img");
      img.src = imagenCarta;

      cartaDiv.appendChild(img);
      cartas.push(cartaDiv); // Guardamos la carta para mostrarla luego
  }

  // Función para mostrar las cartas una por una con retraso
  let indiceCarta = 0;
  const intervalo = setInterval(() => {
      if (indiceCarta < cartas.length) {
          contenedorCartas.appendChild(cartas[indiceCarta]);
          cartas[indiceCarta].style.display = "block"; // Hacerla visible
          indiceCarta++;
      } else {
          clearInterval(intervalo);
          // Habilitar todos los sobres nuevamente después de abrir el sobre
          sobres.forEach(sobre => {
              sobre.style.pointerEvents = "auto"; // Volver a habilitar el click
          });
      }
  }, 500); // Mostrar cada carta cada .5 segundo
}

// Agregar los eventos de clic a los sobres flotantes
document.querySelectorAll(".sobreCERRADO-wrapper").forEach(sobre => {
  sobre.addEventListener("click", function() {
      abrirSobre(this); // Ejecuta la función abrirSobre cuando se hace clic en un sobre
  });
});
