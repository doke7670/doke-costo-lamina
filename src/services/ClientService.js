// Servicio para manejo de clientes
export class ClientService {
  constructor() {
    this.clients = this.loadClients();
  }

  loadClients() {
    const stored = localStorage.getItem('vinyl_clients');
    return stored ? JSON.parse(stored) : [];
  }

  saveClients() {
    localStorage.setItem('vinyl_clients', JSON.stringify(this.clients));
  }

  addClient(clientData) {
    const client = {
      id: Date.now(),
      name: clientData.name,
      phone: clientData.phone,
      email: clientData.email,
      address: clientData.address,
      ruc: clientData.ruc,
      createdAt: new Date().toISOString()
    };
    
    this.clients.push(client);
    this.saveClients();
    return client;
  }

  getClients() {
    return this.clients;
  }

  findClient(id) {
    return this.clients.find(client => client.id === id);
  }
}