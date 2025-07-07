import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/Constant";

const EditProfile = ({ photoUrl, firstName, lastName, gender, about }) => {
  const [Photo, setPhoto] = useState(photoUrl);
  const [Firstname, setFirstName] = useState(firstName);
  const [Lastname, setlastName] = useState(lastName);
  const [Gender, setGender] = useState(gender);
  const [About, setAbout] = useState(about);

  const handleSave = async()=>
    {
        const data = await fetch(BASE_URL+'/api/user/updateUser',
            {
                method:'PUT',
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({
                    photoUrl:Photo,
                    firstName:Firstname,
                    lastName:Lastname,
                    about:About
                }),
                credentials:"include"
            })
            const res = await data.json();
            if(!res.ok)
                {
                    return;
                }
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

export default EditProfile;
