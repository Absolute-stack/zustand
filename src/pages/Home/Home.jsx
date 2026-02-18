import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <Link className="counter-txt">Counter</Link>
      <Link className="shopping-cart-txt">Shopping Cart</Link>
      <Link className="filter-system-txt">Filter System</Link>
    </div>
  );
}
