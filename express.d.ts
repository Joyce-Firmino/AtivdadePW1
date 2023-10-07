declare namespace Express{
    export interface Request{
        userExpress: User;
    }
    type User= {
        id: string; // p/armazenar o UUID que e geradi como uma string
        nome: String;
        userNome: String;
        tecnologias: Tecnologia[];
    }

}