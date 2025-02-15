import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity} from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);

    // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
      let totalAmount = 0
      for(let item of cart) {
        let numericCost = parseFloat(item.cost.replace("$",""));
        totalAmount += numericCost * item.quantity;
    }
      return totalAmount;
  };

  const handleContinueShopping = (e) => {
      e.preventDefault();
      onContinueShopping(e)

  };


  const handleIncrement = (item) => {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
      dispatch(removeItem(item))
  };



  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
      let numericCost = parseFloat(item.cost.replace("$",""));
      let plantAmount = numericCost * item.quantity;
      return plantAmount
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} disabled={item.quantity === 1}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} >+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


