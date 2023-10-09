declare namespace Express{
    export interface Request{
        userExpr: User;
    }
    type User= {
        id: string; // p/armazenar o UUID que e geradi como uma string
        nome: String;
        usernome: String;
        tecnologias: Tecnologia[];
    }

}