import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const { productId } = useParams();
    const [currentProduct, setCurrentProduct] = useState(null);
    const [currentQuantity, setCurrentQuantity] = useState(0);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((productDetails) => {
                console.log(productDetails);

                if (productDetails) {
                    setCurrentProduct(productDetails);

                    const cartData = localStorage.getItem("cartKey");

                    if (cartData) {
                        const cart = JSON.parse(cartData);

                        const currentCartItem = cart.find(
                            (cartItem) => cartItem.productId === productId
                        );

                        if (currentCartItem) {
                            setCurrentQuantity(currentCartItem.quantity);
                        }
                    }
                }
            });
    }, []);

    if (!currentProduct) {
        return <div>Not found</div>;
    }
    const addToCart = () => {
        const cartData = localStorage.getItem("cartKey");
        if (!cartData) {
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
            if (currentCartItem) {
                currentCartItem.quantity++;
                setCurrentQuantity(currentQuantity + 1);
            } else {
                cart.push({
                    productId,
                    quantity: 1,
                });
                setCurrentQuantity(1);
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
                            <div className="carousel-item active">
                                <img
                                    src={currentProduct.image}
                                    className="d-block"
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        maxWidth: "100%",
                                        maxHeight: "600px",
                                    }}
                                    alt="product"
                                />
                            </div>
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
                    <p className="fs-4">
                        <strong>Rating:</strong> {currentProduct.rating.rate}
                    </p>

                    <p className="fs-4">
                        {" "}
                        <strong>Category: </strong>
                        {currentProduct.category}
                    </p>
                    <p className="fs-1 fw-bold">{currentProduct.price} Lei</p>
                    <div className="btn btn-success" onClick={addToCart}>
                        Add to cart ({currentQuantity})
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetails;
