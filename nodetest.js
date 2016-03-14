var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require("./mime").types;

// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   if(pathname=='/')
   	  pathname='/index.html';
   var realpath = pathname.substr(1);
   // 输出请求的文件名
   

   fs.exists(realpath,function(exists){
   	  if(!exists){
   	      response.writeHead(404, {'Content-Type': 'text/html'});
   	      response.end();
   	      return;
   	  }else{
   	  	  fs.stat(realpath,function(err,stat){
   	  	  	  if(err){
   	  	  	  	  console.log("读取文件更改时间出错");
   	  	  	  	  console.log(err);
   	  	  	  }else{
   	  	  	      var lastModified = stat.mtime.toUTCString();
   	  	  	      var ifModifiedSince = "If-Modified-Since".toLowerCase();

   	  	  	      if(request.headers[ifModifiedSince] && lastModified == request.headers[ifModifiedSince]){
   	  	  	      	  response.writeHead(304,"Not Modified");
   	  	  	      	  response.end();
   	  	  	      	  return;
   	  	  	      }else {
   	  	  	      	  response.setHeader("Last-Modified",lastModified);

   	  	  	      	  fs.readFile(realpath, function (err, data) {
					      if (err) {
					         console.log(err);
					         // HTTP 状态码: 404 : NOT FOUND
					         // Content Type: text/plain
					         response.writeHead(404, {'Content-Type': 'text/html'});
					      }else {
					      	 var ext = path.extname(realpath);
					      	 ext = ext?ext.slice(1):'unknown';

					      	 var contentType = mime[ext] || 'text/plain';
					         // HTTP 状态码: 200 : OK
					         // Content Type: text/plain
					         response.writeHead(200, {'Content-Type': contentType});	
					         
					         // 响应文件内容
					         response.write(data.toString());		
					      }
					      //  发送响应数据
					      response.end();
			       	  });
   	  	  	      }
   	  	  	  }
   	  	  });
   	  	  
   	  }
   });   
}).listen(80);

console.log("服务器启动成功 width 80");