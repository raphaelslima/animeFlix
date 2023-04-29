import React from "react";

import "./style.css";

const maxItens = 9;
const maxItensLeft = (maxItens - 1) / 2;

function Pagination({ limit, total, offset, setOffset }) {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - maxItensLeft, 1);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  return (
    <div>
      <ul>
        <li>
          <button
            onClick={() => onPageChange(current - 1)}
            disabled={current === 1}
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: Math.min(maxItens, pages) })
          .map((_, i) => i + first)
          .map((page) => (
            <li key={page}>
              {" "}
              <button onClick={() => onPageChange(page)}>{page}</button>
            </li>
          ))}
        <li>
          <button
            onClick={() => onPageChange(current + 1)}
            disabled={current === total}
          >
            Próximo
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
