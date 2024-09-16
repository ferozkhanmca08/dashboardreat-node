import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("");
    const navigate = new useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){navigate('/')}
    },[])

    const collectData =async ()=>{
       // console.log(name,email,password);
       let res = await fetch('http://localhost:5000/register',{
        method:'post',
        body:JSON.stringify({name,email,password}),
        headers:{
            'Content-Type':'application/json'
        },
       });
      res = await res.json();      
      if(res)
      {
        localStorage.setItem("user",JSON.stringify(res.result));
        localStorage.setItem("token",JSON.stringify(res.auth));
      
        navigate('/');
      }
      //console.warn(res);
    };
  return (
    <div>
        <h2>SignUp</h2>
        <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
        <input className='inputBox' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' />
        <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Passworld'/>
        <button className="appButton" type="button" onClick={collectData}>Sign Up</button>
    </div>
  )
}

export default SignUp
