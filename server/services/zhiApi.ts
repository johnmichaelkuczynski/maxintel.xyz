import fetch from 'node-fetch';

interface ZhiQueryResponse {
  results?: Array<{
    excerpt: string;
    citation: {
      author: string;
      work: string;
      chunkIndex: number;
    };
    relevance: number;
    tokens: number;
  }>;
  quotes?: Array<any>;
  meta?: {
    resultsReturned: number;
    limitApplied: number;
    queryProcessed: string;
    filters: any;
    timestamp: number;
  };
  error?: string;
}

export async function queryZhiKnowledgeBase(
  queryText: string,
  maxPassages: number = 5,
  author?: string
): Promise<string | null> {
  const zhiPrivateKey = process.env.ZHI_PRIVATE_KEY;
  
  if (!zhiPrivateKey) {
    console.warn('ZHI_PRIVATE_KEY not configured - skipping external knowledge query');
    return null;
  }

  try {
    console.log('Querying AnalyticPhilosophy.net Zhi knowledge base...');
    
    const response = await fetch('https://analyticphilosophy.net/zhi/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${zhiPrivateKey}`
      },
      body: JSON.stringify({
        query: queryText,
        author: author || 'John-Michael Kuczynski',
        limit: maxPassages
      })
    });

    if (!response.ok) {
      console.error(`Zhi API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Zhi API error details: ${errorText}`);
      return null;
    }

    const data = await response.json() as ZhiQueryResponse;
    
    if (data.results && data.results.length > 0) {
      console.log(`✓ Retrieved ${data.results.length} passages from Zhi knowledge base`);
      
      const formattedPassages = data.results
        .map((result, i) => 
          `[${i + 1}] "${result.excerpt}"\n   — ${result.citation.author}, ${result.citation.work}`
        )
        .join('\n\n');
      
      return formattedPassages;
    }
    
    console.log('Zhi API returned no results');
    return null;
  } catch (error) {
    console.error('Error querying Zhi knowledge base:', error);
    return null;
  }
}
