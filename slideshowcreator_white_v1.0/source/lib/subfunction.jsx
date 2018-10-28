/********************************************************

	---- subfunction   ver.0.1 ----
	サブ関数定義

		by fifi  2014/10/21

/********************************************************/

// メモ
//***********************************************//
// app.project.save( new File(PATH_CURRENT + "/" + wel_txt_List[PROJ_NAME_NUM]));


// フォルダの選択。キャンセル時にはnullを返す。
//***********************************************//
// var folder=Folder.selectDialog("output to folder");

// システム変数
//***********************************************//
var systemFunc = function(app){
	$.os;
	$.locale;
	$.screens;
	app.version;
	app.isoLanguaage;
}

// プロジェクト初期化関数
//***********************************************//
var resetProject = function(app){
	while ( 0 <  app.project.items.length){
    		app.project.item(1).remove();
	}
}

// デバッグ用ログ関数
//	リリースの際には標準出力をコメントアウトする。
//	または、log.txtに書き込む。
//***********************************************//
var debuglog = function(str){
	$.writeln(str);
	this.name = "debuglog";
}

// 保存されていないプロジェクトでのエラー回避
//***********************************************//
var checkProject = function(app){
	try{
		chk = app.project.file.parent;
	}catch(e){
		alert('ERROR::保存されたファイルを使用してください');
	}
}

// テキストファイルのインポートとパース関数
//***********************************************//
var parseTextFile = function(PATH){
	var fileObj = new File(PATH);
	var txt_List = [];
	var line=1;
	if (fileObj.open("r")){
		while(!fileObj.eof){
			var s = fileObj.readln();
			txt_List[line] = s.split("%n").join(String.fromCharCode(13));
			line++;
		}
		fileObj.close();
	}else{
		alert("parseTextFile::ERROR::ファイルがひらけませんでした::"+PATH);
	}
	return txt_List;
}

// コンポジション作成用関数
//***********************************************//
var makeComp = function(param){

	var new_comp = app.project.items.addComp(
		param.name, 
		param.width, 
		param.height, 
		param.pixasp, 
		param.duration, 
		param.fps);

	return new_comp;
}

// フッテージファイルのインポート用関数
//***********************************************//
var importFootage = function(PATH){

	// ファイルのインポート (おまじない)
	try{
		var io = new ImportOptions( File( PATH ));
		if ( io.canImportAs( ImportAsType.COMP)){
			io.ImportAs = ImportAsType.COMP;
		}else{
			io.ImportAs = ImportAsType.FOOTAGE;
		}
		var footage = app.project.importFile(io);
	}catch(e){
		// ファイルが読み込めなかたときの処理
		alert(e);	
		var footage = "shutdown!";
	}

	return footage;

}

// テキストのみのコンポジションの作成用関数
//***********************************************//
// あるコンポジションの元にテキストレイヤのみのコンポジションを作成する
var makeSubCompToText = function(Comp, TEXT_WIDTH, TEXT_HEIGHT, a_txt, txt_pos){

	var txt = a_txt || "";

	// あるコンポジションにテキストボックスオブジェクトを作成
	var myLay=[]
	try{
		myLay = Comp.layers.addBoxText([ TEXT_WIDTH, TEXT_HEIGHT ], txt);
	}catch(e){
		alert(Comp.name);
	}

	// テキストプロパティの設定
	// var txtDoc = getTextDocDefault();
	// setTextDocument(myLay, txtDoc);
	
	// テキストレイヤーのポジションの設定
	myLay.position.setValue( txt_pos);

	// テキストの読み込み
	myLay.text.sourceText.setValue(txt);
	return myLay;

}

// (初期設定)テキストオブジェクトの初期プロパティ
//***********************************************//
var getTextDocDefault = function(){
	var txtDocDefault = {
		font: "MS UI Gothic",	 //"MS Gothic" "Meiryo UI" 
		fontSize: 40,	  //40
		applyFill: true,	 //塗り色の指定を受けるか
		fillColor: [0,0,0],	 //テキストレイヤーの色
		applyStroke: true,	 //文字の周りの囲みの色の有無：trueでアリ
		strokeColor: [1,1,1],		//囲みの色指定
		strokeOverFill: false,	 //false 線の上に塗り
		strokeWidth: 4,	 //囲み幅
		tracking: 50,	 //字詰め幅の指定
		justfication: ParagraphJustification.CENTER_JUSTIFY	 //段落タブの段落指定。この場合テキストの中央揃え。
	}
	return txtDocDefault;
}

// (低級関数)テキストオブジェクトのプロパティの設定
//***********************************************//
var setTextDocument = function(txtLay, txtDoc){
	var textProp = txtLay.property("Source Text");
	var textDocument = textProp.value;
	textDocument.resetCharStyle(); //文字パネルをモトの状態に戻す
	for (var key in txtDoc){
		textDocument[key] = txtDoc[key];
	}
	textProp.setValue(textDocument); //上部値をプロパティに入れる。
}

