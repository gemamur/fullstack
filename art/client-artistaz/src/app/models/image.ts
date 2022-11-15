export class Image{
  constructor(
    public _id:string,
    public title:string,
    public description:string,
    public picture:string,
    public favorites:number,
    public userVotes:string[],
    public album:string,
    public owner:string
  ){}
}
