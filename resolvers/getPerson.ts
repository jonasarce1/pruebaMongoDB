import Person from "../db/person.ts";

const getPerson = async (dni:string) => {
    try{
      const person = await Person.findOne({dni: dni}).exec(); //Buscamos una persona por su dni, usamos Person que es el modelo de datos que creamos en el archivo person.ts y usamos el metodo findOne de mongoose, que nos devuelve una persona
      if(!person){
        throw new Error("No se ha encontrado a la persona"); //Si no se encuentra la persona, devolvemos un error
      }
      return person;
    }catch(error){
      console.log(error.message);
      return;
    }
  }

  export default getPerson;