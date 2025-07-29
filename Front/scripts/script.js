//FUNCION: CARGAR SEGMENTOS HTML
function loadHTML(file, targetId = null) {
  // Realiza una solicitud HTTP para obtener el archivo HTML especificado
  fetch(file)
    .then(res => res.text()) // Convierte la respuesta en texto (HTML)
    .then(html => {
      // Inserta el contenido HTML recibido en el contenedor principal
      const content = document.getElementById('page-content');
      content.innerHTML = html;

      // Espera unos milisegundos para asegurar que el contenido se renderice
      setTimeout(() => {
        // Si se proporcionó un ID destino, se busca dentro del HTML recién cargado
        if (targetId) {
          const target = document.getElementById(targetId);
          // Si existe, se hace scroll hacia esa sección suavemente
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }

        // Después de cargar el contenido, se reactiva el control de scroll dinámico
        activarScrollEnSecciones();
      }, 50); // Retraso para asegurar que el DOM se haya actualizado antes de continuar
    })
    .catch(error => {
      // Captura errores en la carga del archivo HTML
      console.error('Error al cargar el archivo:', error);
    });
}

//Carga Inicial
loadHTML('Inicio.html');

//TRANSPARENCIA DINAMICA
window.addEventListener("scroll", () => {
  const Menu = document.querySelector(".menu"); // Se selecciona el menú superior
  const btn = document.querySelector(".btn-menu.activo"); // (Opcional) Botón activo actual

  // Si se ha hecho scroll hacia abajo, se aplica un estilo tipo "glass"
  if (window.scrollY > 0) {
    Menu.classList.add("glass");
  } else {
    Menu.classList.remove("glass"); // Se elimina si vuelve a la parte superior
  }
});

//FUNCION: COMUNICAR BARRA DE MENU CON LAS SECCIONES
function activarScrollEnSecciones() {
  const menuBotones = document.querySelectorAll('.btn-menu');
  window.addEventListener('scroll', () => {
    // Se buscan todas las secciones con ID dentro del contenedor dinámico
    const secciones = document.querySelectorAll('#page-content > section[id]');
    let seccionActual = null;

    secciones.forEach(seccion => {
      const rect = seccion.getBoundingClientRect(); // Posición respecto a la ventana

      // Se considera "activa" si el centro vertical de la pantalla está dentro de la sección
      if (rect.top <= 150 && rect.bottom >= 150) {
        seccionActual = seccion.getAttribute('id');
      }
    });
    if (seccionActual) {
      // Se compara cada botón con la sección visible
      menuBotones.forEach(boton => {
        boton.classList.toggle('activo', boton.dataset.id === seccionActual);
      });
    }
  });
}
/*NOTA: Deben ser separadaores tipo "section" con un id y los 
botones del menu deben de tener el paramero "data-id" con el
id de esa seccion
*/

