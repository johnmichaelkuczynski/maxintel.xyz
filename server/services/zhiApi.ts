import crypto from 'crypto';
import fetch from 'node-fetch';

interface ZhiQueryResponse {
  success: boolean;
  passages?: Array<{
    text: string;
    source: string;
    relevance: number;
  }>;
  error?: string;
}

interface ZhiCredentials {
  appId: string;
  secretKey: string;
}

function parseZhiPrivateKey(privateKey: string): ZhiCredentials | null {
  try {
    // Try JSON format first: {"appId": "...", "secretKey": "..."}
    const parsed = JSON.parse(privateKey);
    if (parsed.appId && parsed.secretKey) {
      return { appId: parsed.appId, secretKey: parsed.secretKey };
    }
  } catch {
    // Not JSON, try other formats
  }
  
  // Try colon-separated format: appId:secretKey
  if (privateKey.includes(':')) {
    const parts = privateKey.split(':');
    if (parts.length === 2) {
      return { appId: parts[0], secretKey: parts[1] };
    }
  }
  
  // If it's a single hex string, use it as secretKey with default appId
  if (/^[a-f0-9]{60,}$/i.test(privateKey.trim())) {
    return { 
      appId: 'default',
      secretKey: privateKey.trim()
    };
  }
  
  return null;
}

function generateSignature(
  appId: string,
  secretKey: string,
  timestamp: string,
  nonce: string,
  queryText: string
): string {
  // Standard HMAC signature format: Method + URI + Timestamp + Nonce + Body
  const method = 'POST';
  const uri = '/zhi/query';
  const body = JSON.stringify({ query: queryText, maxPassages: 5 });
  
  // Build signature string matching common API patterns
  const signatureString = `${method}\n${uri}\n${timestamp}\n${nonce}\n${body}`;
  
  // Generate HMAC-SHA256 signature
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(signatureString);
  return hmac.digest('hex');
}

export async function queryZhiKnowledgeBase(
  queryText: string,
  maxPassages: number = 5
): Promise<string | null> {
  const zhiPrivateKey = process.env.ZHI_PRIVATE_KEY;
  
  if (!zhiPrivateKey) {
    console.warn('ZHI_PRIVATE_KEY not configured - skipping external knowledge query');
    return null;
  }

  const credentials = parseZhiPrivateKey(zhiPrivateKey);
  if (!credentials) {
    console.error('Failed to parse ZHI_PRIVATE_KEY - expected JSON {"appId":"...","secretKey":"..."} or "appId:secretKey" format');
    return null;
  }

  try {
    console.log('Querying AnalyticPhilosophy.net Zhi knowledge base...');
    
    // Generate authentication parameters
    const timestamp = Date.now().toString(); // Use milliseconds
    const nonce = crypto.randomBytes(16).toString('hex');
    const signature = generateSignature(
      credentials.appId,
      credentials.secretKey,
      timestamp,
      nonce,
      queryText
    );

    const response = await fetch('https://analyticphilosophy.net/zhi/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ZHI-App-Id': credentials.appId,
        'X-ZHI-Timestamp': timestamp,
        'X-ZHI-Nonce': nonce,
        'X-ZHI-Signature': signature
      },
      body: JSON.stringify({
        query: queryText,
        maxPassages: maxPassages
      })
    });

    if (!response.ok) {
      console.error(`Zhi API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Zhi API error details: ${errorText}`);
      return null;
    }

    const data = await response.json() as ZhiQueryResponse;
    
    if (data.success && data.passages && data.passages.length > 0) {
      console.log(`✓ Retrieved ${data.passages.length} passages from Zhi knowledge base`);
      
      const formattedPassages = data.passages
        .map((p, i) => `[${i + 1}] ${p.text}\n   Source: ${p.source}`)
        .join('\n\n');
      
      return formattedPassages;
    }
    
    console.log('Zhi API returned no passages or unsuccessful response');
    return null;
  } catch (error) {
    console.error('Error querying Zhi knowledge base:', error);
    return null;
  }
}
