const Koa = require('koa')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const path = require('path')
const routing = require('./routes')
const koaStatic = require('koa-static')
const {connectionStr} = require('./config')
const app = new Koa()
mongoose.connect(connectionStr,{ useNewUrlParser: true, useUnifiedTopology: true},()=>{
  console.log('mongoDb  连接成功')
})
mongoose.connection.on('error',console.error)
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(error({
  postFormat:(e, {stack,...rest})=>process.env.NODE_ENV === 'production' ? rest:{stack,...rest}
}))

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir:path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }

}))
app.use(parameter(app))
routing(app)
app.listen(3000, ()=>console.log('3000 qidongdil'))