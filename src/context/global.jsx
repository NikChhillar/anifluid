import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const GlobalContext = createContext();

const animeBaseUrl = "https://api.jikan.moe/v4";

//
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

//
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
    default:
      return state;
  }
};

/**************************************************** */
export const GlobalContextProvider = ({ children }) => {
  //

  const intialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };

  //

  const [state, dispatch] = useReducer(reducer, intialState);
  const [search, setSearch] = useState();

  //
  //
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `${animeBaseUrl}/top/anime?filter=bypopularity`
    );
    const data = await response.json();
    // console.log("popular animes:");
    // console.log(data.data);
    dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  //

  //
  const getAnimePictures = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
    );
    const data = await response.json();
    console.log(data.data);
    dispatch({ type: GET_PICTURES, payload: data.data });
  };

  useEffect(() => {
    getPopularAnime();
  }, []);

  /****************************** */
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getPopularAnime,
        getAnimePictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
