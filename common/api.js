
var base_url = "https://www.cryptocompare.com/api/data/";
var min_base_url = "https://min-api.cryptocompare.com/data/";
var coin_market_cap_url = "https://api.coinmarketcap.com/v1/ticker/?limit=200";

var coinlist_url = base_url+"coinlist/";
var coinsubscriptions_url = base_url+"coinsnapshotfullbyid?";
var price_url = min_base_url+"price?";
var histo_hour_url = min_base_url+"histohour?";


function Subscription(fsym, tsym, exchange){
	this.fsym = fsym;
	this.tsym = tsym;
	this.exchange = exchange;
}

function CoinStatus(fsym, tsym, price, percentChange){
	this.fsym = fsym;
	this.tsym = tsym;
	this.price = price;
	this.percentChange = percentChange;
}



function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// return dict mapping coin symbols to their market cap ranking
export function getCoinRankings() {

	return fetch(coin_market_cap_url)
	.then(handleErrors)
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		var coinRanks = {};

		data.forEach(function(coinInfo) {
			coinRanks[coinInfo['symbol']] = parseInt(coinInfo['rank']);
		});
		return coinRanks;
	});
}

// Retuns a list of all available coins, their name, symbol and id
export function getCoinList() {

	var getCoinData = fetch(coinlist_url)
	.then(handleErrors)
	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		return json["Data"];
	});

	return Promise.all([getCoinData, getCoinRankings()])
	.then(function(results) {
		var data = results[0];
		var coinRanks = results[1];
		var coins = [];

		Object.keys(data).forEach(function(key) {
			coins.push({
				"Id" : data[key]["Id"],
				"Symbol" : key,
				"Name" : data[key]["CoinName"],
				"SortOrder" : coinRanks[key] || 99999,
			});
		});
		return coins;
	});
}



// given a coins Id number returns the available subscriptions which contain the currency paired against and the exchange
export function getCoinSubscriptions(id) {
	var url = coinsubscriptions_url;
	url += 'id='+id;

	return fetch(url)
	.then(handleErrors)
	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		var subs = []
		json["Data"]["Subs"].forEach(function(sub) {
			var params = sub.split("~");
			var exchange = params[1];
			var fsym = params[2];
			var tsym = params[3];

			subs.push(
				new Subscription(fsym, tsym, exchange)
			);
		});
		return subs;
	});
}


// get the most recent price 
export function getPrice(sub) {
	console.log(sub);

	var url = price_url;
	url += "fsym="+sub.fsym;
	url += "&tsyms="+sub.tsym;
	url += "&e="+sub.exchange;

	return fetch(url)
	.then(handleErrors)
	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		console.log(json)
		var price = json[sub.tsym];
		return price;
	});
}



function percent_change(x0, x1) {
	return 100.0*(x1 - x0)/x0;
}

// get the % change in price for last 1 day, 3 days and 7 days
export function getChange(sub) {
	var url = histo_hour_url;
	url += "fsym="+sub.fsym;
	url += "&tsym="+sub.tsym;
	url += "&e="+sub.exchange;
	url += "&aggregate=1&limit=200";

	return fetch(url)
	.then(handleErrors)
	.then(function(response) {
		return response.json();
	})
	.then(function(json) {
		return json["Data"];
	})
	.then(function(data) {
		var result = {};
		result['1day'] = percent_change(data[data.length-24-1]['close'], data[data.length-1]['close']);
		result['3day'] = percent_change(data[data.length-24*3-1]['close'], data[data.length-1]['close'])
		result['7day'] = percent_change(data[data.length-24*7-1]['close'], data[data.length-1]['close'])
		return result;
	});
}


export function getCoinStatus(sub){
	return Promise.all([getPrice(sub), getChange(sub)])
	.then(function(results) {
		var price = results[0];
		var changes = results[1];
		return new CoinStatus(sub.fsym, sub.tsym, price, changes);
	});
}



