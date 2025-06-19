# Express CRUD app with JWT auth

Used jwt to protect the private route and auth feature

## How to start the app?

```bash
yarn install
```

Create a `.env` file in the root and add below from `.env.example` file

```.env
PORT=8080
DB_URL=<DB_connection_string>
JWT_SECRET_KEY=<Add_a_random_string>
```

Then run the application using

```bash
yarn run dev
```

## Routes

Blog routes are protected; to access the route, you need to pass `Authorization` in header.

- [GET: Posts](http://localhost:8080/api/posts) - Get all posts or filter by limit.
- [GET: Post](http://localhost:8080/api/posts/<postId>) - Get post by `postId`.
- [POST: Create post](http://localhost:8080/api/posts) - Create post
- [PUT: Update post](http://localhost:8080/api/posts/<postId>) - Update post by id
- [DELETE: Delete post](http://localhost:8080/api/posts/<postId>) - Delete post by id

- [POST: Register](http://localhost:8080/api/auth/register) - Create a new user
- [POST: Login](http://localhost:8080/api/auth/register) - Get auth token on login
