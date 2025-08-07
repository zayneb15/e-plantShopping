import React, { useState, useMemo } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import plantsArray from './PlantData';
import { styleA, styleObj, styleObjUl } from './StyleData';
import CartIcon from './CartIcon';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const itemInCart = (product) => {
        return cart.some(item => item.name === product.name);
    }

    const totalItems = useMemo(() => {
        return cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
    }, [cart]);

    const handleAddToCart = (product) => {
        dispatch(addItem(product)); // Dispatch the action to add the product to the cart (Redux action)
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt="Eco logo"
                        />
                        <div onClick={handleHomeClick} role="button" tabIndex={0}
                            style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
                        >
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div onClick={handlePlantsClick} style={{ ...styleA, cursor: 'pointer' }} role="button" tabIndex={0}>
                        Plants
                    </div>
                    <div onClick={handleCartClick} style={{ ...styleA, cursor: 'pointer' }} role="button" tabIndex={0}>
                        <div className="cart">
                            <CartIcon />
                            <span className="cart_quantity_count">{totalItems}</span>
                        </div>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => ( // Loop through each category in plantsArray
                        <div key={index}> {/* Unique key for each category div */}
                            <h1>
                                <div>{category.category}</div> {/* Display the category name */}
                            </h1>
                            <div className="product-list"> {/* Container for the list of plant cards */}
                                {category.plants.map((plant, plantIndex) => ( // Loop through each plant in the current category
                                    <div className="product-card" key={plantIndex}> {/* Unique key for each plant card */}
                                        <img
                                            className="product-image"
                                            src={plant.image} // Display the plant image
                                            alt={plant.name} // Alt text for accessibility
                                        />
                                        <div className="product-title">{plant.name}</div> {/* Display plant name */}
                                        {/* Display other plant details like description and cost */}
                                        <div className="product-description">{plant.description}</div> {/* Display plant description */}
                                        <div className="product-cost">${plant.cost}</div> {/* Display plant cost */}
                                        {itemInCart(plant) ?
                                            <button
                                                className="product-button added-to-cart"
                                                disabled={true}
                                            >
                                                Added to Cart
                                            </button>
                                            :
                                            <button
                                                className="product-button"
                                                onClick={() => handleAddToCart(plant)} // Handle adding plant to cart
                                            >
                                                Add to Cart
                                            </button>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList