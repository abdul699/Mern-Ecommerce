import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper"
import PaymentsB from "./PaymentsB";


const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProducts(loadCart());
  }, [reload])

  const loadAllProducts = (products) => {
      return (
          <div>
              <h2 className="mb-2">Tshirts in your Cart</h2>
              {products.map((product, index) => (
                <Card
                  key={index}
                  product={product}
                  addtoCart={false}
                  removeFromCart={true}
                  setReload={setReload}
                  reload={reload}
                />
              ))}
          </div>
      )
  }


  return (
    <Base title="Your shopping cart" description="">
      <div className="row">
          <div className="col-6">{products.length > 0 ? loadAllProducts(products) : (<h3>You have no items in your cart</h3>)}</div>
          <div className="col-6">
            <div><PaymentsB products = {products} setReload = {setReload}/></div>
          </div>
        </div>
    </Base>
  );
}

export default Cart;