import request from 'supertest';
import { expect } from 'chai';
import app from '../src/server.js'; 
import client from '../redis/client.js'; 

describe('Notify API Integration Tests', function () {
  
  this.timeout(5000); 

  after(async () => {
    console.log("Tests done, closing redis...");
    try {
        await client.quit(); 
    } catch (err) {}
    
    setTimeout(() => {
        process.exit(0); 
    }, 500);
  });

  it('should queue the job and return 201', async () => {
    const testData = {
      user: "Jalal",
      email: "jalal@gmail.com",
      message: "Your order is ready!"
    };

    const response = await request(app)
      .post('/notify')
      .send(testData);

    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.equal('queues'); 
  });

  it('should get the user data and return 200', async () => {
    const testEmail = "jalal@gmail.com";

    const response = await request(app)
      .get(`/notify/${testEmail}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.not.be.undefined;
  });

});