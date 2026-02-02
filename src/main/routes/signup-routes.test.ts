import request from 'supertest'
import app from '../config/app'
import MongoMemoryServer from 'mongodb-memory-server-core'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  let mongoServer: MongoMemoryServer
    beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create()
      const uri = mongoServer.getUri()
      await MongoHelper.connect(uri)
    })
  
    afterAll(async () => {
      await MongoHelper.disconnect()
    })
  
    beforeEach(async () => {
      const accountCollection = MongoHelper.getCollection('accounts')
      await accountCollection.deleteMany({})
    })

  test('Should return an account on success', async () => {
    await request(app)
     .post('/api/signup')
     .send({
      name: 'Douglas',
      email: 'douglas@mail.com',
      password: '123',
      passwordConfirmation: '123'
     })
     .expect(200)
  })
})