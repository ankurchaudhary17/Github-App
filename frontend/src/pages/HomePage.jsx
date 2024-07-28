

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent"); // For Most recent, Most Star, Most Fork

 

  const getUserProfileAndRepos = useCallback(async (username="ankurchaudhary17") => {
    setLoading(true);
    try {
     
      // fetch username profile from backend
      const res=await fetch(`http://localhost:5000/api/users/profile/${username}`)
    const {repos,userProfile} = await res.json();
    setUserProfile(userProfile);


      repos.sort((a,b)=>new Date(b.created_at) - new Date(a.created_at));
      setRepos(repos);

      console.log("userProfile", userProfile);
      console.log("repos", repos);

	return {userProfile,repos};


    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);


  // this function for the onSearch 

  const onSearch =async (e,username)=>{
	e.preventDefault(); // this is use to prevent the all default behavior

	setLoading(true);  // in the starting loading is true
	setRepos([]); // this states the current repo is set to be empty
	setUserProfile(null); // ans same for this userprofile null 

	//  Calls an asynchronous function getUserProfileAndRepos
	//   with the username parameter. 
	//  This function is expected to return an object containing 
	//  the user profile and repositories.
	const {userProfile,repos}= await getUserProfileAndRepos(username);
	setUserProfile(userProfile); // Updates the state with the fetched user profile
	setRepos(repos);// Updates the state with the fetched  repositories
	setLoading(false); // after getting all  set loading as false
  setSortType('recent')
  }

   // This section for the sort buttons
   const onSort=(sortType)=>{
      if(sortType=== 'recent'){
		repos.sort((a,b)=>new Date(b.created_at)- new Date(a.created_at));// descending,recent first
	}else if(sortType==="stars"){
		repos.sort((a,b)=>b.stargazers_count - a.stargazers_count); //descending,most stars first
	}else if(sortType==="forks"){
		repos.sort((a,b)=>b.forks_count - a.forks_count); //descending,most forks first
	}

	setSortType(sortType); //Updates the state to reflect the current sort type.

	setRepos([...repos]);//Updates the state with the newly sorted array of repositories.
	// The spread operator [...repos] creates a shallow copy of the 
	//repos array to trigger a state change and ensure 
	//the component re-renders with the sorted repositories.
   }

  return (
    <div className="m-4">
      <Search onSearch={onSearch}/>
     { repos.length >0 && <SortRepos onSort={onSort} sortType={sortType}/>}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
      {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
       { !loading && <Repos repos={repos}/>}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;

