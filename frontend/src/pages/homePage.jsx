import { useEffect, useState } from 'react';
import { LayoutDashboard,
        DropletsIcon,
        LogOut,
        Thermometer,
        Settings, 
        Edit,
        Check,
        Logs,
        DoorOpenIcon, 
        DoorClosed} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx'; 






function SectionWrapper({title, children, darkMode}){ 
    return(
        <section className={clsx(
            'w-full min-h-[calc(100vh-4rem)] rounded-3xl p-4 transition-colors',
            darkMode ? 'bg-gray-800/40' : 'bg-gray-200/20'
        )}>
            <div className={clsx(
                'flex flex-wrap gap-2 justify-start items-center mb-4',
                darkMode ? 'text-white' : 'text-black'
            )}>
                <p className={clsx(
                    'px-2 sm:px-4 text-lg sm:text-xl font-bold border-r',
                    darkMode ? 'border-white' : 'border-black'
                )}>
                    {title}
                </p>
                <LiveClock darkMode={darkMode}/>

            </div>
            {children}
        </section>
    );
}

function LogViewerWrapper({title, darkMode}){
    return(
        <div className='flex flex-col w-full h-full items-center '>        
        <section className={clsx(
            'w-full sm:w-[85%] md:w-[70%] min-h-[calc(10vh-3rem)] rounded-3xl p-4 border mt-5 transition-colors',
            darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white'
        )}>
             <div className={clsx(
                'flex flex-wrap gap-2 justify-start items-center mb-4',
                darkMode ? 'text-white' : 'text-black'
             )}>
                <p className='px-2 sm:px-4 text-lg sm:text-2xl font-bold '>
                    {title}
                </p>
                <section className={clsx(
                    'w-full min-h-[calc(100vh-4rem)] rounded-3xl p-4 m-5',
                    darkMode ? 'bg-gray-800' : 'bg-white'
                )}>

                </section>
               

            </div>
        </section>
    </div>

    )
}
  
function LevelIndicator({level}) { 
    const levelColors = 
     {   1: {color: 'red', value: '25%'},
        2 : {color : '#dbc30a', value: '50%'}, 
        3: {color: 'green', value:'100%'}
     }
    
    const percentageValue = levelColors[level].value; 

    return(
    <div className=' flex-col flex  w-full items-start justify-center px-5 gap-6 '>
        <p className='text-4xl'>{percentageValue}</p>
        <div style={{display: 'flex', gap:'4px'}} className='w-full '>
            
            {[1, 2, 3].map((position) =>{
                const isActive = position <=level;
                const currentLevelData = levelColors[level]; 
                const colorValue = levelColors[level].color; 
                
                
                return(
                    <> 
                        <div key={position}className='h-2 flex-1 rounded ' style={{
                            backgroundColor : isActive ? colorValue : 'gray', 
                        }}>
                        </div>
                    </>
                )
            })}
        </div>
    </div>
    )
}

function LiveClock({darkMode}) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours24 = time.getHours();
    const minutes = time.getMinutes();

    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const pad = (num) => String(num).padStart(2, '0');

    return (
        <div className={clsx('flex items-baseline gap-2  font-bold mx-5 ', darkMode ? 'text-white' : 'text-black')}>
            <span className="text-[30px] leading-none">
                {pad(hours12)}:{pad(minutes)}
            </span>
            <span className="text-[10px] leading-none">{period}</span>
        </div>
    );
}


function ThemeSlider({darkMode, setDarkMode}){
    return(
        <button type='button' onClick={() => setDarkMode(!darkMode)}
            className={clsx(
                'relative w-20 sm:w-24 h-9 sm:h-10 rounded-full flex items-center px-1 transition-colors duration-300 cursor-pointer', darkMode ? 'bg-gray-700' : 'bg-gray-300'
            )}
        >
            <span className={clsx(
                'absolute text-[10px] sm:text-xs font-bold transition-opacity', darkMode ? 'left-2 text-white opacity-100' : 'right-2 text-black opacity-100'
            )}>
                {darkMode ? 'Dark' : 'Light'}
            </span>
            <span className={clsx(
                'h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white shadow-md transform transition-transform duration-300', darkMode ? 'translate-x-[44px] sm:translate-x-[56px]' : 'translate-x-0'
            )} />
        </button>
    );
}

