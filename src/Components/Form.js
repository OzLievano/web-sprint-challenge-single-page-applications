import React, {useState} from 'react';
import pizzaPhoto from '../pizzaPhoto.jpg';
import styled from 'styled-components';

const DivH1= styled.div`
    display:flex;
    justify-content:center;
    font-family:'Trebuchet MS, sans-serif';
    font-weight:bold;
    margin-top:3%;
`;

const divH4 = styled.div`
    background-color:'pink';
`;


const Form = () => {
    const [formState, setFormState] = useState({
        name:"",
        size:{
            small:false,
            medium:false,
            large:false,
            xLarge:false
        },
        toppings:{
            peppers:false,
            onions:false,
            pepperoni:false,
            chicken:false
        },
        specialInstructions:""
    })

    return (
        <div>
            <DivH1>
                <h1>Build Your Own Pizza</h1>
            </DivH1>
            <div className="img-container">
                <img src={pizzaPhoto} alt="myPizza"/>
            </div>
            <div className="form-container">
                <form>
                <h3>Build Your Own Pizza</h3><br/>
                    <label htmlFor="name">
                        <h3>Full Name</h3>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                        />
                    </label><br/>
                    <label>
                        <h3>Pizza Size</h3>
                        <select 
                            id="size" 
                            name="size" 
                            defaultValue="small" 
                        >
                            <option 
                                data-cy="small" 
                                value="small">Small
                            </option>
                            <option 
                                data-cy="medium" 
                                value="medium">Medium
                            </option>
                            <option 
                                data-cy="large" 
                                value="large">Large
                            </option>
                            <option 
                                data-cy="xLarge" 
                                value="xLarge">X-Large
                            </option>
                        </select>
                    </label><br/>
                    <label>
                        <h3>Toppings</h3>
                        <input 
                            type="checkbox"
                            name="peppers"
                            data-cy="peppers"
                        />
                        Peppers<br/>
                        <input 
                            type="checkbox"
                            name="onions"
                            data-cy="onions"
                        />
                        Onions<br/>
                        <input 
                            type="checkbox"
                            name="pepperoni"
                            data-cy="pepperoni"
                        />
                        Pepperoni<br/>
                        <input 
                            type="checkbox"
                            name="chicken"
                            data-cy="chicken"
                        />
                        Chicken<br/>
                    </label><br/>
                    <label><h3>Special Instructions</h3>
                    <textarea name="specialInstructions" data-cy="specialInstructions"placeholder="Please add any special instructions" value={formState.specialInstructions}></textarea>
                </label><br/>
                <button type="submit">Order Your Pizza</button>
                </form>
            </div>
        </div>
    )
}

export default Form
