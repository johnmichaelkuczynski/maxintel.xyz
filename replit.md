# Cognitive Analysis Platform

## Overview
This platform analyzes written text to assess the intelligence and cognitive fingerprint of authors using multi-model AI evaluation. It provides document analysis, AI detection, translation, comprehensive cognitive profiling, and intelligent text rewriting capabilities. The project's vision is to offer deep insights into cognitive abilities and thought processes from written content, with advanced features for maximizing intelligence scores through iterative rewriting.

## Recent Changes
- **November 2, 2025**: **MAXIMIZE INTELLIGENCE FUNCTION COMPLETELY REBUILT** - Now produces multi-page, self-contained essays from single-paragraph inputs
  - ✅ **Always Completes to Full Essay**: Any input automatically expanded to complete, self-contained 3-5+ page essay (unless "do not complete" specified)
  - ✅ **Concrete Examples Required**: Prompt demands 5-10+ specific concrete examples throughout (e.g., "PostgreSQL's MVCC implementation" not "consider a database")
  - ✅ **Expansion Strategy**: Each claim expanded to 2-3 paragraphs with detailed explanation, concrete examples, logical support, and counterarguments
  - ✅ **Increased Token Capacity**: max_tokens raised from 4000 to 8000 to support multi-page output
  - ✅ **Zero Bloat Enforcement**: Explicitly forbids generic academic filler while maintaining sharp, direct style from samples
  - ✅ **Style Preservation**: Still matches user's philosophical style samples (presentations vs representations, etc.) while massively expanding content
  - ✅ **Higher Temperature**: Raised from 0.2 to 0.3 for more creative, substantive expansion
- **October 31, 2025**: **TWO-MODE LONG TEXT PROCESSING IMPLEMENTED** - Coherence Meter now offers two distinct processing strategies for texts over 500 words
  - ✅ **Simple Chunking Mode**: Fast processing where sections are analyzed/rewritten independently (~400 words per section)
  - ✅ **Outline-Guided Mode (Recommended)**: Two-stage approach for maximum global coherence
    - Stage 1: Generates document outline, analyzes its coherence, rewrites outline if score < 8/10
    - Stage 2: Processes each section with coherent outline as context for document-level consistency
  - ✅ **Automatic Text Chunking**: Texts over 500 words are auto-chunked with interactive section selector
  - ✅ **Mode Selector UI**: Clear visual selector with descriptions of each processing mode
  - ✅ **Progress Tracking**: Real-time stage progress display for outline-guided processing
  - ✅ **Backend Endpoints**: Both `/api/coherence-meter` (simple) and `/api/coherence-outline-guided` (two-stage) fully operational
- **October 31, 2025**: **COHERENCE METER AGGRESSIVENESS CONTROLS ADDED** - Users can now control how much the rewrite function transforms text
  - ✅ **Three Aggressiveness Levels**: Conservative (minimal changes, preserve structure), Moderate (fix major issues, add necessary context), Aggressive (maximize coherence at 9-10/10, expand significantly)
  - ✅ **Smart Prompt Adaptation**: System and user prompts automatically adjust based on selected aggressiveness level
  - ✅ **Visual UI Selector**: Purple-bordered cards with clear descriptions for each level, defaults to Aggressive
  - ✅ **Length Flexibility**: Conservative maintains original length, Moderate allows moderate expansion, Aggressive permits 2-3x expansion for maximum coherence
  - ✅ **Applied to Key Types**: Aggressiveness variations fully implemented for logical-consistency and logical-cohesiveness, easily extendable to all 9 coherence types
- **October 31, 2025**: **FILE UPLOAD & DOWNLOAD ADDED** - Coherence Meter and Text Model Validator now support document upload and output download
  - ✅ **Document Upload**: Both tools support PDF, DOC, DOCX, TXT file upload with automatic text extraction
  - ✅ **Download Outputs**: All outputs can be downloaded as .txt files with contextual filenames (e.g., "coherence-analysis-philosophical.txt")
  - ✅ **Consistent UX**: Upload buttons placed next to input areas, download buttons next to copy/send actions
