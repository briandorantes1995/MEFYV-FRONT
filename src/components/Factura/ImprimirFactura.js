import jsPDF from 'jspdf';
import 'jspdf-autotable';

function generarPDF(remision) {
    const doc = new jsPDF();

    const { id, fecha, cliente, domicilio, rfc, identificador, detalles } = remision;
    const total = detalles.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    // Encabezado
    doc.setFontSize(16);
    doc.text('COMERCIALIZADORA Y DISTRIBUIDORA MEFYV, S.A. DE C.V.', 20, 20);
    doc.setFontSize(12);
    doc.text('Villa de Santiago No. 223, Col. Villas de Anáhuac, CP 66422, San Nicolás de los Garza, N.L.', 20, 30);
    doc.text('RFC CDM101108I55 Tel: 8117770920', 20, 40);

    const remisionYPosition = 50;

    // Detalles de la remisión
    doc.text(`REMISION N° ${identificador}`, 20, remisionYPosition);
    doc.text(`FECHA: ${fecha}`, 140, remisionYPosition);

    // Información del cliente
    doc.text(`NOMBRE: ${cliente}`, 20, remisionYPosition + 10);
    doc.text(`DOMICILIO: ${domicilio}`, 20, remisionYPosition + 15);
    doc.text(`RFC: ${rfc}`, 20, remisionYPosition + 20);

    // Detalles de los artículos
    const items = detalles.map(item => [
        item.cantidad,
        item.descripcion,
        `$${item.precio.toFixed(2)}`,
        `$${(item.precio * item.cantidad).toFixed(2)}`
    ]);

    doc.autoTable({
        head: [['CANTIDAD', 'DESCRIPCIÓN', 'PRECIO UNITARIO', 'TOTAL']],
        body: items,
        startY: 80,
    });

    // Total en letras (esto es solo un ejemplo)
    doc.text(`CANTIDAD CON LETRA: TRES MIL SETECIENTOS CUARENTA PESOS 00/100 M.N.`, 20, doc.autoTable.previous.finalY + 10);

    // Totales
    doc.text(`SUB-TOTAL: $${total.toFixed(2)}`, 150, doc.autoTable.previous.finalY + 20);
    doc.text('IVA: $0.00', 150, doc.autoTable.previous.finalY + 30);
    doc.text(`TOTAL: $${total.toFixed(2)}`, 150, doc.autoTable.previous.finalY + 40);

    // Abrir el PDF en una nueva ventana con la opción de imprimir
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const pdfWindow = window.open(pdfUrl);
    if (pdfWindow) {
        pdfWindow.onload = function() {
            pdfWindow.focus();
            pdfWindow.print();
        };
    }
}

export default generarPDF;




