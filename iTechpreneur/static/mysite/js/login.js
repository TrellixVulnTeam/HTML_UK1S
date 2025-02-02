function validateEmail(sEmail) 
{
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (filter.test(sEmail)) 
  {
      return true;
  }
  else 
  {
      return false;
  }
}

// $(document).ready(function () {
//    $('input[type=text]').on('keypress', function(e) {
//       if (e.which == 32)
//       {
//         console.log('no space')
//         return false;
//       }
//   });
// });

$(document).ready(function () {
$('#email').keypress(function( e ) {
       if(e.which === 32) 
         return false;
    });
$('#password').keypress(function( e ) {
       if(e.which === 32) 
         return false;
    });
});

$(document).on('click','#login_btn',function(e){  
  $('.loader').fadeOut(1500);
  var username = $('#email').val();
  var password = $('#password').val();
  var token = $('input[name="csrfmiddlewaretoken"]').val();
  username = username.trim()

  if( username.length != 0 && password.length!= 0 ){
      
      $(this).addClass("active");
      $(this).removeClass("btn-yellow");
      $('.processing').css('display', 'block');
  }
 



 if(username.length == 0)
  {
    $("#email_error").text('Email is required.');
    document.getElementById("email_error").style.color = "red";
    return false;
  }
  else
  {
    if(validateEmail(username))
    {
      console.log('valid email');
      $("#email_error").text('');
    }
    else
    {
      $("#email_error").text('Enter valid email.');
      document.getElementById("email_error").style.color = "red";
      return false;
    }
  }


 if(password.length == 0)
  {
    $("#password_error").text('Password is required.');
      document.getElementById("password_error").style.color = "red";
    return false; 
  }
else
{
  $("#password_error").text('');
}





  console.log('before ajax');

  $.ajax({
    url: '/login/',
    type: "POST",
    data: {'username':username,'password':password,'csrfmiddlewaretoken':token},
    dataType: 'json',
    cache: false,
    success: function(response){
      console.log("This ajax response :",response)
    
      
     if(response =='0')
    {

      $("#response_error").text('Admin cannot login here.');
      document.getElementById("response_error").style.color = "red";
      return false; 
      
    }
    if (response == '1')
    {

       window.location.href='/existing-dashboard/';
    }
    if (response == '2')
    {
       window.location.href='/future-dashboard/';
    }
    if (response == '3')
    {
       window.location.href='/teacher-dashboard/';
    }
    if(response == '4')
    {
      console.log(response)
      window.location.href='/employee-dashboard/';
    }
   if(response == '6')
    {
      
      $("#response_error").text('Email or Password is wrong.');
      document.getElementById("response_error").style.color = "red";
      $('.processing').css('display', 'none');

      $('#login_btn').removeClass("active");
      $('#login_btn').addClass("btn-yellow");
      return false;
    }
    if(response=='7')
    {
      $("#response_error").text('Your Email or Password is Incorrect');
      document.getElementById("response_error").style.color = "red";
      $('.processing').css('display', 'none');
      $('#login_btn').removeClass("active");
      $('#login_btn').addClass("btn-yellow");
      return false;
    }  
    }
  });

});

$(document).ready(function () {
  
     
  $('[data-toggle="tooltip"]').tooltip();   
  $('#password').keypress(function (e) {
    if (e.keyCode == 13)
    {
      $('#login_btn').click();
    }
  });
});
