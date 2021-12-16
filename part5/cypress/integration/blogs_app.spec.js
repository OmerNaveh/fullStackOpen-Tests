/* eslint-disable no-undef */
describe('Blogs app', function() {
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })
    it('login form is shown', function() {
        cy.contains('Log In')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#userName').type('test');
            cy.get('#password').type('123456');
            cy.get('#signInBtn').click()
            cy.contains('logged In')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#userName').type('omer');
            cy.get('#signInBtn').click()
            cy.contains('Unable to login')
            cy.should('not.contain', 'logged In')
        })
      })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#userName').type('test');
                cy.get('#password').type('123456');
                cy.get('#signInBtn').click()
        })
        it('A blog can be created', function() {
            cy.get('#addBlog').click()
            cy.get('#title').type('omer testing with cypress');
            cy.get('#author').type('omer testing with cypress');
            cy.get('#url').type('omer testing with cypress');
            cy.get('#formBtn').click()
            cy.contains('Blog created Successfully')
            cy.contains('omer testing with cypress')
            // cy.get('.posts').should('have.length',1) - if i reset the data each Time
        })
        it('A user can like a blog',function(){
            cy.contains('view').click()
            cy.get('.likeBtn').click()
            cy.get('.likes-num:first').contains(1);
            // cy.get('.likes-num:first').should('have.text', '1'); - - if i reset the data each Time
        })
        it('A user can delete a blog',function(){
            cy.contains('view').click()
            cy.get('#remove-blog').click()
            cy.contains('blog successfully deleted');
            // cy.get('.posts').should('have.length',1) - if i reset the data each Time
        })
        it('blogs list is sorted by likes',function(){
            cy.get('.viewBtn').each((post)=>{
               post.click()
            })
            const likesArr = []
           cy.get('.likes-num').each((likes)=>{
                likesArr.push(Number(likes.text()))
           })
           console.log(likesArr);
           expect(likesArr).to.eq(likesArr.sort().reverse())
        })
    })
})