import React,{useState} from 'react';
import axios from "axios";
import './Api.css'
import { AiOutlineSearch} from "react-icons/ai";
const Api = () => {
    const [read, setRead] = useState("");
    const [data, setData] = useState([]);
    console.log(data);
  
    const handleSearchChange = (e) => {
      let val = e.target.value;
      setRead(val);
    };
  
    const displayTweets=()=> {
      axios.get(`/api/tweets?name=${read}`).then((response) => {
        console.log(response);
        const result = response.data.body.data;
        setData(result);
      });
    }
  
    return (
     
<div className="example"  >
  <input type="text"
   placeholder="Search.." 
   name="search" 
   value={read}
   onChange={handleSearchChange}/>
  <button type="submit" onClick={()=>displayTweets()}><AiOutlineSearch /></button>

  {
    data.map((hi,i)=><div className='key'>
      {hi.item}
    </div>)
  }
  </div>
    );
};

export default Api;
