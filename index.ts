import express,{Request, Response, NextFunction} from 'express';
import { UUID } from 'crypto';
import {v4 as uuidv4} from 'uuid';


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
    tecnologias: Tecnologia[];
};

const arrayUsuarios= [] as Usuario[];

//Funcão Middleware que checara se existe o usuario requerido no arrayTecnologias
function usuarioExiste(req: Request, res: Response, next: NextFunction){
    const {userName} = req.headers;
    const userEncontrado= arrayUsuarios.find((user) => user.userNome === userName);
    try {
        req.userExpress = userEncontrado as Usuario;

    } catch (error) {
        return res.status(400).json({error: "Usuario não existe!"})
    }
    return next();
}

// const novoUser: Usuario = {
//     id: uuidv4(),
//     nome: "fd"
// };

// console.log(novoUser);



app.listen(3332);