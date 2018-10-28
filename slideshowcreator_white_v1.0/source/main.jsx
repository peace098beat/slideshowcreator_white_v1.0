/********************************************************

	---- main   ver.1.1 ----
	メイン関数

		by fifi  2015/02/09
/********************************************************/
app.beginUndoGroup("main function");
// サブ関数の呼び出し 
#include "./lib/subfunction.jsx"

// ユーザ定義変数の呼び出し
#include "./lib/default-config.jsx"

// UI: フォルダ設定と実行まで
#include "./lib/settingManager.jsx"

// 絶対変数(後で実装)
#include "user-config.jsx"

app.endUndoGroup();
