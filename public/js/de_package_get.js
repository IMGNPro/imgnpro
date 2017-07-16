$(document).ready(function(){
    var ajaxUrl = '/listorderpack/' + $('#packageid').val();
    var urls = [];
    var urlsOriginal = [];
    console.log(ajaxUrl);
    $.ajax({
        type: 'get',
        url: ajaxUrl,
        success: function (data) {
            // console.log(data[0]);
            // console.log(data.images);
            $.getJSON('/findaorder/' + data[0].numorder).done(function(order) {
                        if (order) {
                        //console.log(order);
                            $("#specLink").attr("href","/de_especificaciones2/" + order.specid );
                        }
            });      
            $.each(data, function(index, value) {
                // console.log(value);
                $.each(value.images, function(index, valueimg) {
                    // console.log(valueimg);

                    var params = {
                        filename: valueimg.imagename,
                        userid: value.userid
                    };
                    $.getJSON('/sign-s3get', params).done(function(data) {
                                                //console.log(data);
                        var url ='';
                        var urlthumb ='';
                        if (data.signedRequest) {
                            url = data.signedRequest;
                            urlthumb = data.signedthumbRequest;
                            urls.push(data.signedRequest);
                            urlsOriginal.push(params.filename);
                            console.log(urls, urlsOriginal);
                        }
                        var row = $("<tr>");
                        row.append($("<td>" + value.numorder + "</td>"))
                                .append($("<td>" + value.name + "</td>"))
                                .append($("<td><a href='" + url + "' download>" + valueimg.imagename + "</a></td>"))
                                .append($("<td><img src='" + urlthumb + "'></td>"));       

                                
                        $("#orderstable tbody").append(row);

                    });
                    

                });
            }); 
        }
    });


    $("#link1").click(function() {
 
        var nombre = "Zip_imgpro";
        //The function is called
        compressed_img(urls,nombre);

        function compressed_img(urls,nombre) {
        var zip = new JSZip();
        var count = 0;
        var name = nombre+".zip";
        urls.forEach(function(url){
            JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                throw err; 
            }
            console.log(url,urls, urlsOriginal);
            zip.file(urlsOriginal[count], data,  {binary:true});
            count++;
            if (count == urls.length) {
                zip.generateAsync({type:'blob'}).then(function(content) {
                    console.log(content, name);
                    saveAs(content, name);
                });
            }
            });
        });
        }
    });
});