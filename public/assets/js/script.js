"use strict";
$(document).ready(function() {





    $(document).on('click', '.btn-remove', function(e)
    {
        $(this).parents('.entry:first').remove();
        update_totals();
        e.preventDefault();
        return false;
    });



    $(document).on('click', '.btn-add-manually', function(e)
    {
        var last_line_name = $('.entries:last').find('#item_name:last').val();
        var last_line_value = parseFloat($('.entries:last').find('#item_value:last').val());

        // add new blank line
        var controlForm = $('.controls .entries:first');
        var templateEntry = $('.templateEntry:first');
        var newEntry = $(templateEntry.clone()).appendTo(controlForm);
        newEntry.removeClass('hidden').removeClass('templateEntry').addClass('entry');

        var totals_value = parseFloat($('#totals_value').val());
        var manual_type_select = $('#manual_type').val();

        if(manual_type_select == "Discount") {
            // populate entry
            $('.entries:last').find('#text_item_name:last').text('Discount');
            $('.entries:last').find('#text_item_type:last').text('Discount');
            $('.entries:last').find('#item_id:last').val("0");
            $('.entries:last').find('#item_type:last').val('Discount');
            $('.entries:last').find('#item_name:last').val('Discount');
            $('.entries:last').find('#item_description:last').val($('#manual_description').val());
            $('.entries:last').find('#item_taxrate:last').val($('#manual_taxrate').val());

            $('.entries:last').find('#item_qty:last').val("1");
            $('.entries:last').find('#item_price:last').val("-"+$('#manual_name').val());
        } else if(manual_type_select == "Discount_all") {
            // populate entry

            var discount = parseFloat($('#manual_name').val()).toFixed(2);
            var discount_value = totals_value - (totals_value * ((100 - discount) / 100));


            $('.entries:last').find('#text_item_name:last').text('Discount ' + discount + '%');
            $('.entries:last').find('#text_item_type:last').text('Discount');
            $('.entries:last').find('#item_id:last').val("0");
            $('.entries:last').find('#item_type:last').val('Discount');
            $('.entries:last').find('#item_name:last').val('Discount ' + discount + '%');
            $('.entries:last').find('#item_description:last').val($('#manual_description').val());
            $('.entries:last').find('#item_taxrate:last').val($('#manual_taxrate').val());

            $('.entries:last').find('#item_qty:last').val("1");
            $('.entries:last').find('#item_price:last').val("-" + discount_value.toFixed(2));
        } else if(manual_type_select == "Discount_last") {
            // populate entry

            var discount = parseFloat($('#manual_name').val()).toFixed(2);
            var discount_value = last_line_value - (last_line_value * ((100 - discount) / 100));


            $('.entries:last').find('#text_item_name:last').text('Discount ' + discount + '% ' + last_line_name);
            $('.entries:last').find('#text_item_type:last').text('Discount');
            $('.entries:last').find('#item_id:last').val("0");
            $('.entries:last').find('#item_type:last').val('Discount');
            $('.entries:last').find('#item_name:last').val('Discount ' + discount + '% ' + last_line_name);
            $('.entries:last').find('#item_description:last').val($('#manual_description').val());
            $('.entries:last').find('#item_taxrate:last').val($('#manual_taxrate').val());

            $('.entries:last').find('#item_qty:last').val("1");
            $('.entries:last').find('#item_price:last').val("-" + discount_value.toFixed(2));
        } else {
            // populate entry
            $('.entries:last').find('#text_item_name:last').text($('#manual_name').val());
            $('.entries:last').find('#text_item_type:last').text($('#manual_type').val());
            $('.entries:last').find('#item_id:last').val("0");
            $('.entries:last').find('#item_type:last').val($('#manual_type').val());
            $('.entries:last').find('#item_name:last').val($('#manual_name').val());
            $('.entries:last').find('#item_description:last').val($('#manual_description').val());
            $('.entries:last').find('#item_taxrate:last').val($('#manual_taxrate').val());

            $('.entries:last').find('#item_qty:last').val("1");
            $('.entries:last').find('#item_price:last').val("0");
        }



        $('#manual_name').val("");
        $('#manual_description').val("");

        update_totals();
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        return false;
    });

    
    // initiate on page tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // initiate on page selects
    $('.select2').select2();

    $('.select2-icon').select2({
        templateResult: formatIcon,
        templateSelection: formatIcon
    });

    
    $('#colorpicker').colorpicker();


    // open modal
    $("[data-modal]").on('click', function() {
        var modal = $(this).attr("data-modal");
        show_modal(modal);
    });
   
    // prevent href trigger in jstree
    $(".jstree-anchor").on('click', function(e) {
        e.preventDefault();
    });

    // navigate to link
    $("[data-navigate]").on('click', function() {
        var link = $(this).attr("data-navigate");
        window.location.href = link;  
    });
    
    // open modal from datatables
    $("#DataTables-SS").on('click', '[data-modal]', function() {
        var modal = $(this).attr("data-modal");
        show_modal(modal);
    });

    // submit form on change
    $(".onchange-submit").on('change', function() {
        $(this).parents("form").submit();
    });

    //update totals on change
    $(".entries").on('change', '.onchange-update-totals', function() {
        update_totals();
    });


    //go back
    $(".go-back").on('click', function() {
        window.history.back();
    });

    //go fullscreen
    $(".go-fullscreen").on('click', function() {
        javascript:toggleFullScreen();
    });






    // card js start
    $(".card-header-right .close-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').animate({
            'opacity': '0',
            '-webkit-transform': 'scale3d(.3, .3, .3)',
            'transform': 'scale3d(.3, .3, .3)'
        });

        setTimeout(function() {
            $this.parents('.card').remove();
        }, 800);
    });


    $(".card-header-right .reload-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').addClass("card-load");
        $this.parents('.card').append('<div class="card-loader"><i class="feather icon-radio rotate-refresh"></div>');
        setTimeout(function() {
            $this.parents('.card').children(".card-loader").remove();
            $this.parents('.card').removeClass("card-load");
        }, 3000);
    });


    $(".card-header-right .card-option .open-card-option").on('click', function() {
        var $this = $(this);
        if ($this.hasClass('icon-x')) {
            $this.parents('.card-option').animate({
                'width': '30px',
            });
            $this.parents('.card-option').children('li').children(".open-card-option").removeClass("icon-x").fadeIn('slow');
            $this.parents('.card-option').children('li').children(".open-card-option").addClass("icon-chevron-left").fadeIn('slow');
            $this.parents('.card-option').children(".first-opt").fadeIn();
        } else {
            $this.parents('.card-option').animate({
                'width': '130px',
            });
            $this.parents('.card-option').children('li').children(".open-card-option").addClass("icon-x").fadeIn('slow');
            $this.parents('.card-option').children('li').children(".open-card-option").removeClass("icon-chevron-left").fadeIn('slow');
            $this.parents('.card-option').children(".first-opt").fadeOut();
        }
    });



    $(".card-header-right .minimize-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        var card = $(port).children('.card-block').slideToggle();
        $(this).toggleClass("icon-minus").fadeIn('slow');
        $(this).toggleClass("icon-plus").fadeIn('slow');
    });



    $(".card-header-right .full-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        port.toggleClass("full-card");
        $(this).toggleClass("icon-minimize");
        $(this).toggleClass("icon-maximize");
    });


    $("#more-details").on('click', function() {
        $(".more-details").slideToggle(500);
    });


    $(".mobile-options").on('click', function() {
        $(".navbar-container .nav-right").slideToggle('slow');
    });


    $(".search-btn").on('click', function() {
        $(".main-search").addClass('open');
        $('.main-search .form-control').animate({
            'width': '200px',
        });
    });


    $(".search-close").on('click', function() {
        $('.main-search .form-control').animate({
            'width': '0',
        });
        setTimeout(function() {
            $(".main-search").removeClass('open');
        }, 300);
    });


    // card js end
    $("#styleSelector .style-cont").slimScroll({
        setTop: "1px",
        height: "calc(100vh - 480px)",
    });


   
    $('[data-toggle="tooltip"]').tooltip();

    // wave effect js
    Waves.init();
    Waves.attach('.flat-buttons', ['waves-button']);
    Waves.attach('.float-buttons', ['waves-button', 'waves-float']);
    Waves.attach('.float-button-light', ['waves-button', 'waves-float', 'waves-light']);
    Waves.attach('.flat-buttons', ['waves-button', 'waves-float', 'waves-light', 'flat-buttons']);


    $('.form-control').on('blur', function() {
        if ($(this).val().length > 0) {
            $(this).addClass("fill");
        } else {
            $(this).removeClass("fill");
        }
    });


    $('.form-control').on('focus', function() {
        $(this).addClass("fill");
    });


    $('#mobile-collapse i').addClass('icon-toggle-right');


    $('#mobile-collapse').on('click', function() {
        $('#mobile-collapse i').toggleClass('icon-toggle-right');
        $('#mobile-collapse i').toggleClass('icon-toggle-left');
    });




});



