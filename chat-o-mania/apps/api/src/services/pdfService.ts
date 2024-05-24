import * as fs from 'fs';
import pdfParse from 'pdf-parse';

async function extractPdfContent(pdfPath: string): Promise<string> {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(pdfBuffer);
  return pdfData.text;
}

export { extractPdfContent };
