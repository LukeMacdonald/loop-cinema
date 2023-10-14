const chai = require('chai');
const chaiHttp = require('chai-http');
const Sequelize = require('sequelize');
const app = require('../server'); // Import your Express app

chai.use(chaiHttp);
const expect = chai.expect;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:', // Use in-memory database
});

describe('User Controller', () => {
  before(async () => {
    await sequelize.sync({ force: true }); // Sync the database and force recreation
  });

  // Sign Up Unit Tests
  describe('POST /user', () => {
    it('should create a new user', async () => {
      const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        name: 'Test User'
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body.username).to.equal(user.username);
    });
    it('should return 400 if username already exists', async () => {
      const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        name: 'Test User'
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Username already exists."); 
    });
    it('should return 400 if email already exists', async () => {
      const user = {
        username: 'testuser2',
        email: 'test@example.com',
        password: 'testpassword',
        name: 'Test User'
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Email already exists."); 
    });
    it('should return 400 if username is empty', async () => {
      const user = {
        username: '',
        email: 'test@example.com',
        password: 'testpassword',
        name: 'Test User'
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("All fields are required and cannot be empty."); 
    });

    it('should return 400 if email is empty', async () => {
      const user = {
        username: 'testuser3',
        email: '',
        password: 'testpassword',
        name: 'Test User'
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("All fields are required and cannot be empty."); 
    });

    it('should return 400 if password is empty', async () => {
      const user = {
        username: 'testuser3',
        email: 'testuser3@gmail.com',
        password: '',
        name: 'Test User'
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("All fields are required and cannot be empty."); 
    });

    it('should return 400 if name is empty', async () => {
      const user = {
        username: 'testuser3',
        email: 'testuser3@gmail.com',
        password: 'password',
        name: ''
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("All fields are required and cannot be empty."); 
    });
    it('should return 400 if emails format is incorrect', async () => {
      const user = {
        username: 'testuser3',
        email: 'testuser3example.com',
        password: 'testpassword',
        name: 'Test User'
      };

      const res = await chai.request(app).post('/user').send(user);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Invalid email format."); 
    });
  });

  describe('GET /user/:username', () => {
    it('should get user by username', (done) => {
      const username = 'testuser';
      chai.request(app).get(`/user/profile/${username}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.user.username).to.equal(username);
          done(); // Call done() to signal the completion of the test
        });
    });
  
    it('should return 404 if user not found', (done) => {
      chai.request(app).get('/user/profile/nonexistentuser')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done(); // Call done() to signal the completion of the test
        });
    });
  })
  
  // Sign In Unit Tests
  describe('POST /user/login', () => {
    it('should successfuly log user in', async () => {
      const data = {
        username: 'testuser',
        password: 'testpassword',
  
      };
      const res = await chai.request(app).post(`/user/login`).send(data)
      expect(res.body).to.be.an('object');
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal("Login successful"); 
      expect(res.body.user.username).to.equal(data["username"]);
    });
    it('should return 401 if password is incorrect', async () => {
      const data = {
        username: 'testuser',
        password: 'testpasswor',
  
      };
      const res = await chai.request(app).post(`/user/login`).send(data)
      expect(res).to.have.status(401);
      expect(res.body.error).to.equal("Password Incorrect"); 
    });
    it('should return 401 if username does not exist', async () => {
      const data = {
        username: 'testuse',
        password: 'testpassword',
  
      };
      const res = await chai.request(app).post(`/user/login`).send(data)
      expect(res).to.have.status(401);
      expect(res.body.error).to.equal("Username not found"); 
    });
    it('should return 401 if password is empty', async () => {
      const data = {
        username: 'testuser',
        password: '',
  
      };
      const res = await chai.request(app).post(`/user/login`).send(data)
      expect(res).to.have.status(401);
      expect(res.body.error).to.equal("Password cannot be empty"); 
    });
    it('should return 401 if username is empty', async () => {
      const data = {
        username: '',
        password: 'testpassword',
  
      };
      const res = await chai.request(app).post(`/user/login`).send(data)
      expect(res).to.have.status(401);
      expect(res.body.error).to.equal("Username cannot be empty"); 
    });
  });
  
  // Profile Management Unit Tests
  describe('PUT /user', () => {
    it('should update a users email', async () => {
      const data = {
        username: 'testuser',
        email: 'test10@example.com'
      };
      const res = await chai.request(app).put('/user').send(data);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.email).to.equal(data.email);
    });
    it('should update a users name', async () => {
      const data = {
        username: 'testuser',
        name: 'Luke Macdonald'
      };
      const res = await chai.request(app).put('/user').send(data);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.equal(data.name);
    });
    it('should return 404 if no fields entered', async () => {
      const data = {
        username: 'testuser'
      };
      const res = await chai.request(app).put('/user').send(data);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("At least one field (name or email) is required.");
    });
    
    it('should return 400 if email already exists', async () => {
      const data = {
        username: 'testuser',
        email: 'test10@example.com'
      };
      const res = await chai.request(app).put('/user').send(data);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Email already exists.");
    });

    it('should return 404 if username doesnt exist', async () => {
      const data = {
        username: 'unknown',
        email: 'test99@example.com'
      };
      const res = await chai.request(app).put('/user').send(data);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("User not found.");
    });
    it('should return 400 if invalid email format', async () => {
      const data = {
        username: 'testuser',
        email: 'test10example.com'
      };
      const res = await chai.request(app).put('/user').send(data);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Invalid email format.");
    });

  });

  describe('DELETE /user/:username', () => {
    const username = 'testuser';
    it('should delete user by username', async () => {
      const res = await chai.request(app).delete(`/user/${username}`);
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('User deleted successfully.'); 
    });

    it('should return 404 after deleting user', (done) => {
      chai.request(app).get(`/user/profile/${username}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done(); // Call done() to signal the completion of the test
        });
    });
  
    it('should return 404 if user not found', async () => {
      const username = 'nonexistentuser';
      const res = await chai.request(app).delete(`/user/${username}`);
      expect(res).to.have.status(404);
      expect(res.body.error).to.equal('User not found.');
    });
  });
  
  after(async () => {
    await sequelize.close(); // Close the database connection after all tests
    // Send a POST request to the /terminate endpoint to shut down the app
    await chai.request(app).post('/terminate');
    console.log('Tests completed and app terminated.');
  });
});


