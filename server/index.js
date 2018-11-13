require('dotenv').config();
const { resolve } = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const indexRoutes = require('./routes/index');
//const enforceHttps = require('koa-sslify');

const app = new Koa();
const PORT = process.env.PORT || 3000;

//app.use(enforceHttps({trustProtoHeader: true}));
app.use(serve('client/dist'));
app.use(indexRoutes.routes());
console.log(`Server files on ${resolve('client/dist')}`);
const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`);
});



module.exports = server;