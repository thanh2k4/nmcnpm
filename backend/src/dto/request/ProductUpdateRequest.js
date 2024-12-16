class ProductUpdateRequest {
    constructor({ name, price, description, imageUrl, category, isActive }) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.isActive = isActive;
    }
}

module.exports = ProductUpdateRequest;