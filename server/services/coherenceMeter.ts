import Anthropic from '@anthropic-ai/sdk';

export interface CoherenceAnalysisResult {
  score: number;
  assessment: "PASS" | "WEAK" | "FAIL";
  analysis: string;
  subscores: {
    internalLogic: number;
    clarity: number;
    structuralUnity: number;
    fauxCoherenceDetection: number;
  };
}

export interface CoherenceRewriteResult {
  rewrittenText: string;
  changes: string;
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function analyzeCoherence(text: string): Promise<CoherenceAnalysisResult> {
  const systemPrompt = `You are a coherence analyzer specializing in evaluating INTERNAL LOGICAL CONSISTENCY, CLARITY, and STRUCTURAL UNITY.

CRITICAL PRINCIPLES (NEVER VIOLATE):
1. Coherence ≠ Truth: A text can be entirely false and still perfectly coherent. Never penalize for factual inaccuracy.
2. Coherence ≠ Verification: Unverified or unproven claims are fine if internally consistent. Never penalize for lack of evidence.
3. Coherence ≠ Accessibility: Assuming prior knowledge is standard in advanced discourse. Only flag if assumptions create actual CONTRADICTIONS within the text.
4. Detect Faux-Placeholder Coherence: Sequential listing with buzzwords (meaningless jargon) that lack determinate properties is NOT coherence.

COHERENCE IS:
- Internal hang-togetherness: Do parts fit logically?
- Consistency: Are terms used with stable meanings?
- Hierarchical structure: Do claims build on each other (not just list sequentially)?
- Non-contradiction: No direct logical conflicts within the text itself

COHERENCE IS NOT:
- External truth or accuracy
- Scientific plausibility  
- Empirical verification
- Accessibility to non-experts`;

  const userPrompt = `Analyze this text for INTERNAL COHERENCE ONLY. Do not penalize for falsehood, lack of verification, or assumed knowledge.

TEXT:
${text}

Provide analysis in this EXACT format:

INTERNAL LOGIC SCORE: [X]/10
[Check ONLY for internal contradictions within the text. 10 = no contradictions, 1 = severe contradictions. Ignore external truth.]

CLARITY SCORE: [X]/10
[Are terms used consistently with stable meanings? 10 = crystal clear terms, 1 = terms are placeholder buzzwords without meaning.]

STRUCTURAL UNITY SCORE: [X]/10
[Is organization hierarchical with claims building on each other? 10 = hierarchical argument, 1 = just sequential listing.]

FAUX-COHERENCE SCORE: [X]/10
[CRITICAL: Detect if text has FAKE/PLACEHOLDER coherence. Score 1-2 if text exhibits: (a) Buzzwords/jargon cited but never defined or grounded (e.g., "Myth of the Mental", "linguistic idealism", "disjunctivism" mentioned but not explained), (b) Sequential listing disguised as argument (e.g., "First... Second... Third..." without logical dependencies), (c) Vague umbrella claims that assume buzzwords have determinate properties they lack. Score 9-10 if text has: (a) Terms with canonical/grounded meanings used consistently, (b) Hierarchical argumentation where claims actually build on each other, (c) Concrete logical relationships. WARNING: Academic jargon ≠ automatic faux-coherence! Only mark low if jargon is shuffled WITHOUT grounding or hierarchical dependencies.]

OVERALL COHERENCE SCORE: [X]/10
[Calculate this as: (Internal Logic + Clarity + Structural Unity + Faux-Coherence) / 4. Round to nearest 0.5.]

ASSESSMENT: [PASS if ≥8, WEAK if 5-7, FAIL if ≤4]

DETAILED REPORT:
[Specific analysis. Remember: NEVER penalize for falsehood, unverified claims, or assumed knowledge!]

CALIBRATION EXAMPLES:
1. "Coffee boosts intelligence by multiplying brain cells, creating neural pathways" = Score 9.5 (Internal Logic: 10, Clarity: 9, Structural Unity: 10, Faux-Coherence: 9 - clear causal chain, perfect internal logic despite being FALSE)
2. "Sense-perceptions are presentations not representations; regress arguments doom linguistic mediation theories" = Score 9.5 (Internal Logic: 10, Clarity: 10, Structural Unity: 9, Faux-Coherence: 10 - tight deduction, canonical philosophical terms, hierarchical)
3. "This dissertation examines transcendental empiricism, discussing McDowell's minimal empiricism and Dreyfus's Myth of the Mental critique" = Score 2 (Internal Logic: 4, Clarity: 2, Structural Unity: 2, Faux-Coherence: 1 - buzzwords without grounding, sequential listing, vague jargon assuming meaning it lacks)`;

  const message = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 4096,
    temperature: 0.3,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }]
  });

  const output = message.content[0].type === 'text' ? message.content[0].text : '';
  
  // Debug: Print first 500 characters of output
  console.log("=== COHERENCE METER LLM OUTPUT (first 500 chars) ===");
  console.log(output.substring(0, 500));
  console.log("=== END DEBUG ===\n");

  const internalLogicMatch = output.match(/INTERNAL LOGIC SCORE:\s*(\d+(?:\.\d+)?)\/10/i);
  const clarityMatch = output.match(/CLARITY SCORE:\s*(\d+(?:\.\d+)?)\/10/i);
  const structuralUnityMatch = output.match(/STRUCTURAL UNITY SCORE:\s*(\d+(?:\.\d+)?)\/10/i);
  const fauxDetectionMatch = output.match(/FAUX-COHERENCE SCORE:\s*(\d+(?:\.\d+)?)\/10/i);
  const overallScoreMatch = output.match(/OVERALL COHERENCE SCORE:\s*(\d+(?:\.\d+)?)\/10/i);
  const assessmentMatch = output.match(/ASSESSMENT:\s*(PASS|WEAK|FAIL)/i);

  const score = overallScoreMatch ? parseFloat(overallScoreMatch[1]) : 5;
  const assessment = (assessmentMatch ? assessmentMatch[1].toUpperCase() : "WEAK") as "PASS" | "WEAK" | "FAIL";

  return {
    score,
    assessment,
    analysis: output,
    subscores: {
      internalLogic: internalLogicMatch ? parseInt(internalLogicMatch[1]) : 5,
      clarity: clarityMatch ? parseInt(clarityMatch[1]) : 5,
      structuralUnity: structuralUnityMatch ? parseInt(structuralUnityMatch[1]) : 5,
      fauxCoherenceDetection: fauxDetectionMatch ? parseInt(fauxDetectionMatch[1]) : 5
    }
  };
}

