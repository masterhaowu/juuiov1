
//set position top
$(document).ready(function(){
    $(this).scrollTop(0);
});


//alert dynamic position
$(document).ready(function(){    
    $('.alert').css('top', $('.navbar').outerHeight());
})

$(document).ready(function () {

window.setTimeout(function() {
    $(".alert").alert('close')
}, 2000);

});

//show reset modal
$(document).ready(function() {

    if(window.location.href.indexOf('#resetYourPasswordModal') != -1) {
      $('#resetYourPasswordModal').modal('show');
    }
  
});
  

//stop add-property button going to footer
$(document).ready(function() {

    $(window).scroll(function(){
        if($('#add-property').offset().top + $('#add-property').height() >= $('.footer').offset().top - 60){
            $('#add-property').css('color', 'red');
        }


        else{            
            $('#add-property').css('color', 'blue'); 
        }   

    }
}
