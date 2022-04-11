// CRUD - create, read, update, delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId()
// console.log(id.getTimestamp())

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Failed to connect to MongoDB: ' + error)
    }
    console.log('Connected to MongoDB!')
    const db = client.db(databaseName)

    // db.collection('users').insertMany(
    //   [
    //     { name: 'Kristof', age: 26 },
    //     { name: 'Gunther', age: 18 },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error)
    //     }
    //     console.log(result.insertedIds)

    //   }
    // )

    // db.collection('tasks').insertMany(
    //   [
    //     { description: 'Grocery shopping', completed: true },
    //     { description: 'Learn nodeJs', completed: false },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log(error)
    //     }
    //     console.log(result.insertedIds)
    //   }
    // )

    // db.collection('users').findOne({ name: 'Kristof' }, (error, user) => {
    //   if (error) {
    //     return console.log(error)
    //   }
    //   console.log(user)
    // })

    // db.collection('users')
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     console.log(users)
    //   })
    // db.collection('users')
    //   .find({ age: 27 })
    //   .count((error, count) => {
    //     console.log(count)
    //   })
    // db.collection('tasks').findOne(
    //   { _id: new ObjectId('6253069f889e155d0ea86107') },
    //   (error, task) => {
    //     if (error) {
    //       console.log(error)
    //     }
    //     console.log(task)
    //   }
    // )
    // db.collection('tasks')
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     tasks.forEach((currentItem) => {
    //       console.log(currentItem)
    //     })
    //   })

    // db.collection('users')
    //   .updateOne(
    //     { _id: new ObjectId('6252da08847f1864d0458be7') },
    //     { $set: { name: 'Mike' } }
    //   )
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // db.collection('tasks')
    //   .updateMany({ completed: false }, { $set: { completed: true } })
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    db.collection('users')
      .deleteMany({ age: 27 })
      .then(console.log)
      .catch(console.log)
  }
)
