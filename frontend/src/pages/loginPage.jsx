import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, User } from "lucide-react";
import bgVid from '../../public/chickencoup.mp4'
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
        <main className="relative  h-screen w-screen ">
            < video autoPlay loop muted playsInline  className="absolute inset-0 w-full h-full object-cover z-0 blur">
                <source src={bgVid} type="video/mp4 "/>
            </video>
            <div className="absolute inset-0 z-10 bg-black/40">
                <div className="border border-white  h-120 w-85 sm:w-100 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-4 gap-10">
                <div className=" text-white font-mono ">
                    <p className="text-3xl">Agro Care</p>
                </div>
                
                <div>
                    <p className="text-white">User Name</p> 
                    <div className="w-full h-15 border bg-gray-200 flex items-center justify-center p-4 gap-4 rounded-2xl bg-transparent">
                        <input value={userName} type='text' className="text-white border-none focus:outline-none  " placeholder="Enter user name" onChange={(e) => {setUserName(e.target.value)}} />
                        <User color="white"/>
                    </div>
                </div>

                <div>
                    <p className="text-white">Phone number</p> 
                    <div className="w-full h-15 border bg-gray-200 flex items-center justify-center p-4 gap-4 rounded-2xl bg-transparent">
                        <input value={userNumber} type="tel" className="text-white border-none focus:outline-none " placeholder="Enter phone number" onChange={(e) => setUserNumber(e.target.value)}/>
                        <Phone color="white"/>
                    </div>
                </div>

                <div className="border text-gray-500 mt-14 h-10 rounded-xl w-[80%] items-center flex justify-center font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] hover:text-white" onClick={navigateHome}>
                    <button   >
                        Submit
                    </button>
                </div>
            </div>
            </div>
            
        </main>
    )
}