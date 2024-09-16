import React,{useState,useEffect} from 'react'
import { Link} from 'react-router-dom';

const Productlist = () => {
    const [products,setProducts] = useState([]);
  
    useEffect(()=>{
        getProductlist();

    },[])
    const getProductlist = async ()=>{
        let result = await fetch("http://localhost:5000/products",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProducts(result)
    }
    //console.warn(products);
    const deletePrd = async (id)=>{
      
        let result = await fetch('http://localhost:5000/product/'+id,{
         method:"Delete",
         headers:{ authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` }
         });
         result = await result.json()
         if(result){  getProductlist();}
       
       
    }
    const searchHandle = async (event)=>{
          // console.warn(event.target.value)
           let key = event.target.value;
           if(key){
            let result = await fetch(`http://localhost:5000/src/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result)
            }else{getProductlist()}
           }else{getProductlist()}

    }
    
  return (
    <div className='product-list'>
        <h3>Product List</h3>
        <input type="text" placeholder='Searcb' onChange={searchHandle} className='search-product-box' />
        <ul>
            <li>S.no</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Operations</li>
        </ul>
       {
        products.length>0?products.map((item,index)=>
        <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button type="button" onClick={()=>deletePrd(item._id)}>delete</button>
            <Link to={"/update/"+item._id}>Update</Link></li>
        </ul>)
        :<h1>No Records Found</h1>
       }
       
       
    </div>
  )
}

export default Productlist
