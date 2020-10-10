import React, {useState,useEffect} from 'react';
import pizzaPhoto from '../pizzaPhoto.jpg';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';

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

    const [errors,setErrors]= useState(false);

    const [isDisabled,setIsDisabled] = useState(true);

    // inputChange fuction 
    const handleChanges = (e) => {
        setFormState({...formState,[e.target.name]:e.target.type==='checkbox' ? e.target.checked : e.target.value})
    }
    // useEffect to change button

    useEffect(()=>{
        formSchema.isValid(formState).then(valid => setIsDisabled(!valid))
    },[formState])

    //submitForm function 
    const submitForm = (e)=>{
        e.preventDefault();
        axios.post("https://reqres.in/api/users",formState)
        .then(resp=>{
            console.log(resp)
        })
    }
    //formSchema
    const formSchema = yup.object().shape({
        name:yup.string().required('Name is required').min(2,'That is not a valid input')
    })

    //validate changes 

    const validate = (e) =>{
        console.log(e)
    }

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
                            data-cy="name"
                        />
                    </label><br/>
                    <label>
                        <h3>Pizza Size</h3>
                        <select 
                            id="size" 
                            name="size" 
                            defaultValue="small" 
                            data-cy="size"
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
                <button type="submit" disabled={isDisabled}>Order Your Pizza</button>
                </form>
            </div>
        </div>
    )
}

export default Form
