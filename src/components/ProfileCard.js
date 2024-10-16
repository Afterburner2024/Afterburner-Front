import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div>
      <img
        src={`https://github.com/${user.username}.png?size=80`}
        alt={user.name}
        style={{ width: "80px", borderRadius: "50%" }}
      />
      <h2>{user.username}</h2>
      <h3>{user.name}</h3>
    </div>
  );
};

export default ProfileCard;
