import { UUID } from 'crypto';
import {v4 as uuidv4} from 'uuid';


const express = require('express');
const { type } = require('os');
const uuid = require('uuid')


const app = express();
app.use(express.json());

type Tecnologia = {
    id: String;
    titulo: String;
    marcarEstudado: boolean;
    dtPrazoFinal: Date;
    dtCriacao: Date;

}
type Usuario = {
    id: string; // p/armazenar o UUID que e geradi como uma string
    nome: String;
    userNome: String;
    tecnologias: Tecnologia[]
};

// const novoUser: Usuario = {
//     id: uuidv4(),
//     nome: "fd"
// };

// console.log(novoUser);



app.listen(3332);