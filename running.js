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

function viewDepartments(){
   
   return $.get( "http://localhost:8001/query?a=SELECT * FROM `all_departments` ", function( data ) {
      var temp = $.trim($('#dataRowDep').html())
      $.each(data, function(index, obj) {
      var x = temp.replace(/{{emp_no}}/ig, obj.emp_no)
      .replace(/{{first_name}}/ig, obj.first_name)
      .replace(/{{last_name}}/ig, obj.last_name)
      .replace(/{{dep}}/ig, obj.dept_name)
      .replace(/{{title}}/ig, obj.title)
      .replace(/{{salary}}/ig, obj.salary)
      $('#tBodyDept').append(x)
   })
   },"json");
   }



function addPersonQuery(b_date, f_name, l_name, gender, h_date) {
   var finalQuery = String.raw`INSERT INTO employees (birth_date,first_name,last_name,gender,hire_date) VALUES ('${b_date}','${f_name}','${l_name}','${gender}','${h_date}')`;
   return $.get( "http://localhost:8001/insert?query=" + finalQuery)
}

function updatePersonQuery(b_date, f_name, l_name, gender, h_date,emp_no) {
   var finalQuery = String.raw`UPDATE employees SET birth_date = '${b_date}',first_name = '${f_name}',last_name = '${l_name}',gender = '${gender}',hire_date = '${h_date}' WHERE emp_no = '${emp_no}'`;
   return $.get( "http://localhost:8001/insert?query=" + finalQuery)
}

function updateDeptPersonQuery(emp_no,f_name, l_name,dept_name,title,salary) {
var finalQuery = String.raw`UPDATE employees SET first_name = '${f_name}',last_name = '${l_name}',dept_name = '${dept_name}',title = '${title}',salary = '${salary}' WHERE emp_no = '${emp_no}'`;
   return $.get( "http://localhost:8001/insert?query=" + finalQuery)
}


$(document).ready(function() {
   //Home page
   $('#logo').on('click', function(event) {
      if(!$('#table').hasClass('notDisplay'))
      {
         $('#table').addClass('notDisplay')
      }
      if(!$('#depTable').hasClass('notDisplay'))
      {
         $('#depTable').addClass('notDisplay')
      }
      if (!$('#side').hasClass('notDisplay')) 
      {
         $('#side').addClass('notDisplay')
      }
   })

   //Show employees
   $('.tab').on('click', function(event) {
       event.stopPropagation()
       event.stopImmediatePropagation()
       //console.log('I clicked ', $(this)[0].value)
       switch(this.name) {
         case 'employees':
            $('#tBody').empty()
            if($('#table').hasClass('notDisplay'))
            {
               $('#table').removeClass('notDisplay')
            }
            if(!$('#depTable').hasClass('notDisplay'))
            {
               $('#depTable').addClass('notDisplay')
            }
            if (!$('#side').hasClass('notDisplay')) {
               $('#side').addClass('notDisplay')
            }
            loadEmployees()
            break
         case 'departments':
            if ($('#side').hasClass('notDisplay')) {
               $('#side').removeClass('notDisplay')
            }
            if (!$('#table').hasClass('notDisplay')) {
               $('#table').addClass('notDisplay')
            }
            if ($('#depTable').hasClass('notDisplay')) {
               $('#depTable').removeClass('notDisplay')
            }
            viewDepartments()
            
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
      addPersonQuery(b_date, f_name, l_name, gender, h_date).promise().then(
         (data) => {
            const result = searchPerson(b_date, f_name, l_name, gender, h_date)
            result.promise().then(
               (res) => {
                  console.log('data after add ',res)
                  let info = JSON.parse(res)[0]
                  fillTemplate(info)
               }
            )
            
            // console.log('data after add ', searchPerson(info.b_date, info.f_name, info.l_name, info.gender, info.h_date))
            // let info = JSON.parse(searchPerson(info.b_date, info.f_name, info.l_name, info.gender, info.h_date))[0]
            // fillTemplate(info)
            // console.log("SEARCHPERSON (data)[0]:",JSON.parse(data)[0]);
            // console.log("SEARCHPERSON JSON.parse(data):",JSON.parse(data));
            }, () => {
               console.log("addperson: error")
            }
      )
   })
   //Update Employee




   $('#tBody, #tBodyDept').on('click', 'input', function(event) {
      event.stopPropagation()
      event.stopImmediatePropagation()
      switch($(this)[0].value) {
          case 'E':
              let siblings = $(this).parent().siblings()
              console.log(siblings,$(this)[0].value)
              $.each(siblings, ((index, item) => {
                  $(item).attr('contenteditable', 'true')
              }))
              $(this).toggleClass('notDisplay')
              $(this).siblings('.update').toggleClass('notDisplay')
              break
          case 'X':
              let elem1= $(this).parent().siblings().parent()
              deletePersonQuery(elem1.attr('index'))
              break
          case 'U':
            $(this).toggleClass('notDisplay')
            $(this).siblings('.edit').toggleClass('notDisplay')
            let elem= $(this).parent().siblings()
            console.log('elem:',elem)
            console.log('elem0:',elem[0])
            if($(elem).parent().parent().parent().attr('id') === 'table'){
               var b_date = $(elem[0]).text()
               var f_name = $(elem[1]).text()
               var l_name = $(elem[2]).text()
               var gender = $(elem[3]).text()
               var h_date = $(elem[4]).text()
               var emp_no = elem.parent().attr('index')
               updatePersonQuery(b_date,f_name,l_name,gender,h_date,emp_no).promise().then(
                  () => {
                     $.each(elem, ((index, item) => {
                        $(item).attr('contenteditable', 'false')
                  }))
                  },()=> {console.log('error on update')}
               )
            }else if($(elem).parent().parent().parent().attr('id') === 'depTable'){
               var first_name = $(elem[0]).text()
               var last_name = $(elem[1]).text()
               var dept_name = $(elem[2]).text()
               var title = $(elem[3]).text()
               var salary = $(elem[4]).text()
               var emp_no = elem.parent().attr('index')
               updateDeptPersonQuery(emp_no,first_name,last_name,dept_name,title,salary).promise().then(
                  () => {
                     $.each(elem, ((index, item) => {
                        $(item).attr('contenteditable', 'false')
                     console.log('updatedept: ',item)
                  }))
                  },()=> {console.log('error on update')}
               )
            }
              break
          default: 
              break
      }
  })

})
