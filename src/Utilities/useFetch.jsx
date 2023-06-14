import {useState} from "react";
import {POST} from "../shared/Axios"
import { useNavigate } from "react-router-dom";
const useFetch = (url,data) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false)
const navigate=useNavigate()
  const apiCall = (item) => {
    setLoading(true)
    POST(url, data??item??{})
      .then((data) => { setApiData(data); setLoading(false); console.log(data); })
      .catch((err) =>{ setLoading(false); console.log(err); navigate("/error")});
  }
  console.log(apiData, "apiData");
  return [apiData, apiCall, loading];
};
export default useFetch;