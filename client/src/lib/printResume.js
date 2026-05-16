const makeTitle = (title) => `${title || 'Resume'}`.trim() || 'Resume'

const getStyleMarkup = () =>
  Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n')

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const printStyles = `
  <style>
    @page {
      size: A4;
      margin: 0;
    }

    html,
    body {
      margin: 0;
      min-height: 100%;
      background: #e2e8f0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: Outfit, Arial, sans-serif;
    }

    .print-toolbar {
      position: sticky;
      top: 0;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 20px;
      border-bottom: 1px solid #e2e8f0;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(12px);
      color: #334155;
    }

    .print-toolbar p {
      margin: 0;
      font-size: 13px;
    }

    .print-toolbar button {
      border: 0;
      border-radius: 8px;
      background: #0f172a;
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
      font-weight: 700;
      padding: 9px 14px;
    }

    .print-shell {
      display: flex;
      justify-content: center;
      padding: 24px;
    }

    .print-page {
      width: 210mm;
      min-height: 297mm;
      overflow: visible;
      background: #ffffff;
      box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
    }

    .print-page > * {
      width: 210mm !important;
      max-width: 210mm !important;
      min-height: 297mm;
      margin: 0 auto !important;
      box-shadow: none !important;
    }

    @media print {
      html,
      body {
        width: 210mm;
        background: #ffffff;
      }

      .print-toolbar {
        display: none !important;
      }

      .print-shell {
        display: block;
        padding: 0;
      }

      .print-page {
        width: 210mm;
        min-height: 297mm;
        margin: 0;
        box-shadow: none;
      }
    }
  </style>
`

export const openResumePrintPreview = async (element, title) => {
  if (!element) {
    throw new Error('Resume preview is not ready.')
  }

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    throw new Error('Allow popups to open the print preview.')
  }

  const clone = element.cloneNode(true)
  const documentTitle = makeTitle(title)

  printWindow.document.open()
  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(documentTitle)} - Print Preview</title>
        ${getStyleMarkup()}
        ${printStyles}
      </head>
      <body>
        <div class="print-toolbar">
          <p>Print preview. Choose "Save as PDF" in the print dialog to save this resume.</p>
          <button type="button" onclick="window.print()">Print / Save as PDF</button>
        </div>
        <main class="print-shell">
          <section class="print-page">${clone.outerHTML}</section>
        </main>
      </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.focus()

  window.setTimeout(() => {
    printWindow.print()
  }, 500)
}
