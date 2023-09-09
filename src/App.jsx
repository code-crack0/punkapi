import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // Using state to keep record of the search word and the beers fetched from the API
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");
  // Using useEffect to fetch the beers from the API as soon as the page is loaded and also when the search word changes
  useEffect(() => {
    if (search === "") {
      axios.get("https://api.punkapi.com/v2/beers").then((res) => {
        setBeers(res.data);
      });
    } else {
      axios
        .get(`https://api.punkapi.com/v2/beers?beer_name=${search}`)
        .then((res) => {
          setBeers(res.data);
        });
    }
  }, [search]);
  return (
    <>
      <h1>Welcome To Beers</h1>
      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </form>
      <div className="beers">
        {beers ? (
          beers.map((beer) => {
            return (
              <div className="card" key={beer.id}>
                <h2>{beer.name}</h2>
                <img src={beer.image_url} alt={beer.name} />
                <p>{beer.description.slice(0, 200)}</p>
              </div>
            );
          })
        ) : (
          <h3>Loading, Please Wait</h3>
        )}
      </div>
    </>
  );
}

export default App;
