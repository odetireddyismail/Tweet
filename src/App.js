import { useState} from "react";
import axios from "axios";
import { AiOutlineSearch} from "react-icons/ai";
import './App.css'
const App = () => {
  const [get, setGet] = useState("");
  const [data, setData] = useState([]);
  console.log(data);

  const handleSearchChange = (e) => { 
    let val = e.target.value; 
    setGet(val);
  };

  const button=()=> {
    axios.get(`/api/tweets?name=${get}`).then((response) => {
      console.log(response);
      const result = response.data.body.data;
      setData(result);
    });
  }

  return (
   
    <div className="box">
      <div className="search">
           <div className="container">
           <input
              type="text"
              value={get}
              className="form-control"
              placeholder="Enter user name"
              onChange={handleSearchChange}
            />
            <button className="btn btn-primary" onClick={()=>button()}>
             <AiOutlineSearch/>
            </button>
          </div>
        
    </div>
    <div>
            {data.map((dh,i)=><div className="key" key={i}>
              {dh.text}
          </div>)}
         </div>
   </div>
       
     
   
  );
};
export default App;
