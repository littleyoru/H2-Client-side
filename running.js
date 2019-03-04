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

function formatDate(date) {
   formattedDate = date.substring(0, 10);
   return formattedDate;
}


function searchPerson(b_date, f_name, l_name, gender, h_date){
   var finalQuery = String.raw`SELECT * FROM employees WHERE birth_date = '${b_date}' AND first_name = '${f_name}' AND last_name = '${l_name}' AND gender = '${gender}' AND hire_date = '${h_date}'`;
   return $.get( "http://localhost:8001/query?a=" + finalQuery )
}

function deletePersonQuery(emp_no){
   var finalQuery = String.raw`DELETE FROM employees WHERE emp_no = ${emp_no}`;
   $.get( "http://localhost:8001/insert?query=" + finalQuery, function( data ) {
      console.log(data);
   }).then( 
   ()=>{
         $("#tBody").empty()
         loadEmployees()
   },()=>{
      console.log("deleteperson: error")
   });
}

function fillTemplate(obj){
   let temp = $.trim($('#dataRow').html())
   var x = temp.replace(/{{emp_no}}/ig, obj.emp_no)
               .replace(/{{birth_date}}/ig, formatDate(obj.birth_date))
               .replace(/{{first_name}}/ig, obj.first_name)
               .replace(/{{last_name}}/ig, obj.last_name)
               .replace(/{{gender}}/ig, obj.gender)
               .replace(/{{hire_date}}/ig, formatDate(obj.hire_date));
               $('#tBody').append(x);   
}

function loadEmployees(){
   $.get( "http://localhost:8001/query?a=SELECT * FROM employees LIMIT 50", function( data ) {
            $.each(data, function(index, obj) {
               console.log(obj)
               fillTemplate(obj)
            });    

         },"json");
   }

function addPersonQuery(b_date, f_name, l_name, gender, h_date) {
   var finalQuery = String.raw`INSERT INTO employees (birth_date,first_name,last_name,gender,hire_date) VALUES ('${b_date}','${f_name}','${l_name}','${gender}','${h_date}')`;
   return $.get( "http://localhost:8001/insert?query=" + finalQuery)
}




$(document).ready(function() {

   //Show employees
   $('.tab').on('click', function(event) {
       event.stopPropagation()
       event.stopImmediatePropagation()
       //console.log('I clicked ', $(this)[0].value)
       switch(this.name) {
         case 'employees':
            $('#table').toggleClass('notDisplay')
            loadEmployees()
            break
         case 'departments':
            if ($('#side').hasClass('notDisplay')) {
               $('#side').removeClass('notDisplay')
            }
            if (!$('#depTable').hasClass('notDisplay')) {
               $('#depTable').addClass('notDisplay')
            }
            //$('#depTable').toggleClass('notDisplay')
            var temp = $.trim($('#dataRowDep').html())
            $.each(testMarketing, function(index, obj) {
               var x = temp.replace(/{{emp_no}}/ig, obj.emp_no)
               .replace(/{{first_name}}/ig, obj.first_name)
               .replace(/{{last_name}}/ig, obj.last_name)
               .replace(/{{title}}/ig, obj.title)
               .replace(/{{salary}}/ig, obj.salary)
               $('#tBodyDept').append(x)
            })
            break
         default: 
            break
         }
      
   })

   //Add employee
   $('.add').on('click', function(event) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      var b_date = $('#b_date').text();
      var f_name = $('#f_name').text();
      var l_name = $('#l_name').text();
      var gender = $('#gender').text();
      var h_date = $('#h_date').text();
      addPersonQuery(b_date, f_name, l_name, gender, h_date).then(
         (data) => {
            console.log('data after add ', data)
            let info = JSON.parse(data)[0]
            fillTemplate(searchPerson(info.b_date, info.f_name, info.l_name, info.gender, info.h_date))
            // console.log("SEARCHPERSON (data)[0]:",JSON.parse(data)[0]);
            // console.log("SEARCHPERSON JSON.parse(data):",JSON.parse(data));
            }, () => {
               console.log("addperson: error")
            }
      )
   })

   $('#tBody').on('click', 'input', function(event) {
      event.stopPropagation()
      event.stopImmediatePropagation()

      switch($(this)[0].value) {
          case 'E':
              let siblings = $(this).parent().siblings()
              $.each(siblings, ((index, item) => {
                  $(item).attr('contenteditable', 'true')
              }))
              $(this).toggleClass('notDisplay')
              $(this).siblings('.update').toggleClass('notDisplay')
              break
          case 'X':
              let elem= $(this).parent().siblings().parent()
              deletePersonQuery(elem.attr('index'))
              break
          case 'U':
            $(this).toggleClass('notDisplay')
            $(this).siblings('.edit').toggleClass('notDisplay')
              break
          default: 
              break
      }
  })

})
