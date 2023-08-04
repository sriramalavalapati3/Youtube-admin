const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp = require('chai-http');
const { app } = require('../src/index');
const { videoToDelete,videoToDelete1,videoToPatch } = require('./testdata');
const { videomodel } = require('../models/video.model');
const { describe } = require('mocha');
chai.use(chaiHttp);
const expect = chai.expect;

 var token ;
 var expiry;

//login testing 

describe('POST',()=>{
  it('it should login and generate token',async()=>{
chai.request(app)
   .post('/api/login')
   .send({
    "email":"sriramalavalapati@gmail.com",
    "password":"chinnu123"
   })
   .end((err,res)=>{
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token')
    token=res.body.token;
    expiry=res.body.expiry;
   })
  })  

})

//uploading data test

describe('POST', () => {
  it("it should post video using token", async () => {
   
    chai.request(app)
    .post('/api/login')
    .send({
     "email":"sriramalavalapati@gmail.com",
     "password":"chinnu123"
    })
    .end((err,res)=>{
     expect(res).to.have.status(200);
     expect(res.body).to.have.property('token');
     expect(res.body).to.have.property('expiry')
    var token=res.body.token;
    var expiry=res.body.expiry

  chai.request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${token}`)
      .send(videoToDelete)
   .end((err,res)=>{
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('object');
   
   })
  })
  });


  it("it shouldn't post video using expirytoken", async () => {
   
    chai.request(app)
    .post('/api/login')
    .send({
     "email":"sriramalavalapati@gmail.com",
     "password":"chinnu123"
    })
    .end((err,res)=>{
     expect(res).to.have.status(200);
     expect(res.body).to.have.property('token');
     expect(res.body).to.have.property('expiry')
    var token=res.body.token;
    var expiry=res.body.expiry

  chai.request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${expiry}`)
      .send(videoToDelete)
   .end((err,res)=>{
    expect(res).to.have.status(500);
    expect(res.body).to.be.a('object');
   
   })
  })


  });
  it("it shouldn't post video with out token", async () => {
   
    chai.request(app)
    .post('/api/login')
    .send({
     "email":"sriramalavalapati@gmail.com",
     "password":"chinnu123"
    })
    .end(async(err,res)=>{
     expect(res).to.have.status(200);
     expect(res.body).to.have.property('token');
     expect(res.body).to.have.property('expiry')
    var token=res.body.token;
    var expiry=res.body.expiry
   
  chai.request(app)
      .post('/api/upload')
      .send(videoToDelete)
   .end((err,res)=>{
    expect(res).to.have.status(500);
    expect(res.body).to.be.a('object');
   
   })
  })
  });
});




//Delete vedio by id testing



describe('DELETE',()=>{



  it("it should delete video with token",async()=>{
   
    const video = new videomodel(videoToDelete1);
    await video.save();
    chai.request(app)
          .delete(`/api/delete/${video._id}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('message', 'deleted successfully');
            
          });
 
  })



  it("it shouldn't delete video with expiredtoken",async()=>{
   
    const video = new videomodel(videoToDelete1);
    await video.save();
    chai.request(app)
          .delete(`/api/delete/${video._id}`)
          .set('Authorization', `Bearer ${expiry}`)
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.be.a('object');
            
          });
 
  })


  it("it shouldn't delete video without token ",async()=>{
   
    const video = new videomodel(videoToDelete1);
    await video.save();
    chai.request(app)
          .delete(`/api/delete/${video._id}`)
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body).to.be.a('object');
            
          });
 
  })

    
    })



//patch vedio by id testing

describe('PATCH',()=>{
  it('patch by id with token',async()=>{
    const video = new videomodel(videoToDelete1);
    await video.save();
    chai.request(app)
    .patch(`/api/update/${video._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(videoToPatch)
    .end((err,res)=>{
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('msg',"updated succesfully");
    })
  })

  it('patch by id with expiry token',async()=>{
    const video = new videomodel(videoToDelete1);
    await video.save();
    chai.request(app)
    .patch(`/api/update/${video._id}`)
    .set('Authorization', `Bearer ${expiry}`)
    .send(videoToPatch)
    .end((err,res)=>{
      expect(res).to.have.status(500);
      expect(res.body).to.be.a('object');
    })
  })
  it('patch by id without token',async()=>{
    const video = new videomodel(videoToDelete1);
    await video.save();
    chai.request(app)
    .patch(`/api/update/${video._id}`)
    .send(videoToPatch)
    .end((err,res)=>{
      expect(res).to.have.status(500);
      expect(res.body).to.be.a('object');
    })
  })
})
  


