import Person from "../db/person.ts";

const deletePerson = async (dni:string) => {
    try{
        const person = await Person.findOneAndDelete({dni:dni}).exec(); //Buscamos una persona por su dni, usamos Person que es el modelo de datos que creamos en el archivo person.ts y usamos el metodo findOne de mongoose, que nos devuelve una persona
        if(!person){
            throw new Error("No se ha encontrado a la persona");
        }
    }catch(error){
        console.log(error.message);
        return;
    }
}

export default deletePerson;