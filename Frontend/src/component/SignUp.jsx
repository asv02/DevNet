import { useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/Constant";

const SignUp = () => {

  const [Photo, setPhoto] = useState('');
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setlastName] = useState('');
  const [Gender, setGender] = useState('');
  const [About, setAbout] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSave = async()=>
    {
        const data = await fetch(BASE_URL+'/user/signup',
            {
                method:'POST',
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    photoUrl:Photo,
                    firstName:Firstname,
                    lastName:Lastname,
                    gender:Gender,
                    about:About,
                    emailId:emailId,
                    passWord:password
                }),
            })
            const res = await data.json();
            if(!data.ok)
                {
                    console.log("res->",res)
                    return;
                }
            console.log("navigating to login")
            return navigate('/login')
    }

  
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-8 bg-base-200 min-h-screen">
      <div className="w-full max-w-md mx-auto bg-base-100 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Sign Up</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-base-content font-semibold mb-1">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={Photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base-content font-semibold mb-1">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={Firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base-content font-semibold mb-1">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={Lastname}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base-content font-semibold mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base-content font-semibold mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base-content font-semibold mb-1">Gender</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-base-content font-semibold mb-1">About</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={About}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-xs mx-auto mt-8 md:mt-0">
        <UserCard
          photoUrl={Photo}
          firstName={Firstname}
          lastName={Lastname}
          about={About}
        />
      </div>
    </div>
  );
};

export default SignUp;
