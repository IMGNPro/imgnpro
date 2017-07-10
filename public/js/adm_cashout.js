$(document).ready(function(){
    var frm = $('#cashoutForm');
    var frm2 = $('#cashoutForm2');

    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f=new Date();
    $('#fechaactual').html(diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());

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
                    var listOrderPacks = data.listOrderPacks;
                    var orderpacksdocs = data.orderpacksdocs;
                    console.log("corte", listOrderPacks);
                    if (listOrderPacks.length > 0){
                        $("#orderspacktablecashout tbody > tr:first-child + tr").remove();
                        for (var i = 0; i < listOrderPacks.length; i++){
                            var row = $("<tr>");
                            row.append($("<td>" + listOrderPacks[i].name + "</td>"))
                                    .append($("<td>" + listOrderPacks[i].imagecount + "</td>"))
                                    .append($("<td>" + listOrderPacks[i].totalUSD + "</td>"))
                                    .append($("<td>" + listOrderPacks[i].totalPesos + "</td>"));
                            $("#orderspacktablecashout tbody").append(row);
                        }
                        $("#orderspacktablecashoutdetail tbody > tr:first-child + tr").remove();
                        for (var i = 0; i < orderpacksdocs.length; i++){
                            var row = $("<tr>");
                            row.append($("<td>" + orderpacksdocs[i].numorder + "</td>"))
                                    .append($("<td>" + orderpacksdocs[i].name + "</td>"))
                                    .append($("<td>" + orderpacksdocs[i].designerid.userlongname + "</td>"))
                                    .append($("<td>" + orderpacksdocs[i].imagecount + "</td>"));
                            $("#orderspacktablecashoutdetail tbody").append(row);
                        }
                    }
                    else{
                        alert("No hay paquetes pendientes para hacer el corte");
                    }
                  
                }
            }
        });
        ev.preventDefault();
    });
    frm2.submit(function (ev) {
        $.ajax({
            type: frm2.attr('method'),
            url: frm2.attr('action'),
            data: frm2.serialize(),
            success: function (data) {
                if (data.error == 1 ){
                    document.getElementById('res_message').innerHTML= data.message;    
                }
                else{
                    alert(data.message);
                    $("#orderspacktablecashoutdetail tbody > tr:first-child + tr").remove();
                    $("#orderspacktablecashout tbody > tr:first-child + tr").remove();
                    //setTimeout(window.location='/de_login',500);  
                    console.log("corte", data);  

                    /*for (var i = 0; i < data.length; i++){
                                var row = $("<tr>");
                                row.append($("<td>" + data[i].name + "</td>"))
                                     .append($("<td>" + data[i].imagecount + "</td>"))
                                     .append($("<td>" + data[i].totalPrice + "</td>"));
                                $("#orderspacktablecashout tbody").append(row);
                            }*/
                }
            }
        });
        ev.preventDefault();
    });
    
});
