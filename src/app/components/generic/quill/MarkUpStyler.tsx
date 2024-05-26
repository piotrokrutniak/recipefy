import styled from "styled-components"

export const MarkUpStyler = styled.div`
& > ul {
  list-style-type: circle;
  list-style-position: inside;
  margin-left: 1rem;
  margin-bottom: 1rem;
  padding: 0.25rem 0;
  font-size: 1rem;
},
& > p {
  font-size: 1rem;
  padding: 0.25rem 0;
},
& > h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.5rem 0 0.5rem 0;
},
& > h2 {
  font-size: 1.25rem;
  font-weight: 500;
},
`;