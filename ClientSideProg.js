var rest = require("./RestEasy.js") //Import the Module

rest.dbSetup(       //Must be called if you want to use mysql calls
    "localhost",    //Host
    "clientprog",         //User
    "Password1",      //Password
    "employees"          //Optionally database
    )

//Declaring a root page
//Will be accessed on localhost:8001
rest.page("/", function() { 
    return "Hello World!" //Strings will be returned directly
})

//Declaring a page that returns something from a database
//Will be accessed on localhost:8001/query
rest.page("/query", function(q) {
    return q.a
    return "SELECT * FROM employees LIMIT 50"
})

//Declaring a page that uses parameters
//Will be accessed on localhost:8001/parameters?a=3&b=5
rest.page("/parameters", function(q) {  //the parameters can be accessed through the 
                                        //q object
    return parseInt(q.a) + parseInt(q.b);
})

//Declaring a page that uses a different kind of query
//Will be accessed on localhost:8001/insert
//DISCLAIMER no protection against injection has yet been implemented. 
//DONT GO LIVE!!!
rest.page("/insert", function(q) {
    return rest.query(q.query)
})

//Delaring a page that returns the contents of a file
//Will be accessed on localhost:8001/file
rest.page("/file", function(q) {
    return rest.file("index.html")
})
rest.page("/styling.css", function(q) {
    return rest.file("styling.css")
})
rest.page("/running.js", function(q) {
    return rest.file("running.js")
})
rest.start(8001) //Initialize the server