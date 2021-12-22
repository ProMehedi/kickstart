pragma solidity ^0.4.17;

contract Factory {
  address[] public deployedCampaigns;

  function createCampaign(uint _minimum) public {
    address newCampaign = new Campaign(_minimum, msg.sender);
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[] memory) {
    return deployedCampaigns;
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping (address => bool) approvals;
  }

  Request[] public request;
  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  function Campaign(uint _minimum, address creator) public {
    manager = creator;
    minimumContribution = _minimum;
  }
  
  function contribute() public payable {
    require(msg.value >= minimumContribution);
    approvers[msg.sender] = true;
    approversCount++;
  }

  function createRequest(string _description, uint _value, address _recipient) public restricted {
    require(approvers[msg.sender]);
    Request memory newRequest = Request({
      description: _description,
      value: _value,
      recipient: _recipient,
      complete: false,
      approvalCount: 0
    });
    request.push(newRequest);
  }

  function approveRequest(uint _requestId) public {
    Request storage newReq = request[_requestId];

    require(approvers[msg.sender]);
    require(!newReq.approvals[msg.sender]);

    newReq.approvals[msg.sender] = true;
    newReq.approvalCount++;
  }
  
  function finalizeRequest(uint _requestId) public restricted {
    Request storage newReq = request[_requestId];

    require(newReq.approvalCount > (approversCount / 2) );
    require(!newReq.complete);

    newReq.recipient.transfer(newReq.value);
    newReq.complete = true;
  }

  function getSummary() public view returns (uint, uint, uint, uint, address) {
    return (
      minimumContribution,
      this.balance,
      request.length,
      approversCount,
      manager
    );
  }

  function getRequestsCount() public view returns (uint) {
    return request.length;
  }
}