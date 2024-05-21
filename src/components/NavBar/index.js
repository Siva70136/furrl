import { BsHandbag } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import './index.css'

const NavBar = () => {

    return (
        <div className="nav-container">
            <div className='nav-items'>
                <div className=''>
                    <MdMenu className="menu" />
                </div>
                <div className=''>
                    <h1 className="app-name">Furrl</h1>
                </div>
                <div className=''>
                    <a href="https://furrl.in/wishlist">
                        <img src="https://web.furrl.in/_next/static/media/Whislist.2ac94d87.svg" alt="wishlist" className="wishlist" />
                    </a>
                    <a href="https://furrl.in/cart">
                        <BsHandbag className="cart" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NavBar;