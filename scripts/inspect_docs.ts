import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { extractPdfTextWithEngine, extractDocumentSignals } from '../src/server/services/documentService';
import { calculateDeterministicScore } from '../src/server/services/scoringService';
import { runScanPipeline } from '../src/server/services/scanPipeline';

async function inspect(fileName: string) {
  const filePath = path.join(process.cwd(), 'fake offer letters', fileName);
  const buf = fs.readFileSync(filePath);
  const ext = await extractPdfTextWithEngine(buf, fileName);
  const sig = extractDocumentSignals(ext.text);

  console.log(`\n======================================================`);
  console.log(`INSPECTING: ${fileName}`);
  console.log(`======================================================`);
  console.log(`FULL TEXT:\n------------------------------------------------------`);
  console.log(ext.text);
  console.log(`------------------------------------------------------`);
  console.log('Signals:', JSON.stringify(sig, null, 2));

  const scan = await runScanPipeline({
    userId: 'test-user',
    entityType: 'DOCUMENT',
    entityValue: fileName,
    fileBuffer: buf,
    filename: fileName,
    mimeType: 'application/pdf',
    contextText: ext.text,
  });

  console.log(`\nSCORE DETAILS:`);
  console.log(`Trust Score: ${scan.trust_score}`);
  console.log(`Risk Level:  ${scan.risk_level}`);
  console.log(`Verdict:     ${scan.verdict}`);
  console.log(`Positive signals:`, scan.positive_signals);
  console.log(`Warning signals:`, scan.warning_signals);
  console.log(`Critical signals:`, scan.critical_signals);
  console.log(`Gemini Verdict:`, scan.gemini_cross_examination?.verdict);
  console.log(`Gemini Summary:`, scan.gemini_cross_examination?.summary);
}

async function main() {
  await inspect('emantra.pdf');
}

main().catch(console.error);
