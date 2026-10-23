import { calculateDeterministicScore } from '../src/server/services/scoringService';
import { extractDocumentSignals } from '../src/server/services/documentService';
import { lookupCompany } from '../src/server/services/companyService';
import { analyzeDomain } from '../src/server/services/domainService';
import { analyzeRecruiterEmail } from '../src/server/services/emailService';

async function testScore() {
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
Important Recruitment Notice:
Infosys does NOT charge any recruitment fee, registration fee, caution deposit, or security amount at any stage of the recruitment process. All official communications are dispatched strictly from @infosys.com corporate mail servers.
Yours sincerely,
Authorized Signatory
Infosys Limited
Contact: careers@infosys.com | https://www.infosys.com`;

  const doc = extractDocumentSignals(genuineText);
  console.log('Doc final_score:', doc.final_score, 'verdict:', doc.verdict, 'has_fee_demand:', doc.has_fee_demand);
  console.log('Doc flags:', doc.triggered_flags.map(f => f.rule + ': ' + f.message));

  const comp = await lookupCompany('Infosys Limited', 'infosys.com', 'L85110KA1981PLC013115');
  const dom = await analyzeDomain('infosys.com');
  const rec = analyzeRecruiterEmail('careers@infosys.com', 'infosys.com', 'Infosys Limited');
  
  const scoreRes = calculateDeterministicScore({
    companyData: comp.data,
    domainData: dom.data,
    recruiterData: rec.data,
    documentData: doc,
    evidence: [...doc.evidence, ...comp.evidence, ...dom.evidence, ...rec.evidence],
  });

  console.log('Deterministic Trust Score:', scoreRes.trust_score);
  console.log('Risk Level:', scoreRes.risk_level);
  console.log('Verdict:', scoreRes.verdict);
  console.log('Rules Triggered:', scoreRes.rules_triggered.map(r => r.rule_id + ': ' + r.name + ' (' + r.impact + ')'));
  console.log('Dimensions:');
  for (const d of scoreRes.score_trace.dimensions) {
    console.log(' - ' + d.name + ': score=' + d.score + ', status=' + d.status + ', contrib=' + d.weighted_contribution);
  }
}

testScore();
