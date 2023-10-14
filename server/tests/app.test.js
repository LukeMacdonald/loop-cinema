const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import your Express app

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Controller', () => {
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
});

describe('Review Controller', () => {
  before(async () =>{
    
    const user = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      name: 'Test User'
    };

    await chai.request(app).post('/user').send(user);

    const movie = {
      title: "Barbie",
      description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
      director: "Greta Gerwig",
      release_date: "2023-07-02",
      poster: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQaoW2gxmJFDPtqfC9pGL6Rdist9nH9ntMLV7XR1FXpaQj1VrGT",
      duration: 114,
      genre: "Comedy"
    }
    await chai.request(app).post('/movies').send(movie);
  
  });

  // Sign Up Unit Tests
  describe('POST /reviews', () => {
    it('should return 400 if movie doesnt exist', async () => {
      const review = {
        movie_id: 2,
        username: "testuser",
        comment: 'This is a great movie',
        rating: 1
      };

      const res = await chai.request(app).post('/reviews').send(review);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Movie doesnt exist.");

    });
    
    it('should return 400 if user doesnt exist', async () => {
      const review = {
        movie_id: 1,
        username: "testuse",
        comment: 'This is a great movie',
        rating: 1
      };

      const res = await chai.request(app).post('/reviews').send(review);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("User doesnt exist.");
    });
    
    it('should return 400 if rating less than 1', async () => {
      const review = {
        movie_id: 1,
        username: "testuser",
        comment: 'This is a great movie',
        rating: 0
      };

      const res = await chai.request(app).post('/reviews').send(review);

      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Invalid rating value");
    });
    
    it('should return 400 if comment is empty', async () => {
      const review = {
        movie_id: 1,
        username: "testuse",
        comment: '',
        rating: 1
      };
      
      const res = await chai.request(app).post('/reviews').send(review);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Invalid comment length");
    });
    it('should return 400 if comment is to large', async () => {

      const large_comment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae dolor nec urna vestibulum cursus."
        + "Nullam nec fringilla eros. Quisque auctor quam in tincidunt tempor. Nullam in arcu vel quam fringilla efficitur. Sed eu diam"
        + "vel arcu tincidunt auctor. Proin in diam ut ex ultricies fermentum. Ut nec malesuada metus. Nunc consequat ex id justo fringilla," 
        + "in commodo purus scelerisque. Donec dapibus interdum urna, in semper nunc placerat nec. Aenean eget nisi sit amet mi facilisis"
        + "fermentum nec nec mauris. Integer euismod dapibus sem, id sollicitudin nisi tristique a. Vestibulum ante ipsum primis in faucibus"
        + "orci luctus et ultrices posuere cubilia Curae; Ut ac justo non lacus euismod sollicitudin. Sed non enim ut elit malesuada fringilla"
        + "at et libero. Maecenas vehicula, dui et lacinia suscipit, odio ante suscipit libero, et mollis mauris turpis nec lectus. Vestibulum"
        + "vel sem eu mi fermentum commodo. Vestibulum tempus, eros a vehicula pharetra, odio mauris vehicula tellus, sit amet cursus sem nisi"
        + "vel nunc. Integer ut neque vitae tortor vulputate aliquet in a erat. Cras non elit in ligula cursus lacinia nec id tellus. Fusce nec"
        + "libero id nunc dignissim dictum. Duis et velit id mi vestibulum dapibus. Suspendisse potenti. Nunc hendrerit fringilla purus nec auctor."
      
      const review = {
        movie_id: 1,
        username: "testuse",
        comment: large_comment,
        rating: 1
      };
      
      const res = await chai.request(app).post('/reviews').send(review);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.equal("Invalid comment length");
    });
  });
});

after(async () => {
  await chai.request(app).post('/terminate');
});




