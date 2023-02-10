# api-server

## install

	[sudo] npm install -g apis

## Usages

执行命令

	apis .
	
test

	curl http://127.0.0.1:3333/users

## 实现步骤

- [x] 根据request生成server/routes.js
- [x] 根据*.request生成server/routes/*.js
- [x] 如果server目录没有server.js，从api-server安装地址copy
- [x] 从api-server安装地址copy node_modules
- [x] 从api-server安装地址copy vendor/package.json
- [x] 在当前目录，执行npm start，调用supervisor
- [x] 使用`api .`测试

## Response Mocker Rules

get.request

```
{
  "name": "这是一个get请求",
  "url": "http://218.247.15.102/appfuse_emm_backend/v1/appversions.json",
  "type": "get",
  "params": {},
  "desc": " - aaaa\n - bbb\n"
}
```

创建一个get命令，创建json作为返回文件

- get/a=1&b=2.json
	{
	    "status": {
	        "code": 0,
	        "msg": ""
	    },
	    "data": {
	        "id": 18,
	        "versionId": "4565",
	        "content": "67567567",
	        "url": "https__//shiren1118.b0.upaiyun.com/AppCenter0627.plist",
	        "createTime": "2014-09-22 11__14__30"
	    }
	}
- get/a=1.json
- get/c=1.json
	{
	    "status": {
	        "code": 1,
	        "msg": "参数没有c"
	    },
	    "data": {
 
	    }
	}
	

`a=1&b=2.json` 内容说明

- a=1&b=2 是参数，无聊get/post等参数都这样写
- `a=1&b=2.json` 文件内容是该请求的返回json


curl a=1&b=2  http://127.0.0.1:3333/appfuse_emm_backend/v1/appversions.json

## TODOs

- [x] Get is ok
- [x] x-www-form-urlencoded is Ok
- [ ] Post
- [ ] Upload
- [ ] node_modules
- [ ] 生成测试的命令
