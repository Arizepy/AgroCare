import { useEffect, useState } from 'react';
import { LayoutDashboard,
        Thermometer ,
        Activity, 
        Settings, 
        Sidebar, 
    InfoIcon, 
    Info} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import clsx from 'clsx';
import LiveClock from '../../components/liveClock';
import LiveDate from '../../components/liveDate';



export default function HomePage() {

    const [view, setView] = useState('dashboard')
    const [activeDashboard, setActiveDashboard] = useState(true)
    console.log(view)

    const [currentTemperature, setCurrentTemperature] = useState('')
    const dashboardView = () =>{ 
        setView('dashboard')
    }

    const activityView = () => { 
        setView('activity')
    }

    const settingsView = () => { 
        setView('settings')
    }

    const aboutView = () => {
        setView('about')
    }

//    useEffect(() => {
//     const getTemperature = async () => { 
//         try {
//             const response = await fetch('http://localhost:5000/api/getTemperature');
//             const data = await response.json();
//             setCurrentTemperature(data);
//             console.log(data);
//         } catch (error) {
//             console.error('Failed to fetch temperature:', error);
//         }
//     }

//     getTemperature(); 
// }, [])

  
    return (
        <main className='bg-white min-h-screen w-screen flex-col relative  '>
            {/**Nav bar */}
                <div className='flex w-full top-0 h-15 fixed   items-center justify-start px-5 z-100 '>
                    <p className='text-3xl font-mono text-black font-bold'>AgroCare</p>
                </div>
            {/**Side bar */}
            <div className='fixed top-15 left-2 bottom-0 w-[12%] flex flex-col justify-start items-center text-black bg-gray-200/40 rounded-2xl'>

                <div className='flex flex-col items-center justify-center mt-7 aboslute  gap-8'>

                   <div className={`flex gap-2 hover:bg-gray-500 hover:text-white p-3 px-3 rounded-xl transition-all pointer-cursor ${view === 'dashboard' ? 'bg-gray-600  text-white' :null }` } onClick={dashboardView}>
                        <LayoutDashboard/>
                        <p >Dashboard</p>
                    </div>

                   <div className={`flex gap-2 hover:bg-gray-500 hover:text-white p-3 px-6 rounded-xl transition-all   ${view === 'activity' ?  'bg-gray-600 text-white':null}`} onClick={activityView}>
                        <Activity/>
                        <p>Activity </p>
                    </div>
                </div>

                <div className=' bottom-5 absolute flex flex-col justify-center items-center gap-5'>
                    
                    <div className='flex gap-2 hover:bg-gray-500 hover:text-white p-3 px-6 rounded-xl transition-all' onClick={aboutView}>
                        <InfoIcon/>
                        <p>About</p>
                    </div>

                    <div className='flex bg-red-300 border-red-500 border p-3 rounded-xl px-5 text-gray-700 gap-2 hover:bg-red-400 hover:text-gray-950   transition-all duration-1s' onClick={settingsView}>
                            <Settings/>
                           <p>Settings</p>
                    </div>


                </div>
            </div>

            { view === 'dashboard' ?(
                 //Dashboard body 
                 <section className=' absolute left-50 w-[85%] h-[95%] top-1/2 left-1/2 -transalate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-200/20 p-4'>
                    <div className='fixed top-4 flex  text-black flex  justify-between items-center '>
                        <p className='px-4 text-xl font-bold border-r border-black '> Dashboard</p>
                        <LiveClock />
                        
                    </div>
                        <p className='text-black relative top-19 my-2 '>Environemnt conditions</p>
                    <div className=' flex flex-col-3  gap-7 w-full relative top-25 h-[30%] p-1 '>
                    
                        <div className=' w-full rounded-2xl bg-white shadow-3 text-black font-bold flex flex-col p-2  '>
                           <div className='w-full h-10 flex border-b border-gray-400 justify-start items-center px-3   ' >
                            <p className='text-xl '>Temperature</p>
                           </div>
                           <div>
                                <p>{currentTemperature} C</p>
                                <Thermometer size={30} className='text-black border border-3 rounded-xl'/>
                           </div>
                            
                        </div>
                        <div className='w-full rounded-2xl bg-white '></div>
                        <div className='w-full rounded-2xl bg-white shadow-3'></div>
                    </div>
            </section>
            )

            : view === 'activity'? (
                //Activity body 
               <section className=' absolute left-50 w-[85%] h-[95%] top-1/2 left-1/2 -transalate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-200/20 p-4'>
                    <div className='fixed top-4 flex  text-black flex  justify-between items-center '>
                        <p className='px-4 text-xl font-bold border-r border-black '> House Activity</p>
                        <LiveClock />
                   </div>
            </section>
            )

            : view === 'settings'? (
                <section className=' absolute left-50 w-[85%] h-[95%] top-1/2 left-1/2 -transalate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-200/20 p-4'>
                    <div className='fixed top-4 flex  text-black flex  justify-between items-center '>
                        <p className='px-4 text-xl font-bold border-r border-black '> Settings</p>
                        <LiveClock />
                   </div>
            </section>
            )
            
            : view === 'about' ?(
               <section className=' absolute left-50 w-[85%] h-[95%] top-1/2 left-1/2 -transalate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-200/20 p-4'>
                    <div className='fixed top-4 flex  text-black flex  justify-between items-center '>
                        <p className='px-4 text-xl font-bold border-r border-black '> About</p>
                        <LiveClock />
                        
                    </div>
            </section>
            )
            
        :null
            }
            
           
        </main>
    )
}