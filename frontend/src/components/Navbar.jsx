import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


const Navbar = () => {
     let user = useSelector((state) => state.user.user)
    return (
        <div className={`navbar w-full h-[8%] items-center bg-white text-xl border-1 border-green-800 rounded-full text-green-800 flex ${user?.email? "justify-between": "justify-center"} gap-2 items-center px-5`}>
            <div className='left w-full flex items-center text-2xl gap-2 max-[480px]:text-[18px]'>
                <span className="material-symbols-outlined">grass</span>
                <h1 className='max-[480px]:pt-1 leading-none' style={{ fontFamily: "Lilita One" }}>Fresh Basket</h1>
            </div>
            <div className='middleDiv flex justify-center text-3xl items-center font-semibold gap-4 max-[480px]:gap-2 max-[480px]:text-2xl' style={{ fontFamily: "Josefin Sans" }}>
                <NavLink to="/"><i className="ri-home-wifi-line"></i></NavLink>
                <NavLink className="pt-[2px]" to="/products"><i className="ri-store-3-fill"></i></NavLink>
                {user && user?.isAdmin && <>
                    <NavLink className="leading-none text-3xl max-[480px]:text-2xl" to={"/create-product"}><i className="ri-edit-box-fill"></i></NavLink>
                </>}
            </div>
            <div className='flex font-semibold pl-2 text-3xl max-[480px]:pl-0 pt-[2px] gap-4 justify-center items-center max-[480px]:gap-2 max-[480px]:text-2xl' style={{ fontFamily: "Josefin Sans" }}>
                { user?.email && <NavLink to={"/cart"}><i className="ri-shopping-cart-fill"></i></NavLink>}
                
                   {!user?.email && <NavLink to="/login">Login</NavLink>} 
                   {!user?.email && <NavLink to="/register">Register</NavLink>}

                {user?.email && <NavLink className="bg-green-800 w-[25px] h-[25px] text-[14px] flex justify-center items-center rounded-full text-white" to={"/user-profile"}><i className="ri-user-fill"></i></NavLink>}
            </div>

        </div>
    )
}

export default Navbar