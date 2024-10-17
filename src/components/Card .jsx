import React from "react";

const Card = ({ title, description }) => {
  return (
    <div className="bg-white p-4 rounded shadow-lg w-72">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
