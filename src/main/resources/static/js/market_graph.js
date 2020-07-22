    
		var trace1 = {
			type: "scatter",
			mode: "lines",
			name: 'Bid',
			x: [],
			y: [],
			line: {color: '#17BECF'}
		};

		var trace2 = {
			type: "scatter",
			mode: "lines",
			name: 'Ask',
			x: [],
			y: [],
			line: {color: '#7F7F7F'}
		};

		var data = [trace1,trace2];

		var layout = {
		  title: 'Basic Time Series',
		};

		Plotly.newPlot('chart', data, layout);

		
		var updateMarketData = function(data) {
			console.log("[UPDATE] " + data);		

			let time = data.map(function(x) {return x.time;});
			let bid = data.map(function(x) {return x.bid;});
			let ask  = data.map(function(x) {return x.ask;});

			trace1.x.push.apply(trace1.x,time );
			trace2.x.push.apply(trace2.x, time);

			trace1.y.push.apply(trace1.y, bid);
			trace2.y.push.apply(trace2.y, ask);

			Plotly.update('chart', data, layout);

		};

		var updateTradeData = function(data) {
			console.log('[TRADE]');
			let tradeTable = $('#trades').DataTable();
			tradeTable.rows.add(data).draw().nodes().to$().animate({color:'black'});

		};

		var dispatch = function(data) {
			if (data.hasOwnProperty("m")) {		// market data update
				updateMarketData(data['m']);
			}
			else if (data.hasOwnProperty("t")) { 	//  trade data update
				updateTradeData(data['t']);
			}
		};

		if ("WebSocket" in window) {
		var l = window.location;
		var socket = new WebSocket("ws://127.0.0.1:5000");
		socket.binaryType = 'arraybuffer';

		socket.addEventListener('open', (event) => {
			console.log("connected:" + event);
		});

		socket.addEventListener('close', (event) => {
			console.log("connection closed:" + event);
		});

		socket.addEventListener('message', (msg) => {
			console.log("Received data:" + msg.data);
			var data = deserialize(msg.data);
			dispatch(data);
		});

	
		socket.addEventListener('error', (event) => {
			console.log("connection error:" + event);
		});

		console.log("connecting...");
  	} 

			$(document).ready(function() {
			var tradeTable = $('#trades').DataTable({
				columns:[
					{
						className: 'details-control',
						orderable: false,
						data: null,
						defaultContent: ''
					},
					{data:"time"},
					{
						data:"price",
						render: function(data, type, row) {
							 
						}
						
					},
					{data:"qty"},
					{data:"side"}
				],
				order: [[1, 'desc']],
				deferRender: true,
				columnDefs:[{
					targets: 4,
					createdCell: function(cell,cellData,rowData,rowIndex,colIndex) {
					if (cellData==="Buy") {
						$(cell).css('color','red');
					} else {
						$(cell).css('color','blue');
					}
				}
				}] 
			});
		});
	