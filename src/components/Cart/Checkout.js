
import { useState } from 'react';
import './Checkout.css';
import useInput from './useInput';

const Checkout = props => {
    const [state,setState]=useState(false)

  const {
    value:enteredName,
    isValid:enteredNameIsValid,
    hasError:nameInputHasError,
    valueChangeHandler:nameChangeHandler,
    inputBlurHandler:nameBlurChangeHandler,
  } =  useInput((value)=> value.trim() !== '' && value.length >=3);

  const {
    value:enteredStreet,
    isValid:streetIsValid,
    hasError:streetInputHasError,
    valueChangeHandler:streetChangeHandler,
    inputBlurHandler:streetBlurChangeHandler,
  } =  useInput((value)=> value.trim() !== '' && value.length >=3)

  const {
    value:enteredPostal,
    isValid:postalIsValid,
    hasError:postalInputHasError,
    valueChangeHandler:postalChangeHandler,
    inputBlurHandler:postalBlurChangeHandler,
  } =  useInput((value)=> value.length > 4 && value.length<8 && value.trim() !== '')

  const {
    value:enteredCity,
    isValid:cityIsValid,
    hasError:cityInputHasError,
    valueChangeHandler:cityChangeHandler,
    inputBlurHandler:cityBlurChangeHandler,
  } =  useInput((value)=> value.length > 5 && value.trim() !== '')

  let formIsValid = false
  if(enteredNameIsValid && streetIsValid && postalIsValid && cityIsValid){
    formIsValid = true
  }

  const addHandler = (event) => {
    event.preventDefault();
    const obj = {
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
    }
    console.log(obj);
    fetch('https://address-c2a7e-default-rtdb.firebaseio.com/address.json',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)
    })
    
   setState(true)
  };

    function confitmHandler(e){
        e.preventDefault()
    }

  const nameInputClasses =  nameInputHasError ? 'form-control invalid' : 'form-control';
  const streetInputClasses = streetInputHasError ? 'form-control invalid' : 'form-control'
  const postalInputClasses = postalInputHasError ? 'form-control invalid' : 'form-control'
  const cityClass = cityInputHasError ? 'form-control invalid' : 'form-control'


  return (
    <form className='cartes' onSubmit={confitmHandler}>
        <div className='cont'>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurChangeHandler}
        />
        {nameInputHasError && <p className='ssss'>Name must not be empty</p>}
      </div>
      <div className={streetInputClasses}>
      <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurChangeHandler}
        />
         {streetInputHasError && <p className='ssss'>Street must not be empty(length-3)</p>}
      </div>
      <div className={postalInputClasses}>
      <label htmlFor='name'>Postal code</label>
        <input
          type='text'
          id='name'
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurChangeHandler}
        />
         {postalInputHasError && <p className='ssss'>Postal code length (4-8)</p>}
      </div>
      <div className={cityClass}>
      <label htmlFor='name'>City</label>
        <input
          type='text'
          id='name'
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurChangeHandler}
        />
         {postalInputHasError && <p className='ssss'>City length (5)</p>}
      </div>
      <div className='form'>
        <button className='butset' type='button' onClick={props.onCancel}>Cancel</button>
        <button className={!formIsValid ? 'sss' : 'buttonfalse'} disabled={!formIsValid}  onClick={addHandler}>Confirm</button>
      </div>
      
      </div>
      {state && <div className='zakaz-name'>
      <p className='zakaz'>Сиздин заказыныз кабыл алынды..<br/>
      Заказ бергениниз учун чоон ырахмат!!</p>
      </div>}
    </form>
  );
}
export default Checkout
