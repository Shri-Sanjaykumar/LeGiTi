import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { runGeminiInvestigation } from '../src/server/services/geminiInvestigator';

async function testGeminiInvestigation() {
  console.log('Testing Live Gemini Independent Investigation...\n');
  const t0 = Date.now();

  const result = await runGeminiInvestigation({
    documentText: `Parsebridge Solutions
Subject: Machine Learning Internship
Batch code: PB-1046-46K
Dear Shri Sanjaykumar V,
We are pleased to inform you that you have been selected for the Internship Program at Parsebridge Solutions.
Gross Salary: Rs. 23,000/- Per Month.
To CONFIRM your enrolment, you are required to pay online through the following link Internship Form: 1572/-
Yours truly, Parsebridge Solutions, (T. Sai Reddy) HR Manager`,
    extractedEntities: {
      companyName: 'Parsebridge Solutions',
      role: 'Machine Learning Internship',
      stipend: 'Rs. 23,000/- Per Month',
      paymentRequested: true,
      paymentAmount: '1572',
      signatoryName: 'T. Sai Reddy',
      signatoryTitle: 'HR Manager',
    },
  });

  console.log('Gemini Live Result in', Date.now() - t0, 'ms:');
  console.log('Investigation Status:', result.investigationStatus);
  console.log('Gemini Model Used:   ', result.geminiModel);
  console.log('Gemini Verdict:      ', result.verdict);
  console.log('Gemini Confidence:   ', result.confidence);
  console.log('Summary:             ', result.summary);
  console.log('Risk Signals:        ', JSON.stringify(result.riskSignals, null, 2));
  console.log('Recommended Actions: ', result.recommendedActions);
}

testGeminiInvestigation().catch(console.error);
