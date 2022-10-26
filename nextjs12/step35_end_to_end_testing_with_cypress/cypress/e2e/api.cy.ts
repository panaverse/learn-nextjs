import { Article } from "../../data/articles";

describe('articles APIs', () => {
    it('should correctly set application/json header', () => {
        cy.request('http://localhost:3000/api/articles')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
    });

    it('should correctly return a 200 status code', () => {
        cy.request('http://localhost:3000/api/articles')
            .its('status')
            .should('be.equal', 200);
    });

    it('should correctly return a list of articles', (done) => {
        cy.request('http://localhost:3000/api/articles')
            .its('body')
            .each((article: Article) => {
                expect(article).to.have.keys('id', 'title', 'body', 'author', 'image');
                expect(article.author).to.have.keys('id', 'name');
                expect(article.image).to.have.keys('url', 'author');
                done();
            });
    });

    it('should correctly return a an article given an ID', (done) => {
        cy.request('http://localhost:3000/api/article?id=u12w3o0d')
            .then(({ body }) => {
                expect(body).to.have.keys('id', 'title', 'body', 'author', 'image');
                expect(body.author).to.have.keys('id', 'name');
                expect(body.image).to.have.keys('url', 'author');
                done();
            });
    });

    it('should return 404 when an article is not found', () => {
        cy.request({
            url: 'http://localhost:3000/api/article?id=unexistingID',
            failOnStatusCode: false,
        })
        .its('status')
        .should('be.equal', 404);
    });


});