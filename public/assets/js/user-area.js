"use strict";
$(document).ready(function() {

    tinymce.init({
        selector: '#tinymceinput',
        height : 500,
        theme: "modern",
        menubar: false,
        plugins: "autosave print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help",

    });

    

});