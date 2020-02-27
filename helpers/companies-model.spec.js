const db = require('../data/dbConfig');
const Reviews = require('./reviews-model');
const Company = require('./companies-model');

describe('Companies Model', () => {
	beforeEach(async () => {
		await db.raw('truncate table reviews cascade');
		await db.raw('truncate table companies restart identity cascade ');
	});
	describe('findCompanies()', () => {
		it('can add a few companies then find all companies', async () => {
			// POST new company
			const new_company = {
				name: 'Ignacio Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			const new_company_2 = {
				name: 'Spencer Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			const new_company_3 = {
				name: 'Matt Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};

			// add the companies to the database
			await Company.addCompany(new_company);
			await Company.addCompany(new_company_2);
			await Company.addCompany(new_company_3);

			//access db using the model
			const companies = await Company.findCompanies();
			// tests
			expect(companies).toHaveLength(3);
			expect(companies[2].name).toBe(new_company_3.name);
		});
	});
	describe('findCompaniesById()', () => {
		it('can add a few companies then find a specific companies', async () => {
			// POST new company
			const new_company = {
				name: 'Ignacio Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			const new_company_2 = {
				name: 'Spencer Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			const new_company_3 = {
				id: 3,
				name: 'Matt Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};

			// add the companies to the database
			await Company.addCompany(new_company);
			await Company.addCompany(new_company_2);
			await Company.addCompany(new_company_3);

			//access db using the model
			const companies = await db('companies');
			// tests
			expect(companies).toHaveLength(3);
			expect(companies[2].id).toBe(new_company_3.id);
		});
	});
	describe('findCompanyReviews()', () => {
		it('can add a new company, submit a new review, then find reviews associated with a company', async () => {
			// POST new company
			const review_1 = {
				id: 1,
				job_title: 'engineer',
				job_location: 'Tennessee',
				salary: 500,
				interview_review: 'some info',
				interview_rating: 1,
				job_review: 'more info',
				job_rating: 5,
				user_id: 1,
				company_id: 1
			};

			const company_1 = {
				id: 1,
				name: 'Ignacio Test Company',
				hq_state: 'California',
				hq_city: 'San Diego'
			};

			// add the companies
			await Company.addCompany(company_1);
			// add review for the company
			await Reviews.addReview(review_1);

			const company_review = await Company.findCompanyReviews(1);

			//access db
			const companies = await db('companies');
			// tests
			expect(company_review).toHaveLength(1);
			expect(company_review[0].job_rating).toBe(review_1.job_rating);
		});
	});
	describe('addCompany()', () => {
		it('can add a new company', async () => {
			// POST new company
			const new_company = {
				name: 'Ignacio Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			await Company.addCompany(new_company);

			//access db
			const companies = await db('companies');
			// tests
			expect(companies).toHaveLength(1);
			expect(companies[0].name).toBe(new_company.name);
		});
	});
	describe('updateCompany()', () => {
		it('can add a an existing company', async () => {
			// POST new company
			const new_company = {
				name: 'Ignacio Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			const new_company_2 = {
				name: 'Spencer Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			const new_company_3 = {
				name: 'Matt Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};
			const update_company = {
				name: 'Aaron Test Company',
				hq_state: 'California',
				hq_city: 'San Francisco'
			};

			// add the companies to the database
			await Company.addCompany(new_company);
			await Company.addCompany(new_company_2);
			await Company.addCompany(new_company_3);

			//update the company
			await Company.updateCompany(2, update_company);

			//access db
			const companies = await db('companies');
			// tests
			expect(companies).toHaveLength(3);
			expect(companies[2].name).toBe(update_company.name);
		});
	});
});
