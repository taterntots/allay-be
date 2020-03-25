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

- localhost:3333/api/users/:userId/reviews/ :revId
- localhost:3333/api/users/:userId/reviews/filter
  <!-- - localhost:3333/api/users/:userId/company-reviews /:revId
  localhost:3333/api/users/:userId/interview-reviews /:revId -->
- localhost:3333/api/reviews/:id

## files needing to get looked at before checking them off

## users-router

- finish crud for reviews
- add middleware
- comment our code
- update readME

## reviews router

- add middleware
- double check the routes
- update readme with the routes
-

## users model

- update functions/ delete old ones
- add middleware
- update readme

## reviews model

- update functions/delete ones
- crud operations gets sent to users-router
- update readme
- middleware
-

## middleware

- add new middleware
  - validate review id
  - check for review data
  - implement and to readme

## readME

- delete parts of the readme that no longer work
- update routes
- update data model
- double check!

# Bugs
