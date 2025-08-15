// Servicio para exportación PDF
export class PDFService {
  static generateQuotePDF(quote) {
    // Esta función usaría una librería como jsPDF
    // Por ahora, generamos el HTML para imprimir
    
    const printWindow = window.open('', '_blank');
    const htmlContent = this.generateQuoteHTML(quote);
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  }

  static generateQuoteHTML(quote) {
    const itemsHTML = quote.items.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.materialName}</td>
        <td>${item.width} x ${item.height} cm</td>
        <td>${item.quantity}</td>
        <td>${(item.area / 10000).toFixed(2)} m²</td>
        <td>S/ ${item.unitCost.toFixed(2)}</td>
        <td>${item.discount > 0 ? item.discount + '%' : '-'}</td>
        <td>S/ ${item.totalCost.toFixed(2)}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Cotización ${quote.number}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #FF6B35; }
          .quote-info { display: flex; justify-content: space-between; margin-bottom: 20px; }
          .client-info, .quote-details { width: 48%; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #6B7280; color: white; }
          .totals { margin-top: 20px; text-align: right; }
          .total-line { margin: 5px 0; }
          .final-total { font-size: 18px; font-weight: bold; color: #FF6B35; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">VINILES & POLARIZADOS</div>
          <p>Especialistas en viniles decorativos y polarizado automotriz</p>
        </div>

        <div class="quote-info">
          <div class="client-info">
            <h3>DATOS DEL CLIENTE</h3>
            <p><strong>Nombre:</strong> ${quote.client.name}</p>
            <p><strong>Teléfono:</strong> ${quote.client.phone}</p>
            ${quote.client.email ? `<p><strong>Email:</strong> ${quote.client.email}</p>` : ''}
            ${quote.client.ruc ? `<p><strong>RUC:</strong> ${quote.client.ruc}</p>` : ''}
          </div>
          <div class="quote-details">
            <h3>COTIZACIÓN</h3>
            <p><strong>Número:</strong> ${quote.number}</p>
            <p><strong>Fecha:</strong> ${new Date(quote.createdAt).toLocaleDateString()}</p>
            <p><strong>Válida hasta:</strong> ${new Date(quote.validUntil).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> ${this.getStatusText(quote.status)}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Material</th>
              <th>Medidas</th>
              <th>Cant.</th>
              <th>Área (m²)</th>
              <th>P. Unit.</th>
              <th>Desc.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-line">Subtotal: S/ ${quote.subtotal.toFixed(2)}</div>
          <div class="total-line">IGV (18%): S/ ${quote.igv.toFixed(2)}</div>
          <div class="total-line final-total">TOTAL: S/ ${quote.total.toFixed(2)}</div>
        </div>

        ${quote.observations ? `
          <div style="margin-top: 30px;">
            <h3>OBSERVACIONES</h3>
            <p>${quote.observations}</p>
          </div>
        ` : ''}

        <div class="footer">
          <p>Esta cotización es válida por ${this.getValidDays(quote)} días desde la fecha de emisión.</p>
          <p>Gracias por su preferencia.</p>
        </div>
      </body>
      </html>
    `;
  }

  static getStatusText(status) {
    const statusMap = {
      pending: 'Pendiente',
      approved: 'Aprobada',
      rejected: 'Rechazada'
    };
    return statusMap[status] || status;
  }

  static getValidDays(quote) {
    const created = new Date(quote.createdAt);
    const validUntil = new Date(quote.validUntil);
    const diffTime = Math.abs(validUntil - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}