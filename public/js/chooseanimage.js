
$(document).ready(function(){
                var v_specname = localStorage.getItem("specname");
                var v_typespec = localStorage.getItem("typespec");

                var dom_typespec = $("#dom_typespec").val();
                var dom_specname = $("#dom_specname").val();
                var dom_specid = $("#dom_specid").val();
                
                localStorage.clear(); // limpia el localstorage
                
                console.log(v_specname,v_typespec );
                localStorage.setItem("specname", dom_specname);
                localStorage.setItem("typespec", dom_typespec);
                alert($("#dom_typespec").val());
                if (v_typespec == 'free'){
                    localStorage.setItem("specname", v_specname);
                    localStorage.setItem("typespec", v_typespec);

                    alert($("#dom_typespec").val());
                }
                if (dom_typespec == 'normal'){
                    localStorage.clear();
                }

                $('#buttoncontorder').click(function (ev) {
                    var imageselected = localStorage.getItem('imageselected');
                    if (imageselected === null){
                        alert("Favor de seleccionar una imagen");    
                    }
                    else{
                          alert(dom_specid);
                          alert(typeof(dom_specid));
                          if (typeof(dom_specid) == 'string' && dom_specid === '' ){
                              document.location.href="/chooseaspecification";
                          }
                          else{
                            document.location.href="/chooseaspecification?specid=" + dom_specid ;
                          }

                         
                    }
                    ev.preventDefault();
                });
                $("#imageForm input[name=image]").change(function(){
                    var imageselected = $('input:radio[name=image]:checked').val();
                    localStorage.setItem("imageselected", imageselected);
                });
                
            });
            