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
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Email address or UserName
            </legend>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input"
              placeholder="Email address..."
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleClick}>
                LogIn
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
