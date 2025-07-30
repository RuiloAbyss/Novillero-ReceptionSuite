const apiURL = 'http://localhost:3000';
async function crearReserva(){
    console.log("Función crearReserva() ejecutada");
    alert("Función iniciada");
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const fecha = document.getElementById('fecha').value.trim();
    const tipoHabitacion = document.querySelector('input[name="radios"]:checked').value;
    const selectPersonas = document.getElementById('personas');
    const numPersonas = selectPersonas.value;
    if(!nombre || !apellidos || !fecha || !tipoHabitacion || !numPersonas){
        alert("Porfavor completa todos los campos correctamente");
        return;
    }
    try {
        const res = await fetch(`${apiURL}/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellidos, fecha, tipoHabitacion, numPersonas })
        });
        
        const data = await res.json();
        
        if (!res.ok){ 
            throw new Error(data.message || "Error al crear reserva");
        }

         alert(data.message);
         alert("Reserva creada exitosamente!\n\nDetalles:\n" +
              `Nombre: ${nombre} ${apellidos}\n` +
              `Fecha: ${fecha}\n` +
              `Habitación: ${tipoHabitacion}\n` +
              `Personas: ${numPersonas}`);

        // Limpiar campos
        document.getElementById('nombre').value = '';
        document.getElementById('apellidos').value = '';
        document.getElementById('fecha').value = '';
        // Los radio buttons y select se mantienen con sus valores actuales
    } catch(error) {
        alert(error.message);
        console.error(error);
    }
}

/*
async function obtenerLibros() {
    try{
        const res = await fetch(apiURL + "/getBooks");
        const data = await res.json();

        const librosDiv = document.getElementById('libros');
        librosDiv.innerHTML = '';

        data.libros.forEach(libro => {
            const div = document.createElement('div');
            div.className = 'libro';
            div.innerHTML = `
            <img src="${libro.imagen}">
            <h3>${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Stock:</strong> ${libro.stock}</p>
            <div class = "card-buttons">
                <button class="update"
                onclick="actualizarLibro('${libro._id}')">Actualizar</button>

                <button class="delete"
                onclick="eliminarLibro('${libro._id}')">Eliminar</button>
            </div>
            `;
            librosDiv.appendChild(div)
        });

    }catch (error){
        alert("Error al obtener libros");
        console.error(error);
    }
}
    obtenerLibros();

*/
