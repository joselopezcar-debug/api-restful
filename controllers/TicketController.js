const TicketService = require("../services/TicketService");
const service = new TicketService();
const NotificationService = require("../services/NotificationService");
const notificationService = new NotificationService();

exports.create = (req, res) => {
  const ticket = service.createTicket(req.body);
  res.status(201).json(ticket);
};

exports.list = (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const result = service.list(page, limit);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.assign = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.delete = (req, res) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.getNotificationsByTicket = (req, res, next) => {
    try {
        const { id } = req.params;
        
        const ticketExists = service.repo.findById(id);
        if (!ticketExists) {
            return res.status(404).json({ error: "Ticket no encontrado" });
        }

        const history = notificationService.getByTicketId(id);
        res.status(200).json(history);
    } catch (err) {
        next(err);
    }
};