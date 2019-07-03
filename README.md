# vue_roulette

## 環境構築
nodeインストール  
バージョン管理できるようにしたほうがいい。(macならnvm,winならnvm-windowsなど)  
nvm-windowsならchocolatey(macでいうhomebrew的なやつ)を使って入れると楽  
基本的に偶数でかつ、より新しいバージョンを使う。(v8.x.x, v10.x.xなど)  
  
クローンしたら  
```cd vue_roulette```  
```npm i```  
windowsなら更に下も必要かも  
```npm i webpack -g```  
  
## dev-server  
webpack dev serverを使っているため遅め。  
```npm run start```  
ブラウザでlocalhost:8080に接続。  
  
## build  
ビルドすることでgithubpagesに公開できるようになる。  
バンドルされたファイルはdocsにある。  
```npm run build```  
  
## githubpagesで公開  
ビルドした状態でリモートにプッシュ。  
githubの自分のレポジトリページの右上らへんのsettings > GitHub Pages > master branch/docs folderを選択。  
https://{user_name}.github.io/{repository_name}/index.htmlにアクセスで見れる。  
例：https://fiftie.github.io/vue_roulette/index.html
  
良いvueライフを(^○^)