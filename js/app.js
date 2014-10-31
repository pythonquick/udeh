function log(msg) {
    console.log(msg);
}


function handleTrendingProducts(data) {
    log("trending products:");
    log(data);
    //var productList = data.results;

}


function handleAccessories(data) {
    log("accessories:");
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
