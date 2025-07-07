import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = ()=>
    {
    const user = useSelector((store)=> store?.userReducer?.user)
    console.log('user in profile->',user)
    return user && (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <h3 className="text-3xl font-bold text-blue-700 mb-8">Profile</h3>
        <div className="w-full max-w-2xl bg-base-100 rounded-xl shadow-lg p-8">
          <EditProfile
            photoUrl={user?.photoUrl}
            firstName={user?.firstName}
            lastName={user?.lastName}
            gender={user?.gender}
            about={user?.about}
          />
        </div>
      </div>
    )
    }

export default Profile;