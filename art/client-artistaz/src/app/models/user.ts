export class User{
  constructor(
    public _id:string,
    public name:string,
    public surname: string,
    public nick:string,
    public email:string,
    public password:string,
    public bio:string,
    public website:string,
    public role:string,
    public image:string
  ){}
}
