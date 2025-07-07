import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = ()=>
    {
    const user = useSelector((store)=> store?.userReducer?.user)
    console.log('user in profile->',user)
       return user && (
        <div>
        <h3>Profile</h3>
        <EditProfile
        photoUrl={user?.photoUrl}
        firstName={user?.firstName}
        lastName={user?.lastName}
        gender={user?.gender}
        about={user?.about}
        />
        </div>
       )
    }

export default Profile;