function EditableField({label, value, onSave, darkMode, type='text'}){
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(value);

    const startEdit = () => {
        setDraft(value);
        setIsEditing(true);
    }

    const save = () => {
        if(draft.trim() !== ''){
            onSave(draft.trim());
        }
        setIsEditing(false);
    }

    //Requests: 
    useEffect(() =>{
        const getResourceValue = async () =>{
            const res = await fetch('http://127.0.0.1:5000/api/resource', {
                method : 'GET', 
                headers: {
                    'Content-type' : 'application/json',
                }
            },); 
            if (res.ok){
                const data = await res.json();
                SetFoodLevel(data.data['food_level'])
                setWaterLevel(data.data['water_level'])
            }
            else {
                SetFoodLevel(1); 
                setWaterLevel(2); 
            }; 

        getResourceValue();
        }
    }, [])

    return(
        <div className='w-full sm:w-2/3 flex flex-col sm:flex-row gap-2 sm:gap-5 justify-center items-stretch sm:items-center'>
            <p className={clsx('text-lg sm:text-2xl font-bold sm:w-auto', darkMode ? 'text-white' : 'text-black')}>{label}</p>
            <div className={clsx(
                'border flex-1 rounded flex items-center justify-center px-3 py-2 gap-2',
                darkMode ? 'border-gray-500 bg-gray-700' : 'border-gray-400/70 bg-gray-300'
            )}>
                {isEditing ? (
                    <input type={type}  value={draft} onChange={(e) => setDraft(e.target.value)}  onKeyDown={(e) => { if(e.key === 'Enter') save(); }} autoFocus
                        className={clsx(
                            'w-full bg-transparent outline-none text-lg sm:text-2xl text-center',
                            darkMode ? 'text-white' : 'text-black'
                        )}
                    />
                ) : (
                    <p className={clsx('text-lg sm:text-2xl truncate', darkMode ? 'text-white' : 'text-black')}>{value}</p>
                )}
            </div>
            {isEditing ? (
                <Check className='cursor-pointer self-center' color={darkMode ? 'white' : 'black'} onClick={save} />
            ) : (
                <Edit className='cursor-pointer self-center' color={darkMode ? 'white' : 'black'} onClick={startEdit} />
            )}
        </div>
    );
}



