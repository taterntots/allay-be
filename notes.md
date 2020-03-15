# Routers

- company review
- interview review
- (update) companies
- (update) users

# Models

- (update) companies to include states table
- new company review model
- (update) review interview (joins with topic, companies, states, offer status)
- (update) users-model (add track table) // potential change with okta

# Order of Tables

## Tables to make

- [x] tracks
- [x] users
- [x] work_status
- [x] interview_topics
- [x] interview_types
- [x] offer_status
- [x] states
- [x] companies
- [x] company_review
- [x] interview_review
- [x] topic_by_interview

## What tables are you changing currently
- [x] users-model (adding functions for interview and company review)
- [x] interview review router
- [x] company review router

localhost:3333/api/users/2/company-review
localhost:3333/api/users/2/interview-review
localhost:3333/api/users/2/reviews/all