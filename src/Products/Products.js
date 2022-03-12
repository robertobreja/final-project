import { Link } from "react-router-dom";
import products from "./products.json";

function Products() {
    return (
        <div>
            <h1>Products</h1>
            <div className="row">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
                    >
                        <Link className="card" to={`/products/${product.id}`}>
                            <img
                                src={product.images[0]}
                                className="card-img-top"
                                alt="product"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">
                                    {product.description}
                                </p>
                                <p className="card-text">{product.price} Lei</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
