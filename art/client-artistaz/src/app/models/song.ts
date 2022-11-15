export class Song{
  constructor(
    public _id:string,
    public number:number,
    public name:string,
    public duration: string,
    public file:string,
    public favorites:number,
    public userVotes: string[],
    public albumdisc:string,
    public owner:string
  ){}
}
