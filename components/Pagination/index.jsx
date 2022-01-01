import React from "react";
import styled from "styled-components";

export const Pagination = ({ value, onChange, range }) => {
  let pattern = null;

  switch (true) {
    case range < 7:
      pattern = [...new Array(range)].map((_, i) => i + 1);
      break;
    case value < 4:
      pattern = [1, 2, 3, 4, 5, "...", range];
      break;
    case value > range - 4:
      pattern = [1, "...", range - 4, range - 3, range - 2, range - 1, range];
      break;
    default:
      pattern = [1, "...", value - 1, value, value + 1, "...", range];
  }

  function changeNumber(n) {
    if (typeof n === "number" && n > 0 && n <= range) {
      onChange(n);
    }
  }
  return (
    <Container className="container">
      <button disabled={value <= 1} onClick={() => changeNumber(value - 1)}>
        {"<"}
      </button>
      {pattern.map((label) => (
        <button key={label.id}
          className={value === label ? "active" : ""}
          onClick={() => changeNumber(label)}
          isActive={value === label}
        >
          {label}
        </button>
      ))}
      <button disabled={value >= range} onClick={() => changeNumber(value + 1)}>
        {">"}
      </button>
    </Container>
  );
};
export const Container = styled.div`
  background: #fdfdfd;
  padding: 1rem;
  margin: 3rem auto;
  display: flex;
  border-radius: 0.2rem;
  box-shadow: 0 4px 6px 0 rgb(0 0 0 / 30%);
  counter-reset: pagination;
  text-align: center;
  overflow-x: auto;


`