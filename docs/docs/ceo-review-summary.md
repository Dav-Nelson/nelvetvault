# Nel VetVault: 12-Month Vision and Expansion Plan

## 1. Premise Challenge
The current "browse + upload" MVP solves the immediate pain of resource fragmentation. The real long-term moat is becoming the "Library of Alexandria" for Unijos Vet students, where the value isn't just access, but verifiable quality and community engagement.

## 2. Implementation Alternatives

### Approach A: Minimal Viable (Current Path)
*   **Summary:** React + Supabase (Postgres, Storage, Auth).
*   **Effort:** S
*   **Risk:** Low
*   **Pros:** Fast, free, standard architecture.
*   **Cons:** Limited engagement features, manual vetting bottleneck.

### Approach B: Ideal Architecture (Scalable)
*   **Summary:** Same stack, plus formal course management, automated PDF validation, and role-based access control.
*   **Effort:** M
*   **Risk:** Low/Med
*   **Pros:** Better data integrity, improved user trust.
*   **Cons:** Higher initial setup effort.

**Recommendation:** Proceed with Approach A but implement with the extensibility of Approach B (e.g., proper relational schema design for future `courses` table even if only using freehand for MVP).

## 3. Scope Expansion Proposals (10x Opportunities)
1.  **AI-Powered Study Buddy:** Integrate a simple LLM prompt to summarize long PDFs upon upload, generating "Flashcard-ready" summaries for students.
2.  **Reputation System:** Gamify contributions (e.g., "Top Contributor" badge) to drive community-led content growth.
3.  **Real-Time Collaborative Groups:** Simple, lightweight study chat-room per course (e.g., integration with Supabase Realtime).
4.  **Verifiable Quality:** Lecturer-verification flag for materials to distinguish "verified" vs. "peer-uploaded".

## 4. CEO Review Summary
*   **Mode:** SCOPE EXPANSION
*   **Strongest challenges:** Managing admin bottleneck, maintaining data quality, ensuring sustainability of the community upload model.
*   **Accepted scope:** Browse, upload (MVP), admin approval.
*   **Deferred:** AI-Powered Study Buddy, Reputation, Chat (until traffic justifies).
*   **NOT in scope:** Generic content dumping, paid features.
