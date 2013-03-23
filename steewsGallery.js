(function($){
	$.fn.stGallery = function(opts){
            SGoptions.elementClass = ( isset( opts.elementClass ) ) ? opts.elementClass: "";
            SGoptions.triggerID = ( isset( opts.triggerID ) ) ? opts.triggerID: "";
            SGoptions.pathAttribute = ( isset( opts.pathAttribute ) ) ? opts.pathAttribute: "href";
            SGoptions.cssPath = ( isset( opts.cssPath ) ) ? opts.cssPath: "js/steewsgallery/steewsGallery.css";
            init();
	}
        var SGoptions = {
            elementClass: "",
            triggerID: "",
            pathAttribute: "href",
            cssPath: "js/steewsgallery/steewsGallery.css"
        };
        var arrImgs;
        var currPic = 0;
        var SGImageContainer;
        var SGControls;
        var changingSlide = false;
        var SGShowRoom;
        
	function init(){
            arrImgs = $("." + SGoptions.elementClass);
            if( arrImgs.length > 0 ){
                SGShowRoom = $("<div id='sg-show-room'></div>");
                var SGOverlay = $("<div id='sg-overlay'></div>");
                SGImageContainer = $("<div id='sg-image-container'></div>");
                SGControls = $("<div id='sg-controls-container'><div class='sg-controls' id='sg-left'></div><div class='sg-controls' id='sg-right'></div></div>");
                var SGCss = $("<link href='" + SGoptions.cssPath + "' rel='stylesheet'>");

                SGImageContainer.append(SGControls);
                SGImageContainer.append("<img alt='Steews Gallery' src=''/>");
                SGOverlay.append(SGImageContainer);
                SGShowRoom.append(SGOverlay);

                SGShowRoom.hide();
                if( $("#sg-show-room").length > 0 ){
                    $("#sg-show-room").remove();
                }else{
                    $("body").prepend(SGCss);
                }
                $("body").prepend(SGShowRoom);    

                $( "#" + SGoptions.triggerID ).live("click", function(e){
                    e.preventDefault();
                    currPic = 0;
                    checkHeights();
                    SGShowRoom.fadeIn("slow", function(){
                       if( arrImgs.length == 1 ){
                            $("#sg-left").hide();
                            $("#sg-right").hide();
                        }else{
                            $("#sg-right").show();
                        }
                        loadImage(); 
                    });
                });
                $(SGShowRoom).click(function(e){
                    if( changingSlide == false ){
                        SGShowRoom.fadeOut("slow");
                    }
                });
                $(SGControls).children().each(function(){
                    $(this).click( changeSlide );
                });
            }
        };
        function isset(what){
            if( typeof what !== "undefined" ){
                if( what !== null ){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
            
        };
        function checkHeights(){
            SGShowRoom.css("height", $("body").css("height"));
            var curIMg = $(SGImageContainer).children("img").first();
            SGShowRoom.height = curIMg.height;
            $("body").css("height", $(SGShowRoom).css("height"));
            if( $("#sg-overlay").height() < $("#sg-image-container").height() ){
                $("#sg-overlay").height( $("#sg-image-container").height() );
            }
        }
        function loadImage(){
            if( currPic == arrImgs.length - 1 ){
                $("#sg-right").hide();
                if( arrImgs.length > 1 ){
                    $("#sg-left").show();                    
                }
            }else if( currPic == 0 ){
                $("#sg-left").hide();
                if( arrImgs.length > 1 ){
                    $("#sg-right").show();
                }
            }else{
                $("#sg-left").show();
                $("#sg-right").show();
            }
            var currImg = $(SGImageContainer).children("img").first();
            
            currImg.fadeOut("slow", function(){
                currImg.attr("src", $(arrImgs[currPic]).html() ).load( function() {
                    $(SGControls).removeClass("loading");
                    currImg.fadeIn("slow");
                    checkHeights();
                    changingSlide = false;
                });
            });
        }
        function changeSlide(){
            if( changingSlide == false ){
                changingSlide = true;
                $(SGControls).addClass("loading");
                $(SGImageContainer).children("img").first().attr("src", '' );
                if( $(this).attr("id") == "sg-right" ){
                    if( currPic < arrImgs.length - 1 ){
                        currPic++;
                        loadImage();
                    }
                }else{
                    if( currPic > 0 ){
                        currPic--;
                        loadImage();
                    }
                }
            }
        }
})(jQuery);