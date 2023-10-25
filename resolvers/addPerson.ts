import Person from "../db/person.ts";

const addPerson = async (name:string, dni:string, age:number) => {
    try{
        if(!name || !dni || !age){
            throw new Error("Faltan datos");
        }

        const yaExiste = await Person.findOne({dni: dni}).exec();

        if(yaExiste){
            throw new Error("Ya existe una persona con ese dni");
        }

        const newPerson = new Person({name: name, dni: dni, age: age});
        await newPerson.save();

        return newPerson;
    }catch(error){
        console.log(error.message);
        return;
    }
}

export default addPerson;
