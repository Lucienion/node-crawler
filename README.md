## 初始化项目

npm init

## 安装需要的包

npm install superagent --save
npm install cheerio --save

## 修改packjson.json script

npm run start: node index.js

## 解析获取到的html

```js
const superagent = require('superagent')
const cheerio = require('cheerio')

superagent.get('http://www.baidu.com').end((err, res) => {
  if (err) {
    console.log(`访问失败 - ${err}`);
  } else {
    // console.log(res.text);
    const htmlText = res.text;
    const $ = cheerio.load(htmlText)
    $('meta').each((index, ele) => {
      console.log(index);
      console.log($(ele).attr('content'));
    })
  }
})
```

## 抓取图片

1.检查URL
完整URL https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=&pv=&ic=0&nc=1&z=0&hd=0&latest=0&copyright=0&se=&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&ctd=&sid=&word=哈士奇

https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=哈士奇

关键参数
tn=baiduimage
word=哈士奇
ie=utf-8

2.检查dom结构

https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fww4.sinaimg.cn%2Fthumb180%2Fc331d382jw1f2clhi8u8xj208v05ot8n.jpg&refer=http%3A%2F%2Fwww.sina.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633077238&t=85976b7cac6e4e2de6199fc139ff62cf

图片url叫objURL字段 存在页面json当中 "objURL":"xxxx"

```
/"objURL":"(.*?)",/
```

3.访问百度图片

模拟浏览器请求时 headers尽量和浏览器保持一直 不然会遇到爬虫拦截

4.获取图片链接列表

正则去匹配objURL对应URL的链接

5.获取图片标题列表

正则匹配fromPageTitle对应标题

6.提取公共方法 封装公共函数
```js
function getValueList(str, key) {
  const reg = new RegExp(`"${key}":"(.*?)"`, 'g')
  const matchResult = str.match(reg)
  const resultList = matchResult.map(item => {
    const imageUrl = item.match(/:"(.*?)"/g)
    return RegExp.$1
  })
  return resultList
}
```