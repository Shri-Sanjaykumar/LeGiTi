import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { processDocument, extractDocumentSignals } from '../services/documentService';

describe('Real Offer Letter Verification Suite', () => {
  it('correctly analyzes real PDF offer letter (Clinchsoft Technologies)', async () => {
    const pdfPath = path.resolve(process.cwd(), 'test_docs/Welcome Letter_Shri_Sanjaykumar_V_20260317_052819.pdf');
    if (!fs.existsSync(pdfPath)) return;

    const buffer = fs.readFileSync(pdfPath);
    const result = await processDocument(buffer, 'Welcome Letter_Shri_Sanjaykumar_V_20260317_052819.pdf', 'application/pdf');

    assert.ok(result.extracted_text.length > 500, 'Must extract full text from PDF');
    assert.strictEqual(result.detected_company_name, 'Clinchsoft Technologies');
    assert.strictEqual(result.normalized_evidence?.candidate_name, 'Sanjaykumar V');
    assert.strictEqual(result.normalized_evidence?.job_role, 'Software Developer Internship');
    assert.strictEqual(result.has_fee_demand, true, 'Must detect fee demand');
    assert.strictEqual(result.payment_case, 'EXPLICIT_DEMAND');
    
    // Fee details
    assert.ok(result.requested_fees && result.requested_fees.length > 0, 'Must extract fee list');
    const fee = result.requested_fees[0];
    assert.strictEqual(fee.amount, '₹1577', 'Must extract ₹1577 fee amount');
    assert.strictEqual(fee.reason, 'ENROLMENT_FEE');
    assert.ok(fee.channel?.includes('Internship Form'), 'Must extract fee channel link');

    // Risk verdict
    assert.ok(result.final_score <= 20, 'Trust score must be severely penalized for fee demand');
    assert.strictEqual(result.verdict, 'LIKELY FAKE');
  });

  it('correctly extracts entities from real Tata Motors image letter', () => {
    const txtPath = path.resolve(process.cwd(), 'test_docs/1707730182163.jpg.txt');
    if (!fs.existsSync(txtPath)) return;

    const text = fs.readFileSync(txtPath, 'utf-8');
    const result = extractDocumentSignals(text, '1707730182163.jpg', 'image/jpeg');

    assert.strictEqual(result.detected_company_name, 'Tata Motors Ltd.');
    assert.strictEqual(result.normalized_evidence?.candidate_name, 'Deepak Raj');
    assert.strictEqual(result.normalized_evidence?.job_role, 'Junior Engineer');
  });

  it('correctly extracts entities from real IndiGo Airline image letter', () => {
    const txtPath = path.resolve(process.cwd(), 'test_docs/1757050110430.jpg.txt');
    if (!fs.existsSync(txtPath)) return;

    const text = fs.readFileSync(txtPath, 'utf-8');
    const result = extractDocumentSignals(text, '1757050110430.jpg', 'image/jpeg');

    assert.strictEqual(result.detected_company_name, 'InterGlobe Aviation Limited');
    assert.strictEqual(result.normalized_evidence?.candidate_name, 'Soham');
    assert.strictEqual(result.normalized_evidence?.job_role, 'Data Analyst');
    assert.strictEqual(result.normalized_evidence?.recruiter_name, 'Radhika');
  });
});
