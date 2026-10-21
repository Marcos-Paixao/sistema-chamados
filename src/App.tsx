import { useState, useEffect } from "react";
import "./App.css";
import { initialTickets } from "./data/tickets";
import type { Ticket, TicketCategory, TicketPriority } from "./types/Ticket";
import TicketForm from "./components/TicketForm/TicketForm";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
  const savedTickets = localStorage.getItem('helpdesk-tickets')

  if (savedTickets) {
    try {
      return JSON.parse(savedTickets) as Ticket[]
    } catch {
      localStorage.removeItem('helpdesk-tickets')
    }
  }

  return initialTickets
})
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
  localStorage.setItem('helpdesk-tickets', JSON.stringify(tickets))
}, [tickets])

  function handleCreateTicket(data: {
    title: string;
    requester: string;
    category: TicketCategory;
    priority: TicketPriority;
    description: string;
  }) {
    const newTicket: Ticket = {
      ...data,
      id: tickets.reduce((maxId, ticket) => Math.max(maxId, ticket.id), 0) + 1,
      status: "Aberto",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setTickets((currentTickets) => [newTicket, ...currentTickets]);
    setIsFormOpen(false);
  }

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Aberto",
  ).length;
  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "Em andamento",
  ).length;
  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolvido",
  ).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">
          HelpDesk<span>+</span>
        </h1>

        <nav>
          <a href="#dashboard" className="nav-link active">
            <span>▦</span> Dashboard
          </a>
          <a href="#chamados" className="nav-link">
            <span>▤</span> Chamados
          </a>
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" />
          Sistema operacional
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">CENTRAL DE SUPORTE</p>
            <h2>Dashboard</h2>
          </div>

          <div className="user-profile">
            <div className="avatar">AD</div>
            <div>
              <strong>Administrador</strong>
              <p>Equipe de TI</p>
            </div>
          </div>
        </header>

        <section className="welcome">
          <div>
            <p className="welcome-label">PAINEL DE CONTROLE</p>
            <h2>Olá, administrador!</h2>
            <p>Acompanhe os chamados e as atividades da equipe de suporte.</p>
          </div>
          <span className="welcome-icon">🎧</span>
        </section>

        <section className="stats-grid" aria-label="Resumo dos chamados">
          <article className="stat-card">
            <div className="stat-top">
              <span>Total de chamados</span>
              <span className="stat-icon blue">▤</span>
            </div>
            <strong className="stat-number">{totalTickets}</strong>
            <p>Chamados registrados</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Abertos</span>
              <span className="stat-icon orange">◷</span>
            </div>
            <strong className="stat-number">{openTickets}</strong>
            <p>Aguardando atendimento</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Em andamento</span>
              <span className="stat-icon purple">↻</span>
            </div>
            <strong className="stat-number">{inProgressTickets}</strong>
            <p>Em atendimento pela equipe</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Resolvidos</span>
              <span className="stat-icon green">✓</span>
            </div>
            <strong className="stat-number">{resolvedTickets}</strong>
            <p>Atendimentos concluídos</p>
          </article>
        </section>

        <section className="tickets-section" id="chamados">
          <div className="section-heading">
            <div>
              <h2>Chamados recentes</h2>
              <p>Acompanhe as solicitações de suporte.</p>
            </div>
            <button
              className="primary-button"
              type="button"
              onClick={() => setIsFormOpen(true)}
            >
              + Novo chamado
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Chamado</th>
                  <th>Solicitante</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>#{String(ticket.id).padStart(3, "0")}</td>
                    <td>
                      <strong>{ticket.title}</strong>
                      <span className="ticket-category">{ticket.category}</span>
                    </td>
                    <td>{ticket.requester}</td>
                    <td>
                      <span
                        className={`priority ${
                          ticket.priority === "Alta"
                            ? "high"
                            : ticket.priority === "Média"
                              ? "medium"
                              : "low"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          ticket.status === "Aberto"
                            ? "open"
                            : ticket.status === "Em andamento"
                              ? "progress"
                              : "resolved"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="footer">
          Sistema de Chamados de Suporte Técnico · Projeto de portfólio
        </footer>
      </main>
      {isFormOpen && (
        <TicketForm
          onSubmit={handleCreateTicket}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
