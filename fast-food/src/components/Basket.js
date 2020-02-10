import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ContextConsumer } from './App'
import '../style/Basket.scss';


function Basket() {
    const context = useContext(ContextConsumer);
    const orders = context.pizzas.map((pizza, index) => (<div key={index}>
        <li>
            {`${pizza.pizzaSize.charAt(0).toUpperCase() + pizza.pizzaSize.slice(1)} pizza with:`} &nbsp;
            {pizza.ingredients.map((item, indx) =>
                <span key={indx}>{item}{indx === (pizza.ingredients.length - 1) ? "." : ","}&nbsp;</span>)}
        </li>
    </div>
    ))

    const basket = context.basket;


    return (

        <ContextConsumer>
            {context => (
                < div className="basket">
                    <div> Your order: </div>
                    <ol>
                        {orders}
                    </ol>

                    <div> Pay: {basket === 0 ? 0 : basket.toFixed(2)} PLN</div>
                    <Link to="/Order">powrót</Link>

                </div>
            )
            }

        </ContextConsumer >
    );
}

export default Basket;