import url from 'node:url'

// 创建一个 URL 实例，传入 url 字符串。
const myURL = new url.URL('https://user:pass@sub.example.com:8080/xxx/yyy?a=1&b=2#hash')

// 会解析出 url 中各部分的内容，并且会把 query string 封装成 URLSearchParams 的实例。
console.log('myURL', myURL)

// URLSearchParams 有 get、set、append、toString 等方法。
console.log(myURL.searchParams.get('a'));

myURL.searchParams.set('b', 222);
myURL.searchParams.append('c', 333);

console.log(myURL.searchParams.toString())

console.log('new myURL', myURL)

const params = new url.URLSearchParams('?aa=1&bb=2');
console.log(params);
for (const [name, value] of params) {
    console.log(name, value);
}
console.log(url.urlToHttpOptions(myURL));