
export interface IListaProgramasData  {
  url:string;
  title:string;
  image_url?:string;
  description:string;
  image:{
    url:string;
    name:string;
  }
}
export const mapper = (data: any): IListaProgramasData[] | null => {

  if (!data || !data.programasEmpresarials) return null;

  return data.programasEmpresarials;
};
