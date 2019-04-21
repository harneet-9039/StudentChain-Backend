const ChainUtil = require('../chain-util');
//const { DIFFICULTY, MINE_RATE } = require('../config');


class Block{
	constructor(timestamp, lastHash, hash, data) {
		this.timestamp = timestamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.data = data;
		
	}


	toString() {
		return `Block -
			Timestamp: ${this.timestamp}
			Last Hash: ${this.lastHash.substring(0,10)}
			Hash     : ${this.hash.substring(0,10)}
		
			Data     : ${this.data}`;
	}

	static genesis() {
		return new this('Genesis time','-------','fir57-h45h',[]);
	}

	static mineBlock(lastBlock, data){
		const timestamp = Date.now();
		const lastHash = lastBlock.hash;
		const hash = 'todo-hash';
		return new this(timestamp, lastHash, hash, data);
	}

	static hash(timestamp, lastHash, data, nonce)
	{
		return ChainUtil.hash(`${timestamp}${lastHash}${data}`).toString();
	}

	static blockHash(block){
		const {timestamp, lastHash, data} = block;
		return Block.hash(timestamp,lastHash,data);
	}

	/*static adjustDifficulty(lastBlock, currentTime)
	{
		let difficulty = lastBlock.difficulty;
		difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty+1:difficulty-1;
		return difficulty;
	}*/
}

module.exports = Block;
