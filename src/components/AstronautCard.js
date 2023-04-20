import { useState, useEffect } from "react";
import "../App.css";
function Card() {
  const [astronauts, setAstronauts] = useState([]);
  const [astronautInfo, setAstronautInfo] = useState({});

  useEffect(() => {
    fetch("http://api.open-notify.org/astros.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAstronauts(data.people);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    async function fetchAstronautInfo(name) {
      if (name === "Sultan_Alneyadi") {
        name = "Sultan_Al_Neyadi";
      }
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`
      );
      const data = await response.json();
      setAstronautInfo((prevState) => ({
        ...prevState,
        [name]: {
          name: data.title,
          image: data.thumbnail ? data.thumbnail.source : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/220px-Portrait_Placeholder.png",
          description: data.description,
          shortBio: data.extract,
        },
      }));
    }
    astronauts.forEach((astronaut) => {
      fetchAstronautInfo(astronaut.name);
    });
  }, []);

  return (
    <div>
      <h1>View People Currently In Space</h1>
      {astronauts.map((astronaut) => (
        <div key={astronaut.name} className="card">
          <div className="person-image">
            <img src={astronautInfo[astronaut.name]?.image} alt="Astronaut" />
          </div>
          <div className="person-info">
            <h2>{astronautInfo[astronaut.name]?.name}</h2>
            <p2>{astronautInfo[astronaut.name]?.description}</p2>
            <p>{astronautInfo[astronaut.name]?.shortBio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
