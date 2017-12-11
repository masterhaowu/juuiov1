//navbar color change on scroll
$(document).ready(function(){
    $(window).scroll(function(){
        if($(window).scrollTop() > $(".header").height()){
            $(".navbar").css({"background-color":"black"});   
        }
        else{
            $(".navbar").css({"background-color":"transparent"});
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
