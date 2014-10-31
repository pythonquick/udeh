var D3;

$(function() {
D3 = initD3("#d3canvas", nodeClick);
});

function nodeClick() {
    alert("node click");
}


function log(msg) {
    console.log(msg);
}

function loadTrendingProducts() {
    trendingProducts(handleTrendingProducts);
}


function handleTrendingProducts(data) {
    //var productList = data.results;
    var results = data.results;
    var skus = [];
    for (var idx=0; idx<results.length; idx++) {
        var product = results[idx];
        skus.push(product.sku);
    }
    detailsForProducts(skus, function(data) {
        log("product details:");
        log(data);
        var products = data.products;
        for (var idx=0; idx<products.length; idx++) {
            var product = products[idx];
            var sku = product.sku;
            var imageUrl = product.image;
            var radius = 50;
            log("sku: " + sku + " image: " + imageUrl);
            D3.addnode(sku, radius, imageUrl);
        }
    });
}

function onModalClick(sku){
    detailsForProduct(sku, function(data) {
        reviewsForProduct(sku, function(data2) {
            $("#productTitle").text(data.products[0].name);
            $("#productDescription").text(data.products[0].description);
            $("#modalImage").attr("src", data.products[0].image);
            $("#reviews").html("");
            var outer, header, body;
            for(var i; i<data2.reviews.length; i++){
                outer = $('#reviews').append("<div/>")
                outer.addClass("panel").addClass("panel-default");
                header = outer.append("<div/>").append("<h5/>").text(review[i].title);
                body = outer.append("<div/>").text(review[i].comment);
            }

            $('#productModal').modal("show");
        });
    });
}

function handleAccessories(data) {
    log("accessories:");
    log(data);
}


function handleTrending(data) {
    log("Trending data:");
    log(data);
}


function handleProductDetails(data) {
    log("Product Details response:");
    log(data);
    var product = data.products[0];
    log("Product Details:");
    //log("product.
}


function handleSearchResults(data) {
    log("Search Results");
    log(data);
    var results = data.products;
    for (var idx=0; idx<results.length; idx++) {
        var product = results[idx];
        log("Search Result:");
        log("- Name: " + product.name);
        log("- Description: " + product.description);
        log("- SKU: " + product.sku);
    }
}


function handleReviews(data) {
    log("Review data");
    log(data);
    var reviews = data.reviews;
    for (var idx=0; idx<reviews.length; idx++) {
        var review = reviews[idx];
        log("Review:");
        log("- Title: " + review.title);
        log("- Submission time: " + review.submissionTime);
        log("- Reviewer: " + review.reviewer[0].name);
        log("- Rating: " + review.rating);
        log("- Comment: " + review.comment);
    }
}


function logApiResponse(data) {
    log("API return:");
    log(data);
}

function searchForProduct(){
    var searchString = $("#searchField").val();
    //handleSearchResults(sku);
    searchFor(searchString, handleSearchResults);

}

