var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function (request,response){

	var pathname = url.parse(request.url).pathname;

	fs.readFile(pathname.substr(1),function(err,data){
		if(err){
			console.log(err);
			console.log("读取文件出错");
			response.writeHead(404,{'Content-Type':'text/html'});
		}else{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write(data.toString());
		}
	});

	response.end();

}).listen(80);

console.log("启动成功");