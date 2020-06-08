// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];
var todos = [
  {id: 1, todo: 'Đi chợ'},
  {id: 2, todo: 'Nấu cơm'},
  {id: 3, todo: 'Rửa bát'},
  {id: 4, todo: 'Học code tại CodersX'},
];
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});
app.get("/todos", (request, response) => {
  var q = request.query.q;
  var matchedTodos;
  if (q) {
    matchedTodos = todos.filter((todo) => {
    return todo.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
  } else {
    matchedTodos = todos
  }
  response.render('todos', {
    todos: matchedTodos,
    query: q
  });
});
app.post('/todos/create', (request, response) => {
  todos.push(request.body);
  response.redirect('back');
})
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
 