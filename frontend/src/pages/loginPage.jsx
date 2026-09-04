import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, User } from "lucide-react";

export default function LoginPage() { 

    
    const navigate = useNavigate()

    const navigateHome = () => { 
        navigate('/home')
    }

    const [userName, setUserName] = useState('')
    const [userNumber, setUserNumber] = useState('')

    
    localStorage.setItem('username', userName)

   const handleSignin = async () => {
    const response = await fetch ('http://localhost:5000/api/login', {
        method : 'POST', 
        headers : {
            'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify({
            username : userName, 
            usernumber : userNumber
        })
    }
    )
}

    return ( 
        <main className="bg-white bg-cover h-screen w-screen ">
            <div className="border border-black h-120 w-100 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-4 gap-10">
                <div className="border text-black font-mono ">
                    <p>Agro Care</p>
                </div>
                
                <div>
                    <p className="text-black">User Name</p> 
                    <div className="w-full h-15 border bg-gray-200 flex items-center justify-center p-4 gap-4 rounded-2xl">
                        <input value={userName} type='text' className="text-black border-none focus:outline-none " placeholder="Enter user name" onChange={(e) => {setUserName(e.target.value)}} />
                        <User color="black"/>
                    </div>
                </div>

                <div>
                    <p className="text-black">Phone number</p> 
                    <div className="w-full h-15 border bg-gray-200 flex items-center justify-center p-4 gap-4 rounded-2xl">
                        <input value={userNumber} type="tel" className="text-black border-none focus:outline-none " placeholder="Enter phone number" onChange={(e) => setUserNumber(e.target.value)}/>
                        <Phone color="black"/>
                    </div>
                </div>

                <div className="border text-gray-500 mt-14 h-10 rounded-xl w-[80%] items-center flex justify-center font-bold hover:bg-gray-400 hover:text-white">
                    <button  onClick={navigateHome} >
                        Submit
                    </button>
                </div>
            </div>
        </main>
    )
}