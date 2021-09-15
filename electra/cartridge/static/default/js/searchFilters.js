$(function() {
    console.log( "The DOM is now loaded and can be manipulated." );
    

    $('body').on('click', '[data-toggle="search-collapse"]', function () {
        const name = $(this).attr('data-target');
        $('#' + name).slideToggle();
    });
});