import React from 'react';

import MakePizza from './MakePizza'
import SummaryOrder from './SummaryOrder'
import { useState } from 'react';




function Order() {


    const [newPizza, setNewPizza] = useState(null)

    const newOrderPizza = newPizza => {
        setNewPizza(newPizza)
    }
    return (
        <div className="order">
            <MakePizza newOrderPizza={newOrderPizza} />
            <SummaryOrder orderedPizza={newPizza} />
        </div>
    )

}

export default Order;