import {useState} from "react";
import {POST} from "../shared/Axios"
const useFetch = (url,data) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false)

  const apiCall = (item) => {
    console.log(url,data,"data",item);
    setLoading(true)
    POST(url, data??item??{})
      .then((data) => { setApiData(data); setLoading(false); console.log(data); })
      .catch((err) => console.log(err));
  }
  console.log(apiData, "apiData");
  return [apiData, apiCall, loading];
};
export default useFetch;