- **October 23, 2025**: **ANALYSIS PROMPT OVERHAUL COMPLETED** - All analysis prompts now demand EXTREMELY LONG evidence-based reports with extensive quotations AND proper high-end calibration
  - ✅ **Comprehensive Summary Requirement**: Every analysis (intelligence, case, fiction - both short and long format) now MUST start with a thorough 2-3 paragraph summary and general analysis of the text before dimensional assessments
  - ✅ **EXTREMELY LONG DIMENSIONAL SECTIONS**: Each dimension now requires MULTIPLE SUBSTANTIAL PARAGRAPHS (3-5 paragraphs of 6-10 sentences EACH, 500-800 words minimum per dimension)
  - ✅ **Extensive Quotation Requirements**: All 4 core analysis services (fourPhaseProtocol.ts, directLLM.ts, quickAnalysis.ts, intelligenceComparison.ts) now require 5-10+ direct quotations PER DIMENSION, woven throughout multi-paragraph analysis
  - ✅ **Detailed Argumentation Mandate**: Each dimension must include: assessment statement → 5-10+ quotations → deep analysis of each quote → counterpoints → synthesis paragraph
  - ✅ **Text-Grounded Analysis**: Prompts explicitly prohibit generic platitudes and demand proof that the AI actually read the specific text through extensive quotations
  - ✅ **HIGH-END CALIBRATION ANCHORS**: Added explicit guidance that sophisticated academic/philosophical work = 92-97 by DEFAULT; downgrading below 90 requires CATASTROPHIC reasoning failures, not minor quibbles
  - ✅ **Case Assessment Enhanced**: caseAssessment.ts now requires comprehensive summary before semantic reconstruction and genre identification
  - ✅ **5X Length Increase**: Dimensional analysis sections now 5X longer than previous version with heavy quotation and detailed argumentation
  - ✅ **Perplexity API Fixed**: Added Perplexity to /api/check-api endpoint - Zhi 3 (Perplexity) now shows as active in frontend
- **October 2025**: **STRIPE PAYMENT INTEGRATION IN PROGRESS** - Credit-based payment system with AI provider-specific credits
  - 🚧 **Stripe Checkout**: Integration with Stripe for credit purchases ($5, $10, $25, $50, $100 tiers)
  - 🚧 **Provider-Specific Credits**: Separate credit balances for OpenAI, Anthropic, Perplexity, and DeepSeek
  - 🚧 **Credit Display**: Real-time credit balance shown in navigation bar with "Buy Credits" button
  - 🚧 **Payment Flow**: Webhook integration for automatic credit crediting after successful payment
  - 🚧 **JMK Unlimited Access**: JMK user bypasses all credit checks and has unlimited credits
  - ⚠️ **Paywall Implementation Pending**: Need to add credit deduction and paywall logic to analysis endpoints
  - ⚠️ **Persistence System Pending**: localStorage-based state preservation during Stripe checkout redirect
- **September 2025**: **AUTHENTICATION & RESET FUNCTIONALITY COMPLETED** - User authentication and reset features fully operational
  - ✅ **Optional User Authentication**: Users can access all functionality without registering (no authentication walls)
  - ✅ **JMKUCZYNSKI Special Access**: Admin user "JMKUCZYNSKI" can login with any password or no password (case insensitive, development only)
  - ✅ **Comprehensive Reset Button**: Global "Reset All" button in navigation clears all input/output while preserving authentication and theme
  - ✅ **Session Management**: Implemented with passport.js, password hashing, and PostgreSQL database integration
- **January 2025**: **CRITICAL FIXES COMPLETED** - All core functions now fully operational
  - ✅ **Fiction Assessment fully restored**: Fixed critical "require is not defined" error, API now returns structured JSON scores
  - ✅ **UI scrolling issues completely resolved**: Fixed preview breakage, restored proper dialog scrolling functionality
  - ✅ **All major functions verified working**: GPT Bypass Humanizer (100% success), Intelligent Rewrite, Case Assessment, Cognitive Analysis
