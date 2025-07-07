import {BASE_URL} from '../utils/Constant'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("akash17@gmail.com");
  const [password, setPassword] = useState("Qwerty2@akash");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const data = await fetch(BASE_URL+"/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          emailId: email,
          passWord: password,
        }),
      });
      if(!data.ok)
        {
          console.log(data.status)
          return;
        }
      const res = await data.json();
      dispatch(addUser(res))
      console.log(res);
      return navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-700">Login</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email address or UserName</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email address..."
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be more than 8 characters, including at least one number, one lowercase letter, and one uppercase letter.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold shadow"
              onClick={handleClick}
            >
              LogIn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
