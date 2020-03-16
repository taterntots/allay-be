# API Documentation

### Maintainability Score: https://codeclimate.com/github/Lambda-School-Labs/allay-be/maintainability

#### Backend delpoyed at [Heroku](https://allay-be-production.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Backend framework

- Express for flexibility, simple routing, and middleware support
- Postgres for data persistence
- Okta for user authentication

## Endpoints

#### Auth Routes

| Method | Endpoint         | Access Control | Description                      |
| ------ | ---------------- | -------------- | -------------------------------- |
| POST   | `/auth/register` | all users      | Register a new user account.     |
| POST   | `/auth/login`    | all users      | Login with a registered account. |

#### Old Users Routes

| Method | Endpoint             | Access Control | Description                           |
| ------ | -------------------- | -------------- | ------------------------------------- |
| GET    | `/users/all`         | all users      | Returns list of all users.            |
| GET    | `/users/:id`         | all users      | Returns info for a single user by id. |
| POST   | `/users/:id/reviews` | all users      | Post helpful review about a company.  |
| GET    | `/users/:id/reviews` | all users      | Returns all reviews the user posted.  |
| PUT    | `/users/:id`         | all users      | Update user's account info by id.     |
| DELETE | `/users/:id`         | all users      | Delete user's account by id.          |

#### New Users Routes

| Method | Endpoint                    | Access Control | Description                           |
| ------ | --------------------------- | -------------- | ------------------------------------- |
| GET    | `/users/all`                | all users      | Returns list of all users.            |
| PUT    | `/users/:id`                | all users      | Update user's account info by id.     |
| DELETE | `/users/:id`                | all users      | Delete user's account by id.          |
| GET    | `/users/:id`                | all users      | Returns info for a single user by id. |
| POST   | `/users/:id/company-review` | all users      | Post helpful review about a company.  |

#### Company Routes

| Method | Endpoint         | Access Control | Description                                   |
| ------ | ---------------- | -------------- | --------------------------------------------- |
| GET    | `/companies`     | all users      | Returns list of all companies.                |
| GET    | `/companies/:id` | all users      | Returns the information for a single company. |
| POST   | `/companies`     | all users      | Creates a new company.                        |

#### Company Reviews Routes

| Method | Endpoint               | Access Control | Description                          |
| ------ | ---------------------- | -------------- | ------------------------------------ |
| GET    | `/company-reviews`     | all users      | Returns list of all company reviews. |
| GET    | `/company-reviews/:id` | all users      | Returns a single company review.     |

#### Reviews Routes

| Method | Endpoint       | Access Control | Description                  |
| ------ | -------------- | -------------- | ---------------------------- |
| GET    | `/reviews`     | all users      | Returns list of all reviews. |
| GET    | `/reviews/:id` | all users      | Returns single review by id. |

# Data Model

#### REVIEWS

---

```
{


}
```

#### USERS

---

```
{
    "id": 4,
    "username": "aaron",
    "email": "ap@test.email.com",
    "track_id": 3,
    "company_reviews": [
        {
            "company_review_id": 7,
            "job_title": "Full Stack WEB Engineer",
            "start_date": 2012,
            "end_date": 2028,
            "comment": "TEST *** There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage **TEST *** n-characteristic words etc.",
            "typical_hours": 30,
            "salary": 15000,
            "job_rating": 3,
            "username": "aaron",
            "company_name": "1 Million Cups Organizer",
            "logo": "1millioncups.com",
            "work_status": "Former Employee",
            "created_at": "2020-03-16T15:45:51.249Z",
            "updated_at": null
        }
    ]
}
```

#### COMPANIES

---

```
{
    "id": 12,
    "company_name": "1 Million Cups Organizer",
    "hq_city": "Kansas City",
    "state_id": 25,
    "domain": "1millioncups.com",
    "industry_name": "Philanthropy",
    "size_range": "51 - 200",
    "linkedin_url": "linkedin.com/company/1-million-cups-organizer",
    "reviews": []
}
```

## Actions

`findUsers()` -> Returns all users

`findUsersBy({ filter })` -> Returns a single user by specified filter. Must use {}.

`findUserById(userId)` -> Returns all data for a single user by ID (including all reviews).

`findUserReviews(userId)` => Returns reviews related to a user.

`addUser(user object)` -> Creates a new user and returns that user.

`updateUser(userId)` -> Update a single user by ID.

`deleteUser(userId)` -> Deletes everything dependent on the user.
<br>
<br>
<br>

`findCompanies()` -> Retruns a list of all companies.

`findCompaniesBy(filter)` -> Returns a single company by specified filter.

`findCompanyBy(companyId)` -> Returns a single company by ID.

`findCompanyReviews(companyId)` -> Returns all reviews for a specific company.

`addCompany(company object)` --> Creates a new company and returns that company. If the company already exists the company will not be added.

`updateCompany(userId, changes object)` -> Updates a single company by ID.

`deleteCompany(userId)` -> Deletes the single company.
<br>
<br>
<br>

`getReviews()` -> Returns a list of all reviews

`getReviewsBy(filter)` -> Returns a single review by specified filter

`getReviewsById(reviewId)` -> Returns a single review by review ID including user and company info

`addReview(review object)` --> Creates a new review and returns that review.

`updateReview(reviewId, changes object)` -> Updates a single review by ID.

`deleteReview(reviewId)` -> Deletes the single review

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

\_ NODE_ENV - Notates the enviroment for the server to run on. Options include 'testing', 'development', and 'production'. Auto defaults to development.

\_ DB_DEV - Notates the postgres database URL for local development.

\_ DB_TEST - Notates the postgres database URL for local testing.

<!-- - JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)]) -->

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/allay-fe) for details on the frontend of our project.
