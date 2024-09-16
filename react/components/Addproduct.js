import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Addproduct = () => {
  const navigate = new useNavigate()
  const [name,setName] = useState("")
  const [price,setPrice]= useState("")
  const [company,setCompany] = useState("")
  const [category,setCategory] = useState("")
  const [error,setError] = useState("false")
  const collectData = async ()=>{    
    //console.warn(name,price,company,category);
  
    if(!name || !price || !company || !category){setError(true); return false}
    let userId = JSON.parse(localStorage.getItem('user'))._id
    let res = await fetch('http://localhost:5000/add',{
      method:'post',
      body:JSON.stringify({name,price,company,category,userId}),
      headers:{
        'Content-Type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    })
    res = await res.json()
    if(res){navigate('/');}
    
  }
  return (
    <div>
      <h1>Add Product</h1>
      <input className='inputBox' type="text" value={name} 
      onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
      {error && !name && <span className='invalid-input'>Name Not Empty</span>}

      <input className='inputBox' type="number" value={price} 
      onChange={(e)=>setPrice(e.target.value)} placeholder='Enter Price' />
      {error && !price && <span className='invalid-input'>Price Not Empty</span>}

      <input className='inputBox' type="text" value={category} 
      onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Category' />
      {error && !category && <span className='invalid-input'>Categody Not Empty</span>}
      
      <input className='inputBox' type="text" value={company} 
      onChange={(e)=>setCompany(e.target.value)} placeholder='Enter Company' />
      {error && !category && <span className='invalid-input'>Company Not Empty</span>}

      <button class="appButton" onClick={collectData}>Add Product</button>
    </div>
  )
}

export default Addproduct