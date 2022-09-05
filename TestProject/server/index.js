const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')

const users = [{id: Date.now(), username: "Petya", age: 35}]

const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id == id)
    },
    createUser: ({input}) => {
        const id = Date.now()
        const user = {
            id, ...input
        }
        users.push(user)
        return user
    }
}

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql : true,
    schema,
    rootValue: root
}))

app.listen(5000, () => {
    console.log('Сервер запущен')
})