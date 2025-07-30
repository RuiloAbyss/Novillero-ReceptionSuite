
const express = require('express');
const { default: mongoose } = require('mongoose');
const mongose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;
mongose.connect('mongodb+srv://egmt:cCLWIi6hSFtPNZMe@root.3no4nxd.mongodb.net/Nivillero_Resort?retryWrites=true&w=majority&appName=Reserva')
.then(() => console.log("Mongo DB conectado"))
.catch(error => console.log(error.message));


app.use(express.json());
app.use(cors());

const Novillero_Resort_Schema = new mongoose.Schema({
   nombre: { type: String, required: true },
   apellidos: { type: String, required: true }, 
   fecha: { type: Date, required: true }, 
   tipoHabitacion: { type: String, required: true }, 
   numPersonas: { type: String, required: true }
});

const Novillero_Resort = new mongoose.model('Reserva',Novillero_Resort_Schema);

app.get('/',(req,res) => {
    res.json({message:"Binevenido"})

});

// Ruta para actualizar reserva
app.put('/update/reserva', async (req, res) => {
    try {
        const { tipoHabitacion, numPersonas, fecha } = req.body;

        // Convertir a número
        const capacidad = parseInt(numPersonas);
        const nuevaFecha = new Date(fecha);
        const hoy = new Date();

        // Validar si la fecha es futura (no permitir actualización)
        if (nuevaFecha > hoy) {
            return res.status(400).json({
                success: false,
                message: "Esta habitación ya tiene una reserva vigente"
            });
        }

        // Buscar habitaciones con características equivalentes
        const habitacionesEquivalentes = await Novillero_Resort.find({
            tipoHabitacion,
            numPersonas: capacidad.toString(),
            fecha: { $lt: hoy } // Solo fechas pasadas
        });

        if (habitacionesEquivalentes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay habitaciones disponibles con esas características"
            });
        }

        // Actualizar la primera habitación encontrada
        const reservaActualizada = await Novillero_Resort.findByIdAndUpdate(
            habitacionesEquivalentes[0]._id,
            { fecha: nuevaFecha },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Reserva actualizada exitosamente",
            data: reservaActualizada
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar reserva",
            error: error.message
        });
    }
});
//Metdo get 
app.get('/get', async (req, res) => {
    try {
        const reservaciones = await Novillero_Resort.find().sort({ fecha: 1 });
        
    
        res.status(200).json({
            success: true,
            data: reservaciones
        });
        
    } catch(error) {
        console.error("Error en GET /get:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

//Metodo insert 
app.post('/new', async (req, res) => {
    try {
        const { nombre, apellidos, fecha, tipoHabitacion, numPersonas } = req.body;
        const newReserva = new Novillero_Resort({
            nombre,
            apellidos,
            fecha: new Date(fecha),
            tipoHabitacion,
            numPersonas
        });
        await newReserva.save();
        
        return res.status(200).json({ message: "Reserva creada con éxito" });
    } catch(error) {
        return res.status(500).json({
            message: "Error al crear reserva",
            error: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log("Servidor escuchando en http://localhost:"+PORT);
});