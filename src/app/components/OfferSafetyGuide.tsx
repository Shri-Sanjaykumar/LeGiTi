// ==============================================================================
// LEGITIFY OFFER SAFETY GUIDE & 4-STEP REVIEW PROCESS
// Inspired by ScamDekho & OfferGuard AI verification benchmarks
// ==============================================================================
import React, { useState } from "react";
import {
  ShieldAlert, BookOpen, CheckSquare, Search, AlertTriangle, ExternalLink,
  ChevronRight, Building2, CreditCard, Mail, Globe, PhoneCall, HelpCircle,
  FileCheck2, CheckCircle2, X, Lock, Info
} from "lucide-react";

interface OfferSafetyGuideProps {
  hasFeeDemand?: boolean;
  companyName?: string;
  onOpenCopilot?: () => void;
}

const COMMON_SCAMS = [
  {
    title: "1. The Laptop & Courier Insurance Fee Scam",
    icon: CreditCard,
    risk: "CRITICAL",
    badge: "Most Common",
    description:
      "Scammers send an impressive appointment letter with an attractive salary. Before dispatching the company laptop and welcome kit, they demand Rs. 3,500 – Rs. 9,500 as a 'refundable courier insurance deposit' via UPI.",
    redFlag: "Legitimate corporations NEVER ask candidates to pay for office equipment or courier fees.",
  },
  {
    title: "2. The Mandatory Training Kit / Assessment Fee",
    icon: BookOpen,
    risk: "CRITICAL",
    badge: "High Risk",
    description:
      "Candidates are told they are selected, but must pay for mandatory pre-joining training software, certification credentials, or batch enrollment fees before receiving their official joining date.",
    redFlag: "Corporate onboarding training is always funded entirely by the employer.",
  },
  {
    title: "3. The Telegram / WhatsApp Task-Based Scam",
    icon: Mail,
    risk: "HIGH",
    badge: "Prevalent",
    description:
      "Recruiters conduct minimal or zero genuine interviews, immediately migrating communication to WhatsApp or Telegram channels where candidates are assigned daily tasks or asked to deposit funds.",
    redFlag: "Enterprise HR teams operate strictly via corporate @company.com emails, never exclusively on personal chat apps.",
  },
  {
    title: "4. Lookalike Typosquatting Domain Impersonation",
    icon: Globe,
    risk: "HIGH",
    badge: "Technical",
    description:
      "Fraudulent syndicates register domains mimicking recognized multinational brands (e.g., `tcs-careers-verify.com` instead of `tcs.com`, or `inf0sys-portal.xyz`).",
    redFlag: "Always check the domain suffix and verify that it matches the company's verified primary domain.",
  },
  {
    title: "5. 'Direct Selection Without Interview' Trap",
    icon: Building2,
    risk: "HIGH",
    badge: "Urgency",
    description:
      "Offers delivered without any structured interview rounds or technical evaluations, often with artificial countdowns ('Offer expires in 24 hours') to induce panic.",
    redFlag: "Reputable organizations require thorough technical and HR screening rounds before extending offers.",
  },
];

export function OfferSafetyGuide({
  hasFeeDemand = false,
  companyName = "the claimed employer",
  onOpenCopilot,
}: OfferSafetyGuideProps) {
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const CHECKLIST_ITEMS = [
    `The offer letter originated from an official corporate email (e.g., name@${companyName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com) and NOT a free webmail (@gmail, @yahoo).`,
    "Zero registration fees, training kit charges, or caution deposits are requested prior to or upon joining.",
    "The recruiter conducted at least one formal audio/video interview through corporate conference software.",
    "The company's statutory registration is verified on MCA21 (Ministry of Corporate Affairs) portal.",
    "The named signatory or HR manager can be verified as a current employee on LinkedIn.",
    "The job role, stipend, working hours, and physical/remote office location are clearly delineated.",
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedChecks = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* 4-Step Review Process Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-mono font-bold tracking-wide uppercase border border-blue-500/30">
              <FileCheck2 className="w-3.5 h-3.5" /> ScamDekho & OfferGuard AI Investigation Methodology
            </div>
            <h3 className="text-xl font-bold text-white mt-2">
              4-Step Evidence-First Verification Process
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Legitify does not use static mock scores. Every assessment follows a transparent 4-stage pipeline that cross-examines document text against real-world cybersecurity intelligence.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowLibraryModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Fake Offer Library</span>
            </button>
            {onOpenCopilot && (
              <button
                onClick={onOpenCopilot}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Ask Copilot</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                1
              </span>
              <span className="text-[10px] font-mono text-blue-400 font-semibold uppercase">Evidence Ingestion</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Read Exact Evidence</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Extracts verbatim document text, sender addresses, UPI payment handles, CIN numbers, and dates without hallucination.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                2
              </span>
              <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">Signal Correlation</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Group Warning Signals</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Detects typosquatting lookalike domains, free public webmail, caution deposits, and WhatsApp/Telegram transfers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                3
              </span>
              <span className="text-[10px] font-mono text-purple-400 font-semibold uppercase">Transparent Audit</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Show Concern Origin</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Break down the exact mathematical score contribution across all 10 forensic dimensions and linear ML risk probability.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center font-mono">
                4
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Actionable Defense</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Push Manual Checks</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Guides the candidate to official statutory MCA21 registry records, official switchboards, and 1930 Cybercrime Helpline.
            </p>
          </div>
        </div>
      </div>

      {/* Candidate Verification Checklist Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <CheckSquare className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Candidate Safety Pre-Acceptance Checklist
              </h4>
              <p className="text-xs text-slate-500">
                Verify these 6 crucial points before signing or committing to any offer.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {completedChecks} of {CHECKLIST_ITEMS.length} Verified
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const isChecked = Boolean(checkedItems[idx]);
            return (
              <label
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                    : "bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span className="leading-relaxed">{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Fake Job Offer Library Modal */}
      {showLibraryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Fake Job Offer Library</h3>
                  <p className="text-xs text-slate-300">
                    Common recruitment scam patterns identified by cybersecurity threat intelligence
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLibraryModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {COMMON_SCAMS.map((scam, idx) => {
                const IconComponent = scam.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <h4 className="text-sm font-bold text-slate-900">{scam.title}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                        {scam.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {scam.description}
                    </p>
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Key Rule:</strong> {scam.redFlag}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Helpline: If victimized, report immediately to <strong>1930 Cybercrime Helpline</strong>.
              </span>
              <button
                onClick={() => setShowLibraryModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
