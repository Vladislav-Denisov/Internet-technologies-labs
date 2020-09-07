function test(param) {
    var pricetext = document.getElementById("price");
    pricetext.value = document.getElementById("cost" + param).textContent.toString();

    var bnametext = document.getElementById("nbike");
    bnametext.value = document.getElementById("bname" + param).textContent.toString();
}