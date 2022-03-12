import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../Products/products.json";

function ProductDetails() {
    const { productId } = useParams();
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const currentProduct = products.find((product) => product.id == productId);
    useEffect(() => {
        const cartData = localStorage.getItem('cartKey');

        if (cartData) {
            const cart = JSON.parse(cartData);
            const currentCartItem = cart.find((cartItem) => cartItem.productId === productId);
            if (currentCartItem) {
                setCurrentQuantity(currentCartItem.quantity);
            }
        }
    }, [])

    
    if (!currentProduct) {
        return <div>Not found</div>;
    }
    const addToCart = () => {
        const cartData = localStorage.getItem("cartKey");
        if (!cartData && currentProduct.stock > 0) {
            const cart = [
                {
                    productId,
                    quantity: 1,
                },
            ];
            setCurrentQuantity(1);
            localStorage.setItem("cartKey", JSON.stringify(cart));
        } else {
            const cart = JSON.parse(cartData);
            const currentCartItem = cart.find(
                (cartItem) => cartItem.productId === productId
            );
            if (
                currentCartItem &&
                currentProduct.stock > currentCartItem.quantity
            ) {
                currentCartItem.quantity++;
                setCurrentQuantity(currentQuantity + 1)
            } else if (!currentCartItem && currentProduct.stock > 0) {
                cart.push({
                    productId,
                    quantity: 1,
                });
                setCurrentQuantity(1)
            }
            
            localStorage.setItem("cartKey", JSON.stringify(cart));
        }
    };

    return (
        <div>
            <h1>{currentProduct.title}</h1>
            <p>{currentProduct.description}</p>

            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <div
                        id="carouselExampleControls"
                        className="carousel carousel-dark slide"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-inner">
                            {currentProduct.images.map((url, index) => (
                                <div
                                    key={index}
                                    className={
                                        "carousel-item" +
                                        (index === 0 ? " active" : "")
                                    }
                                >
                                    <img
                                        src={url}
                                        className="d-block"
                                        height="600px"
                                        style={{
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        alt="product"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleControls"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <p className="fs-4"><strong>Stock:</strong> {currentProduct.stock}</p>
                    <p className="fs-4"><strong>Size:</strong> {currentProduct.size}</p>
                    <p className="fs-4"> <strong>Categories: </strong>{currentProduct.categories.join(", ")}</p>
                    <p className="fs-1 fw-bold">{currentProduct.price} Lei</p>
                    <div className="btn btn-success" onClick={addToCart}>Add to cart ({currentQuantity})</div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetails;
