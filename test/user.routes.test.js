const chaiHttp = require('chai-http');
const server = require('../server');

describe('Authentication API', () => {
    describe('POST /api/auth/signout', () => {
        it('should sign out the user', (done) => {
            import('chai').then(chai => {
                chai.use(chaiHttp)
                console.log("rr")
                done();
                
                
            });
        });
    });
});