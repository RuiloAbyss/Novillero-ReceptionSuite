const apiURL = 'http://localhost:3000';
async function crearReserva(){
     // Esto evita que el formulario se envíe
    console.log("Función crearReserva() ejecutada");
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
         alert(`Reserva creada exitosamente!\n\nDetalles:\nNombre: ${nombre} ${apellidos}\nFecha: ${fecha}\nHabitación: ${tipoHabitacion}\nPersonas: ${numPersonas}`);
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

async function actualizarReservaEquivalente() {
    try {
        // Obtener valores del formulario
        const tipoHabitacion = document.querySelector('input[name="radios"]:checked').value;
        const numPersonas = document.getElementById('personas').value;
        const fecha = document.getElementById('fecha').value.trim();
        
        const fechaReserva = new Date(fecha);
        const fechaActual = new Date();

        // Validación básica
        if (!tipoHabitacion || !numPersonas || !fecha) {
            alert("Por favor complete todos los campos");
            return;
        }

        // Enviar datos al servidor
        const res = await fetch(`${apiURL}/update/reserva`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                tipoHabitacion, 
                numPersonas, 
                fecha 
            })
        });

        const data = await res.json();
        
        if (!res.ok) {
            // Mostrar mensaje específico del servidor
            alert(data.message);
            return;
        }

        // Éxito - mostrar detalles
        alert(`Reserva actualizada:\n\nTipo: ${tipoHabitacion}\nPersonas: ${numPersonas}\nFecha: ${fecha}`);
        
        // Limpiar formulario
        document.querySelector('form').reset();

    } catch(error) {
        alert("Error: " + error.message);
        console.error("Error en actualizarReservaEquivalente:", error);
    }
}

async function cargarReservaciones() {
    try {
        const response = await fetch(`${apiURL}/get`);
        const { data: reservaciones } = await response.json();

        if (!response.ok) throw new Error("Error al obtener reservaciones");

        const tablaBody = document.querySelector('#reservationsTable tbody');
        tablaBody.innerHTML = ''; // Limpiar tabla existente

        reservaciones.forEach(reserva => {
            const fila = document.createElement('tr');
            
            // Formatear fecha para mejor visualización
            const fechaFormateada = new Date(reserva.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            fila.innerHTML = `
                <td>${reserva.nombre}</td>
                <td>${reserva.apellidos}</td>
                <td>${fechaFormateada}</td>
                <td>${reserva.tipoHabitacion}</td>
                <td>${reserva.numPersonas}</td>
            `;

            tablaBody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar reservaciones:", error);
        //alert("Error al cargar reservaciones: " + error.message);
    }
}

// Llamar a la funcion 
document.addEventListener('DOMContentLoaded', cargarReservaciones);


