const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LearnToken", function() {

  let learnToken, owner, other;

  beforeEach(async function() {
    [owner, other] = await ethers.getSigners();
    const LearnToken = await ethers.getContractFactory("LearnToken");
    learnToken = await LearnToken.deploy("LearnToken", "LRN");
  })

  it("should have correct name and symbol", async function() {
    expect(await learnToken.symbol()).equals("LRN");
    expect(await learnToken.name()).equals("LearnToken");
  });

  
  it("should assign initial supply to the owner", async function() {
    const ownerBalance = await learnToken.balanceOf(owner.address);
    expect(ethers.utils.formatEther(ownerBalance)).equals("10000.0");
  });

  it("should mint tokens when user request a drop from the faucet", async function() {
    let balance;
    balance = await learnToken.balanceOf(other.address);
    expect(ethers.utils.formatEther(balance)).equals('0.0');

    await learnToken.connect(other).drop(other.address, 10);
    balance = await learnToken.balanceOf(other.address);
    expect(balance).equals('10');
  });

  it("should transfer tokens", async function() {
    let balance;
    balance = await learnToken.balanceOf(other.address);
    expect(ethers.utils.formatEther(balance)).equals('0.0');

    await learnToken.transfer(other.address, 10);
    balance = await learnToken.balanceOf(other.address);
    expect(balance).equals('10');
  });
});
