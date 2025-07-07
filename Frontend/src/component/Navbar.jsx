import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/Constant'
import {removeUser } from '../utils/appSlice'


const Navbar = () => {

  const user = useSelector((store)=> store?.userReducer?.user)
  console.log("user in NavBar",user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = async()=>
    {
      const user = await fetch(BASE_URL+'/api/user/logout',{
        method:'POST',
        credentials:'include'
      })
      dispatch(removeUser())
      navigate('/login')
    }


  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">DevNet</a>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    {user?.photoUrl && 
    
    <div className="dropdown dropdown-end">
      <p>Welcome {user?.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user?.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connection">Connection</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/feed">Feed</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
  </>)
}

export default Navbar;