var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'users'
});
connection.connect();

var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/resource', express.static('resource'));
app.use('/js', express.static('js'))
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/login.html");
})
app.post('/index.html', function (req, res) {
console.log(req.body)
  connection.query('SELECT * from users where username="' + req.body.username + '"and password="' + req.body.password + '"', function (error, results, fields) {
    if (error) throw error;
    if (!results[0]) {
      console.log("undefined")
    } else {
      res.sendFile(__dirname + "/index.html");
    }
  });
  
})
app.post('/', function (req, res) {
  console.log(req.body)
  if (req.body.type == 'login') {
    connection.query('SELECT * from users where username="' + req.body.username + '"and password="' + req.body.password + '"', function (error, results, fields) {
      if (error) throw error;
      if (!results[0]) {
        console.log("undefined")
        res.send('1');
      } else {
        //console.log('The solution is: ', results[0].username);
        res.send('0')
      }
    });

  }
  if (req.body.type == 'signup') {
    connection.query('SELECT * from users where username="' + req.body.username + '"', function (error, results, fields) {
      if (error) throw error;
      if (req.body.yqm == 'Remilia') {
        if (!results[0]) {
          connection.query('insert into users values("' + req.body.username + '","' + req.body.password + '")')
          res.send('0');
        } else {
          res.send('1');
        }
      } else {
        res.send("2")
      }

    });
  }

})


var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

// 创建 WebSocket 服务器 监听在 3000 端口
const wss = new WebSocketServer({ port: 3000 });
var clients = [];
//如果有WebSocket请求接入，wss对象可以响应connection事件来处理这个WebSocket：
wss.on('connection', (ws) => { // 在connection事件中，回调函数会传入一个WebSocket的实例，表示这个WebSocket连接
  //console.log(ws.url)
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].ws.readyState == 3) {
      for (let f = i + 1; f < clients.length; f++) {
        clients[f - 1] = clients[f];
      }
      clients.pop();
      i--;
    }
  }
  clients.push({ ws: ws });

  console.log('连接了');
  console.log(clients.length)
  // 接收客户端信息并把信息返回发送
  ws.on('message', (message) => {
    // send 方法的第二个参数是一个错误回调函数
    console.log(message.toString())
    let obj = JSON.parse(message.toString())
    //console.log(obj.message.toString())
    if (obj.type == 'danmaku') {
      clients.forEach(element => {
        if (element.url == obj.url) {
          element.ws.send(JSON.stringify(obj.message), (err) => {
            if (err) {
              console.log(`[SERVER] error: ${err}`);
            }
          })
        }

      });
    }
    if (obj.type == 'url') {
      clients.forEach(element => {
        if (element.ws == ws) {
          element.url = obj.message;
        }
      })
    }

    //   ws.send(message.toString(), (err) => { 
    //     if (err) {
    //       console.log(`[SERVER] error: ${err}`);
    //     }
    // })
  });
})
wss.on('close', (ws) => {
  console.log("zaijian")

})