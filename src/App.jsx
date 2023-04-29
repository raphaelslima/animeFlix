import React, { useEffect, useState } from "react";

import qs from "qs";

import SearchInput from "./Components/SearchInput/SearchInput";
import Pagination from "./Components/Pagination/Pagination";

const api = "https://kitsu.io/api/edge/anime";
const limit = 6;

function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  const [offset, setOffet] = useState(0);

  useEffect(() => {
    const querry = {
      page: {
        limit: limit,
        offset: offset,
      },
    };

    if (text) {
      querry.filter = {
        text: text,
      };
    }

    fetch(`${api}?${qs.stringify(querry)}`)
      .then((res) => res.json())
      .then((res) => {
        setInfo(res);
      });
  }, [text, offset]);

  return (
    <div className="App">
      <h1>Animes</h1>
      <SearchInput value={text} onChange={(e) => setText(e)} />
      {!info.data && <span>Carregando...</span>}
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
      {info.meta && (
        <Pagination
          limit={limit}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffet}
        />
      )}
    </div>
  );
}

export default App;
