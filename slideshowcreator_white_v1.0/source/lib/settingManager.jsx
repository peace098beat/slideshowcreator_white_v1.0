/********************************************************

	---- creatSetting   ver.0.0 ----
	ユーザ定義変数から環境変数を作成する

		by fifi  2014/10/21

/********************************************************/

// slideShowCreater()関数の呼び出し
#include "slideShowCreater.jsx"

// Project Info
systemFunc(app);

// Project Reset
resetProject(app);

// 保存されていないプロジェクトでのエラー回避
checkProject(app);

// カレントパスの取得(aepファイルのpath)
var PATH_CURRENT = File.decode(app.project.file.parent);

//***********************************************//
//
// UI SETTING
//
//***********************************************//
var res = 
"window {\
	info3: Panel{orientation:'column', alignChildren:'right',\
		text:'Movie time setting',\
		n1: Group{ orientation: 'row',\
			st: StaticText{text:'長さ :'},\
			etm: EditText{characters:2, text:'5'},\
			st: StaticText{text:'分'},\
			ets: EditText{characters:2, text:'00'},\
			st: StaticText{text:'秒'},\
			bt: Button{text:'set',property:{name:'movieTimesetBtn'}}, \
		},\
	},\
	info2: Panel { orientation: 'column', alignment:['fill', 'right'], alignChildren:'right',\
		text: 'Create movie',\
		createBtn: Button { text: 'スライドショーを作る', alignment:['fill','top'] ,property:{name:'createBtn'}}\
		resetBtn: Button { text:'プロジェクトをリセットする', alignment:['fill','top'] ,property:{name:'ccBtn'}} \
	} \
	dlg: Group { orientation: 'row', \
			okBtn: Button { text: 'OK',property:{name:'okBtn'}}, \
			ccBtn: Button { text:'Cancel',property:{name:'ccBtn'}} \
	} \
}";

var win = new Window (res); 
win.center();
win.show(); 


// ムービの時間設定
win.info3.n1.bt.onClick= function(){
	var min = this.parent.etm.text;
	var sec = this.parent.ets.text;
	var time = min*60+sec*1;

	//global
	flg_durat = "movietime";
	COMP_DURAT_REN = time;

	$.writeln(time);
	$.writeln(min+"分"+sec+"秒");
	$.writeln(this.name);
	$.writeln(folderObj);
}

// スライドショー作成ボタン
win.info2.createBtn.onClick= function(){
	slideShowCreater();
	$.writeln(this.text);
}
// リセット作成ボタン
win.info2.resetBtn.onClick= function(){
	// Project Reset
	resetProject(app);
	$.writeln(this.text);
}
// OKボタン
win.dlg.okBtn.onClick= function(){
	$.writeln(this.text);
	win.close();
}
// Cancelボタン
win.dlg.ccBtn.onClick= function(){
	$.writeln(this.text);
	win.close();
}


