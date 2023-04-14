var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
   res.sendFile(__dirname + "/index.html");
})

app.get('/js/DPlayer.min.js', function (req, res) {
    res.sendFile( __dirname + '/js/DPlayer.min.js' );
 })//http://localhost:8081/js/DPlayer.min.js

 app.get('/resource/Lycoris.mp4', function (req, res) {
    res.sendFile( __dirname + "/resource/Lycoris.mp4" );
 })//http://localhost:8081/resource/Lycoris.mp4
 app.get('/v3', function (req, res) {
    res.send();
 })
 app.post('/v3', function (req, res) {
 
    // 输出 JSON 格式
    console.log(req);
    var response = {
        "text": 'Get a danmaku via WebSocket',
        "color": '#fff',
        "type": 'right',
    };
    res.send(response);
    console.log(response);
    //res.end(JSON.stringify(response));
 })

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

// 创建 WebSocket 服务器 监听在 3000 端口
const wss = new WebSocketServer({port: 3000});
var clients = [];
//如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket：
wss.on('connection', (ws) => { // 在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接
    for(let i = 0 ; i < clients.length ; i++){
        if(clients[i].readyState==3){
            for(let f = i+1 ; f < clients.length ; f ++){
                clients[f-1]=clients[f];
            }
            clients.pop();
            i--;
        }
    }
    clients.push(ws);
  console.log('连接了');
    // 接收客户端信息并把信息返回发送
    ws.on('message', (message) => {
      // send 方法的第二个参数是一个错误回调函数
      console.log(message.toString())
      
      clients.forEach(element => {
        element.send(message.toString(), (err) => { 
            if (err) {
              console.log(`[SERVER] error: ${err}`);
            }
        })
      });
    //   ws.send(message.toString(), (err) => { 
    //     if (err) {
    //       console.log(`[SERVER] error: ${err}`);
    //     }
    // })
  });
})
wss.on('close',(ws)=>{
    console.log("zaijian")
    
})