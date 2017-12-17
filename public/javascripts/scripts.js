//navbar color change on scroll
$(document).ready(function(){
    $(window).scroll(function(){
        if($(window).scrollTop() > $(".header").height()){
            $(".navbar").css({"background-color":"white"});
            $(".navbar").css({"box-shadow":"0 8px 6px -6px"});            
            $("#icon").css({"color":"black"});               
            $(".nav-logo-white").css({"display":"none"})
            $(".nav-logo-black").css({"display":"inline"})      
        }
        else{
            $(".navbar").css({"background-color":"transparent"});
            $(".navbar").css({"box-shadow":"none"});
            $("#icon").css({"color":"white"});
            $(".nav-logo-white").css({"display":"inline"})     
            $(".nav-logo-black").css({"display":"none"}) 
            
        }
    })
})

//set position top
$(document).ready(function(){
    $(this).scrollTop(0);
});


//navbar button angle turn when clicked
$(document).ready(function(){
    var open = false;
    $(".navbar-toggler").click(function(){
        if(open){
            icon.className = 'fa fa-angle-down';  
          } else{
            icon.className = 'fa fa-angle-down open';
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