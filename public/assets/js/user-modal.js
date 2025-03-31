"use strict";
$(document).ready(function() {

        // must destroy previos incantations
        tinyMCE.remove();

        tinymce.init({
          selector: '#tinymceinput',
          height : 300,
          theme: "modern",
          menubar: false,
          plugins: "autosave print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",
      

        });

        $('#modal-form').validator();

        $('.select2').select2();

        $('.select2-icon').select2({
            templateResult: formatIcon,
            templateSelection: formatIcon
        });

        $('[data-toggle="tooltip"]').tooltip();


});

function formatIcon(icon) {
    if (!icon.id) { return icon.text; }
    var originalOption = icon.element;
    var $icon = $('<span></span>').append($('<i style="color:' + $(originalOption).data('color') + '" class="' + $(originalOption).data('icon') + '"></i>') ).append(icon.text);
    return $icon;
}