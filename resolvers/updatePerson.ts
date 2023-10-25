import Person from "../db/person.ts";

const updatePerson = async (name: string, dni:string, age: string) => {
    try{
        if(!name || !dni || !age){
            throw new Error("Faltan datos");
        }

        const updatedPerson = await Person.findOneAndUpdate({dni: dni}, {name: name, age: age}).exec(); //Buscamos una persona por su dni, usamos Person que es el modelo de datos que creamos en el archivo person.ts y usamos el metodo findOne de mongoose, que nos devuelve una persona
        
        if(!updatedPerson){
            throw new Error("No se ha encontrado a la persona");
        }

        return updatedPerson;
    }catch(error){
        console.log(error.message);
        return;
    }
}

export default updatePerson;