import axios from "axios";
import { useState } from "react";
import WeatherCard from './../weatherCard'
import { Button,Form } from 'react-bootstrap';


let Home = () => {
  const [CityName, setCityName] = useState("");
  const[data, setData]=useState([]);

  let submitHandler = async (e) => {
    e.preventDefault();
    console.log("i am submitHandler function");

    try{
   let response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${CityName}&appid=e48d9da60bddd993c86cb35e8a118731&units=metric`)
    console.log("response:" ,response);
    setData ( response.data.list)

}catch(error){
        console.log('error in api call:' , error);
    }
  }

  return (
    <div>
      <h1>Weather App Home</h1>
      <form onSubmit={submitHandler}>
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>CityName:</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Your CityName"
        required
        onChange={(e)=>{
            setCityName(e.target.value)
                // console.log(e.target.value)
            }} 
             />
       
      </Form.Group>

      {/* CityName: */}
        {/* <input 
        type="text" required 
        placeholder="Enter Your CityName"
        onChange={(e)=>{
            setCityName(e.target.value)
            // console.log(e.target.value)
        }} 
        /> */}
        <Button type="submit">Get Weather</Button>
      </form>

      
         {/* {
            data.map((eachForcast,index) =>(
                <div key={index}>
                    <div>{eachForcast.dt_txt}</div>
                  <h1>  {eachForcast.main.temp} </h1>
                  <div>{eachForcast.main.temp_min} -{eachForcast.main.temp_max}</div>

                </div>
              
            ))
        }  */}
        {
            data.map((eachForcast,index)=>(
         <WeatherCard
          key={index}
          
          date={eachForcast.dt_txt}
          temp={eachForcast.main.temp}
          min={eachForcast.main.temp_min}
          max={eachForcast.main.temp_max}
          />
         
            ))
        }
      
    </div>
  );
};

export default Home;
