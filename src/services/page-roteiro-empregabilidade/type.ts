
import { IPageInfo } from "../page-info/type";

export interface IPageRoteiroEmpregabilidadeData extends IPageInfo {
    cards?:IRoteiroCard[]
    soft_skills_info?:ISoftSkillInfo;
    caroucel?: ICarousel[];

}

export interface ISoftSkillInfo{
  title?:string;
  description?:string;
  button?: {
    url?:string;
    label?:string;
    external_link:boolean
  }
}

export interface IRoteiroCard {
    url?:string;
    name?:string
    logo?: {
      url?:string;
    }
  
}

export interface ICarousel{
  title:string;
  image?:{
    url?:string;
  }
  emphasis:boolean
  description:string;
  button?:{
    label?:string;
    url?:string;
    external_link?:boolean
  }
  abrir_simulador?:boolean
  id:string;
}