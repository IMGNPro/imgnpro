$(document).ready(function(){
    var frm = $('#cashoutForm');
    frm.submit(function (ev) {
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
                if (data.error == 1 ){
                    document.getElementById('res_message').innerHTML= data.message;    
                }
                else{
                    //setTimeout(window.location='/de_login',500);  
                    console.log("corte", data);  


                    for (var i = 0; i < data.length; i++){
                                var row = $("<tr>");
                                row.append($("<td>" + data[i].name + "</td>"))
                                     .append($("<td>" + data[i].imagecount + "</td>"))
                                     .append($("<td>" + data[i].totalPrice + "</td>"));
                                $("#orderspacktable tbody").append(row);
                            }


                }
            }
        });
        ev.preventDefault();
    });
});
