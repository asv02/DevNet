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
      const user = await fetch(BASE_URL+'/user/logout',{
        method:'POST',
        credentials:'include'
      })
      dispatch(removeUser())
      navigate('/login')
    }


  return (
    <nav className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <a className="text-2xl font-bold text-blue-700 tracking-wide hover:text-blue-900 transition cursor-pointer">DevNet</a>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32 md:w-56"
            />
            {user?.photoUrl && (
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer select-none">
                  <img
                    src={user?.photoUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-blue-300 shadow"
                  />
                  <span className="text-gray-700 font-semibold hidden md:inline">Welcome {user?.firstName}</span>
                </div>
                <ul className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-50">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-blue-100 rounded transition flex justify-between items-center">
                      Profile
                      <span className="ml-2 bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded">New</span>
                    </Link>
                  </li>
                  <li><Link to="/connection" className="block px-4 py-2 hover:bg-blue-100 rounded transition">Connection</Link></li>
                  <li><Link to="/requests" className="block px-4 py-2 hover:bg-blue-100 rounded transition">Requests</Link></li>
                  <li><Link to="/feed" className="block px-4 py-2 hover:bg-blue-100 rounded transition">Feed</Link></li>
                  <li><Link to="/signup" className="block px-4 py-2 hover:bg-blue-100 rounded transition">SignUp</Link></li>
                  <li><a onClick={handleLogout} className="block px-4 py-2 hover:bg-red-100 text-red-600 rounded transition cursor-pointer">Logout</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;