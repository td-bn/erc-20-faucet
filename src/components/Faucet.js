import { useState } from "react";
import { ethers } from "ethers";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Message from './Message';

// Pattern to get deployed address?
let tokenAddress = '0xF3388099C0d9C3C1aA0392CBECa8EB18eAbC25Ca';

const Faucet = (props) => {
    const [balance, setBalance] = useState();
    const [showBalance, setShowBalance] = useState(false);

    async function getAccountsAndProvider() {
        const web3 = window.ethereum;
       if (typeof web3 != 'undefined') {
           const accounts = await web3.request({ method: 'eth_requestAccounts'});
           const provider = new ethers.providers.Web3Provider(web3);
           return [accounts, provider];
       }
    }
    async function getBalance() {
        const [accounts, provider] = await getAccountsAndProvider();
        const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider);
        const balance = await contract.balanceOf(accounts[0]);
        console.log(balance.toString());
        setBalance(balance.toString());
        setShowBalance(true);
    }

    async function drop() {
        const [accounts, provider] = await getAccountsAndProvider();
        const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider.getSigner())
        contract.drop(accounts[0], 10);
    }

    return (
        <div>
            <Card className="card-main">
                <Card.Body>
                    <Card.Subtitle>Receive LearnTokens(LRN) to your wallet</Card.Subtitle>
                    <br></br>
                    <Container>
                        <Row>
                            <Col md="auto">
                                <Button variant="primary" onClick={drop}>Get LRN</Button>
                            </Col>
                            <Col xs={6} md="auto">
                                <Button variant="warning" onClick={getBalance}>Check Balance</Button>
                            </Col>
                            <Col md="auto">
                                {showBalance ? <Message balance={balance} /> : null}
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Faucet;