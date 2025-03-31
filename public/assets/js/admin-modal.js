"use strict";
$(document).ready(function() {

        // destroy previos tinyMCE incantations
        tinyMCE.remove();

        $('#modal-form').validator();

        $('.select2').select2();

        $('.select2-icon').select2({
            templateResult: formatIcon,
            templateSelection: formatIcon
        });

        $('#colorpicker').colorpicker();
        $('#colorpicker2').colorpicker();
        $('[data-toggle="tooltip"]').tooltip();
        
        
        $(".asset-new-location").on('click',  function() {
            $("#new_location").slideToggle();
            $("#location_id").val("0").trigger("change");
        });


        $(".asset-new-status").on('click', function() {
            $("#new_status").slideToggle();$("#status_id").val("0").trigger("change");
        });

        $(".asset-new-asset-category").on('click', function() {
            $("#new_asset_category").slideToggle();$("#category_id").val("0").trigger("change");
        });

        $(".asset-new-supplier").on('click', function() {
            $("#new_supplier").slideToggle();$("#supplier_id").val("0").trigger("change");
        });

        $(".asset-new-manufacturer").on('click', function() {
            $("#new_manufacturer").slideToggle();$("#manufacturer_id").val("0").trigger("change");
        });


        $(".asset-new-model").on('click', function() {
            $("#new_model").slideToggle();$("#model_id").val("0").trigger("change");
        });

        


        $(".license-new-status").on('click', function() {
            $("#new_status").slideToggle();$("#status_id").val("0").trigger("change");
        });

        $(".license-new-asset-category").on('click', function() {
            $("#new_asset_category").slideToggle();$("#category_id").val("0").trigger("change");
        });

        $(".license-new-supplier").on('click', function() {
            $("#new_supplier").slideToggle();$("#supplier_id").val("0").trigger("change");
        });



        

});

function formatIcon(icon) {
    if (!icon.id) { return icon.text; }
    var originalOption = icon.element;
    var $icon = $('<span></span>').append($('<i class="' + $(originalOption).data('icon') + '"></i>') ).append(icon.text);
    return $icon;
}