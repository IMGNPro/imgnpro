$(document).ready(function(){
        var ajaxUrl = '/listallorderpacks/' + $('#numorderidInput').val();
        var urls = [];
        var urlsOriginal = [];
        console.log(ajaxUrl);
        $.ajax({
            type: 'get',
            url: ajaxUrl,
            success: function (data) {
                for (var i = 0; i < data.length; i++){
                    console.log(data[i]._id);
                    $.ajax({
                        type: 'get',
                        url: '/listorderpack/' + data[i]._id,
                        success: function (data) {
                            // console.log(data[0]);
                            // console.log(data.images);
                            $.getJSON('/findaorder/' + $('#numorderidInput').val() ).done(function(order) {
                                        if (order) {
                                        //console.log(order);
                                            //$("#specLink").attr("href","/de_especificaciones2/" + order.specid );
                                            $("#imageCount").html(order.imagecount);
                                        }
                            });

                            
                            $.each(data, function(index, value) {
                                // console.log(value);
                                $.each(value.images, function(index, valueimg) {
                                    // console.log(valueimg);
                                    var params = {
                                        filename: valueimg.imagename,
                                        userid: value.userid,
                                        orderpackid: value._id
                                    };
                                    $.getJSON('/sign-s3review', params).done(function(data) {
                                        var url ='';
                                        var urlthumb ='';
                                        var revimagename = '';
                                        if (data.signedRequest) {
                                            url = data.signedRequest;
                                            urlthumb = data.signedthumbRequest;
                                            revimagename = data.signedFileName;
                                            urls.push(data.signedRequest);
                                            urlsOriginal.push(params.filename);
                                            console.log(urls, urlsOriginal);
                                        }

                                        var row = $("<tr>");
                                        row.append($("<td>" + value.numorder + "</td>"))
                                                .append($("<td><a href='" + url + "' download>" + revimagename + "</a></td>"))
                                                .append($("<td><img src='" + urlthumb + "'></td>"));       
                                        $("#orderstable tbody").append(row);

                                    });
                                });
                            }); 
                        }
                    });
                }
            }
        });

    $("#link1").click(function() {
 
        var nombre = "zip_" + $('#numorderidInput').val();
        //The function is called
        compressed_img(urls,nombre);
        function compressed_img(urls,nombre) {
        var zip = new JSZip();
        var count = 0;
        var name = nombre+".zip";
        urls.forEach(function(url){
            JSZipUtils.getBinaryContent(url, {
                done: function(data) {
                    console.debug(data);
                    console.log(url,urls, urlsOriginal);
                    zip.file(urlsOriginal[count], data,  {binary:true});
                    count++;
                    if (count == urls.length) {
                        zip.generateAsync({type:'blob'},function updateCallback(metadata) {
                            $("#spZipPercent").html('<h1>Comprimiendo:' + metadata.percent + '%</h1>');
                        }).then(function(content) {
                            console.log(content, name);
                            saveAs(content, name);
                        });
                    }
                },
                fail: function(err) {
                    console.error(err);
                    throw err;
                },
                progress: function(p) {
                    $("#spDownloadPercent").html('<h1>Descarga:' + p.percent + '%</h1>');
                }
            });

        });
        }
    });
});