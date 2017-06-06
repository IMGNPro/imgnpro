 
var RGB = '{"r":0,"g":0,"b":0}';
var CMYK = '{"c":0,"m":0,"y":0,"k":0}';
var colormodeSelected = 0;
$(document).ready(function(){
                var strspecname = localStorage.getItem("specname");
                var v_typespec = localStorage.getItem("typespec");
                var nDPI = localStorage.getItem("DPI");
                var currentdpinone = localStorage.getItem("dpinone");
                var currentColorMode = localStorage.getItem("colormode");
                var currentRGB = localStorage.getItem("RGB");
                var currentCMYK = localStorage.getItem("CMYK");
                

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
                if(currentColorMode !== null){
                    $('#colormode').prop("value", currentColorMode);
                    changeColorMode();
                }

                if(currentRGB !== null){
                    var jsRGB = JSON.parse(currentRGB);
                    RGB = currentRGB;
                    $('#red').prop("value",jsRGB.r );
                    $('#green').prop("value",jsRGB.g );
                    $('#blue').prop("value",jsRGB.b );
                    displayRGB.style.background = "rgb(" + jsRGB.r  + ", " + jsRGB.g + ", " + jsRGB.b + ")";
                    colormodeSelected = 0;
                }

                if(currentCMYK !== null){
                    var jsCMYK = JSON.parse(currentCMYK);
                    CMYK = currentCMYK;
                    $('#cyan').prop("value",jsCMYK.c );
                    $('#magenta').prop("value",jsCMYK.m );
                    $('#yellow').prop("value",jsCMYK.y );
                    $('#black').prop("value",jsCMYK.k );
                    var jsCMYKRGB = JSON.parse(CMYKtoRGB(jsCMYK.c,jsCMYK.m,jsCMYK.y,jsCMYK.k));
                    displayCMYK.style.background = "rgb(" + jsCMYKRGB.r  + ", " + jsCMYKRGB.g + ", " + jsCMYKRGB.b + ")";
                    sliderChangeCMYK(document.getElementById('cyan').value, 'sliderStatus4');
                    sliderChangeCMYK(document.getElementById('magenta').value, 'sliderStatus5');
                    sliderChangeCMYK(document.getElementById('yellow').value, 'sliderStatus6');
                    sliderChangeCMYK(document.getElementById('black').value, 'sliderStatus7');
                    colormodeSelected = 1;
                }

               // if(currentCMYK === null && currentRGB === null){
                    slidersDisplay();
               // }

                $('#buttonspec').click(function (ev) {
                    //var imageselected = localStorage.getItem('imageselected');
                    if ($('#specname').val().trim() === ''){
                        alert("Favor de capturar el nombre de la especificación");    
                        $('#specname').focus();
                    }
                    else{

                          localStorage.setItem("specname", $('input:text[name=name]').val());
                          localStorage.setItem("format", $('select[name="format"]').val());
                          localStorage.setItem("colormode", $('select[name="colormode"]').val());
                          //localStorage.setItem("background", $('select[name="background"]').val());
                          localStorage.setItem("backgrndcolor", $('#valHex').text());
                          localStorage.setItem("dpinone","");
                          localStorage.removeItem("DPI");

                          //envio de los valores de los Sliders

                          if(colormodeSelected == 0){
                            localStorage.setItem("RGB",RGB);
                            localStorage.removeItem("CMYK");
                          }else{
                            localStorage.setItem("CMYK",CMYK);
                            localStorage.removeItem("RGB");
                          }

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
               
                // $("#background").change(function() {
                //     if($("#background option:selected").text() ==='COLOR' ){
                //         $('#colorselect').prop("disabled", false);
                //       }
                //     if($("#background option:selected").text() ==='BLANCO' ){
                //         $('#colorselect').prop("value", '#FFFFFF');
                //         $('#colorselect').prop("disabled", true);
                //       }
                //     if($("#background option:selected").text() ==='NEGRO' ){
                //         $('#colorselect').prop("value", '#000000');
                //         $('#colorselect').prop("disabled", true);
                //       }
                //     if($("#background option:selected").text() ==='SIN FONDO' ){
                //         $('#colorselect').prop("value", '#E5E5E5');
                //         $('#colorselect').prop("disabled", true);
                //       }
                
                // });
                $("#format").change(function() {
                      $('#sin_fondo').prop("disabled", false);
                      $('#mode_cmyk').prop("disabled", false);
                      if($("#format option:selected").text() ==='JPG' || $("#format option:selected").text() ==='JPG WEB' ){
                        $('#sin_fondo').prop("disabled", true);
                        //$('#background').prop("value", 'blanco');
                        $('#colorselect').prop("value", '#ffffff');
                        $('#colorselect').prop("disabled", true);
                      }

                      if($("#format option:selected").text() ==='JPG WEB' || $("#format option:selected").text() ==='PNG' ){
                        localStorage.removeItem('clippingpath');
                        $('#mode_cmyk').prop("disabled", true);
                        $('#colormode').prop("value", 'rgb');
                        changeColorMode();
                       }
                       slidersDisplay();
                });
             //mostrar el div donde esta los sliders 
            $("#colormode").change(function() {
                 changeColorMode();
            }); 

            function desactForm(formName){
                    $('#div_msgDemo').show();
                    $('#specname').prop('disabled',true);
            } 

            function changeColorMode(){
                var div1 = document.getElementById('SliderRGB');
                var div2 = document.getElementById('SliderCMYK');   
                if($("#colormode option:selected").text() ==='RGB'){
                  div2.style.display = 'none';
                  div1.style.display = 'block';
                  colormodeSelected = 0;
                }
                if($("#colormode option:selected").text() ==='CMYK'){
                    div2.style.display = 'block';
                    div1.style.display = 'none';
                    colormodeSelected = 1;
                 }
            }


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
    var valHex4 = '';
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

function CMYKtoRGB(cyan,magenta,yellow,black){
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

       //displayCMYK.style.background = "rgb(" + r + ", " + g + ", " + b + ")";
       return '{ "r":'+ r + ',"g": '+ g + ',"b":'+ b + '}';
}

function slidersDisplay(){
    //Script de los sliders RGB para cambiar el dispay de color
    var input = document.querySelectorAll("input");

    var Red;
    var Green;
    var Blue;
    for(var i = 0; i < input.length; i++) {
        input[i].addEventListener("input", function() {
            var red = document.getElementById("red").value,
                green = document.getElementById("green").value,
                blue = document.getElementById("blue").value;
            var display = document.getElementById("display");
            displayRGB.style.background = "rgb(" + red + ", " + green + ", " + blue + ")";
            
        Red = red;
        Green = green;
        Blue = blue;   
        RGB = '{"r":'+Red+',"g":'+Green+',"b":'+Blue+'}';

        });
    }
    sliderChange(document.getElementById('red').value, 'sliderStatus');
    sliderChange(document.getElementById('green').value, 'sliderStatus2');
    sliderChange(document.getElementById('blue').value, 'sliderStatus3');

    // Script de los Sliders CMYK para cambiar el display de color
    input = document.querySelectorAll("input");
    var Cyan;
    var Magenta;
    var Yellow;
    var Black;

    for(i = 0; i < input.length; i++) {

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


            Cyan = cyan;
            Magenta = magenta;
            Yellow = yellow;
            Black = black;
            CMYK = '{"c":'+Cyan+',"m":'+Magenta+',"y":'+Yellow+',"k":'+Black+'}';
            displayCMYK.style.background = "rgb(" + r + ", " + g + ", " + b + ")";
            document.getElementById('valHex').innerHTML = '#' + dec2hex(r) + dec2hex(g) + dec2hex(b);
        });
    }
    sliderChange(document.getElementById('cyan').value, 'sliderStatus4');
    sliderChange(document.getElementById('magenta').value, 'sliderStatus5');
    sliderChange(document.getElementById('yellow').value, 'sliderStatus6');
    sliderChange(document.getElementById('black').value, 'sliderStatus7');        
}