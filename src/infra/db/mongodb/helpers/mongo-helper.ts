import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect () {
    if (this.client) {
      await this.client.close()
      this.client = null
  }
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  } 
}