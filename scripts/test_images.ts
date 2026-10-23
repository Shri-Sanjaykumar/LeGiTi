import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { processDocument } from '../src/server/services/documentService';
import { runScanPipeline } from '../src/server/services/scanPipeline';

async function testImage(fileName: string) {
  console.log(`\n======================================================`);
  console.log(`TESTING IMAGE FILE: ${fileName}`);
  console.log(`======================================================`);

  const filePath = path.join(process.cwd(), 'fake offer letters', fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    return;
  }

  const buffer = fs.readFileSync(filePath);
  const docResult = await processDocument(buffer, fileName, 'image/jpeg');
  console.log(`Extraction engine: ${docResult.ocr_engine} (${docResult.extracted_text.length} chars)`);
  console.log(`Company: ${docResult.detected_company_name}`);
  console.log(`Fee Demand: ${docResult.has_fee_demand}`);
  console.log(`Text snippet:\n${docResult.extracted_text.slice(0, 300)}`);

  const scanResult = await runScanPipeline({
    userId: 'test-user',
    entityType: 'DOCUMENT',
    entityValue: fileName,
    fileBuffer: buffer,
    filename: fileName,
    mimeType: 'image/jpeg',
    contextText: docResult.extracted_text,
  });

  console.log(`Trust Score:   ${scanResult.trust_score}/100`);
  console.log(`Risk Level:    ${scanResult.risk_level}`);
  console.log(`Final Verdict: ${scanResult.verdict}`);
}

async function main() {
  const images = ['images (1).jpg', 'images.jpg'];
  for (const img of images) {
    await testImage(img);
  }
}

main().catch(console.error);
