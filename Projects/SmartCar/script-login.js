$(".input_text").focus(function(){
    $(this).prev('.fa').addClass('glowIcon')
})
$(".input_text").focusout(function(){
    $(this).prev('.fa').removeClass('glowIcon')
})

$("#login_button").click(function(){
    // Here you can perform your POST request using AJAX or any other method.
    // For example, using jQuery AJAX:
    $.ajax({
        type: "POST",
        url: "login.php",
        data: {
            // You can include data to be sent to the server here.
            // For example, if you want to send the value of the input with class "input_text":
            input_text_value: $(".input_text").val()
        },
        success: function(response){
            // Handle the response from the server if needed.
            console.log(response);
        }
    });
});