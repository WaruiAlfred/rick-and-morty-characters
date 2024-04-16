const EmptyResult = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-slate-700">No characters found</h1>

      <img
        src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        alt="No characters found"
        className="w-1/2 h-1/2 object-cover rounded-lg"
      />
    </div>
  );
};

export default EmptyResult;
