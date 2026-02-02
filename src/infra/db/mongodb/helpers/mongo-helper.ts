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
  },

  map (result: any, data: any): any {
    const { acknowledged, insertedId } = result
    if (acknowledged !== true) {
      return null
    }
    return {
      id: data._id.toString(),
      name: data.name,
      email: data.email,
      password: data.password
    }
  }
}