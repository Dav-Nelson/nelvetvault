## Open Questions

1. What course codes exist in the Faculty of Vet Med at Unijos? Should we seed a `courses` table or let uploaders enter them freehand?

Answer: Create a courses table (seeded). Users select from dropdown.
I'll attach the html file of my prvious website on domain king. It contains all the courses, but if possible we should make provision for updates on the courses because new courses start anytime. If possible, the admins should be able to update the courses.

2. File size limit for uploads? Supabase Storage free tier allows up to 50MB per file — is that enough for PDFs?

Answer: Yes, but we'll have to indicate that to the students when uploading that it should be less than 50MB.

3. Admin identity: is there one admin (you), or multiple? Supabase auth can handle multiple admins via role column.

Answer: A couple of admins. I plan to assign admin responsibilities to students of my school, probably, the class reps of 200 to 600 levels

4. Do you want uploaders to optionally enter their name, or keep anonymous forever?
Answer: There should be an option for entering name and possibly comments

5. Domain plan: nelvetvault.com.ng points to DomainKing now — will you redirect it to Netlify, or use the free `.netlify.app` subdomain for now?

Answer: I don't plan to use domain king again. Since this student platform is not focused on profit for now, but on giving back, I want to use free domain name for now that's why I'm using .netlify.app. We can upgrade later.