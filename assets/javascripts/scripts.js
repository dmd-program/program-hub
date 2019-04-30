//
// Foundation-Jekyll - Javascripts
// Author: @aaronkwhite
//

// Init Foundation
$(document).foundation();

(function($){

    var $doc = $(document),
        $win = $(window);

    $win.on('load', function(){
        // document is fully loaded

        // https://dimsemenov.com/plugins/magnific-popup/documentation.html
       $('.image-popup').magnificPopup({type:'image'});
       
        
        $( "#pathway-accordion li.accordion-group-tab, #curriculum-accordion li.accordion-group-tab" ).click(function(){

            var $container = $('.courseContainer');

                $container.isotope({
                    filter: '*',
                    layoutMode: 'fitRows',
                    itemSelector: '.course-item',
                    stagger: 30
                });


                $('#courseFilter a').click(function(){
                $('#courseFilter .current').removeClass('current');
                $(this).addClass('current');
         
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector
                 });
                 return false;
            }); 
        });
    });
    
})(jQuery);
