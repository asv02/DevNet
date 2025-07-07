const UserCard = ({firstName,lastName,about,photoUrl}) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm m-3">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://randomuser.me/api/portraits/men/1.jpg"; }}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            {about}
          </p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};


export default UserCard;