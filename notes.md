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

localhost:3333/api/company-reviews/2
localhost:3333/api/interview-reviews
localhost:3333/api/users/2/company-review/50


## files needing to get looked at before checking them off
- users router 
  - post/put/delete (still needs to get update)
  - [x]check the errors for accuracy readings
  - setting up middleware
  - [x] add comments

- company-reviews-router.js
  - [x] add comments
  - add middleware
  - [x] add proper errors

- reviews-router.js
  - delete updated changes
  - make sure we are no longer using it

- users-model
  - needs more functions added
  - add crud for both 
    - [x] company reviews 
    - interview reviews

- company-reviews-model
  - [x] finished model
  - [x] add comments
  - double check work

