
export class Usuario{

    constructor(
        public id:string,
        public nombre:string,
        public pasword?:string,
        public email?:string,
        public google?:boolean,
        public role?:string,
        public  img?:string)
    {}

}