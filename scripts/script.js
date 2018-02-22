$(document).ready(function(){
    //INI-----------------------------------------------// 
    var city, days, name, email, room, guest, comment;
    var userName;
     $("#selection").hide();
     $("#paises").hide();
     $("#searchForm").hide();
     //COOKIES------------------------------------------//
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,null,-1);
    }
     //$(".s1").hide();
     $(".s2").hide();
     $(".s3").hide();
     $(".s4").hide();
     $(".s5").hide();
     //COOKIES DIV-------------------------------------------//
    
     $("#cookies").click(function(e){
         e.preventDefault();
         $(this).fadeOut(500);                
    });
    //POINTER HOVER-----------------------------------------------// 
     $("#paises li,.buttonDays,.buttonBookInput,.buttonImages,.button").hover(function() {
            $(this).css('cursor','pointer');
     });
    //SHOW CALENDAR----------------------------------------------//
    $("#aCalendar").click(function(e){
         $(".s2").fadeIn(500);
    });
    //SHOW CONTACT----------------------------------------------//
    $("#aContact").click(function(e){
         $(".s5").fadeIn(500);
    });
    //SHOW CITY----------------------------------------------//
    $("#title").click(function(e){
         $(".s1").fadeIn(500);
         $(".s2").fadeOut(500);
         $(".s3").fadeOut(500);
         $(".s4").fadeOut(500);
         $(".s5").fadeOut(500);
    });
    //NAME------------------------------------------------//
     if (readCookie('userName') === null) {
         $(".inName").focus(function(){
            $(this).addClass('focus');
                $(".inName").keypress(function(e) {
                    if(e.which == 13) {
                        userName = " "+$(".inName").val();
                        createCookie("userName",userName,1);
                        var itemAppend = $('<span style="font-weight: bold; color:rgb(0, 153, 0);">'+userName+'</span>!').hide().fadeIn(600);
                        $("#nameForm").fadeOut(500);
                        $("#title").append(itemAppend);
                        $("#searchForm").delay(1000).fadeIn(500);
                    }
                });
         });     
     }else{ 
        $("#nameForm").hide();
        $("#searchForm").show();
        var un = readCookie("userName");
        var itemAppend = $('<span style="font-weight: bold; color:rgb(0, 153, 0);">'+' '+un+'</span>!').hide().fadeIn(600);
        $("#title").append(itemAppend);
     }
     
    //CITY-----------------------------------------------// 
     $(".inSearch").focus(function(){
        $("#paises").fadeIn(2000);
        $(this).addClass('focus');
        $('#paises li').click(function(){
            city = $(this).text();
            $(".inSearch").val(city);
            $("#paises").fadeOut(900);
            $(".s2").fadeIn(2000);
            $("html,body").delay(1200).animate({ scrollTop : $(".s2").offset().top  }, 1500 );
        });
    });
    $(".inSearch,.inName").focusout(function(){
        $(this).removeClass('focus');
        $("#paises").fadeOut(400);
    });
    //DAYS-----------------------------------------------// 
     $(".curr td").click(function(){
        $(this).addClass("select"); 
        $("#selection").append("<li class='selectDay'>" + $(this).text()+"</li>");
    });
    $("#formDays .buttonDays").click(function(e){
        e.preventDefault();
        days = document.getElementsByClassName("selectDay");
    //Form Jquery-----------------------------------------------//  
        $("#content h2").css("color" , 'green');
        $("#cal").animate({'opacity': '0.4'},"slow");
        $("#formDays .buttonDays").fadeOut(500);
        $(".s3").fadeIn(2000);
        $("html,body").delay(1500).animate({ scrollTop : $(".s3").offset().top  }, 1500 );
    });
    //Form FOCUS-----------------------------------------------// 
    $(".textBook").focus(function(){
        $(this).addClass('focusForm', 500, "linear");
    });
    $(".textBook").focusout(function(){
        $(this).removeClass('focusForm', 500, "linear");
    });
    $("#formBook .buttonBook").click(function(e){
        e.preventDefault();
        var correct = true;
        email = $("#emailBook").val();
        var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
        if($("#nameBook").val().length < 2 ){
            correct = false;
        }else{
            createCookie("name",name,1);
            name = $("#nameBook").val();
        }
        if(!expresion.test(email)){
            correct = false;
        }else{
            createCookie("email",email,1);
            email = $("#emailBook").val();
        }
        room = $("#roomBook").val();
        guest = $("#guest").val();
        comment = $("#commentBook").val();
        if(!correct){
            alert("Some fields are not correct, check them again");
        }else{
        //BOOKING Jquery-----------------------------------------------//  
            $("#content h2").css("color" , '#80ff80');
            $(".s3").animate({'opacity': '0.3'},"slow");
            $("#formBook .buttonBook").fadeOut(500);
            $(".s3").delay(100).queue(function (next) {
                $(".s1").fadeOut(1500);
                $(".s2").fadeOut(1500);
                $(this).fadeOut(1500);
                $(".s4").delay(1500).fadeIn(2000);
                $(".s5").delay(2000).fadeIn(2000);
                    $("#cityBooking").append(city+'!');
                    $("#buttonBooking").append(city+'!');
                    $("#datesBooking").append(days);
                    $("#nameBooking").append(name);
                    $("#emailBooking").append(email);
                    $("#roomBooking").append(room);
                    $("#guestBooking").append(guest);
                    $("#commentBooking").append(comment);
                next();
            });
        }
    });
    //PHOTO API-------------------------------//
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
     $('.buttonImages').click(function (evt) {
        evt.preventDefault();
         $(this).fadeOut(500);
        $(".s4").animate({height: "1750px"},1500);
        $('#photos').html('');
        $.getJSON(flickerAPI, {
            tags: city,
            format: "json",
          },
        function(data){
          var images = '';
          if (data.items.length > 0) {
            $.each(data.items,function(i,photo) {
              images += '<li>';
              images += '<img src="' + photo.media.m + '"></li>';
            });
          } else {
            images = "<p>No photos found that match: " + city + ".</p>"
          }
          $('#photos').html(images);
        }); 

      });
    //Scroll----------------------------------//
        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();
            var target = this.hash;
            var $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
                 }, 1000, 'swing', function () {
                    window.location.hash = target; });
        });
    //GO UP SCROLL --------------------------------------------//
         $('.goUp').click(function () {
             $('html,body').animate({ scrollTop: 0 }, 1000);
         });
         $(window).on('scroll', function () {
            if($(window).scrollTop() > 70 ){
                $('.goUp').addClass("in").removeClass("out");
            }else{
                $('.goUp').addClass("out").removeClass("in");
            }
        });
        $(window).trigger('scroll');
     //Form AJAX----------------------------------//
       $(".buttonContact").click(function(e){
            e.preventDefault();
            var name = $("#name").val();
                email = $("#email").val();
                subject = $("#subject").val();
                message = $("#message").val();
            var datos = 'name='+ name + '&email=' + email + '&subject=' + subject + '&message=' + message;
                $.ajax({
                    url: 'scripts/send.php',
                    type: "POST",
                    data: datos,
                    success: function() {
                    //Form Jquery-----------------------------------------------//    
                        $("#contactTitle").animate({'color': 'green'},"slow");
                        $("#form1").animate({'opacity': '0.1'},"slow");
                        $(".buttonContact").fadeOut(500);
                        $('#contacto').delay(650).queue(function (next) {
                            $("#form1")[0].reset();
                            var item = $('<div id="enviado"><h10>Your mail has been sent <span style="font-weight: bold; color:rgb(0, 153, 0);">satisfactorily</span>!</h10></div>').hide().fadeIn(600);
                            $(this).append(item);
                            
                            $('#enviado').delay(1000).queue(function (next) {
                                $(this).fadeOut(500);
                                $("#enviado").delay(500).queue(function (next) {
                                    $(this).remove();
                                    next();
                                 });
                                $("#form1").fadeIn(500).animate({'opacity': '1'},"slow");
                                $(".buttonContact").delay(800).queue(function (next) {
                                        $(this).fadeIn(500);
                                        next();
                            });
    
                                next();
                            });
                            next();
                        });
                    }
                });  
       });
     //----------------------------------//
    
});