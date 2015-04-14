
Ad = function(title, text, price, link, image) {
    this.title = title;
    this.text = text;
    this.price = price;
    this.link = link;
    this.image = image;
};

Ad.prototype.getAsHTML = function () {
    return '<b>' + this.title + '</b>' + '<br>' +
        this.link + '<br>' +
        this.text + '<br>' +
        '<b>Price: ' + this.price + '</b><br>' +
        '<img src="' + this.image + '">' + '<br>';
}

module.exports = Ad;
