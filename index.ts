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
    usernome: String;
    tecnologias: Tecnologia[];
};

const arrayUsuarios= [] as Usuario[];

//Funcão Middleware que checara se existe o usuario requerido no arrayUsuarios
function retornaUsuarioExistente(req: Request, res: Response, next: NextFunction){
    const {usernome} = req.headers;
    const userEncontrado= arrayUsuarios.find((user) => user.usernome === usernome);
    // if(!userEncontrado){
    //     return res.status(400).json({error: "Usuario não existe!"})
    // }
    try {
        req.userExpr = userEncontrado as Usuario;

    } catch (error) {
        return res.status(400).json({error: "Usuario não existe!"})
    }
    // req.userExpr = userEncontrado
    return next();
}

//criando um novo usuario
app.post('/users', (req,res) => {
    const {nome, usernome} = req.body as Usuario;
    const comparaUser= arrayUsuarios.some((user)=>user.usernome === usernome); // comparando se o userNome que foi digitado no Body ja esta cadastrado no array
    if(comparaUser){
        res.status(400).json({error: "Usuário já existe cadastre um novo usuário!"})
    }
    const novoUsuario: Usuario = {
        id: uuidv4(),
        nome: nome,
        usernome: usernome,
        tecnologias: []
    }

    arrayUsuarios.push(novoUsuario)
    return res.status(201).json({novoUsuario})

})

// Criando uma nova tecnologia
app.post('/tecnologias', retornaUsuarioExistente, (req, res) => {
    const {titulo, dtPrazoFinal} = req.body as Tecnologia
    const novaTecnologia: Tecnologia ={
        id: uuidv4(),
        titulo: titulo,
        marcarEstudado: false,
        dtPrazoFinal: new Date(dtPrazoFinal),
        dtCriacao: new Date()
    }
     const {userExpr} = req; 
     userExpr.tecnologias.push(novaTecnologia)

    return res.status(201).json({novaTecnologia})
})


app.listen(3332);