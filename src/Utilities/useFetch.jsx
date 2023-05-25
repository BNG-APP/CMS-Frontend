import {useState} from "react";
import {POST} from "../shared/Axios"
const useFetch = (url, data = {}) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false)

  const apiCall = () => {
  console.log(url,data,"data");
    setLoading(true)
    POST(url, data)
      .then((data) => { setApiData(data); setLoading(false); console.log(data); })
      .catch((err) => console.log(err));
  }
  console.log(apiData, "apiData");
  return [apiData, apiCall, loading];
};
export default useFetch;