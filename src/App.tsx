import React from "react";
import "./App.css";
import cover from "./assets/cover.png";
import useReduxDispatch from "./hooks/useReduxDispatch";
import { loadProductsAsync, ProductDto } from "./productsReducer";
import useReduxSelector from "./hooks/useReduxSelector";

function App() {
  const dispatch = useReduxDispatch();
  const [loading, setLoading] = React.useState(false);
  const { products } = useReduxSelector((s) => s.products);

  const [cart, setCart] = React.useState<ProductDto[]>([]);

  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(loadProductsAsync());
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="App" style={{}}>
      <Header />

      <div className="container">
        <LeftMenu />
        <main className="content">
          <img src={cover} alt="cover" width={"100%"} />

          <div style={{ display: "flex" }}>
            <h3>All items</h3>
            <span style={{ paddingLeft: 5, color: "gray" }}>(10,989)</span>
          </div>
          {loading && <span>loading...</span>}
          {products &&
            products.map((prod, index) => (
              <ListItem
                product={prod}
                onAdd={(prod) => setCart((ps) => [...ps, prod])}
              />
            ))}
        </main>
        <CartMenu />
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div className="app-header">
      <h1>Pet shope</h1>
    </div>
  );
};

const LeftMenu = () => {
  return (
    <aside className="left-menu">
      <h3>Categories</h3>

      <ul>
        <li className="active">
          <a href="/#">All items</a>
        </li>
        <li>
          <a href="/#">Bird</a>
        </li>
        <li>
          <a href="/#">Cat</a>
        </li>
        <li>
          <a href="/#">Dog</a>
        </li>
        <li>
          <a href="/#">Fish</a>
        </li>
      </ul>
    </aside>
  );
};

const CartMenu = () => {
  return (
    <aside className="cart-menu">
      <h3>cart menu</h3>
    </aside>
  );
};

const ListItem = ({
  product,
  onAdd,
}: {
  product: ProductDto;
  onAdd?: (prod: ProductDto) => void;
}) => {
  return (
    <div className="list-item-container">
      <div
        style={{
          paddingRight: 10,
        }}
      >
        <img height={100} width={100} src={product.image} alt="" />
      </div>
      <div className="list-item-content">
        <h1 className="title">{product.title}</h1>
        <h1 className="price">{product.price}</h1>
        <p className="description">{product.description}</p>
      </div>
      <div>
        <button
          onClick={() => {
            if (onAdd) {
              onAdd(product);
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default App;
