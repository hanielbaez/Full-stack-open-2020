Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(body))
        cy.visit('http://localhost:3003')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.contains('new note').click()
    cy.get('.title').type(title)
    cy.get('.author').type(author)
    cy.get('.url').type(url)
    cy.get('#submit-button').click()
})