$(document).ready(function() {
    var $window = $(window);

    $('.loader-bg').fadeOut();

});



function formatIcon(icon) {
    if (!icon.id) { return icon.text; }
    var originalOption = icon.element;
    var $icon = $('<span></span>').append($('<i style="color:' + $(originalOption).data('color') + '" class="' + $(originalOption).data('icon') + '"></i>') ).append(icon.text);
    return $icon;
}



// toggle full screen
function toggleFullScreen() {
    var a = $(window).height() - 10;

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
    $('.full-screen').toggleClass('icon-maximize');
    $('.full-screen').toggleClass('icon-minimize');
}


function update_totals() {
    var totals_value = 0;
    var totals_tax = 0;
    var totals_total = 0;

    $('.controls > tbody  > tr').each(function() {
        var qty = $(this).find('#item_qty').val();
        var price = $(this).find('#item_price').val();
        var taxrate = $(this).find('#item_taxrate').val();

        var rate =  ( parseFloat(taxrate) + 100 ) / 100 ;

        var value = parseFloat(qty * price).toFixed(2);
        var total = parseFloat(qty * price * rate).toFixed(2);
        var tax = parseFloat(total - value).toFixed(2);

        totals_value += parseFloat(value);
        totals_tax += parseFloat(tax);
        totals_total += parseFloat(total);

        $(this).find('#text_value').text(value);
        $(this).find('#text_vat').text(tax);
        $(this).find('#text_total').text(total);

        $(this).find('#item_value').val(value);
        $(this).find('#item_tax').val(tax);
        $(this).find('#item_total').val(total);
    });

    $('#text_totals_value').text( parseFloat(totals_value).toFixed(2) );
    $('#text_totals_tax').text( parseFloat(totals_tax).toFixed(2) );
    $('#text_totals_total').text( parseFloat(totals_total).toFixed(2) );

    $('#totals_value').val(parseFloat(totals_value).toFixed(2));
    $('#totals_tax').val(parseFloat(totals_tax).toFixed(2));
    $('#totals_total').val(parseFloat(totals_total).toFixed(2));
}


function update_incl_tax(event) {
    var item_price = $(this).closest('.entry').find(".item_price").val();
    var item_taxrate = $(this).closest('.entry').find(".item_taxrate").val();
    var item_price_incl_tax = $(this).val();

    if(item_taxrate == null) item_taxrate =19;

    var rate =  ( parseFloat(item_taxrate) + 100 ) / 100 ;
    var fl_item_price_incl_tax = parseFloat(item_price_incl_tax);

    var new_item_price = parseFloat(fl_item_price_incl_tax / rate).toFixed(4);

    $(this).closest('.entry').find(".item_price").val(new_item_price);

    update_totals();
}