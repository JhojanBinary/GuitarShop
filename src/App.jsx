
import { useEffect, useState } from 'react'
import './App.css'
import { Guitar } from './components/Guitar'
import { Header } from './components/Header'

import { db } from './data/db'

function App() {
  



  const initialCar = () => {
    const localStorageCar = localStorage.getItem('My products');
    return localStorageCar ? JSON.parse(localStorageCar) : [];
  };
  
  const [data] = useState(db);
  const [car, setCar] = useState(initialCar); // Aquí llamas a la función directamente, no dentro de un array
  
  const max__items = 10;
  const min__items = 1;
  
  useEffect(() => {
    localStorage.setItem('My products', JSON.stringify(car));
  }, [car]);
  





  const addTocart = (item) =>{
    const itemExist = car.findIndex((guitar) => guitar.id === item.id )

     if (itemExist >= 0){

      if(car[itemExist].quantity >= max__items)
         return
      const updateCar = [...car]
      updateCar[itemExist].quantity++
      setCar(updateCar)    
    } 
    else {
      item.quantity = 1
      setCar([...car, item]);
    }
  }

  



  const removeCar = (id) =>{
    setCar((prevCar) => prevCar.filter(guitar => guitar.id !== id))
  }
  


  
  const increaseQuantity = (id) =>{
     const updateCar = car.map((item)=>{

      if(item.id === id && item.quantity < max__items){
        return{
          ...item,
          quantity: item.quantity  + 1
        }
      }
      return item
     })
     setCar(updateCar)
  }

  const decrementQuantity = (id) =>{
    const updateCar = car.map((item) =>{
      if(item.id === id && item.quantity >= min__items){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCar(updateCar)
  }

  const clearCar = () =>{
    setCar([])
  }

  

  return (
    <>
    <Header car = {car}
            removeCar={removeCar}
            increaseQuantity ={increaseQuantity}
            decrementQuantity = {decrementQuantity}
            clearCar = {clearCar}></Header>
      
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
         
         {data.map((guitar) =>{
          return(
            <Guitar key={guitar.id}
        //NOMBRE DE LA PROP /  NOMBRE DE LA FUNCION
                    guitar = {guitar}

                    addTocart = {addTocart}></Guitar>
      
          )
         })}
        
        
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
