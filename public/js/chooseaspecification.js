 
 $(document).ready(function(){

                var strspecname = localStorage.getItem("specname");
                var v_typespec = localStorage.getItem("typespec");
                var nDPI = localStorage.getItem("DPI");
                var currentdpinone = localStorage.getItem("dpinone");
                $('#specname').focus();
                if(strspecname !== null){
                    $("#specname").attr("value",strspecname);
                }
                if(nDPI !== null){
                    $("#depeis").attr("value",nDPI);
                }
                if (currentdpinone !== null){
                    if (currentdpinone === 'none'){
                        $('input:checkbox[name=dpinone]').prop('checked',true);
                    }
                    else{
                        $('input:checkbox[name=dpinone]').prop('checked',false);
                    }
                    desactAllNext();
                }
                if (v_typespec == 'free'){

                    desactForm('specForm');       

                }

                $('#buttonspec').click(function (ev) {
                    var imageselected = localStorage.getItem('imageselected');
                    if ($('#specname').val().trim() === ''){
                        alert("Favor de capturar el nombre de la especificación");    
                        $('#specname').focus();
                    }
                    else{

                          localStorage.setItem("specname", $('input:text[name=name]').val());
                          localStorage.setItem("format", $('select[name="format"]').val());
                          localStorage.setItem("colormode", $('select[name="colormode"]').val());
                          localStorage.setItem("background", $('select[name="background"]').val());
                          localStorage.setItem("backgrndcolor", $('#colorselect').val());
                          localStorage.setItem("dpinone","");
                          localStorage.removeItem("DPI");

                        
                          if($('input:checkbox[name=dpinone]').is(":checked")) {
                            localStorage.setItem("dpinone", $('input:checkbox[name=dpinone]').val());
                          }
                          else
                          {
                            localStorage.setItem("DPI", $('input:text[name=DPI]').val());
                          }
                          document.location.href="/chooseasize";
                    }
                    ev.preventDefault();
                });
               
                $("#background").change(function() {
                    if($("#background option:selected").text() ==='COLOR' ){
                        $('#colorselect').prop("disabled", false);
                      }
                    if($("#background option:selected").text() ==='BLANCO' ){
                        $('#colorselect').prop("value", '#FFFFFF');
                        $('#colorselect').prop("disabled", true);
                      }
                    if($("#background option:selected").text() ==='NEGRO' ){
                        $('#colorselect').prop("value", '#000000');
                        $('#colorselect').prop("disabled", true);
                      }
                    if($("#background option:selected").text() ==='SIN FONDO' ){
                        $('#colorselect').prop("value", '#E5E5E5');
                        $('#colorselect').prop("disabled", true);
                      }
                
                });
                $("#format").change(function() {

                      $('#sin_fondo').prop("disabled", false);
                      $('#mode_cmyk').prop("disabled", false);
                      if($("#format option:selected").text() ==='JPG' || $("#format option:selected").text() ==='JPG WEB' ){
                        $('#sin_fondo').prop("disabled", true);
                        $('#background').prop("value", 'blanco');
                        $('#colorselect').prop("value", '#ffffff');
                        $('#colorselect').prop("disabled", true);
                      }

                      if($("#format option:selected").text() ==='JPG WEB' || $("#format option:selected").text() ==='PNG' ){
                        localStorage.removeItem('clippingpath');
                        $('#mode_cmyk').prop("disabled", true);
                        $('#colormode').prop("value", 'rgb');
                       }
                  
                });

              function desactForm(formName){
                    $('#div_msgDemo').show();
                    $('#specname').prop('disabled',true);
               } 

//Script de los sliders RGB para cambiar el dispay de color

var input = document.querySelectorAll("input");

for(var i = 0; i < input.length; i++) {

    input[i].addEventListener("input", function() {

        var red = document.getElementById("red").value,
            green = document.getElementById("green").value,
            blue = document.getElementById("blue").value;

        var display = document.getElementById("display");
        displayRGB.style.background = "rgb(" + red + ", " + green + ", " + blue + ")";
    });
}
sliderChange(document.getElementById('red').value, 'sliderStatus');
sliderChange(document.getElementById('green').value, 'sliderStatus2');
sliderChange(document.getElementById('blue').value, 'sliderStatus3');

           


// Script de los Sliders CMYK para cambiar el display de color
var input = document.querySelectorAll("input");

for(var i = 0; i < input.length; i++) {

    input[i].addEventListener("input", function() {

        var cyan = document.getElementById("cyan").value,
            magenta = document.getElementById("magenta").value,
            yellow = document.getElementById("yellow").value;
            black = document.getElementById("black").value;

        var display = document.getElementById("display");

        c = cyan / 100;
		m = magenta / 100;
		y = yellow / 100;
		k = black / 100;
 
		var r = 1 - Math.min( 1, c * ( 1 - k ) + k );
		var g = 1 - Math.min( 1, m * ( 1 - k ) + k );
		var b = 1 - Math.min( 1, y * ( 1 - k ) + k );
 
		r = Math.round( r * 255 );
		g = Math.round( g * 255 );
		b = Math.round( b * 255 );

       displayCMYK.style.background = "rgb(" + r + ", " + g + ", " + b + ")";
    });
}
sliderChange(document.getElementById('cyan').value, 'sliderStatus4');
sliderChange(document.getElementById('magenta').value, 'sliderStatus5');
sliderChange(document.getElementById('yellow').value, 'sliderStatus6');
sliderChange(document.getElementById('black').value, 'sliderStatus7');



 });



       //Script de los Sliders RGB para mostrar los SPAN
       function sliderChange(value, element) {
    var valHex1;
    var valHex2 = '';
    var valHex3 = '';        

    document.getElementById(element).innerHTML = value;
    valHex1 = document.getElementById('sliderStatus').innerHTML;
    valHex2 = document.getElementById('sliderStatus2').innerHTML;
    valHex3 = document.getElementById('sliderStatus3').innerHTML;
    document.getElementById('valHex').innerHTML = '#' + dec2hex(valHex1) + dec2hex(valHex2) + dec2hex(valHex3);

}

function dec2hex(d) {
     return  String('00' + (+d).toString(16).toUpperCase()).slice(-2) ; 
}


 //Script de los Sliders CMYK para mostrar los SPAN
       function sliderChangeCMYK(value, element) {
    var valHex4;
    var valHex5 = '';
    var valHex6 = '';        
    var valHex7 = '';   

    document.getElementById(element).innerHTML = value;
    valHex4 = document.getElementById('sliderStatus4').innerHTML;
    valHex5 = document.getElementById('sliderStatus5').innerHTML;
    valHex6 = document.getElementById('sliderStatus6').innerHTML;
    valHex7 = document.getElementById('sliderStatus7').innerHTML;
    document.getElementById('valCMYK').innerHTML = "CMYK "+ "("+dec2String(valHex4)+"%"+","+dec2String(valHex5)+"%"+","+dec2String(valHex6)+"%"+","+dec2String(valHex7)+"%"+")";

}

function dec2String(d) {
     return  String((+d).toString().toUpperCase()) ; 
}
