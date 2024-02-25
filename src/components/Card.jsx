const Card = ({ children }) => {
  return (
    <div className="w-fit rounded-2xl p-6 ring-1 ring-slate-200 shadow-md shadow-slate-200 hover:shadow-slate-300">
      {children}
    </div>
  );
};

export default Card;
