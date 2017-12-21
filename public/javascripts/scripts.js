var open = false;
//set position top
$(document).ready(function(){
    $(this).scrollTop(0);
});


//navbar button angle turn when clicked
$(document).ready(function(){

    $(".navbar-toggler").click(function(){
        if(open){
            icon.className = 'fa fa-angle-down align-middle';
        } else{
            icon.className = 'fa fa-angle-down open align-middle';
        }          
        open = !open;       
    })
})



//alert dynamic position
$(document).ready(function(){    
    $('.alert').css('top', $('.navbar').outerHeight());
})

$(document).ready(function () {

window.setTimeout(function() {
    $(".alert").alert('close')
}, 2000);

});