function loadHTML(file, targetId = null) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const content = document.getElementById('page-content');
      content.innerHTML = html;

      // Espera a que el contenido se inserte antes de buscar el id
      setTimeout(() => {
        if (targetId) {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 50); // puedes ajustar este valor si es necesario
    })
    .catch(error => {
      console.error('Error al cargar el archivo:', error);
    });
}


loadHTML('Inicio.html');

window.addEventListener("scroll", () => {
  const Menu = document.querySelector(".menu");
  const btn = document.querySelector(".btn-menu.activo");

  if (window.scrollY > 0 ) {
    Menu.classList.add("glass");
  } else {
    Menu.classList.remove("glass");
  }
});

const menuBotones = document.querySelectorAll('.btn-menu');

menuBotones.forEach(boton => {
  boton.addEventListener('click', () => {
    // Quitar clase activa de todos los botones
    menuBotones.forEach(b => b.classList.remove('activo'));

    // Agregar clase activa al botón clicado
    boton.classList.add('activo');
  });
});


