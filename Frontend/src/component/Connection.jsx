import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addConnection } from "../utils/appSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Connection = ()=>
    {
    const dispatch = useDispatch();
    const fetchConnection = async () => {
        const connection = await fetch(BASE_URL + '/users/connections', {
            credentials: "include"
        });
        if (!connection.ok) {
            return;
        }
        const res = await connection.json();
        dispatch(addConnection(res));
    };

    useEffect(() => {
        fetchConnection();
    }, []);

    const data = useSelector((store) => store?.connectionReducer?.data);
    console.log(data);
    return data && (
        <div className="flex flex-wrap gap-6 justify-center p-4 bg-gray-50 min-h-screen">
            {data?.map((res, index) => (
                <UserCard
                    key={index}
                    firstName={res.fromUserId.firstName}
                    lastName={res.fromUserId.lastName}
                    about={res.fromUserId.about}
                    photoUrl={res.fromUserId.photoUrl}
                />
            ))}
        </div>
    );
}

export default Connection;