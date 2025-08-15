// Servicio para manejo de cotizaciones
export class QuoteService {
  constructor() {
    this.quotes = this.loadQuotes();
  }

  loadQuotes() {
    const stored = localStorage.getItem('vinyl_quotes');
    return stored ? JSON.parse(stored) : [];
  }

  saveQuotes() {
    localStorage.setItem('vinyl_quotes', JSON.stringify(this.quotes));
  }

  generateQuoteNumber() {
    const year = new Date().getFullYear();
    const count = this.quotes.filter(q => q.number.startsWith(`COT-${year}`)).length + 1;
    return `COT-${year}-${count.toString().padStart(4, '0')}`;
  }

  createQuote(clientData, items, observations = '') {
    const quote = {
      id: Date.now(),
      number: this.generateQuoteNumber(),
      client: clientData,
      items: items,
      observations: observations,
      subtotal: this.calculateSubtotal(items),
      igv: 0, // 18% en Perú
      total: 0,
      status: 'pending', // pending, approved, rejected
      validUntil: this.getValidUntilDate(),
      createdAt: new Date().toISOString(),
      createdBy: 'Sistema' // Aquí podrías poner el usuario logueado
    };

    // Calcular IGV y total
    quote.igv = quote.subtotal * 0.18;
    quote.total = quote.subtotal + quote.igv;

    this.quotes.push(quote);
    this.saveQuotes();
    return quote;
  }

  calculateSubtotal(items) {
    return items.reduce((sum, item) => sum + item.totalCost, 0);
  }

  getValidUntilDate() {
    const date = new Date();
    date.setDate(date.getDate() + 15); // Válida por 15 días
    return date.toISOString().split('T')[0];
  }

  getQuotes() {
    return this.quotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  updateQuoteStatus(quoteId, status) {
    const quote = this.quotes.find(q => q.id === quoteId);
    if (quote) {
      quote.status = status;
      quote.updatedAt = new Date().toISOString();
      this.saveQuotes();
    }
    return quote;
  }
}