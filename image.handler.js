const superagent = require('superagent')
const cheerio = require('cheerio')

const word = '哈士奇';

const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive',
  'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36 SE 2.X MetaSr 1.0'
}

function getValueList(str, key) {
  const reg = new RegExp(`"${key}":"(.*?)"`, 'g')
  const matchResult = str.match(reg)
  const resultList = matchResult.map(item => {
    const imageUrl = item.match(/:"(.*?)"/g)
    return RegExp.$1
  })
  return resultList
}

superagent.get(`http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(word)}`)
  .set('Accept', headers['Accept'])
  .set('Accept-Encoding', headers['Accept-Encoding'])
  .set('Accept-Language', headers['Accept-Language'])
  .set('Cache-Control', headers['Cache-Control'])
  .set('Connection', headers['Connection'])
  .set('sec-ch-ua', headers['sec-ch-ua'])
  .set('User-Agent', headers['User-Agent'])
  .end((err, res) => {
    if (err) {
      console.log(`访问失败 - ${err}`);
    } else {
      // console.log(res.text);
      const htmlText = res.text;
      const imageUrlList = getValueList(htmlText,'objURL')
      const titelList = getValueList(htmlText,'fromPageTitle')

      console.log(imageUrlList)
    }
  })