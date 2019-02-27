let testObject = [  
    {  
       "emp_no":10004,
       "birth_date":"1954-04-30T23:00:00.000Z",
       "first_name":"Chirstian",
       "last_name":"Koblick",
       "gender":"M",
       "hire_date":"1986-11-30T23:00:00.000Z"
    },
    {  
       "emp_no":10017,
       "birth_date":"1958-07-05T23:00:00.000Z",
       "first_name":"Cristinel",
       "last_name":"Bouloucos",
       "gender":"F",
       "hire_date":"1993-08-02T22:00:00.000Z"
    },
    {  
       "emp_no":10067,
       "birth_date":"1953-01-06T23:00:00.000Z",
       "first_name":"Claudi",
       "last_name":"Stavenow",
       "gender":"M",
       "hire_date":"1987-03-03T23:00:00.000Z"
    },
    {  
       "emp_no":10068,
       "birth_date":"1962-11-25T23:00:00.000Z",
       "first_name":"Charlene",
       "last_name":"Brattka",
       "gender":"M",
       "hire_date":"1987-08-06T22:00:00.000Z"
    },
    {  
       "emp_no":10115,
       "birth_date":"1964-12-24T23:00:00.000Z",
       "first_name":"Chikara",
       "last_name":"Rissland",
       "gender":"M",
       "hire_date":"1986-01-22T23:00:00.000Z"
    },
    {  
       "emp_no":10146,
       "birth_date":"1959-01-11T23:00:00.000Z",
       "first_name":"Chenyi",
       "last_name":"Syang",
       "gender":"M",
       "hire_date":"1988-06-27T22:00:00.000Z"
    },
    {  
       "emp_no":10188,
       "birth_date":"1956-07-12T23:00:00.000Z",
       "first_name":"Christ",
       "last_name":"Muchinsky",
       "gender":"F",
       "hire_date":"1987-08-26T22:00:00.000Z"
    },
    {  
       "emp_no":10223,
       "birth_date":"1963-09-16T23:00:00.000Z",
       "first_name":"Carrsten",
       "last_name":"Schmiedel",
       "gender":"F",
       "hire_date":"1985-11-17T23:00:00.000Z"
    },
    {  
       "emp_no":10230,
       "birth_date":"1955-09-10T23:00:00.000Z",
       "first_name":"Clyde",
       "last_name":"Vernadat",
       "gender":"M",
       "hire_date":"1996-06-15T22:00:00.000Z"
    }
]

$('.tab').click(function() {
    console.log('I clicked ', this.value)
})
$.get( "http://localhost:8001/query", function( data ) {
  $.each(data, function () {
    console.log(this);
  });    

},"json");

  