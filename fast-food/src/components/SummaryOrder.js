import React, { useEffect } from 'react';

import { withRouter } from 'react-router-dom'
import { useState } from 'react';
import { ContextConsumer } from './App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import '../style/Order.scss';





function SummaryOrder(props) {



    const [pizzas, setPizza] = useState([])
    const [valueOrder, setValueOrder] = useState(0)



    useEffect(() => {
        // item = pizzas funkcja pobiera dane ze stanu pizzas i dodaje nowe z props
        if (props.orderedPizza) {
            setPizza(item => [...item, props.orderedPizza])
        }

    }, [props.orderedPizza])

    useEffect(() => {

        let valueOrders = pizzas.reduce((sum, pizza) => {
            return (
                sum + pizza.ingredientsCost
            )
        }, 0)
        setValueOrder(valueOrders)


    }, [pizzas])

    const handleDeletePizza = id => {
        console.log(id)
        let deletePizza = pizzas.filter((pizza, index) => index !== id)
        setPizza(deletePizza)


    }
    const element = <FontAwesomeIcon icon={faTrashAlt} />
    const pizzasList = pizzas.map((pizza, index) => {
        return (
            <div className=" summary__pizza" key={index}>

                <li className=" summary__li" >{`${pizza.pizzaSize.charAt(0).toUpperCase() + pizza.pizzaSize.slice(1)} pizza with ${pizza.ingredients.length} ingredients ${pizza.ingredientsCost.toFixed(2)} PLN`}

                </li>
                <span className="summary__span" onClick={() => handleDeletePizza(index)}>{element}</span>

            </div>

        )

    })

    const handlePay = (context) => {




        context.sentData(valueOrder, pizzas)

        props.history.push('/basket')
    }




    return (
        <ContextConsumer>
            {(context) => (

                < div className="summary">

                    <h3 className="summary_title">Your order:</h3>
                    <div className="summary__order" >
                        <ol>
                            {pizzasList}
                        </ol>
                    </div>

                    <button className="summary__button " onClick={() => handlePay(context)}>
                        {valueOrder === 0 ? "Pay" : `Pay: ${valueOrder.toFixed(2)} PLN`}</button>




                </div>
            )
            }
        </ContextConsumer >
    )

}

export default withRouter(SummaryOrder);