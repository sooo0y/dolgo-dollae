import Router from "./shared/Router";
import { Provider } from "react-redux";
import store from "./redux//store";
import styled from "styled-components";

import "./App.css";

function App() {
  return (
    <StApp>
      <Provider store={store}>
        <Router />
        <Feedback
          onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSd6G1mty9db-xPMi0EqnvPyn90O_LnaROtJQSJE5ff8_u1BRA/viewform?usp=sf_link"
            )
          }
        >
          피드백하고
          <br />
          경품 받자 🎈
        </Feedback>
      </Provider>
    </StApp>
  );
}

export default App;

const StApp = styled.div`
  font-family: bold;
`;

const Feedback = styled.button`
  @keyframes button {
    0% {
      transform: translate(5px, 0);
    }
    100% {
      transform: translate(5px, 5px);
    }
  }
  animation-name: button;
  animation: button 1s;
  animation-iteration-count: infinite;
  position: fixed;
  right: 0;
  bottom: 0;
  margin-right: 30px;
  margin-bottom: 70px;
  border: none;
  border-radius: 10px;
  width: 130px;
  height: 55px;
  font-weight: bold;
  background-color: #ffdc5f;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 999;
  font-size: 16px;
  color: black;
  opacity: 0.9;
`;
