const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-lg font-medium">{title}</h3>
      <p className="text-xl font-medium mt-2">{value}</p>
    </div>
  );
};

export default Card;
