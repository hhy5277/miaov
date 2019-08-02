# 急速预告API

域名: https://db.miaov.com/doubanapi/v0

## 获取电影列表：

接口: /movie/list

示例: https://db.miaov.com/doubanapi/v0/movie/list?base=true&page=1&size=6

请求方式: get
参数
 - base: 是否获取缩略信息默认false(例如列表页可以使用缩略信息)
 - page: 获取某页，必须和size一起使用
 - size: 指定每页有多少条，必须和page一起使用
 - type: 指定要获取某一类电影
 - year: 指定要获取某个年份的电影


## 获取某个电影的详情

接口: /detail/:id

示例: https://db.miaov.com/doubanapi/v0/movie/detail/5ab3925bc87d18388fe49fe4

其中 id 是 数据中的 _id，这是由于使用的是 mongodb 数据库

完整字段：

```
{
  "types": [
      "剧情",
      "奇幻",
      "冒险"
  ],
  "_id": "5ab3925bc87d18388fe49fe4",
  "movieId": "1929463",
  "title": "少年派的奇幻漂流 / 少年Pi的奇幻漂流",
  "rate": 9,
  "pubdate": "2012-09-28",
  "raw_title": "Life of Pi",
  "summary": "...",
  "tags": [
    "奇幻",
    "人性",
    "冒险",
    "美国",
    "3D",
    "人生",
    "剧情",
    "文艺"
  ],
  "year": "2012",
  "cover": "http://douban.newfq.com/s~A9YOi0crBSjLSJreQXK",
  "poster": "http://douban.newfq.com/qdZOLbw6wcQ5Tlkh_7tMG?imageMogr2/thumbnail/x1680/crop/1080x1600",
  "video": "http://douban.newfq.com/O0g2ET4RaJUe4ZuSb0qTd"
}
```

现在可以直接使用 cover  poster video 不用做任何处理



