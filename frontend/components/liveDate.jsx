import { useState, useEffect } from 'react';

export default function LiveDate() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // checking every minute is enough - the date only ever changes
        // once a day, so no need to check every second like the clock does
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);

        return () => clearInterval(timer);
    }, []);

    const formatted = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <p className="text-gray-500 text-[15px]">{formatted}</p>
    );
}