export interface usuarioType {
    id: string
    nome: string
    email: string
    senha: string
    nascimento: Date
}

export interface agendamentoType {
    id: string
    nome: string
    data_hora: Date
    nascimento: Date
    realizado: string
    idUsuario: string
  }