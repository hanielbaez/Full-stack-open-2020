describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user1 = {
            username: "Dooncam",
            name: "Haniel Baez",
            password: "password"
        }

        const user2 = {
            username: "Obed",
            name: "Obed Baez",
            password: "password"
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user1)
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3003/')
    })

    it('Login form is show', function () {
        cy.contains('log in to application')
        cy.get('#input-username')
        cy.get('#input-password')
        cy.get('button').contains('login')
    })

    describe('Login', function () {
        it('succeds with correct credentials', function () {
            cy.get('#input-username').type('Dooncam')
            cy.get('#input-password').type('password')
            cy.get('button').click()

            cy.get('.alertGood').contains('Logged successfully')
        })

        it('fails with wrong credentials', function () {
            cy.get('#input-username').type('Dooncam')
            cy.get('#input-password').type('wrong')
            cy.get('button').click()

            cy.get('.alertBad')
                .should('have.css', 'border-left', '5px solid rgb(255, 0, 0)')
                .and('contain', 'Invalid username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#input-username').type('Dooncam')
            cy.get('#input-password').type('password')
            cy.contains('login').click()
        })

        it('A blog can be created', function () {
            cy.contains('new note').click()
            cy.get('.title').type('First blog')
            cy.get('.author').type('Haniel Baez')
            cy.get('.url').type('www.hanielbaez.com')
            cy.get('#submit-button').click()

            cy.contains('First blog')
        })

        it('A blog can be like', function () {
            cy.createBlog({
                title: 'First blog',
                author: 'Haniel Baez',
                url: 'www.hanielbaez.com'
            })

            cy.get('.blog').get('button').contains('view').click()

            cy.get('.blog > .togglableContent').as('togglable')

            cy.get('@togglable').should('contain', 'likes 0')
            cy.get('@togglable').get('#like-button').click()
            cy.get('@togglable').should('contain', 'likes 1')
        })

        describe('blog delete action', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'It is gonna be delete',
                    author: 'Haniel Baez',
                    url: 'www.hanielbaez.com'
                })
            })

            it('A blog can be delete by the owner', function () {
                cy.contains('It is gonna be delete')

                cy.get('.blog').contains('view').click()
                cy.get('#remove-button').click()

                cy.get('html').should('not.contain', 'It is gonna be delete')
            })

            it('Only the blog\'s owner can delete it', function () {
                localStorage.clear()
                cy.visit('http://localhost:3003/')

                cy.get('#input-username').type('Obed')
                cy.get('#input-password').type('password')
                cy.contains('login').click()

                cy.get('.blog').contains('view').click()

                cy.get('.blog').should('not.contain', 'remove')
            })
        })

        it('blog are ordered by likes', function () {

            for (var i = 1; i < 4; i++) {
                //create a blog
                cy.contains('new note').click()
                cy.get('.title').type(`Blog ${i}`)
                cy.get('.author').type('Haniel Baez')
                cy.get('.url').type('www.hanielbaez.com')
                cy.get('#submit-button').click()
            }

            //like the blogs
            for (var j = 1; j < 4; j++) {
                cy.get('.blog').eq(j - 1).as(`theBlog${j}`).contains('view').click()

                for (var t = 1; t < j; t++) {
                    cy.get(`@theBlog${j}`).contains('like').click()
                }
            }

            cy.visit('http://localhost:3003/')
            cy.get('.blog').eq(0).should('contain', 'Blog 3')
        })
    })

})