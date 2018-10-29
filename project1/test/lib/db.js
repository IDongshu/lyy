const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'lyy';
function query(callback) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		console.log("Connected successfully to server");
		const db = client.db(dbName);

        // 以上用于连接数据库,以及找出数据库的名字
        // callback(db);将数据库作为形参传递给实参。
		callback(db);//利用回调把db抛出去
		client.close();
	});
}
module.exports = {
	query
}
