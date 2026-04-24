# Clarifications for Nel Vet Vault

## Coding Experience
I'm not a complete beginner or learner, I have some coding experience and I've built some full stack projects

## Questions and Answers

1. What course codes exist in the Faculty of Vet Med at Unijos? Should we seed a `courses` table or let uploaders enter them freehand?
2. File size limit for uploads? Supabase Storage free tier allows up to 50MB per file — is that enough for PDFs?
3. Admin identity: is there one admin (you), or multiple? Supabase auth can handle multiple admins via role column.
4. Do you want uploaders to optionally enter their name, or keep anonymous forever?
5. Domain plan: nelvetvault.com.ng points to DomainKing now — will you redirect it to Netlify, or use the free `.netlify.app` subdomain for now?