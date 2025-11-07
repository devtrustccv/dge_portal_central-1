interface ISectionProps{
    imagem: string,
    item: string,
    title: string,
    description: string,
    Imagem_Fundo: string
}

export interface ExperienteProps{
    title: string,
    description: string,
    section: ISectionProps[]
}