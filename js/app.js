var D3 = initD3("#d3canvas", nodeClick);


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
    displayProductDetails(skus[0]);
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


function displayProductDetails(sku) {
    detailsForProduct(sku, function(data) {
        var product = data.products[0];
        var name = product.name;
        var image = product.image;
        var shortDescription = product.shortDescription || "(none)";
        log("- name: " + name);
        log("- image: " + image);
        log("- descr: " + shortDescription);
    });
}

