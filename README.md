pragma solidity ^0.4.8;

contract Owned {
	address public owner;

	function Owned() {
		owner = msg.sender;
	}

	modifier onlyOwner {
		if (msg.sender != owner) throw;
		_;
	}

	function transferOwnership(address newOwner) onlyOwner {
		owner = newOwner;
	}
}

contract StandardToken {
	mapping( address => uint ) _balances;
	uint public _supply;
	uint256 public totalSupply;

	event Transfer(address indexed from, address indexed to, uint value);

	function totalSupply() constant returns (uint supply) {
		return _supply;
	}

	function balanceOf( address who ) constant returns (uint value) {
		return _balances[who];
	}

	function transfer( address to, uint value) returns (bool success) {
		if( _balances[msg.sender] < value && _balances[to] + value < _balances[to]) {
			throw;
	}
	if( !safeToAdd(_balances[to], value) ) {
		throw;
	}
	_balances[msg.sender] -= value;
	_balances[to] += value;
	Transfer( msg.sender, to, value );
	return true;
	}

	function safeToAdd(uint a, uint b) internal returns (bool) {
    return (a + b >= a);
  }
}

contract ChainsOfFreedomToken is StandardToken, Owned {
	string public constant name = "Chains Of Freedom";
	string public constant symbol = "DT";
	uint public constant decimals = 0;
	string public constant version = "0.1";
	uint256 public totalSupply = 0;
	uint256 public credit = 0;

	mapping( address => uint ) _balances;

	event Buy(address indexed sender, uint eth, uint fbt);

	function ChainsOfFreedomToken(
		uint initialBalance,
		address centralMinter
		) {
		if(centralMinter != 0 ) owner = msg.sender;
		_balances[msg.sender] = initialBalance;
		initialSupply = initialBalance;
	}

	function transfer(address _to, uint256 _value) returns (bool success) {
		return super.transfer(_to, _value);
	}

	function buyToken(address target, uint256 amount) onlyOwner {
	    
	    mintToken(target, amount);
	}

	function mintToken(address target, uint256 mintedAmount) onlyOwner {
		_balances[target] += mintedAmount;
		totalSupply += mintedAmount;
		Transfer(0, owner, mintedAmount);
		Transfer(owner, target, mintedAmount);
	}

	function() {
		throw;
	}

}
