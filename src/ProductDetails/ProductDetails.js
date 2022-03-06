import { useParams } from "react-router-dom";
import products from "../Products/products.json";

function ProductDetails() {
    const { productId } = useParams();
    const currentProduct = products.find((product) => product.id == productId);
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
            localStorage.setItem("cartKey", JSON.stringify(cart));
        } else {
            const cart = JSON.parse(cartData);
            const currentCartItem = cart.find(
                (cartItem) => cartItem.productId === productId
            );
            if (currentCartItem && currentProduct.stock > currentCartItem.quantity) {
                currentCartItem.quantity++;
            } else if(!currentCartItem && currentProduct.stock > 0) {
                cart.push({
                    productId,
                    quantity: 1,
                });
            }
            console.log(cart);
            localStorage.setItem('cartKey', JSON.stringify(cart));
        }
    };

    return (
        <div>
            <h1>{currentProduct.title}</h1>
            <p>{currentProduct.description}</p>
            {currentProduct.images.map((url) => (
                <img key={url} src={url} alt="product" width={"200px"} />
            ))}
            <p>{currentProduct.price} Lei</p>
            <p>Stock: {currentProduct.stock}</p>
            <p>Size: {currentProduct.size}</p>
            <p>Categories: {currentProduct.categories.join(", ")}</p>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
}
export default ProductDetails;
