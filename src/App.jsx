import React, { useEffect, useState } from "react";

import SearchInput from "./Components/SearchInput/SearchInput";

const api = "https://kitsu.io/api/edge/anime";

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    if (text) {
      setInfo({});
      fetch(`${api}?filter[text]=${text}&page[limit]=12`)
        .then((res) => res.json())
        .then((res) => {
          setInfo(res);
        });
    }
  }, [text]);

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput value={text} onChange={(e) => setText(e)} />
      {text && !info.data && <span>Carregando...</span>}
      {info.data && (
        <ul>
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={`Capa de ${anime.attributes.canonicalTitle}`}
              />
              <p>{anime.attributes.canonicalTitle}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
