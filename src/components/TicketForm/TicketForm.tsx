
import { useState } from 'react'
import './TicketForm.css'
import type {
  TicketCategory,
  TicketPriority,
} from '../../types/Ticket'


interface TicketFormProps {
  onSubmit: (ticket: {
    title: string
    requester: string
    category: TicketCategory
    priority: TicketPriority
    description: string
  }) => void
  onCancel: () => void
}

function TicketForm({ onSubmit, onCancel }: TicketFormProps) {
  const [title, setTitle] = useState('')
  const [requester, setRequester] = useState('')
  const [category, setCategory] = useState<TicketCategory>('Hardware')
  const [priority, setPriority] = useState<TicketPriority>('Média')
  const [description, setDescription] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit({
      title: title.trim(),
      requester: requester.trim(),
      category,
      priority,
      description: description.trim(),
    })
  }

  return (
    <div className="form-overlay">
      <section
        className="ticket-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-form-title"
      >
        <div className="form-heading">
          <div>
            <p className="eyebrow">CENTRAL DE SUPORTE</p>
            <h2 id="ticket-form-title">Novo chamado</h2>
          </div>

          <button
            className="close-button"
            type="button"
            onClick={onCancel}
            aria-label="Fechar formulário"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Título do chamado</label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ex.: Computador não liga"
            required
          />

          <label htmlFor="requester">Nome do solicitante</label>
          <input
            id="requester"
            value={requester}
            onChange={(event) => setRequester(event.target.value)}
            placeholder="Nome completo"
            required
          />

          <div className="form-row">
            <div>
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as TicketCategory)
                }
              >
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Impressoras">Impressoras</option>
                <option value="Rede">Rede</option>
                <option value="Acesso">Acesso</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority">Prioridade</label>
              <select
                id="priority"
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as TicketPriority)
                }
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          <label htmlFor="description">Descrição do problema</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descreva o problema relatado pelo usuário..."
            rows={4}
            required
          />

          <div className="form-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button className="primary-button" type="submit">
              Criar chamado
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default TicketForm