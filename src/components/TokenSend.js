import { useState } from "react";
import { ethers } from "ethers";
import { Card, Button, Container, Row, Col} from "react-bootstrap";

// Pattern to get deployed address?
let tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const TokenSend = (props) => {
    const [userAccount, setUserAccount] = useState();
    const [amount, setAmount] = useState();

    async function getAccountsAndProvider() {
       const web3 = window.ethereum;
       if (typeof web3 != 'undefined') {
           const accounts = await web3.request({ method: 'eth_requestAccounts'});
           const provider = new ethers.providers.Web3Provider(web3);
           return [accounts, provider];
       }
    }

    async function sendCoins() {
        const [, provider] = await getAccountsAndProvider();
        const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider.getSigner());
        const transaction = await contract.transfer(userAccount, amount);
        await transaction.wait();
        console.log(`Transfered ${amount} tokens to ${{userAccount}}`);
    }

    return (
        <Card className="card-main">
            <Card.Body>
                <Card.Subtitle>Send LRN to an address</Card.Subtitle>
                <br />
                <Container>
                    <Row>
                        <Col>
                            <input onChange={e=>setUserAccount(e.target.value)} placeholder="Address" /> 
                        </Col>
                        <Col>
                            <input onChange={e=>setAmount(e.target.value)} placeholder="Amount" /> 
                        </Col>
                        <Col>
                            <Button onClick={sendCoins} variant="primary">Send</Button>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
 
}

export default TokenSend;