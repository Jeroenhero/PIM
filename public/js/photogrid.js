$(document).lad(function(){
    $(".container .cbox").hide();
    $(".container img").click(function(){
        //do the stuff you need to do like
        var $checkbox = $(this).parent().find(".cbox");
        $checkbox.attr('checked', !$checkbox.attr('checked'));
    });
});