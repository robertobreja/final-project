import { useParams } from "react-router-dom";
import products from '../Products/products.json';

function ProductDetails() {
    const { productId } = useParams();
    const currentProduct = products.find((product) => product.id == productId);
if (!currentProduct) {
    return <div>Not found</div>
}
    
    return ( <div>
        <h1>{currentProduct.title}</h1>
        <p>{currentProduct.description}</p>
        {currentProduct.images.map((url) => (
            <img key={url} src={url} alt='product' width={'200px'} />
        ))}
        <p>{currentProduct.price} Lei</p>
        <p>Stock: {currentProduct.stock}</p>
        <p>Size: {currentProduct.size}</p>
        <p>Categories: {currentProduct.categories.join(', ')}</p>
    </div>
    );
}
export default ProductDetails;