var OrderPacks = require('../models/orderpacks.js');
var config = require('../config');

module.exports.getOrderPacksCashOut = function (dollarValue, cb) {
    OrderPacks
    .find({status:'Terminado', designerid:{$exists:true}, date_finish_work:{$exists:true}, weekly_cash_out:{$exists:true}, weekly_cash_out: false})
    //.select('imagecount userlongname')
    .populate({path:'designerid', select: 'userlongname'})
    .populate({path:'specid', select:'totalprice name'})
    .sort('designerid')
    .exec(function(err,orderpacksdocs){  
        var listOrderPacks = [];
        if (orderpacksdocs.length > 0){
            var id_designer = orderpacksdocs[0].designerid._id;
            var sumimages = 0;
            var specPrice = 0;
            var totalUSD = 0;
            var totalPesos = 0;

            for ( var i = 0; i < orderpacksdocs.length ; i++){
                if (id_designer === orderpacksdocs[i].designerid._id ){
                    sumimages = sumimages + orderpacksdocs[i].imagecount;
                }
                else{
                    specPrice = parseFloat(orderpacksdocs[i - 1].specid.totalprice);
                    if ((orderpacksdocs[i - 1].specid.totalprice === 0) && (orderpacksdocs[i - 1].specid.name =='GRATIS')){
                        specPrice = parseFloat(config.prices.cutandremove);
                    }
                    totalUSD = specPrice * sumimages;
                    totalPesos = totalUSD  * (dollarValue * 100);
                    listOrderPacks.push({name:orderpacksdocs[i - 1].designerid.userlongname, imagecount: sumimages, specPrice:specPrice, totalUSD:totalUSD, totalPesos:(totalPesos/100)});
                    id_designer = orderpacksdocs[i].designerid._id;
                    sumimages = orderpacksdocs[i].imagecount;

                }
                if (orderpacksdocs.length === (i + 1)){
                    specPrice = parseFloat(orderpacksdocs[i].specid.totalprice);
                    if ((orderpacksdocs[i].specid.totalprice === 0) && (orderpacksdocs[i].specid.name =='GRATIS')){
                        specPrice = parseFloat(config.prices.cutandremove);
                    }
                    totalUSD = specPrice * sumimages; 
                    totalPesos = totalUSD  * (dollarValue * 100);
                    listOrderPacks.push({name:orderpacksdocs[i].designerid.userlongname, imagecount: sumimages, specPrice:specPrice, totalUSD:totalUSD, totalPesos:(totalPesos/100)});
                }
            }  
            listOrderPacks.sort(function(a,b) {
                return b.imagecount-a.imagecount; // Ordena el top
            });
            cb({"error":0,listOrderPacks,orderpacksdocs});
        }
        else{
            cb({"error":0,listOrderPacks,orderpacksdocs});
        } 
    });
};
module.exports.do_chashout = function (cb) {
    console.log("ok");
    var conditions = {status:'Terminado', designerid:{$exists:true}, 
        date_finish_work:{$exists:true}, weekly_cash_out:{$exists:true}, 
        weekly_cash_out: false}, 
    update = { $set: { "weekly_cash_out":true }}, 
    options = { multi: true };

    OrderPacks.update(conditions,update,options, function(err,orderpacksdocs){  
        if (err){
            orderpacksdocs.error = 1;
        }
        else{
            orderpacksdocs.message = "Se realizó correctamente el corte";
        }
        console.log(orderpacksdocs);
        cb(orderpacksdocs);
    });
  
};
/*module.exports.sortOrderPacks = function (orderpacksdocs, cb) {
    
    var id_designer = orderpacksdocs[0].designerid._id;
    var sumimages = 0;
    var listOrderPacks = [];
    var specPrice = 0;
    var totalPrice = 0;
    for ( var i = 0; i < orderpacksdocs.length ; i++){
        if (id_designer === orderpacksdocs[i].designerid._id ){
            sumimages = sumimages + orderpacksdocs[i].imagecount;
        }
        else{
            specPrice = parseFloat(orderpacksdocs[i - 1].specid.totalprice);
            totalPrice = specPrice * sumimages;
            listOrderPacks.push({name:orderpacksdocs[i - 1].designerid.userlongname, imagecount: sumimages, specPrice:specPrice, totalPrice:totalPrice});
            id_designer = orderpacksdocs[i].designerid._id;
            sumimages = orderpacksdocs[i].imagecount;

        }
        if (orderpacksdocs.length === (i + 1)){
            specPrice = parseFloat(orderpacksdocs[i].specid.totalprice);
            totalPrice = specPrice * sumimages; 
            listOrderPacks.push({name:orderpacksdocs[i].designerid.userlongname, imagecount: sumimages, specPrice:specPrice, totalPrice:totalPrice});
        }
    }  
    cb(listOrderPacks);
};*/