- **September 2025**: **BREAKTHROUGH SUCCESS** - GPT Bypass Humanizer now achieving 100% AI → 0% AI transformation
  - Completely rebuilt core algorithm for surgical precision style replication
  - Removed all generic "humanization" instructions from prompt
  - Now uses pure style matching: "REWRITE BOX A TO EXACTLY MATCH THE STYLE OF BOX B"
  - Successfully achieving same results as user's working reference app
  - Verified: 100% AI detection → 100% Human detection transformation working perfectly
- **September 2025**: Implemented sophisticated GPT Bypass Humanizer system with categorized writing samples
  - Added CONTENT-NEUTRAL, EPISTEMOLOGY, PARADOXES sample categories
  - Built comprehensive style preset system (removed from UI per user request)
  - Integrated LLM selection dropdown with Anthropic as default
  - Full GPTZero evaluation integration for input/output verification
- **January 2025**: **MAJOR FIX** - Completely resolved case assessment scoring and formatting issues
  - Fixed AI prompt to request structured scores in parseable format (PROOF EFFECTIVENESS: 85/100)
  - Implemented fallback scoring system for reliable score extraction 
  - Enhanced text formatting to properly display sections (Strengths, Weaknesses, Counterarguments)
  - Case assessments now show real numerical scores instead of 0/100
- **January 2025**: Fixed intelligent rewrite function provider mapping (zhi1→openai, zhi2→anthropic, zhi3→deepseek)
- **January 2025**: Resolved multiple analysis UX issue - can now run consecutive analyses without clearing screen
- **January 2025**: Successfully implemented Intelligent Rewrite Function with recursive capability for maximizing intelligence scores
- **January 2025**: Fixed two-document comparison mode to use exact protocol specifications  
- **January 2025**: Enhanced markdown cleaning to eliminate formatting artifacts in analysis outputs

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application uses a monorepo structure, separating client and server.
- **Frontend**: React with TypeScript, TailwindCSS, shadcn/ui, wouter for routing, React Query for server state, and Chart.js for data visualization.
- **Backend**: Express.js with TypeScript, integrating multiple LLMs, document processing via Mathpix OCR, speech-to-text with AssemblyAI, and email services via SendGrid.
- **Database**: PostgreSQL with Drizzle ORM, storing user, document, analysis, and cognitive profile data.
- **Core Services**: Includes multi-model intelligence evaluation, document comparison, multi-language translation, OCR for mathematical notation, and intelligent text rewriting with custom instructions support.
- **System Design**: Focuses on comprehensive cognitive assessment using a 4-Phase Intelligence Evaluation System: Phase 1 (Initial Assessment with anti-diplomatic instructions), Phase 2 (Deep analytical questioning across 17 cognitive dimensions), Phase 3 (Revision and reconciliation of discrepancies), and Phase 4 (Final pushback for scores under 95/100). The system includes seven core cognitive dimensions (Conceptual Depth, Inferential Control, Semantic Compression, Novel Abstraction, Cognitive Risk, Authenticity, Symbolic Manipulation). It supports genre-aware assessment for various document types (philosophical, empirical, technical, fiction) and differentiates genuine insight from superficial academic mimicry. The system provides detailed case assessment for arguments and comprehensive intelligence reports with percentile rankings and evidence-based analysis. Additionally features an Intelligent Rewrite Function that recursively optimizes text to maximize intelligence scores using the exact evaluation protocol, with support for custom instructions (e.g., "quote Carl Hempel", "add statistical data").
- **UI/UX**: Utilizes shadcn/ui and TailwindCSS for styling, offering detailed card-based layouts for analysis reports and supporting PDF/text downloads.

## External Dependencies
- **AI Service Providers**: OpenAI API (GPT-4), Anthropic API (Claude), Perplexity AI, DeepSeek API.
- **Supporting Services**: Mathpix OCR, AssemblyAI, SendGrid, Google Custom Search.
- **Database & Infrastructure**: Neon/PostgreSQL, Drizzle ORM, Replit.