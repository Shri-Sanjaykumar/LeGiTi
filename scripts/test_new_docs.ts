import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { extractPdfTextWithEngine, extractDocumentSignals } from '../src/server/services/documentService';
import { runScanPipeline } from '../src/server/services/scanPipeline';

async function testDoc(fileName: string) {
  console.log(`\n======================================================`);
  console.log(`TESTING FILE: ${fileName}`);
  console.log(`======================================================`);

  const filePath = path.join(process.cwd(), 'fake offer letters', fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    return;
  }

  const buffer = fs.readFileSync(filePath);

  const extracted = await extractPdfTextWithEngine(buffer, fileName);
  console.log(`Extraction engine: ${extracted.engine} (${extracted.text.length} chars)`);

  // Document Signals
  const docSignals = extractDocumentSignals(extracted.text);
  console.log(`Detected Company: ${docSignals.detected_company_name}`);
  console.log(`Fee Demand: ${docSignals.has_fee_demand}`);
  console.log(`Fee Amount: ${docSignals.fee_amount_detected}`);

  // Run full scan pipeline
  try {
    const scanResult = await runScanPipeline({
      userId: 'test-user',
      entityType: 'DOCUMENT',
      entityValue: fileName,
      fileBuffer: buffer,
      filename: fileName,
      mimeType: 'application/pdf',
      contextText: extracted.text,
    });

    console.log(`\n================ SCAN RESULT FOR ${fileName} ================`);
    console.log(`Trust Score:       ${scanResult.trust_score}/100`);
    console.log(`Risk Level:        ${scanResult.risk_level}`);
    console.log(`Final Verdict:     ${scanResult.verdict}`);
    console.log(`Rules Evaluated:   ${scanResult.rules_evaluated?.length || 0}`);
    for (const r of (scanResult.rules_evaluated || []).slice(0, 5)) {
      console.log(` - [${r.rule_id}] ${r.name} (${r.impact}): ${r.description}`);
    }

    console.log(`\nGemini Independent Cross-Examination:`);
    console.log(`Verdict:    ${scanResult.gemini_cross_examination?.verdict}`);
    console.log(`Confidence: ${scanResult.gemini_cross_examination?.confidence}`);
    console.log(`Summary:    ${scanResult.gemini_cross_examination?.summary}`);
    console.log(`Risk signals:`, scanResult.gemini_cross_examination?.riskSignals);
  } catch (err: any) {
    console.error(`Scan pipeline error:`, err);
  }
}

async function main() {
  await testDoc('Welcome_Shri_Sanjaykumar_V_20261016_212601_534155.pdf');
}

main().catch(console.error);
