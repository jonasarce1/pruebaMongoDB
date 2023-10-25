import Person from "../db/person.ts";

const deletePerson = async (dni:string) => {
    try{
        const person = await Person.findOneAndDelete({dni:dni}).exec();
        if(!person){
            throw new Error("No se ha encontrado a la persona");
        }
    }catch(error){
        console.log(error.message);
        return;
    }
}

export default deletePerson;