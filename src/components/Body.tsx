import { useState, useEffect } from 'react';
import { icons } from '../data/icons';

const Body = () => {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setIdx((prevIdx) => (prevIdx + 1) % icons.length);        
        }, 3000);

        return () => clearInterval(timer);
    }, [])

    return ( 
        <section className="section-1">
            <h1 className="section-heading">
                Monthly Lunch Planner
            </h1>
            <div className="section-1-icons">
                <i className={icons[idx] + ' change'}></i>                        
            </div>
        </section>
    );
}
 
export default Body;