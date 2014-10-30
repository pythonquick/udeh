//var BestBuy = (function($) {
    var BESTBUY_API_KEY = "afv2m5jc77t2xur52fbf94kk";
    var BESTBUY_API_URL = "http://api.remix.bestbuy.com/v1/stores(region=ut)";
    

    function bestBuyApi(url, params, doneFunction) {
        params.apiKey = BESTBUY_API_KEY;
        params.format="json";
        $.get(url, params, function() {
            
        })
        .done(doneFunction);
    }


    function trendingProducts(callback) {
        var baseUrl = "http://api.bestbuy.com/beta/products/trendingViewed";
        var params = {
        };
        bestBuyApi(baseUrl, params, callback);
    }


//    return {
//        trendingProducts: trendingProducts
//    };
//})(jquery);
