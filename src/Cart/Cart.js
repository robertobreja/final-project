import { useEffect, useState } from "react";

function Cart() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((allProducts) => {
                setProducts(allProducts);
                const cartData = localStorage.getItem("cartKey");
                if (cartData) {
                    setCart(JSON.parse(cartData));
                }
            });
    }, []);
    const getProduct = (productId) => {
        return products.find((product) => product.id == productId);
    };
    const getTotalPrice = () => {
        let sum = 0;
        for (const cartItem of cart) {
            sum += cartItem.quantity * getProduct(cartItem.productId).price;
        }
        return sum.toFixed(2);
    };

    const updateProductQuantity = (productId, newQuantity) => {
        const currentCartItem = cart.find(
            (cartItem) => cartItem.productId === productId
        );
        if (newQuantity < 1 || !newQuantity) {
            currentCartItem.quantity = 1;
        } else {
            currentCartItem.quantity = newQuantity;
        }
        localStorage.setItem("cartKey", JSON.stringify(cart));
        setCart([...cart]);
    };

    const deleteProduct = (productId) => {
        const newCart = cart.filter(
            (cartItem) => cartItem.productId !== productId
        );
        localStorage.setItem("cartKey", JSON.stringify(newCart));
        setCart(newCart);
    };

    return (
        <div>
            <h1>Cart</h1>

            <div className="row fw-bold">
                <div className="col-1">Image</div>
                <div className="col-3">Title</div>
                <div className="col-3">Quantity</div>
                <div className="col-3">Total price</div>
                <div className="col-2"></div>
            </div>

            {cart.map((cartItem) => (
                <div
                    key={cartItem.productId}
                    className="row align-items-center my-3"
                >
                    <img
                        src={getProduct(cartItem.productId).image}
                        alt="product"
                        className="col-1"
                    />
                    <small className="col-3 fs-3 product-title">
                        {getProduct(cartItem.productId).title}
                    </small>
                    <small className="col-3 fs-3">
                        <input
                            type="number"
                            defaultValue={cartItem.quantity}
                            min={1}
                            style={{ width: "100%" }}
                            onChange={(e) =>
                                updateProductQuantity(
                                    cartItem.productId,
                                    e.target.valueAsNumber
                                )
                            }
                        />
                    </small>
                    <small className="col-3 fs-3 product-title">
                        {(
                            cartItem.quantity *
                            getProduct(cartItem.productId).price
                        ).toFixed(2)}{" "}
                        Lei
                    </small>
                    <div
                        className="col-2 btn btn-danger"
                        onClick={() => deleteProduct(cartItem.productId)}
                    >
                        Delete product
                    </div>
                </div>
            ))}
            {cart.length > 0 ? (
                <h3 className="fs-1 fw-bold">Total: {getTotalPrice()} Lei</h3>
            ) : (
                <p>No products in cart.</p>
            )}
        </div>
    );
}
export default Cart;
