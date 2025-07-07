const UserCard = ({ firstName, lastName, about, photoUrl }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl m-3">
      <figure className="px-10 pt-10">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://randomuser.me/api/portraits/men/1.jpg";
          }}
          className="w-24 h-24 rounded-full object-cover border-2 border-primary mb-2"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-primary">{firstName + " " + lastName}</h2>
        <p className="text-base-content mb-4">{about}</p>
      </div>
    </div>
  );
};


export default UserCard;