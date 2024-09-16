import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

  const Updateproduct = () => {
  const navigate = new useNavigate()
  const [name,setName] = useState("")
  const [price,setPrice]= useState("")
  const [company,setCompany] = useState("")
  const [category,setCategory] = useState("")
  const params = useParams();
  useEffect(()=>{
   
    getProductDetails()
  },[])
 const getProductDetails = async ()=>{
  console.warn(params.name)
  let result = await fetch(`http://localhost:5000/product/${params.id}`,{
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
  }
  })
  result = await result.json();
  //console.warn(result)
  setName(result.name)
  setPrice(result.price)
  setCompany(result.company)
  setCategory(result.category)
 }
  const updatePrd = async ()=>{    
    //console.warn(name,price,company,category);   
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method:'Put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-Type':"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json()
    navigate('/')
    
  }
  return (
    <div>
      <h1>Update Product</h1>
      <input className='inputBox' type="text" value={name} 
      onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
     
      <input className='inputBox' type="number" value={price} 
      onChange={(e)=>setPrice(e.target.value)} placeholder='Enter Price' />
     

      <input className='inputBox' type="text" value={category} 
      onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Category' />
      
      
      <input className='inputBox' type="text" value={company} 
      onChange={(e)=>setCompany(e.target.value)} placeholder='Enter Company' />
      

      <button class="appButton" onClick={updatePrd}>Update Product</button>
    </div>
  )
}

export default Updateproduct