export default function HomePage() {

    const [view, setView] = useState('dashboard')
    const [currentTemperature, setCurrentTemperature] = useState('15.0')
    const [currentHumidity, setCurrentHumidity] = useState('12.0')
    const [foodLevel, SetFoodLevel] = useState(2) 
    const [waterLevel, setWaterLevel] = useState(2)
    const [doorOpen, setDoorOpen] = useState(true)
    const [historyView, setHistoryView] = useState('foodLog')
    const [phoneNumber, setPhoneNumber] = useState('0544748617')
    const [userName, setUserName] = useState('Tampouri Hayat ')
    const [darkMode, setDarkMode] = useState(true)

    const navigate = useNavigate()
    const dashboardView = () =>{ 
        setView('dashboard')
    }

    const logView = () => { 
        setView('log')
    }

    const settingsView = () => { 
        setView('settings')
    }

    const navItems = [
        {key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onClick: dashboardView },
        {key: 'log', label: 'Log', icon: Logs, onClick: logView}
    ]

    const cardClass = clsx(
        'w-full rounded-2xl shadow-md font-bold flex flex-col p-2 items-start',
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
    )

    const cardHeaderClass = clsx(
        'w-full h-10 flex border-b justify-start items-center px-3',
        darkMode ? 'border-gray-600' : 'border-gray-400'
    )

  
    return (
        <main className={clsx(
            'min-h-screen w-full flex flex-col relative transition-colors duration-300',
            darkMode ? 'bg-gray-900' : 'bg-white'
        )}>
            {/**Nav bar */}
                <div className={clsx(
                    'flex w-full h-14 sm:h-16 fixed top-0 items-center justify-start px-4 sm:px-5 z-50 transition-colors duration-300',
                    darkMode ? 'bg-gray-900' : 'bg-white'
                )}>
                    <p className={clsx(
                        'text-xl sm:text-3xl font-mono font-bold',
                        darkMode ? 'text-white' : 'text-black'
                    )} onClick={() =>{setView('dashboard')}}>AgroCare</p>
                </div>
 

            {/**Side bar */}
            <div className={clsx(
                'hidden md:flex fixed top-14 md:top-16 left-2 bottom-0 w-[22%] lg:w-[16%] flex-col justify-start items-center rounded-2xl z-40 transition-colors duration-300',
                darkMode ? 'bg-gray-800/60 text-white' : 'bg-gray-200/40 text-black'
            )}>
                <div className='flex flex-col items-center justify-center mt-7 w-full  px-2 gap-8'>

                    {navItems.map(({key, label, icon: Icon, onClick }) =>(
                        <div key={key} className={clsx(
                            'flex gap-2 w-full items-center hover:bg-gray-500 hover:text-white p-3 px-3 rounded-xl transition-all cursor-pointer', 
                            view === key && 'bg-gray-600 text-white'
                        )} onClick={onClick}>

                            <Icon />

                            <p>{label}</p>
                        </div>
                    ))}
                </div>

                <div className=' bottom-5 absolute flex flex-col justify-center items-center gap-5 w-full px-2'>
                    
                    <div className={`flex gap-2 w-full items-center hover:bg-gray-500 hover:text-white p-3 px-3 rounded-xl transition-all cursor-pointer ${view == 'settings'&&('bg-gray-500 text-white')}`} onClick={settingsView}>
                        <Settings/>
                        <p>Settings</p>
                    </div>

                  


                </div>
            </div>


            {/**Buttom navigation bar  */}
            <div className={clsx(
                'flex md:hidden fixed bottom-0 left-0 right-0 h-16 backdrop-blur justify-around items-center z-50 border-t transition-colors duration-300',
                darkMode ? 'bg-gray-800/90 text-white border-gray-700' : 'bg-gray-200/90 text-black border-gray-300'
            )}>
                    {navItems.map(({key, label, icon:Icon, onClick}) => (
                        <button key={key} className = {clsx(
                            'flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs transition-all', view=== key && 'bg-gray-600 text-white'
                        )} onClick={onClick}>
                            <Icon size={20}/>
                            <p>{label}</p>
                        </button>
                    ))}

                    <button className= {clsx(
                        'flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg text-xs transition-all', view === 'settings' && 'bg-gray-600 text-white'
                    )} onClick={settingsView}>
                        <Settings size={20}/>
                        <p>Settings</p>
                    </button>

                   
            </div>

            <div className='flex-1 w-full pt-14 sm:pt-16 pb-20 md:pb-4 px-2 sm:px-4 md:pl-[24%] lg:pl-[18%] rounded-2xl'>     
                 {view === 'dashboard' && (
                <SectionWrapper title="Dashboard" darkMode={darkMode}>

                    {/**Environmental Conditions */}
                    <p className={clsx('py-3 text-2xl font-bold font-slim tracking-wide px-4 mt-7', darkMode ? 'text-white' : 'text-black')}>Environmental Conditions</p>
                    <div className='flex items-center justify-center  mb-15 '>
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-7 w-full sm:w-[90%] p-1 sm:h-[9.75rem]'>
                                <div className={cardClass}>
                                    <div className={cardHeaderClass}>
                                        <p className='text-lg sm:text-xl'>Temperature</p>
                                    </div>
                                    <div className='flex h-full w-full items-start justify-start gap-10 p-5 pt-6'>
                                        <p className=' sm:text-4xl text-3xl font-mono tracking-wide '>{currentTemperature} °C</p>
                                        <Thermometer size={40} className='border-2 rounded-xl '/>
                                    </div>
                                </div>

                                <div className={cardClass}>
                                    <div className={cardHeaderClass}>
                                        <p className='text-lg sm:text-xl'>Humdidity</p>
                                    </div>
                                    <div className='flex h-full w-full items-start justify-start gap-10 p-5 pt-6'>
                                        <p className='text-3xl sm:text-4xl font-mono tracking-wide '>{currentHumidity} %</p>
                                        <DropletsIcon size={40} className='border-2 rounded-xl '/>
                                    </div>
                                </div>

                                <div className={cardClass}>
                                    <div className={cardHeaderClass}>
                                        <p className='text-lg sm:text-xl'>Door Status</p>
                                    </div>
                                    { doorOpen ? (
                                        <div className='flex h-full w-full items-start justify-start gap-10 p-5 pt-6'>
                                            <p className='text-3xl sm:text-4xl font-mono tracking-wide'>Ajar</p>
                                            <DoorOpenIcon size={43} className='border-2 rounded-xl p-1 '/>
                                        </div>
                                    ): 
                                    (
                                        <div className='flex h-full w-full items-start justify-start gap-10 p-5 pt-6'>
                                            <p className='text-3xl sm:text-4xl font-mono tracking-wide'>Closed</p>
                                            <DoorClosed size={43} className='border-2 rounded-xl p-1 '/>
                                        </div>
                                    )
                                   

                                    }
                                    
                                </div>                    
                        </div>
                    </div>

                    {/**Resource Level */}
                                        <p className={clsx('py-3 text-2xl font-bold font-slim tracking-wide px-4 mt-7', darkMode ? 'text-white' : 'text-black')}>Resource Levels</p>

                     <div className='flex items-center justify-center'>
                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-7 w-full sm:w-[90%] md:w-[80%] p-1 sm:h-[11.25rem]'>
                                    <div className={cardClass}>
                                        <div className={cardHeaderClass}>
                                            <p className='text-lg sm:text-xl'>Food Level</p>
                                        </div>
                                        <div className='w-full p-4 h-full'>
                                            <LevelIndicator level={foodLevel}/>        
                                        </div>  
                                    </div>

                                    <div className={cardClass}>
                                        <div className={cardHeaderClass}>
                                            <p className='text-lg sm:text-xl'>Water Level</p>
                                        </div>
                                       <div className='w-full p-4 h-full'>
                                            <LevelIndicator level={waterLevel}/>        
                                        </div>  
                                    </div>                  
                            </div>
                    </div>
                </SectionWrapper>
            )}

           {view === 'log' && (
            <SectionWrapper title={'Logs'} darkMode={darkMode}>
                <nav className={clsx(
                    'border mt-14 flex h-auto sm:h-14 flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 w-full sm:w-[90%] md:w-[24rem] p-2 rounded-xl mx-auto',
                    darkMode ? 'border-gray-600 text-white' : 'border-gray-400 text-black'
                )}>
                    <div className={clsx(
                        'min-h-11 flex-1 items-center justify-center flex rounded-xl cursor-pointer',
                        historyView === 'foodLog' ? 'bg-gray-600 text-white border-none' : (darkMode ? 'text-white bg-gray-800' : 'text-black bg-white')
                    )} onClick={() =>{setHistoryView('foodLog')}}>
                        <p className='text-lg font-bold'>Food Log</p>
                    </div>
                    <div className={clsx(
                        'min-h-11 flex-1 items-center justify-center flex rounded-xl cursor-pointer',
                        historyView === 'waterLog' ? 'bg-gray-600 text-white border-none' : (darkMode ? 'text-white bg-gray-800' : 'text-black bg-white')
                    )} onClick={() =>{setHistoryView('waterLog')}}>
                       <p className='text-lg font-bold'>Water Log</p>
                    </div>
                    <div className={clsx(
                        'min-h-11 flex-1 items-center justify-center flex rounded-xl cursor-pointer',
                        historyView === 'doorLog' ? 'bg-gray-600 text-white border-none' : (darkMode ? 'text-white bg-gray-800' : 'text-black bg-white')
                    )} onClick={() =>{setHistoryView('doorLog')}}>
                        <p className=' text-lg font-bold'>Door Log</p>
                    </div>
                </nav>

                {historyView === 'foodLog' &&(
                    <LogViewerWrapper title={'Food Log'} darkMode={darkMode}></LogViewerWrapper>
                )}

                {historyView === 'waterLog' &&(
                    <LogViewerWrapper title={'Water Log'} darkMode={darkMode}></LogViewerWrapper>
                )}

                {historyView === 'doorLog' &&(
                    <LogViewerWrapper title={'Door Log'} darkMode={darkMode}></LogViewerWrapper>
                )}

            </SectionWrapper>
           )}
            
           {view === 'settings' && (
            <SectionWrapper title={'Settings'} darkMode={darkMode}>
                <div className='flex flex-col w-full h-full items-center '>        
                        <section className={clsx(
                            'w-full sm:w-[90%] min-h-[calc(10vh-3rem)] rounded-3xl p-4 border mt-5',
                            darkMode ? 'border-gray-700' : 'border-gray-200'
                        )}>
                            <div className='flex flex-wrap gap-2 justify-start items-center mb-4 w-full'>
                                <section className='w-full rounded-3xl p-2 sm:p-4 sm:m-5 flex flex-col gap-8 sm:gap-14'>
                                    <div className={clsx('border rounded-3xl p-5 sm:p-10', darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100')}>

                                        <div className='w-full mt-5 flex flex-col items-center justify-center p-2 sm:p-4 gap-8 sm:gap-10'>
                                            <p className={clsx('text-3xl sm:text-5xl font-bold tracking-wide text-center', darkMode ? 'text-white' : 'text-black')}>User profile</p>

                                            <EditableField
                                                label='User Name:'
                                                value={userName}
                                                onSave={setUserName}
                                                darkMode={darkMode}
                                            />

                                            <EditableField
                                                label='Phone Number:'
                                                value={phoneNumber}
                                                onSave={setPhoneNumber}
                                                darkMode={darkMode}
                                                type='tel'
                                            />

                                            <div className='border border-gray-500/60 w-full sm:w-1/3 flex gap-4 sm:gap-10 bg-red-400/70 justify-center items-center rounded-xl h-12 cursor-pointer' onClick={() =>{navigate('/')}}>
                                                <p className='text-lg font-bold text-white'>Log Out</p>
                                                <LogOut color='white'/>

                                            </div>
                                        </div>
                                    </div>

                                    <div className={clsx('border rounded-3xl p-4 sm:p-5', darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100')}>
                                        <div className='w-full mt-5 flex flex-col items-center justify-center p-2 sm:p-4 gap-8 sm:gap-10'>
                                             <p className={clsx('text-2xl sm:text-4xl font-bold tracking-wide', darkMode ? 'text-white' : 'text-black')}>Personalization</p>
                                                 <div className='w-full sm:w-2/3 flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center'>
                                                <p className={clsx('text-xl sm:text-2xl font-bold', darkMode ? 'text-white' : 'text-black')}>Theme: </p>
                                                <ThemeSlider darkMode={darkMode} setDarkMode={setDarkMode} />
                                            </div>
                                        </div>
                                    </div>

                                    
                                </section>
                            </div>
                        </section>
                </div>
            </SectionWrapper>
           )}
            

            </div>
           
        </main>
    )
}