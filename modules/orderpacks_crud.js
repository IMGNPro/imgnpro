var OrderPacks = require('../models/orderpacks.js');

module.exports.getOrderPacksCashOut = function (params,cb) {
    OrderPacks
    .find({status:'Terminado', designerid:{$exists:true}, date_finish_work:{$exists:true}, weekly_cash_out:{$exists:true}, weekly_cash_out: false})
    //.select('imagecount userlongname')
    .populate({path:'designerid', select: 'userlongname'})
    .populate({path:'specid', select:'totalprice name'})
    .sort('designerid')
    .exec(function(err,orderpacksdocs){  
        if (orderpacksdocs.length > 0){
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
            listOrderPacks.sort(function(a,b) {
                return b.imagecount-a.imagecount; // Ordena el top
            });
            cb(listOrderPacks);
        }
        else{
            cb('[]');
        } 
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