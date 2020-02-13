import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Order from './Order';
import Basket from './Basket';
import Home from './Home';
import '../style/App.scss';


const AppContext = createContext();
export const ContextConsumer = AppContext.Consumer;
const ContextProvider = AppContext.Provider

function App() {

  const [basket, setBasket] = useState(0)
  const [pizzas, setPizzas] = useState([])



  const sendDataToBasket = (valueOrder, pizzasList) => {
    console.log(valueOrder, pizzasList)

    setBasket(valueOrder)
    setPizzas(pizzasList)

  }
  return (

    <Router>
      <ContextProvider value={{ basket: basket, pizzas: pizzas, sentData: sendDataToBasket }}>
        <div className="wrapper">
          <header className="header">
            <div className="header__name">Compose your pizza</div>
            <div className="header__opacity"></div>
          </header>

          <div className="content">

            <Route exact path="/AppMakePizza" component={Home} />
            <Route exact path="/Order" component={Order} />
            <Route exact path="/Basket" component={Basket} />
          </div>
          <footer className="footer">
            order pizza demo
                <Link to="/AppMakePizza">home</Link><br />
            <a href="https://www.freepik.com/free-photos-vectors/food">Food vector created by bakar015 - www.freepik.com</a>

            <a href="https://www.freepik.com/free-photos-vectors/food">Food vector created by macrovector - www.freepik.com</a>

            <a href="https://www.freepik.com/free-photos-vectors/food">Food photo created by timolina - www.freepik.com</a>

            <a href="https://www.freepik.com/free-photos-vectors/pizza">Pizza vector created by macrovector - www.freepik.com</a>


            <a href="https://www.freepik.com/free-photos-vectors/food">Food vector created by macrovector - www.freepik.com</a>
          </footer>
        </div>
      </ContextProvider>
    </Router>

  );
}

export default App;
