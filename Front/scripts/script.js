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