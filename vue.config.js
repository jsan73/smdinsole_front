const fs = require('fs');
const webpack = require('webpack');
// const CompressionPlugin = require("compression-webpack-plugin");
//const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let active = true;
if(process.env.VUE_APP_MODE === 'prod') {
  //active = false;
}

module.exports = {

  productionSourceMap: active,


  outputDir: "c:/kokasin_build/" + process.env.VUE_APP_MODE + "/" + process.env.VUE_APP_PJT,
  //outputDir: "D:/usr/local/tomcat/9.0.36/webapps/ROOT/" + process.env.VUE_APP_PJT,
  //indexPath: "./index.html",
  // publicPath : "/" + process.env.VUE_APP_PJT + "/",

  css: {
    loaderOptions: {
      // sass: {
      //   additionalData: `
		// 			@import "@/assets/scss/_base.scss";
		// 			`
      // }
    },
    sourceMap: active //브라우저 F12모드에서 scss파일 추척 활성화
  },

  lintOnSave: false,
  transpileDependencies: ["ansi-regex"],

  devServer: {
   // proxy:'https://was-dev.kkokasin.com',
    https: false,
    host: 'm-dev.kkokasin.com',
    // https: {
    //   key: fs.readFileSync('kkokasin.com.key'),
    //   cert: fs.readFileSync('kkokasin.com.crt'),
    //   ca: fs.readFileSync('rootca.crt')
    // }
  },

  //한국어 날짜 표기 (다국어 제외)
  //configureWebpack: {
  // 	resolve: {
  // 		alias: {
  // 			moment: "moment/src/moment"
  // 		}
  // 	},
  //},

  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },

  configureWebpack: config => {

    if(!active) {
      config.mode = 'production';
      config.optimization = {
        minimize: true
      }

      config.output.filename = '[name].js?h=[hash]';
      config.output.chunkFilename = '[name].js?h=[hash]';
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
      // config.plugins.push(
      // 	new CompressionPlugin({
      // 		algorithm: 'gzip',
      // 		//Match file
      //
      // 		//Compress files exceeding this size, in bytes
      // 		threshold: 10240,
      // 		minRatio: 0.8,
      // 		//Delete the original file and only keep the compressed file
      // 		deleteOriginalAssets: false
      // 	})
      // );
    } else {
      config.devtool = 'source-map';
      config.output.filename = 'js/[name].js?h=[hash]';//'[name].[hash].js';
      config.output.chunkFilename = 'js/[name].js?h=[hash]';
      // config.plugins = [new BundleAnalyzerPlugin()]
    }


    // config.plugins.push(new BundleAnalyzerPlugin());
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),

    // plugins: [
    // 	new CompressionPlugin({
    // 		algorithm: 'gzip',
    // 		//Match file
    // 		test: /\.js$|\.css$|\.html$/,
    // 		//Compress files exceeding this size, in bytes
    // 		threshold: 10240,
    // 		minRatio: 0.8,
    // 		//Delete the original file and only keep the compressed file
    // 	   deleteOriginalAssets: false

    // 	})
    // ]
  },

  // ie11에서 드래그 파일 첨부할 때 : <-오류 나는거 막기
  // eslint-disable-next-line no-dupe-keys
  // transpileDependencies: [
  //   "vue2-dropzone",
  // ]
}