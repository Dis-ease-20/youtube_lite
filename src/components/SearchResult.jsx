import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import leftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";
import LeftNav from './LeftNav';

const SearchResult = () => {

  const [ result, setResult ] = useState();
  const { SearchQuery } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [SearchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${SearchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    });
  }; 

  return <div className="flex flex-row h-[calc(100%-56px)]">
    <LeftNav />
    <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
      <div className="grid grid-col-1 gap-2 p-5">
        {result?.map((item) => {
          if(item?.type !== "video") return false; 
          let video = item.video;
          return (
            <SearchResultVideoCard key={video?.videoId} video={video} />
          )
        })}
      </div>
    </div>
  </div>
};

export default SearchResult