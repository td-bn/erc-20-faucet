import logo from './logo.svg';
import './App.css';
import LearnToken from './artifacts/contracts/LearnToken.sol/LearnToken.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from 'react-bootstrap';
import Faucet from './components/Faucet';
import TokenSend from './components/TokenSend';

function App() {

  const Token = LearnToken;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <h2 className="App-intro"><em>LearnToken</em> Faucet: A simple ERC-20 token faucet</h2>
      </header>
      <Container>
        <Row>
          <Faucet tokenContract={Token} />
        </Row>
        <Row>
          <TokenSend tokenContract={Token} /> 
        </Row>
      </Container>
    </div>
  );
}

export default App;
