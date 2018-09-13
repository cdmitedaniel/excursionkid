function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            //console.log(e.target.result);

            //$('#'+id).attr('src', e.target.result);
            //$('#'+id).attr('value', e.target.result);
            $('#'+id).attr('src', e.target.result);
            $('#'+id+'_').attr('value', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

if($('#file_pregunta_1_img').length) {
    $("#file_pregunta_1_img").change(function(){
        readURL(this, "pregunta_1_img", true);
    });
}
if($('#file_pregunta_2_img').length) {
    $("#file_pregunta_2_img").change(function(){
        readURL(this, "pregunta_2_img", true);
    });
}
if($('#file_pregunta_3_img').length) {
    $("#file_pregunta_3_img").change(function(){
        readURL(this, "pregunta_3_img", true);
    });
}
if($('#file_pregunta_4_img').length) {
    $("#file_pregunta_4_img").change(function(){
        readURL(this, "pregunta_4_img", true);
    });
}

