/********************************************************

	---- setting   ver.0.5 ----
	システム初期値の環境変数

	※ 絶対に変更してはだめ!!

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

/**************************************************
	コンポジションの時間
*************************************************/
// global変数
var COMP_DURAT_TIT 		= 0;
var COMP_DURAT_WEL 	= 0;
var COMP_DURAT_PAGE 	= 0;
var COMP_DURAT_SLP 		= 0;
var COMP_DURAT_END 		= 0;
var COMP_DURAT_REN 		= 0;
var COMP_DURAT_BUFF		= 0;
var bgm_time 				= 0;
var flg_durat ="";

// 固定値
// -------------------------------
// タイトルの長さ
var COMP_DURAT_TIT 	= 8;
// ウェルカムの長さ
var COMP_DURAT_WEL = 15;
// エンドの長さ
var COMP_DURAT_END 	= 10;
// スライドショーのフェードの長さ
var CROSS = 0.2; //Ratio[%]
// バッファー
var COMP_DURAT_BUFF = 5;

//デフォルト
flg_durat = "movietime";
COMP_DURAT_REN = 5*60;

/**************************************************
	TitleCompの作成
**************************************************/

/**************************************************
	WelcomeCompの作成
**************************************************/
// メッセージ用ボックステキストのサイズ
var TXT_WIDTH_WEL = 600;
var TXT_HEIGHT_WEL = 150;
var FONT_FAMILY_WEL = "HuiFont";
var FONT_SIZE_WEL = 40;
/**************************************************
	SlidePageCompの作成
**************************************************/
// 写真の読み込み  /img/に000.jpgで入れておく。
var PATH_PHTO = "/img/"; // 相対パスではない。プロジェクト直下のフォルダのみ対応
var TYPE_PHOT = ".jpg"; // 拡張子は自由に変更可能

// テキストレイヤを作成
var TXTPOS_X_SPC 	= 0.5;
var TXTPOS_Y_SPC 	= 0.95;
var FONT_SIZE_SPC = 40;
var SCALE_IN 		= 95;
var SCALE_OUT 	= 90;
// 5%ぐらいがちょうど良い。
/**************************************************
	EndCompの作成
**************************************************/
// メッセージ用ボックステキストのサイズ
var TXT_WIDTH_END = 600;
var TXT_HEIGHT_END = 300;
var FONT_FAMILY_END = "HuiFont";
var FONT_SIZE_END = 40;

/**************************************************
	BGCompの作成
**************************************************/
// 背景動画のループ
var BG_LOOP = 70;
var BGCOMP_FIT = "width-fit";
