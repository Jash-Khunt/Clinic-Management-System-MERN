import {faqs} from '../assets/data/faqs.js';
import FaqItem from './FaqItem.jsx';

const FaqList = () => {
  return (
    <ul className='arrow'>
        {faqs.map((item, index) => (
            <FaqItem item={item} key={index}/>
        ))}
    </ul>
  )
}

export default FaqList