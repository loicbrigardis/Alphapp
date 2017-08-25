# Alpha

MEAN project, using MongoDb, Angular 4, Express, NodeJs
Bootstrap 4 for the template
Angular 4 CLI
JSON Web Tokens auth

#How to use it ?

```
$ npm install
// Start mongo DB OR use external DB (you should change default parameter)
$ node server.js
```

Go to the default port: http://localhost:4400/

#If you want change default parameters ?

Server side:
- change variables.env
```
DATABASE=
JWT_SECRET=
PORT=
```

Client side:
- Change server url in services auth and messages
```
API_URL = "http://localhost:4400/api/signup"
API_URL_AUTH = "http://localhost:4400/api/login"
$ ng build --prod (with angular 4 cli)
remove index.html from /dist, index in served by node
```

