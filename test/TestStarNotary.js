const StarNotary = artifacts.require("StarNotary");

let accounts;
let owner;

contract("StarNotary", async (acc) => {
  accounts = acc;
  owner = accounts[0];
});

it("has correct name", async () => {
  let instance = await StarNotary.deployed();
  let starName = await instance.starName.call();
  assert.equal(starName, "My new star");
});

it("can be claimed", async () => {
  let instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  let starOwner = await instance.starOwner.call();
  assert.equal(starOwner, owner);
});

it("can change owners", async () => {
  let instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  let starOwner = await instance.starOwner.call();
  assert.equal(starOwner, owner);
  let secondUser = accounts[1];
  await instance.claimStar({ from: secondUser });
  let secondOwner = await instance.starOwner.call();
  assert.equal(secondUser, secondOwner);
});

it("can change the star name", async () => {
  let instance = await StarNotary.deployed();
  await instance.claimStar({ from: owner });
  await instance.changeName("New Name", { from: owner });
  let newName = await instance.starName.call();
  assert.equal(newName, "New Name");
});
