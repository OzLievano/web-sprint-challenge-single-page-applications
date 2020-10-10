import React, {useState,useEffect,useHistory} from 'react';
import pizzaPhoto from '../pizzaPhoto.jpg';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Confirmation from './Confirmation'
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

    const [errors,setErrors]= useState({
        name:""
    });

    function goToConfirm(){
        return(
            <Link to ="/pizza-form/confirmation"/>
        )
    }

    const [order,setOrder] = useState([])

    const [isDisabled,setIsDisabled] = useState(true);

    // inputChange fuction 
    const handleChanges = (e) => {
        if(e.target.type==='checkbox'){
            setFormState({...formState,toppings:{
                ...formState.toppings,[e.target.value]:e.target.checked
            }})
        }else{
            setFormState({...formState,[e.target.name]:e.target.value})
        }if (e.target.name==="name"){
            validate(e)
        }

    }
    // useEffect to change button

    //submitForm function 
    const submitForm = (e)=>{
        e.preventDefault();
        axios.post("https://reqres.in/api/users",formState)
        .then(resp=>{
           setOrder(resp.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        formSchema.isValid(formState).then(valid => setIsDisabled(!valid))
    },[formState])
    
    //validate changes 

    const validate = (e) =>{
        e.persist()
        yup.reach(formSchema,e.target.name).validate(e.target.value)
        .then(valid => setErrors({...errors,[e.target.name]:''}))
        .catch(err => setErrors({...errors,[e.target.name]:err.errors[0]}))
    }

    //formSchema
    const formSchema = yup.object().shape({
        name:yup.string().required('Name is required').min(2,'That is not a valid input')
    })

    return (
        <div>
            <DivH1><h1>Build Your Own Pizza</h1></DivH1>
            <div className="img-container">
                <img src={pizzaPhoto} alt="orderup"/>
            </div>
            <div className="form-container">
                <form onSubmit={submitForm}>
                    <h3>Order Pizza</h3>
                    <label htmlFor="name"><h3>Name:</h3>
                        <input id="name" name="name" type="text" value={formState.name} placeholder="Enter your name" 
                        onChange={handleChanges} data-cy="name"/>
                    </label><br/>
                    <label htmlFor="size"> 
                    <h3>Pizza Size:</h3>
                        <select name="size" id="size" data-cy="size" defaultValue="small" onChange={handleChanges}>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="xLarge">XLarge</option>
                        </select><br/>
                    </label><br/>
                    <label> 
                        <h3>Toppings</h3>
                        <label><input type="checkbox" name="peppers" data-cy="peppers" onChange={handleChanges} value="peppers" />Peppers</label>
                        <label><input type="checkbox" name="onions" data-cy="onions" onChange={handleChanges} value="onions"/>Onions</label>
                        <label><input type="checkbox" name="pepperoni" data-cy="pepperoni" onChange={handleChanges} value="pepperoni"/>Pepperoni</label>
                        <label><input type="checkbox" name="chicken" data-cy="chicken" onChange={handleChanges} value="chicken"/>Chicken</label>
                    </label><br/>
                    <label>
                        <h3>Special Instructions</h3>
                        <textarea name="specialInstructions" data-cy="specialInstructions" placeholder="Enter Special Instructions" onChange={handleChanges}/>
                    </label><br/>
                    <button type="submit" data-cy="submit" disabled={isDisabled}>Order Your Pizza</button>
                    <pre>{JSON.stringify(order, null, 2)}</pre>
                </form>
            </div>
        </div>
    )
}

export default Form
