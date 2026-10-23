import fs from 'fs';
import { runScanPipeline } from '../src/server/services/scanPipeline';

async function verifyAccuracyAndGroundTruth() {
  console.log('================================================================');
  console.log('       LEGITIFY RIGOROUS ACCURACY & GROUND TRUTH AUDIT');
  console.log('================================================================\n');

  // TEST 1: Real PDF Scam Offer (Clinchsoft Technologies demanding ₹1577)
  const scamPdf = fs.readFileSync('test_docs/Welcome Letter_Shri_Sanjaykumar_V_20260317_052819.pdf');
  const scamReport = await runScanPipeline({
    userId: '00000000-0000-0000-0000-000000000001',
    entityType: 'document',
    entityValue: 'Welcome Letter_Shri_Sanjaykumar_V_20260317_052819.pdf',
    filename: 'Welcome Letter_Shri_Sanjaykumar_V_20260317_052819.pdf',
    mimeType: 'application/pdf',
    fileBuffer: scamPdf,
  });

  console.log('--- TEST 1: REAL FAKE OFFER LETTER WITH FEE DEMAND ---');
  console.log('Document: Welcome Letter_Shri_Sanjaykumar_V_20260317_052819.pdf');
  console.log('Company Identified:', scamReport.entity_name);
  console.log('Trust Score:', scamReport.trust_score, '/ 100');
  console.log('Risk Level:', scamReport.risk_level);
  console.log('Verdict:', scamReport.verdict);
  console.log('Has Fee Demand Detected:', scamReport.document_analysis?.has_fee_demand);
  console.log('Payment Case:', scamReport.document_analysis?.payment_case);
  console.log('Extracted Fees:', JSON.stringify(scamReport.document_analysis?.fee_details?.map(f => ({
    category: f.category,
    amount: f.amount,
    channel: f.channel,
    exact_quote: f.exact_quote?.slice(0, 70) + '...'
  })), null, 2));
  console.log('Top Critical Flags:', scamReport.critical_signals.slice(0, 3));
  console.log('');

  // TEST 2: 100% Genuine Offer Letter (Infosys Ltd - Corporate email, real salary, zero fee, explicit anti-fraud clause)
  const genuineText = `INFOSYS LIMITED
CIN: L85110KA1981PLC013115
Registered Office: Electronics City, Hosur Road, Bengaluru 560100, India

Offer of Employment - Systems Engineer
Date: 15-March-2026
Dear Priya Sharma,

We are pleased to extend an offer of employment for the position of Systems Engineer at Infosys Limited.
Your date of joining will be 02-May-2026 at our Bangalore Development Centre.

Compensation and Benefits:
- Fixed Gross Salary: Rs. 4,50,000/- Per Annum (CTC)
- Basic Pay: Rs. 25,000/- Per Month
- Performance Incentive & Allowances: As per company policy
- Medical Insurance & Provident Fund (PF): Applicable from Day 1 of onboarding.

Terms & Conditions:
1. This appointment is governed by company policies, code of conduct, and standard Non-Disclosure Agreement (NDA).
2. Probation period will be six (6) months from your date of joining.
3. Background verification (BGV) will be conducted prior to final onboarding.

Important Recruitment Notice:
Infosys does NOT charge any recruitment fee, registration fee, caution deposit, or security amount at any stage of the recruitment process. All official communications are dispatched strictly from @infosys.com corporate mail servers.

Yours sincerely,
Authorized Signatory
Infosys Limited
Contact: careers@infosys.com | https://www.infosys.com`;

  const genuineReport = await runScanPipeline({
    userId: '00000000-0000-0000-0000-000000000001',
    entityType: 'document',
    entityValue: 'Infosys_Genuine_Offer.pdf',
    filename: 'Infosys_Genuine_Offer.pdf',
    mimeType: 'text/plain',
    contextText: genuineText,
  });

  console.log('--- TEST 2: 100% GENUINE CORPORATE OFFER LETTER ---');
  console.log('Company Identified:', genuineReport.entity_name);
  console.log('Trust Score:', genuineReport.trust_score, '/ 100');
  console.log('Risk Level:', genuineReport.risk_level);
  console.log('Verdict:', genuineReport.verdict);
  console.log('Has Fee Demand Detected:', genuineReport.document_analysis?.has_fee_demand);
  console.log('Payment Case:', genuineReport.document_analysis?.payment_case);
  console.log('Compensation Detected:', JSON.stringify(genuineReport.document_analysis?.candidate_compensation));
  console.log('Positive Signals:', genuineReport.positive_signals.slice(0, 4));
  console.log('');

  // TEST 3: Impersonation / Deceptive Recruiter Scam (IndiGo Airline name claimed, but personal email & unverified domain)
  const impersonationText = `InterGlobe Aviation Limited (IndiGo)
Offer Letter
Date: 03-April-2026
Dear Rahul Verma,
Congratulations! You have been selected for the role of Airport Ground Staff at IndiGo.
Your monthly stipend will be Rs. 28,000/-.
Send your documents and confirm your acceptance to our recruitment coordinator at:
Email: indigo.careers.onboarding@gmail.com
WhatsApp: +91 9876543210
Interview slot booking amount of Rs. 1,200/- must be paid via UPI to confirm your training batch.

Regards,
HR Operations Team
IndiGo Airlines`;

  const impReport = await runScanPipeline({
    userId: '00000000-0000-0000-0000-000000000001',
    entityType: 'document',
    entityValue: 'IndiGo_Impersonation_Offer.txt',
    contextText: impersonationText,
  });

  console.log('--- TEST 3: BRAND IMPERSONATION SCAM (Gmail + UPI Fee) ---');
  console.log('Company Claimed:', impReport.entity_name);
  console.log('Trust Score:', impReport.trust_score, '/ 100');
  console.log('Risk Level:', impReport.risk_level);
  console.log('Verdict:', impReport.verdict);
  console.log('Recruiter Email:', impReport.recruiter_analysis?.email);
  console.log('Free Webmail Flagged:', impReport.recruiter_analysis?.free_email_provider);
  console.log('Has Fee Demand:', impReport.document_analysis?.has_fee_demand);
  console.log('Critical Signals:', impReport.critical_signals.slice(0, 3));
  console.log('================================================================');
}

verifyAccuracyAndGroundTruth().catch(console.error);
