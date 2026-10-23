// ==============================================================================
// LEGITIFY INVESTIGATION COPILOT CHATBOT COMPONENT
// Evidence-grounded, non-templated, responsive candidate investigation assistant
// Inspired by ScamDekho & OfferGuard AI interactive verification standards
// ==============================================================================
import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare, Send, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2,
  RefreshCw, Copy, Check, ChevronDown, ChevronUp, Bot, User, CornerDownRight,
  ExternalLink, HelpCircle, X, ShieldAlert
} from "lucide-react";
import { askCopilot } from "../../lib/api";
import { LegitifyReport } from "../../types";

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  isError?: boolean;
}

interface InvestigationCopilotProps {
  report: LegitifyReport;
  userToken?: string;
  userName?: string;
  isFloating?: boolean;
  onClose?: () => void;
}

const STARTER_PROMPTS = [
  {
    label: "Fee / Caution Money",
    query: "Does this offer demand any candidate registration fee, caution deposit, or payment?",
  },
  {
    label: "Role & Stipend",
    query: "What role, stipend/salary, joining date, and working hours are stated in this document?",
  },
  {
    label: "Recruiter Authenticity",
    query: "Is the recruiter's email domain genuine and aligned with the official company domain?",
  },
  {
    label: "Questions for HR",
    query: "What exact verification questions should I ask company HR before signing or accepting?",
  },
  {
    label: "Why this Risk Rating?",
    query: "Explain why this offer received this specific trust score and risk assessment.",
  },
];

export function InvestigationCopilot({
  report,
  userToken,
  userName = "Candidate",
  isFloating = false,
  onClose,
}: InvestigationCopilotProps) {
  const companyName =
    report.company_name ||
    report.entity_name ||
    report.document_analysis?.extracted_entities?.detected_company ||
    "the investigated organization";

  const trustScore = typeof report.trust_score === "number" ? report.trust_score : 50;
  const isHighRisk = trustScore < 60 || Boolean(report.has_fee_demand);

  const initialGreeting: Message = {
    id: "msg-welcome",
    sender: "copilot",
    text: `Hello ${userName}! I am your **Legitify Evidence Investigator**. I have thoroughly cross-examined the document for **${companyName}** across 10 forensic dimensions (statutory registry, recruiter domain routing, upfront fee detection, IOC feeds, and ML classifier).\n\nYou can ask me specific questions about this offer, request clause verifications, or ask how to safely contact the employer.`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryToSend) setInputQuery("");
    setIsLoading(true);

    try {
      const responseText = await askCopilot(report, text, userToken);
      const copilotMessage: Message = {
        id: `cop-${Date.now()}`,
        sender: "copilot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, copilotMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: "copilot",
        text: `Unable to complete investigation reasoning: ${err?.message || "Service temporarily busy"}. You can ask again or review the forensic scorecard above.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Render markdown-like simple formatting for citations and bold text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, idx) => {
      // Bold text formatting
      const parts = line.split(/(\*\*[^*]+\*\*|\[Doc-[^\]]+\]|\[Ext-[^\]]+\])/g);
      return (
        <p key={idx} className={idx > 0 ? "mt-2" : ""}>
          {parts.map((p, pIdx) => {
            if (p.startsWith("**") && p.endsWith("**")) {
              return <strong key={pIdx} className="font-semibold text-slate-900">{p.slice(2, -2)}</strong>;
            }
            if ((p.startsWith("[Doc-") || p.startsWith("[Ext-")) && p.endsWith("]")) {
              return (
                <span
                  key={pIdx}
                  className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-mono font-semibold"
                  title="Evidence Citation"
                >
                  {p}
                </span>
              );
            }
            return p;
          })}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex flex-col bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden ${
        isFloating ? "w-full max-w-lg h-[580px]" : "w-full min-h-[480px]"
      }`}
    >
      {/* Copilot Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-100">Legitify Investigation Copilot</h3>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono border border-blue-500/30">
                AI + Dual RAG
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate max-w-[280px]">
              Evidence grounded for: <span className="text-white font-medium">{companyName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
              title="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Trust Score Mini Banner */}
      <div className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
        isHighRisk ? "bg-rose-50 border-rose-100 text-rose-800" : "bg-emerald-50 border-emerald-100 text-emerald-800"
      }`}>
        <div className="flex items-center gap-2 font-medium">
          {isHighRisk ? <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" /> : <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
          <span>
            {isHighRisk
              ? `Elevated Risk Detected (Trust Score: ${trustScore}/100). Exercise caution before paying any fee.`
              : `High Trust Indicators (Trust Score: ${trustScore}/100). No upfront candidate payment detected.`}
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : msg.isError
                  ? "bg-rose-600 text-white"
                  : "bg-slate-800 text-blue-300 border border-slate-700"
              }`}
            >
              {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-xs"
                  : msg.isError
                  ? "bg-rose-50 border border-rose-200 text-rose-900 rounded-tl-xs"
                  : "bg-white border border-slate-200 text-slate-800 rounded-tl-xs"
              }`}
            >
              <div className="space-y-1">
                {renderFormattedText(msg.text)}
              </div>

              <div className="flex items-center justify-between gap-3 mt-2 pt-1 border-t border-black/5 text-[10px] opacity-70">
                <span>{msg.timestamp}</span>
                {msg.sender === "copilot" && !msg.isError && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:opacity-100 flex items-center gap-1 cursor-pointer"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-800 text-blue-300 flex items-center justify-center flex-shrink-0 text-xs border border-slate-700">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 text-slate-600 rounded-2xl rounded-tl-xs px-4 py-3 text-xs shadow-xs flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Analyzing document evidence & verifying citations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Carousel */}
      <div className="px-4 py-2 border-t border-slate-100 bg-white">
        <p className="text-[11px] font-medium text-slate-500 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Suggested investigation queries:
        </p>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {STARTER_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.query)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-[11px] text-slate-700 font-medium whitespace-nowrap transition-all cursor-pointer disabled:opacity-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask about ${companyName}'s offer, stipend, recruiter email, or caution fees...`}
          disabled={isLoading}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs text-slate-900 placeholder:text-slate-400 disabled:bg-slate-100"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuery.trim()}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
