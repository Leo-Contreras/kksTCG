// Configuración de las rarezas con sus probabilidades y rutas de carpetas
const cartasPorRareza = {
    comun: {
      carpeta: "imagenes/comun/",
      probabilidad: 80, // 75% de aparecer
      borde: "3px solid green",
      numCartas: 65, // Número total de cartas para la rareza común
    },
    raro: {
      carpeta: "imagenes/raro/",
      probabilidad: 15, // 20% de aparecer
      borde: "3px solid blue",
      numCartas: 21, // Número total de cartas para la rareza rara
    },
    legendario: {
      carpeta: "imagenes/legendario/",
      probabilidad: 4.5, // 4.5% de aparecer
      borde: "3px solid red",
      numCartas: 13, // Número total de cartas para la rareza legendaria
    },
    kks: {
      carpeta: "imagenes/kks/",
      probabilidad: 0.5, // 0.5% de aparecer
      borde: "3px solid gold",
      numCartas: 3, // Número total de cartas para la rareza kks
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
  
  // Generar 5 cartas aleatorias
  function abrirSobre() {
    const contenedorCartas = document.getElementById("cartas");
    contenedorCartas.innerHTML = ""; // Limpiar cartas anteriores
  
    for (let i = 0; i < 5; i++) {
      const rareza = obtenerRarezaAleatoria();
      const { carpeta, borde, numCartas } = cartasPorRareza[rareza];
      const imagenCarta = generarNombreCarta(carpeta, numCartas);
  
      // Crear elemento carta
      const cartaDiv = document.createElement("div");
      cartaDiv.classList.add("carta");
      cartaDiv.style.border = borde;
  
      const img = document.createElement("img");
      img.src = imagenCarta;
  
      cartaDiv.appendChild(img);
      contenedorCartas.appendChild(cartaDiv);
    }
  }
  
  // Evento para abrir el sobre
  document.getElementById("botonAbrir").addEventListener("click", abrirSobre);
  