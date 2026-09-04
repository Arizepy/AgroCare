import { useState, useEffect } from 'react';

export default function LiveClock() {
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

    // pads single digits with a leading zero: 9 -> "09"
    const pad = (num) => String(num).padStart(2, '0');

    return (
        <div className="flex items-baseline gap-2 text-black font-bold mx-5">
            <span className="text-[30px] leading-none">
                {pad(hours12)}:{pad(minutes)}
            </span>
            <span className="text-[10px] leading-none">{period}</span>
        </div>
    );
}