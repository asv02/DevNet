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
        const data = await fetch(BASE_URL+'/user/updateUser',
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
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Edit Profile</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Photo URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={Photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">First Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={Firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={Lastname}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Gender</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">About</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={About}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleSave}
            >
              Save Profile
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

export default EditProfile;
