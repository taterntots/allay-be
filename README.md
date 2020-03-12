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

#### Users Routes

| Method | Endpoint             | Access Control | Description                           |
| ------ | -------------------- | -------------- | ------------------------------------- |
| GET    | `/users/all`         | all users      | Returns list of all users.            |
| GET    | `/users/:id`         | all users      | Returns info for a single user by ID. |
| POST   | `/users/:id/reviews` | all users      | Post helpful review about a company.  |
| GET    | `/users/:id/reviews` | all users      | Returns all reviews the user posted.  |
| PUT    | `/users/:id`         | all users      | Update user's account info by ID.     |
| DELETE | `/users/:id`         | all users      | Delete user's account by ID.          |

#### Companies Routes

| Method | Endpoint         | Access Control | Description                                   |
| ------ | ---------------- | -------------- | --------------------------------------------- |
| GET    | `/companies`     | all users      | Returns list of all companies.                |
| GET    | `/companies/:id` | all users      | Returns the information for a single company. |
| POST   | `/companies`     | all users      | Creates a new company.                        |

#### Reviews Routes

| Method | Endpoint       | Access Control | Description                  |
| ------ | -------------- | -------------- | ---------------------------- |
| GET    | `/reviews`     | all users      | Returns list of all reviews. |
| GET    | `/reviews/:id` | all users      | Returns single review by ID. |
| POST   | `/reviews/:id` | all users      | Returns single review by ID. |
| DELETE | `/reviews/:id` | all users      | Delete user's review by ID.  |

# Data Model

#### REVIEWS

---

```
{
    "id": 2,
    "job_title": "National Factors Consultant",
    "job_location": "Iowa",
    "salary": 87000,
    "interview_review": "Nisi itaque natus atque. Voluptatum laudantium temporibus aut enim officia quasi. Quasi dolorum minus repellat est doloremque. Laboriosam hic ducimus facilis. Et esse minus qui et maiores. Eos laudantium maiores optio ut voluptate.",
    "interview_rating": 2,
    "job_review": "Odit iusto expedita vel sunt impedit cum soluta est eaque. Enim hic voluptates quisquam et non. Et quod fuga ut repellat et.\n \rSit quod incidunt. Suscipit modi impedit est eligendi voluptatem et. Nesciunt velit voluptates. Est molestiae qui et aut possimus facere ut id aut. Non in dolores. Dicta natus porro ad rerum ratione ipsam totam.\n \rAd cumque a dolore dicta rerum et qui. At et impedit omnis officiis. Modi reiciendis repellat commodi sunt. Officia non nemo est aut. Voluptatum ut veniam assumenda temporibus.",
    "job_rating": 2,
    "tagline": "The best job interview I ever had!",
    "offer_received": "true",
    "offer_accepted": "false",
    "reviewer": "Heather87",
    "company_name": "Abernathy - Roberts",
    "company_id": 45,
    "domain": "abernathyroberts.com"

}
```

#### USERS

---

```
{
{
    "id": 8,
    "username": "Isabella.Hartmann11",
    "email": "isabella@gmail.com"
    "reviews": [
        {
            "id": 35,
            "job_title": "Corporate Configuration Representative",
            "job_location": "Iowa",
            "salary": 97000,
            "interview_review": "Aut esse minima adipisci molestias velit optio dolores. Et dolore dolor iste nisi aut aut beatae voluptatem. Dignissimos quis et omnis sit ut repudiandae rerum ut at. Nihil sed placeat facilis tempora. Architecto ea possimus. Veritatis beatae nemo facilis autem adipisci nihil nesciunt sit.",
            "interview_rating": 1,
            "job_review": "Doloribus quis qui quam amet. Non dolores et enim ut sunt. Enim voluptatem quasi et possimus ipsam numquam. Aut laborum doloremque.\n \rSint numquam et qui ea aut mollitia. Provident quia aut. Unde voluptate voluptatem sit sit ut amet.\n \rQuibusdam eum dolore. Nisi sequi ipsa. Facilis nisi enim consequuntur occaecati aut molestiae amet explicabo. Et a accusamus in a quibusdam vitae doloremque corrupti.",
            "job_rating": 5,
            "tagline": "The best job interview I ever had!",
            "offer_received": "true",
            "offer_accepted": "false",
            "reviewer": "Isabella.Hartmann11",
            "company_name": "Google",
            "company_id": 2,
            "domain": "google.com"
        },
        {
            "id": 42,
            "job_title": "Customer Directives Supervisor",
            "job_location": "Colorado",
            "salary": 65000,
            "interview_review": "Odio sed quia eum eos error in perferendis qui doloremque. Quis dolores sed dolorum debitis hic id. Modi voluptatibus quasi aut beatae quo.",
            "interview_rating": 2,
            "job_review": "Repellat distinctio ut molestiae quo et non. Placeat consequatur placeat. Quia cum corrupti. Non enim quisquam et eum deleniti est cupiditate. Neque possimus quia.\n \rQuo velit et quas dicta officiis. Libero eos sunt ea vitae minus vitae possimus nemo sed. Inventore iure vel consequuntur. Eum nemo et dolorem ipsa qui.\n \rQuos consequatur quod in architecto repellendus sit adipisci. Eveniet dicta sed. Ea magnam doloremque voluptates dolorum fugiat. Quia veniam soluta voluptatem vel. Non sunt minus eligendi numquam animi. Iure suscipit voluptates esse debitis tempore.",
            "job_rating": 2,
            "tagline": "The best job interview I ever had!",
            "offer_received": "true",
            "offer_accepted": "false",
            "reviewer": "Isabella.Hartmann11",
            "company_name": "Uber",
            "company_id": 87,
            "domain": "uber.com"
        }
    ]
}
}
```

#### COMPANIES

---

```
{
    "id": 45024,
    "name": "Github",
    "hq_state": "San Francisco",
    "hq_city": "CA",
    "domain": "github.com",
    "industry_name": "Computer Software",
    "size_range": "1001 - 5000",
    "linkedin_url": "linkedin.com/company/github"
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

`deleteReview(reviewId)` -> Deletes the single review by ID.

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
