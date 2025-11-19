# Cognitive Analysis Platform

## Overview
This platform analyzes written text to assess the intelligence and cognitive fingerprint of authors using multi-model AI evaluation. It provides document analysis, AI detection, translation, comprehensive cognitive profiling, and intelligent text rewriting capabilities. The project's vision is to offer deep insights into cognitive abilities and thought processes from written content, with advanced features for maximizing intelligence scores through iterative rewriting.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application uses a monorepo structure, separating client and server.
- **Frontend**: React with TypeScript, TailwindCSS, shadcn/ui, wouter for routing, React Query for server state, and Chart.js for data visualization.
- **Backend**: Express.js with TypeScript, integrating multiple LLMs, document processing via Mathpix OCR, speech-to-text with AssemblyAI, and email services via SendGrid.
- **Database**: PostgreSQL with Drizzle ORM, storing user, document, analysis, and cognitive profile data.
- **Core Services**: Includes multi-model intelligence evaluation, document comparison, multi-language translation, OCR for mathematical notation, and intelligent text rewriting with custom instructions support. Key features include:
    - **4-Phase Intelligence Evaluation System**: Initial Assessment, Deep analytical questioning across 17 cognitive dimensions, Revision and reconciliation, and Final pushback for scores under 95/100.
    - **Seven Core Cognitive Dimensions**: Conceptual Depth, Inferential Control, Semantic Compression, Novel Abstraction, Cognitive Risk, Authenticity, Symbolic Manipulation.
    - **Genre-Aware Assessment**: Supports various document types (philosophical, empirical, technical, fiction).
    - **Intelligent Rewrite Function (MAXINTEL)**: Recursively optimizes text to maximize intelligence scores, supporting custom instructions and optional external knowledge integration from AnalyticPhilosophy.net Zhi database.
    - **GPT Bypass Humanizer**: Achieves 100% AI to 0% AI transformation through surgical precision style replication.
    - **Coherence Meter**: Offers two processing strategies (simple chunking, outline-guided) with adjustable aggressiveness levels (Conservative, Moderate, Aggressive).
    - **Text Model Validator**: Includes "Truth Select" for truth-value isomorphism and "Math Truth Select" for mathematical formalization with truth-value control, both supporting literal truth verification.
- **UI/UX**: Utilizes shadcn/ui and TailwindCSS for styling, offering detailed card-based layouts for analysis reports and supporting PDF/text downloads. The platform also supports document upload and output download for various file types.

## External Dependencies
- **AI Service Providers**: OpenAI API (GPT-4) as ZHI 1, Anthropic API (Claude) as ZHI 2, DeepSeek API as ZHI 3, Grok API (xAI) as ZHI 4, Perplexity AI.
- **Supporting Services**: Mathpix OCR, AssemblyAI, SendGrid, Google Custom Search, Stripe (for credit purchases), AnalyticPhilosophy.net Zhi API (for external knowledge queries).
- **Database & Infrastructure**: Neon/PostgreSQL, Drizzle ORM, Replit.

## Recent Updates
- **November 19, 2025** (Morning): 
  - Added "Use External Knowledge" toggle to MAXINTEL feature. When enabled, the system queries AnalyticPhilosophy.net's Zhi knowledge base (authenticated via ZHI_PRIVATE_KEY) and incorporates retrieved passages and citations into the model-building process. When disabled, MAXINTEL operates entirely on its internal pipeline without making any external network calls.
  - Added Grok (xAI) as "ZHI 4" provider. Integrated throughout the platform including intelligence analysis, case assessment, MAXINTEL rewriting, GPT Bypass Humanizer, and all evaluation protocols. Uses grok-beta model via xAI API (https://api.x.ai/v1/chat/completions).
  
- **November 19, 2025** (Afternoon):
  - **Coherence Meter Complete Overhaul**: Created new `coherenceMeter.ts` service that evaluates ONLY internal logical consistency, clarity, and structural unity. Removed all conflation with truth/verification/accessibility. System now correctly awards high scores (9+) to internally coherent texts regardless of factual accuracy, and properly detects faux-placeholder coherence (buzzwords without grounding).
  
  - **Intelligence Assessment Refinement**: Based on Grok's detailed analysis report, added new "Genuine Depth vs. Faux Posturing" dimension to 4-phase protocol. System now:
    - Detects faux-intellectual markers: sequential listing disguised as argument, buzzwords shuffled without grounding, author-driven "dialogue" replacing idea-driven logic, social posturing
    - Penalizes heavily (≤20/100) for faux-intellectual content with undefined placeholders
    - Rewards highly (90+) for genuine intelligence: hierarchical argumentation, terms with determinate meanings, idea-driven logic
    - Fixed accessibility scoring: assuming prior knowledge now BOOSTS score (expert discourse = higher intelligence)
    - Hard-coded three calibration examples: Kuczynski perception paragraph (98/100), McDowell transcendental empiricism abstract (14/100), Furstenberg topological proof (97/100)

- **November 19, 2025** (Evening):
  - **AI Chat Assistant Conversation Memory**: Implemented full conversation history tracking. Chat now maintains the last 10 messages and includes them in each LLM request, enabling multi-turn contextual conversations.
  - **AI Chat Assistant Zhi Database Integration**: Added "Zhi Database" toggle to chat interface. When enabled, queries AnalyticPhilosophy.net's knowledge base for relevant passages and includes them in the AI's context, providing access to Kuczynski quotes and philosophical content.
  - **New API Endpoint**: Created `/api/chat-with-memory` endpoint that handles conversation history, Zhi database queries, and supports all four LLM providers (ZHI 1-4).