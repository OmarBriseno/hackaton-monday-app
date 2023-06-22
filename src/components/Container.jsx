import { forwardRef } from 'react';
import './index.css';

const Container = ({data}, ref) =>{
    return (
        <div className="chatbox__messages">
          {
            data.map( (elemnet, idx )=>{
              return <div  ref={ref}  key={idx} className={`messages__item messages__item--${elemnet[0]}`}>
                  {elemnet[1]}
              </div>
            } )
          }
        </div>
    )
}

export default forwardRef ( Container );