# 实战：手写 DNS 服务

DNS 服务器上存储着域名和 IP 对应关系的记录，这些记录有 4 种类型：

A：域名对应的 IP
CNAME：域名对应的别名
MX：邮件名后缀对应的域名或者 IP
NS：域名需要去另一个 DNS 服务器解析
PTR：IP 对应的域名


本文我们学习了 DNS 的原理，并且用 Node.js 的 Buffer api 来读写二进制协议数据，自己实现了一个本地 DNS 服务器。

域名解析的时候会先查询 hosts 文件，如果没查到就会请求本地域名服务器，这个是 ISP 提供的，一般每个城市都有一个。

本地域名服务器负责去解析域名对应的 IP，它会依次请求根域名服务器、顶级域名服务器、权威域名服务器，来拿到最终的 IP 返回给客户端。



电脑可以设置本地域名服务器的地址，我们把它指向了用 Node.js 实现的本地域名服务器。

DNS 协议是基于 UDP 传输的，所以我们通过 dgram 模块启动了 UDP 服务在 53 端口。

然后根据 DNS 协议的格式，解析出域名，对目标域名自己做处理，构造出 DNS 协议的消息返回。其他域名则是转发给另一台本地 DNS 服务器做解析，把它返回的消息传给客户端。

这样，我们就用 Node.js 实现了本地 DNS 服务器。

上节学完你可能觉得 Buffer api 不知道用在哪，当你读写二进制数据的时候，就能用到了。

