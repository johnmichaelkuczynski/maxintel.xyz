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
- **AI Service Providers**: OpenAI API (GPT-4), Anthropic API (Claude), Perplexity AI, DeepSeek API.
- **Supporting Services**: Mathpix OCR, AssemblyAI, SendGrid, Google Custom Search, Stripe (for credit purchases), AnalyticPhilosophy.net Zhi API (for external knowledge queries).
- **Database & Infrastructure**: Neon/PostgreSQL, Drizzle ORM, Replit.

## Recent Updates
- **November 19, 2025**: Added "Use External Knowledge" toggle to MAXINTEL feature. When enabled, the system queries AnalyticPhilosophy.net's Zhi knowledge base (authenticated via ZHI_PRIVATE_KEY) and incorporates retrieved passages and citations into the model-building process. When disabled, MAXINTEL operates entirely on its internal pipeline without making any external network calls.