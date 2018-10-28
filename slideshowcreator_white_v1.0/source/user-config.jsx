/********************************************************

	---- user-config   ver.0.1 ----
	ユーザが強制的に変数を設定する。ハイユーザ用

    基本的には./source/default-config.jsxに書かれているデフォルトの設定を上書きしているだけ。
    もし、細かい設定をしたければ、default-config.jsxからコピーしてきて使う。

		by fifi  2014/10/21

/********************************************************/

var LOCAL_PATH_WEL_TXT = "/msg/welcome.txt";
var LOCAL_PATH_MSG_TXT = "/msg/message.txt";
var LOCAL_PATH_END_TXT = "/msg/end.txt";
var LOCAL_PATH_BGM ="/bgm/bgm_footage.mp3";
var PATH_TIT = "/movie/title_footage.avi";
var PATH_BG= "/movie/bg_footage.wmv";

/**************************************************
    コンポジションの作成
**************************************************/
// 共通パラメータ
//***********************************************//
var COMP_NAME = "Comp Name default";
var COMP_WIDTH = 720;
var COMP_HEIGHT = 480;
var COMP_PIXASP = 1.0;
var COMP_DURAT = 10;
var COMP_FPS = 29.97;


/***********************************************

    スライドショーの細かい設定

***********************************************/
var PATH_PHTO = "/img/"; // 相対パスではない。プロジェクト直下のフォルダのみ対応

// スライドショー画像の拡張子(拡張子は自由に変更可能)
var TYPE_PHOT = ".jpg"; 

// ズーム開始と終了のサイズ
var SCALE_IN    = 20 //%
var SCALE_OUT   = 75; //%

// テキストレイヤを作成
var TXTPOS_X_SPC    = 0.5;
var TXTPOS_Y_SPC    = 0.95;
var FONT_SIZE_SPC = 40;
// 5%ぐらいがちょうど良い。

// スライドショーのフェードの長さ
var CROSS = 0.2; //Ratio[%]


/******************************************************
    
    ** タイトル動画 **
        最初に表示される動画のこと。
        事前に/movie/フォルダに動画を入れておく。
        もし違う動画を使う場合は、ここを書き換えれば良い。

******************************************************/
// ファイルの場所
var PATH_TIT = "/movie/title_footage.wmv";
// var PATH_TIT = "/movie/shooting-hearts-in-the-sky.mov";

// タイトル動画の長さの変更(秒)
// var COMP_DURAT_TIT  = 8;




/******************************************************

    ** 背景動画 **
        常に背景に表示されている動画のこと。
        自動でループがかかる設定になっているので、短い動画でも大丈夫。

******************************************************/
var PATH_BG= "/movie/bg_footage.wmv";
var BGCOMP_FIT = "width-fit";

// var PATH_BG= "/movie/blurry-red-particles.mov";
// var BGCOMP_FIT = "height-fit"; // 背景動画を縦幅にあわせる




/******************************************************

    ** BGMの呼び出し **

    bgm_footage.wav: デフォルトの名前。
        ここを使う音楽データ名に変更しておく。
        ※おれは、ファイル名をbgm_footage.mp3に毎回変更してる。めんどうだから。

******************************************************/
var LOCAL_PATH_BGM ="/bgm/bgm_footage.mp3";
var LOCAL_PATH_BGM ="/bgm/bgm_footage.wav";

// var LOCAL_PATH_BGM ="/bgm/井手未央様_100年先まで愛します。.mp3";