export async function rewriteForCoherence(
  text: string, 
  aggressiveness: "conservative" | "moderate" | "aggressive" = "moderate"
): Promise<CoherenceRewriteResult> {
  
  let systemPrompt = "";
  if (aggressiveness === "conservative") {
    systemPrompt = `You are a coherence editor. Make MINIMAL changes to fix ONLY internal contradictions and clarity issues. Preserve structure and wording.`;
  } else if (aggressiveness === "moderate") {
    systemPrompt = `You are a coherence improver. Fix internal contradictions, improve term clarity, strengthen hierarchical structure. May expand moderately.`;
  } else {
    systemPrompt = `You are a coherence maximizer. Achieve 9-10/10 coherence. May expand significantly, restructure completely, add extensive context. PRIORITIZE MAXIMUM INTERNAL COHERENCE.`;
  }

  const userPrompt = `Rewrite this text to maximize INTERNAL COHERENCE (internal consistency, clarity, hierarchical structure).

CRITICAL RULES:
1. You MAY keep false claims (coherence ≠ truth)
2. You MAY keep unverified claims (coherence ≠ evidence)  
3. You MAY assume expert knowledge (coherence ≠ accessibility)
4. You MUST fix: internal contradictions, unclear terms, sequential-only structure
5. You MUST detect and eliminate faux-placeholder coherence (replace buzzwords with grounded terms, make structure hierarchical not sequential)

ORIGINAL TEXT:
${text}

Output ONLY the rewritten text. No headers, no labels, no commentary.`;

  const message = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 4096,
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }]
  });

  const rewrittenText = message.content[0].type === 'text' ? message.content[0].text : '';

  const changesAnalysisPrompt = `Compare these two versions and explain what coherence changes were made (focus on internal consistency, clarity, structural improvements only):

ORIGINAL:
${text}

REWRITTEN:
${rewrittenText}

Provide concise bullet points of changes made to improve internal coherence.`;

  const changesMessage = await anthropic.messages.create({
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 1024,
    temperature: 0.3,
    messages: [{ role: "user", content: changesAnalysisPrompt }]
  });

  const changes = changesMessage.content[0].type === 'text' ? changesMessage.content[0].text : '';

  return {
    rewrittenText,
    changes
  };
}
