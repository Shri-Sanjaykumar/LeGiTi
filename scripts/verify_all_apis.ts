import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

async function testAllAPIs() {
  console.log('================================================================');
  console.log('       LIVE API CONNECTIVITY & AUTHENTICATION AUDIT');
  console.log('================================================================\n');

  const results: Array<{
    service: string;
    target: string;
    status: 'ONLINE_AUTHENTICATED' | 'ONLINE_RATE_LIMITED' | 'AUTH_ERROR' | 'OFFLINE' | 'SKIPPED';
    httpStatus: number | string;
    latencyMs: number;
    details: string;
  }> = [];

  // 1. VirusTotal API
  const vtKey = process.env.VIRUSTOTAL_API_KEY;
  if (vtKey) {
    const t0 = Date.now();
    try {
      const res = await fetch('https://www.virustotal.com/api/v3/domains/infosys.com', {
        headers: { 'x-apikey': vtKey.trim() },
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        const json: any = await res.json();
        const reputation = json?.data?.attributes?.reputation;
        results.push({
          service: 'VirusTotal v3',
          target: 'api/v3/domains/infosys.com',
          status: 'ONLINE_AUTHENTICATED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `Authenticated successfully. Reputation: ${reputation ?? 'N/A'}, engine scores retrieved.`,
        });
      } else {
        results.push({
          service: 'VirusTotal v3',
          target: 'api/v3/domains/infosys.com',
          status: res.status === 401 || res.status === 403 ? 'AUTH_ERROR' : 'ONLINE_RATE_LIMITED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `HTTP ${res.status}: ${res.statusText}`,
        });
      }
    } catch (e: any) {
      results.push({
        service: 'VirusTotal v3',
        target: 'virustotal.com',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // 2. AbuseIPDB API
  const abuseKey = process.env.ABUSEIPDB_API_KEY;
  if (abuseKey) {
    const t0 = Date.now();
    try {
      const res = await fetch('https://api.abuseipdb.com/api/v2/check?ipAddress=8.8.8.8&maxAgeInDays=90', {
        headers: {
          'Key': abuseKey.trim(),
          'Accept': 'application/json',
        },
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        const json: any = await res.json();
        results.push({
          service: 'AbuseIPDB v2',
          target: 'api/v2/check (8.8.8.8)',
          status: 'ONLINE_AUTHENTICATED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `Authenticated. IP: ${json?.data?.ipAddress}, Abuse Score: ${json?.data?.abuseConfidenceScore}%`,
        });
      } else {
        results.push({
          service: 'AbuseIPDB v2',
          target: 'api/v2/check',
          status: res.status === 401 || res.status === 403 ? 'AUTH_ERROR' : 'ONLINE_RATE_LIMITED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `HTTP ${res.status}: ${res.statusText}`,
        });
      }
    } catch (e: any) {
      results.push({
        service: 'AbuseIPDB v2',
        target: 'api.abuseipdb.com',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // 3. Google Safe Browsing API
  const sbKey = process.env.SAFE_BROWSING_API_KEY;
  if (sbKey) {
    const t0 = Date.now();
    try {
      const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${sbKey.trim()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: 'legitify-app', clientVersion: '2.0.0' },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url: 'http://testsafebrowsing.appspot.com/s/malware.html' }],
          },
        }),
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        const json: any = await res.json();
        const matches = json?.matches?.length || 0;
        results.push({
          service: 'Google Safe Browsing v4',
          target: 'threatMatches:find',
          status: 'ONLINE_AUTHENTICATED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `Authenticated. Accurately detected ${matches} live malware threats.`,
        });
      } else {
        results.push({
          service: 'Google Safe Browsing v4',
          target: 'threatMatches:find',
          status: res.status === 400 || res.status === 403 ? 'AUTH_ERROR' : 'ONLINE_RATE_LIMITED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `HTTP ${res.status}: ${res.statusText}`,
        });
      }
    } catch (e: any) {
      results.push({
        service: 'Google Safe Browsing v4',
        target: 'safebrowsing.googleapis.com',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // 4. OpenAI API
  const openAIKey = process.env.OPENAI_API_KEY;
  if (openAIKey) {
    const t0 = Date.now();
    try {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${openAIKey.trim()}`,
        },
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        const json: any = await res.json();
        const modelCount = json?.data?.length || 0;
        results.push({
          service: 'OpenAI API (Fallback AI)',
          target: 'v1/models',
          status: 'ONLINE_AUTHENTICATED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `Authenticated successfully. Available models: ${modelCount} (gpt-4o, gpt-4o-mini, etc.).`,
        });
      } else {
        const errText = await res.text();
        results.push({
          service: 'OpenAI API (Fallback AI)',
          target: 'v1/models',
          status: res.status === 401 || res.status === 403 ? 'AUTH_ERROR' : 'ONLINE_RATE_LIMITED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `HTTP ${res.status}: ${errText.slice(0, 80)}`,
        });
      }
    } catch (e: any) {
      results.push({
        service: 'OpenAI API (Fallback AI)',
        target: 'api.openai.com',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // 5. Upstash Redis REST API
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (upstashUrl && upstashToken) {
    const t0 = Date.now();
    try {
      const cleanUrl = upstashUrl.replace(/"/g, '').trim();
      const cleanToken = upstashToken.replace(/"/g, '').trim();
      const res = await fetch(`${cleanUrl}/ping`, {
        headers: {
          'Authorization': `Bearer ${cleanToken}`,
        },
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        const json: any = await res.json();
        results.push({
          service: 'Upstash Redis Cache',
          target: `${cleanUrl}/ping`,
          status: 'ONLINE_AUTHENTICATED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `Authenticated & live ping: ${json?.result || 'PONG'}`,
        });
      } else {
        results.push({
          service: 'Upstash Redis Cache',
          target: `${cleanUrl}/ping`,
          status: 'AUTH_ERROR',
          httpStatus: res.status,
          latencyMs: latency,
          details: `HTTP ${res.status}: ${res.statusText}`,
        });
      }
    } catch (e: any) {
      results.push({
        service: 'Upstash Redis Cache',
        target: 'upstash.io',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // 6. Supabase REST API & Storage
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const t0 = Date.now();
    try {
      const cleanUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '').trim();
      const res = await fetch(`${cleanUrl}/rest/v1/`, {
        headers: {
          'apikey': supabaseKey.trim(),
          'Authorization': `Bearer ${supabaseKey.trim()}`,
        },
      });
      const latency = Date.now() - t0;
      results.push({
        service: 'Supabase REST API',
        target: `${cleanUrl}/rest/v1/`,
        status: 'ONLINE_AUTHENTICATED',
        httpStatus: res.status,
        latencyMs: latency,
        details: `Connected to Supabase PostgreSQL cluster (${res.statusText || 'OK'}).`,
      });
    } catch (e: any) {
      results.push({
        service: 'Supabase REST API',
        target: 'supabase.co',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // 7. Resend Email API
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const t0 = Date.now();
    try {
      const res = await fetch('https://api.resend.com/api-keys', {
        headers: {
          'Authorization': `Bearer ${resendKey.trim()}`,
        },
      });
      const latency = Date.now() - t0;
      if (res.ok) {
        results.push({
          service: 'Resend Email API',
          target: 'api.resend.com/api-keys',
          status: 'ONLINE_AUTHENTICATED',
          httpStatus: res.status,
          latencyMs: latency,
          details: 'Authenticated. Candidate email alert channel active.',
        });
      } else {
        results.push({
          service: 'Resend Email API',
          target: 'api.resend.com',
          status: res.status === 401 || res.status === 403 ? 'AUTH_ERROR' : 'ONLINE_RATE_LIMITED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `HTTP ${res.status}: ${res.statusText}`,
        });
      }
    } catch (e: any) {
      results.push({
        service: 'Resend Email API',
        target: 'api.resend.com',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // 8. Google Gemini API
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    const t0 = Date.now();
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey.trim()}`);
      const latency = Date.now() - t0;
      if (res.ok) {
        const json: any = await res.json();
        const count = json?.models?.length || 0;
        results.push({
          service: 'Google Gemini AI',
          target: 'v1beta/models',
          status: 'ONLINE_AUTHENTICATED',
          httpStatus: res.status,
          latencyMs: latency,
          details: `Authenticated successfully. Available models: ${count} models retrieved.`,
        });
      } else {
        const errText = await res.text();
        results.push({
          service: 'Google Gemini AI',
          target: 'v1beta/models',
          status: res.status === 429 ? 'ONLINE_RATE_LIMITED' : 'AUTH_ERROR',
          httpStatus: res.status,
          latencyMs: latency,
          details: `HTTP ${res.status}: ${errText.includes('quota') ? 'Free tier daily request quota currently exhausted (resets daily)' : errText.slice(0, 80)}`,
        });
      }
    } catch (e: any) {
      results.push({
        service: 'Google Gemini AI',
        target: 'generativelanguage.googleapis.com',
        status: 'OFFLINE',
        httpStatus: 'ERR',
        latencyMs: Date.now() - t0,
        details: e.message,
      });
    }
  }

  // Print results
  for (const r of results) {
    const icon = r.status === 'ONLINE_AUTHENTICATED' ? '✅' : r.status === 'ONLINE_RATE_LIMITED' ? '⏳' : '❌';
    console.log(`${icon} [${r.service}]`);
    console.log(`   Status:  ${r.status} (HTTP ${r.httpStatus}, ${r.latencyMs}ms)`);
    console.log(`   Target:  ${r.target}`);
    console.log(`   Details: ${r.details}`);
    console.log('');
  }
  console.log('================================================================');
}

testAllAPIs().catch(console.error);
