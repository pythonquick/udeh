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


    function detailsForProduct(sku, callback) {
        //http://api.remix.bestbuy.com/v1/products(sku=6848136)?show=name,description,shortDescription,longDescription,height,width,depth,weight&format=json&apiKey=afv2m5jc77t2xur52fbf94kk

        var baseUrl = "http://api.remix.bestbuy.com/v1/products(sku=" + sku + ")";
        var params = {
            show: "name,description,shortDescription,longDescription,height,width,depth,weight,image"
        };
        bestBuyApi(baseUrl, params, callback);
    }


    function detailsForProducts(skus, callback) {
        var baseUrl = "http://api.remix.bestbuy.com/v1/products(sku in(" + skus.join(",") + "))";
        var params = {
            show: "sku,name,description,image,addToCartUrl,salePrice"
        };
        bestBuyApi(baseUrl, params, callback);
    }


    function searchFor(searchString, callback) {
        //http://api.remix.bestbuy.com/v1/products(description=camera*)?show=name,description,shortDescription,longDescription,height,width,depth,weight&format=json&apiKey=afv2m5jc77t2xur52fbf94kk
        var baseUrl = "http://api.remix.bestbuy.com/v1/products(description=" + searchString + "*)";
        var params = {
            show: "name,description,shortDescription,longDescription,height,width,depth,weight,sku"
        };
        bestBuyApi(baseUrl, params, callback);
    }


    function accessoriesForProduct(sku, callback) {
//http://api.remix.bestbuy.com/v1/products(sku=1752378)?show=sku,name,includedItemList.includedItem,accessories.sku,relatedProducts.sku&format=json&apiKey=afv2m5jc77t2xur52fbf94kk

        var baseUrl = "http://api.remix.bestbuy.com/v1/products(sku=" + sku + ")";
        var params = {
            show: "sku,name,includedItemList.includedItem,accessories.sku,relatedProducts.sku"
        };
        bestBuyApi(baseUrl, params, callback);

    }


    function reviewsForProduct(sku, callback) {
        //http://api.remix.bestbuy.com/v1/reviews(sku=1780275)?format=json&apiKey=YourAPIKey&show=id,sku
        var baseUrl = "http://api.remix.bestbuy.com/v1/reviews(sku=" + sku + ")";
        var params = {
        };
        bestBuyApi(baseUrl, params, callback);
    }



//    return {
//        trendingProducts: trendingProducts
//    };
//})(jquery);
