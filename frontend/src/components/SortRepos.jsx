const SortRepos = ({ onSort, sortType }) => {
  // sorttype is use for giveing the border to the button when click
  // and onSort is use to sort on the basic of react,start,forks on click

  const BUTTONS = [
    { type: "recent", text: "Most Recent" },
    { type: "stars", text: "Most Stars" },
    { type: "forks", text: "Most Forks" },
  ];
  return (
    <div className="mb-2 flex justify-center lg:justify-end">
      {/* This is short way of doing this  */}
      {BUTTONS.map((button) => (
        <button
          key={button.type}
          type="button"
          className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass ${
            button.type == sortType ? "border-blue-500" : ""
          }`}
          onClick={() => onSort(button.type)}
        >
          {button.text}
        </button>
      ))}

      {/* ==========Note do like that or use short way and i am using short way by using map ================ */}
      {/* In this page we make three buttons one fort he Most recent and other for Most stars and another for Most Forks  */}
      {/* <button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
				${sortType==="recent" ? "border-blue-500" : ""}`}
				onClick={()=>onSort("recent")}
			>
				Most Recent
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
				${sortType==="stars" ? "border-blue-500" : ""}`}
				onClick={()=>onSort("stars")}
			>
				Most Stars
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass
				${sortType==="forks" ? "border-blue-500" : ""}`}
				onClick={()=>onSort("forks")}
			>
				Most Forks
			</button> */}
    </div>
  );
};

export default SortRepos;
