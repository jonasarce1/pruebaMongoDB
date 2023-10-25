import express, {Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getPerson from "./resolvers/getPerson.ts";
import addPerson from "./resolvers/addPerson.ts";
import deletePerson from "./resolvers/deletePerson.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load(); // Await the load() function to get the environment variables

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if(!MONGO_URL){
    console.log("No se ha encontrado la variable de entorno MONGO_URL");
    Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());

app.get("/getPerson/:dni", async (req: Request, res: Response) => {
    try{
        const person = await getPerson(req.params.dni);
        res.json(person);
    }catch(error){
        res.json({error: error.message});
    }
});

app.post("/addPerson", async (req: Request, res: Response) => {
    try{
        const {name, dni, age} = req.body;
        const newPerson = await addPerson(name, dni, age);
        res.json(newPerson);
    }catch(error){
        res.json({error: error.message});
    }
});

app.delete("/deletePerson/:dni", async (req: Request, res: Response) => {
    try{
        const dni = req.params.dni;
        await deletePerson(dni);
        res.json({message: "Persona eliminada"});
    }catch(error){
        res.json({error: error.message});
    }
})



app.listen(3000, () => console.log("El servidor esta corriendo en el puerto 3000"));
