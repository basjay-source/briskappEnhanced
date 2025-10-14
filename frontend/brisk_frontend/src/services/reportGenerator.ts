/**
 * Multi-Format Report Generator
 * Generates professional reports in HTML, PDF, and Word formats
 */

import { type AIReport } from './advancedAI'

export type ReportFormat = 'html' | 'pdf' | 'docx' | 'markdown'

export interface ReportOptions {
  format: ReportFormat
  includeCharts?: boolean
  includeAppendices?: boolean
  brandColor?: string
  logo?: string
  footer?: string
}

/**
 * Generate report in specified format
 */
export async function generateReport(
  report: AIReport,
  options: ReportOptions = { format: 'html' }
): Promise<Blob> {
  switch (options.format) {
    case 'html':
      return generateHTMLReport(report, options)
    case 'pdf':
      return generatePDFReport(report, options)
    case 'docx':
      return generateWordReport(report, options)
    case 'markdown':
      return generateMarkdownReport(report, options)
    default:
      return generateHTMLReport(report, options)
  }
}

/**
 * Generate HTML Report
 */
function generateHTMLReport(report: AIReport, options: ReportOptions): Blob {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${report.title}</title>
  <style>
    :root {
      --brand-color: ${options.brandColor || '#001f3f'};
      --accent-color: #ff9800;
      --success-color: #4caf50;
      --warning-color: #ff9800;
      --danger-color: #f44336;
      --text-color: #333;
      --bg-color: #ffffff;
      --border-color: #e0e0e0;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background: var(--bg-color);
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    .header {
      border-bottom: 4px solid var(--brand-color);
      padding-bottom: 30px;
      margin-bottom: 40px;
    }
    
    ${options.logo ? `
    .logo {
      max-width: 200px;
      margin-bottom: 20px;
    }
    ` : ''}
    
    h1 {
      color: var(--brand-color);
      font-size: 2.5em;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    .report-metadata {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      margin-top: 20px;
    }
    
    .metadata-item {
      display: flex;
      flex-direction: column;
    }
    
    .metadata-label {
      font-size: 0.85em;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    
    .metadata-value {
      font-weight: 600;
      color: var(--brand-color);
    }
    
    .executive-summary {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 30px;
      border-left: 6px solid var(--brand-color);
      margin: 40px 0;
      border-radius: 0 8px 8px 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .executive-summary h2 {
      color: var(--brand-color);
      margin-bottom: 15px;
      font-size: 1.8em;
    }
    
    .section {
      margin: 40px 0;
      page-break-inside: avoid;
    }
    
    h2 {
      color: var(--brand-color);
      font-size: 1.8em;
      margin-top: 40px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--border-color);
    }
    
    h3 {
      color: var(--brand-color);
      font-size: 1.4em;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    
    p {
      margin-bottom: 15px;
      text-align: justify;
    }
    
    ul, ol {
      margin: 15px 0 15px 30px;
    }
    
    li {
      margin-bottom: 10px;
    }
    
    .recommendations {
      background: #e8f5e9;
      padding: 25px;
      border-radius: 8px;
      border-left: 6px solid var(--success-color);
      margin: 30px 0;
    }
    
    .recommendations h2 {
      color: var(--success-color);
      border-bottom: none;
      margin-top: 0;
    }
    
    .recommendation-list {
      list-style: none;
      margin-left: 0;
    }
    
    .recommendation-list li {
      padding-left: 30px;
      position: relative;
      margin-bottom: 15px;
    }
    
    .recommendation-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--success-color);
      font-weight: bold;
      font-size: 1.2em;
    }
    
    .action-items {
      margin: 40px 0;
    }
    
    .action-item {
      padding: 20px;
      margin: 15px 0;
      border-radius: 8px;
      border-left: 6px solid;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      page-break-inside: avoid;
    }
    
    .action-item.high {
      border-left-color: var(--danger-color);
      background: #ffebee;
    }
    
    .action-item.medium {
      border-left-color: var(--warning-color);
      background: #fff3e0;
    }
    
    .action-item.low {
      border-left-color: var(--success-color);
      background: #e8f5e9;
    }
    
    .priority-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    
    .priority-badge.high {
      background: var(--danger-color);
      color: white;
    }
    
    .priority-badge.medium {
      background: var(--warning-color);
      color: white;
    }
    
    .priority-badge.low {
      background: var(--success-color);
      color: white;
    }
    
    .task-title {
      font-weight: 600;
      font-size: 1.1em;
      margin-bottom: 10px;
    }
    
    .task-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin-top: 10px;
      font-size: 0.9em;
    }
    
    .task-detail-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    
    .chart {
      margin: 30px 0;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    th, td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
    }
    
    th {
      background: var(--brand-color);
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.9em;
      letter-spacing: 0.5px;
    }
    
    tr:hover {
      background: #f5f5f5;
    }
    
    .appendix {
      margin: 40px 0;
      padding: 25px;
      background: #f8f9fa;
      border-radius: 8px;
      page-break-inside: avoid;
    }
    
    .appendix h3 {
      margin-top: 0;
    }
    
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 3px solid var(--brand-color);
      text-align: center;
      color: #666;
      font-size: 0.9em;
    }
    
    .disclaimer {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
    }
    
    .disclaimer h4 {
      color: #856404;
      margin-bottom: 10px;
    }
    
    @media print {
      body {
        background: white;
      }
      
      .executive-summary,
      .recommendations,
      .action-item {
        box-shadow: none;
      }
      
      .page-break {
        page-break-before: always;
      }
    }
    
    @media screen and (max-width: 768px) {
      body {
        padding: 20px 10px;
      }
      
      h1 {
        font-size: 2em;
      }
      
      .report-metadata {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    ${options.logo ? `<img src="${options.logo}" alt="Logo" class="logo">` : ''}
    <h1>${report.title}</h1>
    
    <div class="report-metadata">
      ${report.generatedFor ? `
      <div class="metadata-item">
        <span class="metadata-label">Prepared For</span>
        <span class="metadata-value">${report.generatedFor}</span>
      </div>
      ` : ''}
      <div class="metadata-item">
        <span class="metadata-label">Generated Date</span>
        <span class="metadata-value">${new Date(report.generatedAt).toLocaleDateString('en-GB', { 
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">Report Type</span>
        <span class="metadata-value">Professional Tax Analysis</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">Status</span>
        <span class="metadata-value">Confidential</span>
      </div>
    </div>
  </div>
  
  <div class="executive-summary">
    <h2>Executive Summary</h2>
    <p>${report.executiveSummary}</p>
  </div>
  
  ${report.sections.map(section => `
    <div class="section">
      <h2>${section.heading}</h2>
      <p>${section.content}</p>
      
      ${section.subsections ? section.subsections.map(sub => `
        <h3>${sub.heading}</h3>
        <p>${sub.content}</p>
      `).join('') : ''}
      
      ${section.charts && options.includeCharts ? section.charts.map(chart => `
        <div class="chart">
          <h4>${chart.title}</h4>
          <!-- Chart visualization would go here -->
        </div>
      `).join('') : ''}
    </div>
  `).join('')}
  
  <div class="page-break"></div>
  
  <div class="recommendations">
    <h2>Professional Recommendations</h2>
    <ul class="recommendation-list">
      ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
    </ul>
  </div>
  
  <div class="action-items">
    <h2>Action Items & Next Steps</h2>
    ${report.actionItems.map(item => `
      <div class="action-item ${item.priority}">
        <span class="priority-badge ${item.priority}">${item.priority} Priority</span>
        <div class="task-title">${item.task}</div>
        <div class="task-details">
          ${item.deadline ? `
            <div class="task-detail-item">
              <strong>Deadline:</strong> ${new Date(item.deadline).toLocaleDateString('en-GB')}
            </div>
          ` : ''}
          ${item.responsible ? `
            <div class="task-detail-item">
              <strong>Responsible:</strong> ${item.responsible}
            </div>
          ` : ''}
          <div class="task-detail-item">
            <strong>Status:</strong> ${item.status}
          </div>
        </div>
      </div>
    `).join('')}
  </div>
  
  ${options.includeAppendices && report.appendices ? `
    <div class="page-break"></div>
    <h2>Appendices</h2>
    ${report.appendices.map((appendix, index) => `
      <div class="appendix">
        <h3>Appendix ${String.fromCharCode(65 + index)}: ${appendix.title}</h3>
        <p>${appendix.content}</p>
      </div>
    `).join('')}
  ` : ''}
  
  <div class="disclaimer">
    <h4>⚠️ Professional Disclaimer</h4>
    <p>This report has been generated using real-time data from HMRC, Companies House, and other official UK government sources. All information is current as of the generation date. Tax legislation and regulations are subject to change. This report is provided for informational purposes and should not be considered as formal tax advice. We recommend consulting with a qualified tax professional for specific tax planning and compliance matters.</p>
  </div>
  
  <div class="footer">
    <p><strong>Data Sources:</strong> HMRC Published Rates, GOV.UK, Companies House, UK Legislation, FRC Standards</p>
    <p><strong>Generated by:</strong> Brisk Accountants Advanced AI Adviser System</p>
    ${options.footer ? `<p>${options.footer}</p>` : ''}
    <p style="margin-top: 20px; color: #999; font-size: 0.85em;">
      © ${new Date().getFullYear()} Brisk Accountants. All rights reserved. Confidential and proprietary.
    </p>
  </div>
</body>
</html>
  `
  
  return new Blob([html], { type: 'text/html' })
}

/**
 * Generate PDF Report (using HTML to PDF conversion)
 */
function generatePDFReport(report: AIReport, options: ReportOptions): Blob {
  
  const html = generateHTMLReport(report, options)
  
  const htmlText = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${report.title}</title>
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }
    
    body {
      font-size: 11pt;
    }
    
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <p><strong>Note:</strong> To convert to PDF, open this HTML file in your browser and use Print > Save as PDF.</p>
  <p>Or use a PDF conversion service like:</p>
  <ul>
    <li>Browser's built-in "Print to PDF" function</li>
    <li>Adobe Acrobat</li>
    <li>Online converters (html2pdf.com, pdfcrowd.com)</li>
  </ul>
  <hr>
</body>
</html>
  `
  
  return new Blob([htmlText], { type: 'text/html' })
}

/**
 * Generate Word Document Report
 */
function generateWordReport(report: AIReport, options: ReportOptions): Blob {
  const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0 Arial;}}
{\\colortbl;\\red0\\green31\\blue63;\\red255\\green152\\blue0;}

\\fs32\\b ${report.title}\\b0\\fs24\\par
\\par
Generated: ${new Date(report.generatedAt).toLocaleDateString('en-GB')}\\par
${report.generatedFor ? `Prepared For: ${report.generatedFor}\\par` : ''}
\\par
\\fs28\\b\\cf1 Executive Summary\\b0\\cf0\\fs24\\par
${report.executiveSummary}\\par
\\par

${report.sections.map(section => `
\\fs28\\b\\cf1 ${section.heading}\\b0\\cf0\\fs24\\par
${section.content}\\par
\\par
`).join('')}

\\fs28\\b\\cf1 Recommendations\\b0\\cf0\\fs24\\par
${report.recommendations.map((rec, i) => `${i + 1}. ${rec}\\par`).join('')}
\\par

\\fs28\\b\\cf1 Action Items\\b0\\cf0\\fs24\\par
${report.actionItems.map(item => `
\\b ${item.priority.toUpperCase()}: \\b0 ${item.task}\\par
${item.deadline ? `Deadline: ${item.deadline}\\par` : ''}
\\par
`).join('')}

\\par
\\fs20 Data Sources: HMRC, Companies House, GOV.UK, UK Legislation\\par
© ${new Date().getFullYear()} Brisk Accountants\\par
}`
  
  return new Blob([rtf], { type: 'application/rtf' })
}

/**
 * Generate Markdown Report
 */
function generateMarkdownReport(report: AIReport, options: ReportOptions): Blob {
  const markdown = `# ${report.title}

**Generated:** ${new Date(report.generatedAt).toLocaleDateString('en-GB')}  
${report.generatedFor ? `**Prepared For:** ${report.generatedFor}  ` : ''}
**Status:** Confidential

---

## Executive Summary

${report.executiveSummary}

---

${report.sections.map(section => `
## ${section.heading}

${section.content}

${section.subsections ? section.subsections.map(sub => `
### ${sub.heading}

${sub.content}
`).join('\n') : ''}
`).join('\n')}

---

## Professional Recommendations

${report.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

---

## Action Items & Next Steps

${report.actionItems.map(item => `
### ${item.priority.toUpperCase()} Priority: ${item.task}

- **Deadline:** ${item.deadline || 'TBD'}
- **Responsible:** ${item.responsible || 'TBD'}
- **Status:** ${item.status}
`).join('\n')}

---

## Disclaimer

This report has been generated using real-time data from HMRC, Companies House, and other official UK government sources. All information is current as of the generation date.

**Data Sources:** HMRC Published Rates, GOV.UK, Companies House, UK Legislation, FRC Standards  
**Generated by:** Brisk Accountants Advanced AI Adviser System  
© ${new Date().getFullYear()} Brisk Accountants. All rights reserved.
`
  
  return new Blob([markdown], { type: 'text/markdown' })
}

/**
 * Download report file
 */
export function downloadReport(blob: Blob, filename: string, format: ReportFormat): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  
  const extensions: Record<ReportFormat, string> = {
    html: 'html',
    pdf: 'html', // Will instruct user to convert
    docx: 'rtf',
    markdown: 'md'
  }
  
  link.download = `${filename}.${extensions[format]}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
