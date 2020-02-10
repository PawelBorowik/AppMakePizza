import React, { useState, useEffect, } from 'react';

import '../style/Order.scss';

import Ingredients from '../data/pizza-ingredients.json';





function MakePizza(props) {

    // stan przechowujacy dodatki/ingredients do pizzy
    const [ingredients, setIngredients] = useState([])
    // stan przechowujacy koszt pizzy
    const [ingredientsCost, setIngredientsCost] = useState(0)
    // stan przechowujacy wielkość pizzy
    const [pizzaSize, setPizzaSize] = useState(10)

    const pizzaImg = `${process.env.PUBLIC_URL}/graphics/pizza.png`
    // zamiana wielkości pizzy wyrazonej w liczbie na nazwę
    let Size = "small";
    if (pizzaSize === 10) Size = "medium"
    else if (pizzaSize === 12) Size = "big"
    // zmienna do przycisku add
    const btnOrder = `Add  ${Size} pizza for: ${ingredientsCost.toFixed(2)} PLN`





    useEffect(() => {
        Ingredients.map(ingredient => {  // pętla  na danych  z .json w celu dodaniado bazy dynamicznie pozycji chcecked 
            ingredient.checked = ingredient.price === 0 ? true : false;
            return ingredient

        })
        setIngredients(Ingredients) // przypisanie danych z bazy .json do state z małej litery
    }, []) // drugi argument wartość poczatkowa state - []

    useEffect(() => {
        //obliczenie ceny  kiedy wielkosc pizzy i dodatki sie zmieniły
        setIngredientsCost(ingredients.reduce((sum, ingredient) => {
            return ingredient.checked ? sum + ingredient.price : sum;

        }, pizzaSize)) //pizzaSize wartosc poczatkowa + dodatki
    }, [pizzaSize, ingredients])


    // zmienna przechowująca pętle wyswietlająca dodatki
    const pizzaIngredients = ingredients.map(ingredient => {
        //zmienna  przechowujaca link do img dodatków
        const ingredientImg = `${process.env.PUBLIC_URL}/graphics/${ingredient.name}.png`
        //zmienna przechowujaca warunek wyświetlania ceny
        const ingerdientPrice = ingredient.price ? `${ingredient.price.toFixed(2)} PLN` : 'free'


        //obsługa kliknięcia w checkbox - zmiana state checked: false/true
        const handleCheckbox = (id) => {

            setIngredients(
                ingredients.map(item => {
                    if (item.id === id) {
                        item.checked = !item.checked // jesli niezaznaczone zaznacz jesli zazn. odznacz
                    } return item
                }))
        }
        return (
            < div className="make-pizza__ingredient" key={ingredient.id} >
                <img className="make-pizza__img" src={ingredientImg} alt={ingredient.name} />
                <input className="make-pizza__input" type="checkbox"
                    checked={ingredient.checked}
                    id={ingredient.name} onChange={() => handleCheckbox(ingredient.id)} />
                <label htmlFor={ingredient.name}>{ingredient.name} {ingerdientPrice}</label>

            </div >
        )
    })


    const handlePizzaSize = (pizzaSize) => {
        setPizzaSize(pizzaSize)
    }


    const handdleAddNewPizza = () => {

        //nowy obiekt przechowujacy dane wybranej pizzy: wielkość, cena i wybrane dodatki
        let newPizza = { pizzaSize: Size, ingredientsCost: ingredientsCost, ingredients: [] }
        ingredients.forEach(ingredient => {
            if (ingredient.checked) {
                return newPizza.ingredients.push(ingredient.name)

            }


        })
        // wyzerowanie checkbox po kliknieciu poza chees
        setIngredients(
            ingredients.map(item => {
                if (item.checked & item.price > 0) {
                    item.checked = false// przywrócenie false w checkbox  po kliknieciu 
                } return item
            }))





        // przekazanie props do app
        props.newOrderPizza(newPizza)




    }

    return (

        <div className="make-pizza">

            <section className="make-pizza__pizza-size">

                <div className="make-pizza__pizza-chosen">
                    <h1 className="make-pizza__title">Choose pizza size and topings</h1>

                    <img className={`make-pizza__small-pizza pizza ${pizzaSize === 9 ? "checked" : ""}`} src={pizzaImg} alt="small=pizza" onClick={() => handlePizzaSize(9)} />
                    <img className={`make-pizza__medium-pizza pizza ${pizzaSize === 10 ? "checked" : ""} `} src={pizzaImg} alt="small=pizza" onClick={() => handlePizzaSize(10)} />
                    <img className={`make-pizza__big-pizza pizza ${pizzaSize === 12 ? "checked" : ""} `} src={pizzaImg} alt="small=pizza" onClick={() => handlePizzaSize(12)} />

                </div>
            </section>

            <section className="make-pizza__additives">
                <div className="make-pizza__ingredients">
                    {pizzaIngredients}
                </div>

            </section>
            <section className="make-pizza__add-pizza">
                <button className="make-pizza__button " onClick={() => handdleAddNewPizza()}> {btnOrder}</button>
            </section>

        </div >

    );
}

export default MakePizza;