const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

// Create
exports.create = (obj, dbName, tableName) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw err
            const dbo = db.db(dbName)
            dbo.collection(tableName).insertOne(obj, (err, result) => {
                if (err) reject(err)
                resolve('Success ' + result)
                db.close()
            })
        })
    })
}

// Delete
exports.deleteByParameter = (query, dbName, tableName) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw err
            const dbo = db.db(dbName)
            dbo.collection(tableName).deleteOne(query, (err, _) => {
                if (err) reject(err)
                resolve('Success')
                db.close()
            })
        })
    })
}

// Update
exports.update = (query, newValues, dbName, tableName) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw err
            const dbo = db.db(dbName)
            dbo.collection(tableName).updateOne(query, newValues, (err, result) => {
                if (err) reject(err)
                console.log('up to date')
                resolve('Success ' + result)
            })
        })
    })
}

// Read table
exports.readTable = (dbName, tableName) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                reject(err)
                throw err
            }
            const dbo = db.db(dbName)
            dbo.collection(tableName).find({}).toArray((err, result) => {
                if (err) {
                    reject(err)
                    throw err
                }
                resolve(result)
            })
            db.close()
        })
    })
}

// Read
exports.readOneByParameter = (query, dbName, tableName) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                reject(err)
                throw err
            }
            const dbo = db.db(dbName)
            dbo.collection(tableName).find(query).toArray((err, result) => {
                if (err) {
                    reject(err)
                    throw err
                }
                if (result[0])
                    resolve(result)
                else
                    reject('Not found')
                db.close()
            })
        })
    })
}