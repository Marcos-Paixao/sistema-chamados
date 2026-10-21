
export type TicketStatus = 'Aberto' | 'Em andamento' | 'Resolvido'

export type TicketPriority = 'Baixa' | 'Média' | 'Alta'

export type TicketCategory =
  | 'Hardware'
  | 'Software'
  | 'Impressoras'
  | 'Rede'
  | 'Acesso'

export interface Ticket {
  id: number
  title: string
  requester: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  description: string
  createdAt: string
}
