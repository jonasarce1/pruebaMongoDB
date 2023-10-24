import express, {Request, Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getPerson from "./resolvers/getPerson.ts";
import addPerson from "./resolvers/addPerson.ts";

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
    const person = await getPerson(req.params.dni);
    res.json(person);
});

app.post("/addPerson", async (req: Request, res: Response) => {
    const {name, dni, age} = req.body;
    const newPerson = await addPerson(name, dni, age);
    res.json(newPerson);
});

app.listen(3000, () => console.log("El servidor esta corriendo en el puerto 3000"));
