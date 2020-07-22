/ IPC port
\p 5000

/ Timer interval
\t 5000

SECS_PER_DAY:86400j;
ONE_SEC:`long$1e9;

gbm:{[s;r;t;z] exp(t*r-.5*s*s)+z*s*sqrt t};

bm: {if [count [x] mod 2;'`length]; x:2 0N#x; r:sqrt -2f*log x 0; theta:2f*acos[-1]*x 1; x:r*cos theta; x,:r*sin theta; x};

gen_data:{[n;sym] price:flip `bid`ask!{(x-.0001;x+.0001)} {.00001*`int$(x*100000)} gbm[.2;.05;1%365] bm n?1f; 	time:.z.p+(ONE_SEC*1+til n); 	(flip (`time`sym)!(time;sym)),'price };

gen_trades:{[n]([] time:.z.p+(ONE_SEC*1+til n);price:n?10f; qty:1000*n?1f; side:n?`Buy`Sell)};

/ WebSocket Framework

/ Client lookup table
clients: ([] handle:(); connectedSince: ());

/ Handler Section
/ WS Handler with error reporting
/.z.ws:{neg[.z.w]@[.Q.s value@;x;{`"`'`"`,x,`"`\n`"`}]};
/ WS Handler with deserialization
.z.ws:{neg[.z.w] -8! @[value;-9!x;{`$ "'",x}]};
/ Websocket open
.z.wo:{`clients upsert (x;.z.p)};
/ Websocket close
.z.wc:{ delete from `clients where handle=x; };

/ Client Publish 
pub: { h:(0!clients)[x]; (neg h[`handle]) -8! (enlist `m)!enlist gen_data[4;`EURUSD]; (neg h[`handle]) -8! (enlist `t)!enlist gen_trades[10] };
/ Timer callback
.z.ts:{pub each til count clients;};










