class OrderUpdateRequest {
    constructor({ status, address, shippingMethod, paymentMethod }) {
        this.status = status;
        this.address = address;
        this.shippingMethod = shippingMethod;
        this.paymentMethod = paymentMethod;
    }
}

module.exports = OrderUpdateRequest;