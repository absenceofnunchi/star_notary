pragma solidity >=0.4.21 <0.7.0;


contract StarNotary {
    string public starName;
    address public starOwner;

    constructor() public {
        starName = "My new star";
    }

    event starClaimed(address owner);

    function claimStar() public {
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }

    function changeName(string memory newName) public {
        starName = newName;
    }
}
