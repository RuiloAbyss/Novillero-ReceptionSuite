
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
    res.json({message:"Binevenido we"})

});

//Metdo get 
app.get('/get',async (req,res) => {
    try{
       const Datos = await Novillero_Resort.find();//Consulata todos los registros del modelo 
       return res.status(200).json({
        message: "Datos obtenidos con exito",
        Datos: Datos
       });
    }catch(error){
        return res.status(500).json({
            message : "Error al consultar datos",
            error: error
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