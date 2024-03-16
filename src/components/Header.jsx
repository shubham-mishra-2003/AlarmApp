const Header = () => {
  return (
    <div className="w-full fixed top-0 z-10 bg-black border-b-white flex justify-between items-center p-3 pl-11 pr-11">
      <img src="clock.png" width="50px" />
      <h1 className="text-2xl text-teal-500 font-serif flex flex-col">Alarm Clock<span className="text-sm text-neutral-400">By connect | shubhammishra</span></h1>
    </div>
  )
}

export default Header
