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
        const data = await fetch(BASE_URL+'/api/user/signup',
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
            if(!data.ok)
                {
                    console.log("res->",res)
                    return;
                }
            const res = await data.json();
            console.log("navigating to login")
            return navigate('/login')
    }

  
  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        <div className="card bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo</legend>
              <input
                type="text"
                className="input"
                value={Photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">FirstName</legend>
              <input
                type="text"
                className="input"
                value={Firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">LastName</legend>
              <input
                type="text"
                className="input"
                value={Lastname}
                onChange={(e) => setlastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">EmailId</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                value={About}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <UserCard
        photoUrl={Photo}
        firstName={Firstname}
        lastName={Lastname}
        about={About}
      />
    </div>
  );
};

export default SignUp;
