import mongoose from "npm:mongoose@7.6.3"; //Importamos el paquete de mongoose
import {Person} from "../types.ts"; //Importamos el tipo Persona

const Schema = mongoose.Schema; //Creamos un Schema de mongoose, esto es para crear un modelo de datos en la base de datos

const personSchema = new Schema( //Creamos un nuevo Schema llamado personSchema
    { 
    name: {type: String, required: true}, //Definimos los campos del modelo, con su tipo y si es requerido o no, si es requerido y no se envia, dara error
    dni: {type: String, required: true, unique: true}, //El campo dni es unico, no puede haber dos personas con el mismo dni
    age: {type: Number, required: true},
    },
    {timestamps: true} //Esto es para que se cree un campo de fecha de creacion y de actualizacion
);

export type PersonModelType = mongoose.Document & Omit<Person, "id">; //Creamos un tipo PersonModelType, que es un Documento de mongoose, y omitimos el campo id, ya que mongoose lo crea automaticamente

export default mongoose.model<PersonModelType>("Person", personSchema); //Exportamos el modelo de datos, que es un Documento de mongoose, con el nombre Person y el Schema personSchema

//Esto lo hacemos para que podamos usar el modelo de datos en otros archivos
//Y asi poder hacer consultas a la base de datos, como por ejemplo:
// import Person from "./db/person.ts";
// Person.find({name: "Juan"}); //Buscamos todas las personas con el nombre Juan
// Person.findOne({name: "Juan"}); //Buscamos una persona con el nombre Juan
// Person.findById("id"); //Buscamos una persona por su id
// Person.find({name: "Juan", age: 20}); //Buscamos todas las personas con el nombre Juan y la edad 20
// Person.create({name: "Juan", dni: "12345678", age: 20}); //Creamos una persona con los datos especificados
// Person.updateOne({name: "Juan"}, {name: "Juanito"}); //Actualizamos una persona con el nombre Juan, y le cambiamos el nombre a Juanito
// Person.deleteOne({name: "Juan"}); //Eliminamos una persona con el nombre Juan
// Person.deleteMany({name: "Juan"}); //Eliminamos todas las personas con el nombre Juan

//finds extras
// Person.find({name: "Juan"}).sort({age: 1}); //Buscamos todas las personas con el nombre Juan, y las ordenamos por edad de forma ascendente
// Person.find({name: "Juan"}).sort({age: -1}); //Buscamos todas las personas con el nombre Juan, y las ordenamos por edad de forma descendente
// Person.find({name: "Juan"}).limit(1); //Buscamos todas las personas con el nombre Juan, y solo nos devuelve 1
// Person.find({name: "Juan"}).skip(1); //Buscamos todas las personas con el nombre Juan, y nos salteamos la primera
// Person.find({name: "Juan"}).limit(1).skip(1); //Buscamos todas las personas con el nombre Juan, nos salteamos la primera, y nos devuelve 1
// Person.find({name: "Juan"}).select({name: 1}); //Buscamos todas las personas con el nombre Juan, y solo nos devuelve el nombre