function loadHTML(file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById('page-content').innerHTML = html;
    })
    .catch(error => {
      console.error('Error al cargar el archivo:', error);
    });
}

window.addEventListener("scroll", () => {
  const Menu = document.querySelector(".menu");
  if (window.scrollY > 50) {
    Menu.classList.add("compact");
  } else {
    Menu.classList.remove("compact");
  }
});