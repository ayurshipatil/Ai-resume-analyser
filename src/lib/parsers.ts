import mammoth from 'mammoth';

export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.name.split('.').pop()?.toLowerCase();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (fileType === 'pdf') {
    try {
      const pdfModule = (await import('pdf-parse')) as any;
      if (pdfModule.PDFParse) {
        const parser = new pdfModule.PDFParse({ data: buffer });
        const result = await parser.getText();
        return result.text || '';
      } else if (typeof pdfModule.default === 'function') {
        const data = await pdfModule.default(buffer);
        return data.text || '';
      } else if (typeof pdfModule === 'function') {
        const data = await pdfModule(buffer);
        return data.text || '';
      } else {
        throw new Error('PDF parser engine interface unrecognized.');
      }
    } catch (err: any) {
      console.error('Error parsing PDF:', err);
      throw new Error('Failed to parse PDF document. Please ensure it is not password-protected.');
    }
  }

  if (fileType === 'docx') {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value || '';
    } catch (err) {
      console.error('Error parsing DOCX:', err);
      throw new Error('Failed to parse DOCX document. Please check the file formatting.');
    }
  }

  if (fileType === 'txt' || fileType === 'md') {
    return buffer.toString('utf-8');
  }

  throw new Error(`Unsupported file type: .${fileType}. Please upload a PDF, DOCX, or TXT file.`);
}

export function cleanExtractedText(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
