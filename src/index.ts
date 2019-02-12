import 'reflect-metadata'
import { createKoaServer, Action } from 'routing-controllers'
import PageController from './pages/controller'
import UserController from './users/controller'
import LoginController from './logins/controller'
import setupDb from './db'
import {verify} from './jwt'

const port = process.env.PORT || 4000

const app = createKoaServer({
  controllers: [
    PageController,
    UserController,
    LoginController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
  
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      return !!(token && verify(token))
    }
    // ...
    return false
  }
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))

// app.listen(4000, () => console.log('Listening on port 4000'))