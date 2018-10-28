/********************************************************

	---- SlideShowCreator   ver.1.1.0 ----
	メイン関数

		by fifi  2015/02/10
/********************************************************/
app.beginUndoGroup("main function");

// サブ関数の呼び出し 
// #include "./source/subfunction.jsx"
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
//  リリースの際には標準出力をコメントアウトする。
//  または、log.txtに書き込む。
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
        font: "MS UI Gothic",    //"MS Gothic" "Meiryo UI" 
        fontSize: 40,     //40
        applyFill: true,     //塗り色の指定を受けるか
        fillColor: [0,0,0],  //テキストレイヤーの色
        applyStroke: true,   //文字の周りの囲みの色の有無：trueでアリ
        strokeColor: [1,1,1],       //囲みの色指定
        strokeOverFill: false,   //false 線の上に塗り
        strokeWidth: 4,  //囲み幅
        tracking: 50,    //字詰め幅の指定
        justfication: ParagraphJustification.CENTER_JUSTIFY  //段落タブの段落指定。この場合テキストの中央揃え。
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



// ユーザ定義変数の呼び出し
// #include "./source/default-config.jsx"
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
var COMP_DURAT_TIT      = 0;
var COMP_DURAT_WEL  = 0;
var COMP_DURAT_PAGE     = 0;
var COMP_DURAT_SLP      = 0;
var COMP_DURAT_END      = 0;
var COMP_DURAT_REN      = 0;
var COMP_DURAT_BUFF     = 0;
var bgm_time                = 0;
var flg_durat ="";

// 固定値
// -------------------------------
// タイトルの長さ
var COMP_DURAT_TIT  = 8;
// ウェルカムの長さ
var COMP_DURAT_WEL = 15;
// エンドの長さ
var COMP_DURAT_END  = 10;
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
var TXTPOS_X_SPC    = 0.5;
var TXTPOS_Y_SPC    = 0.95;
var FONT_SIZE_SPC = 40;
var SCALE_IN        = 95;
var SCALE_OUT   = 90;
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


// UI: フォルダ設定と実行まで
// #include "./source/settingManager.jsx"

// slideShowCreater()関数の呼び出し
// #include "slideShowCreater.jsx"

/********************************************************

    ---- SlideShowCreater  ver.4.1 ----


        by fifi  2014/10/21

/********************************************************/

//slideShowCreater ();
function slideShowCreater()
{
    $.writeln("run..slideShowCreater");

    // Project Reset
    resetProject(app);

    /**************************************************

        テキストファイルの読み込み
        各読み込み用テキストファイルから文字列と、行数を格納
        message.txtの行数が、スライドページ枚数になる。

    **************************************************/
    var PATH_WEL_TXT = PATH_CURRENT+LOCAL_PATH_WEL_TXT;
    var PATH_MSG_TXT = PATH_CURRENT+LOCAL_PATH_MSG_TXT;
    var PATH_END_TXT = PATH_CURRENT+LOCAL_PATH_END_TXT;

    var MAX_COL_MSG_TXT;
    var MAX_COL_WEL_TXT;
    var MAX_COL_END_TXT;

    // variable list
    var wel_txt_List = [];
    var msg_txt_List = [];
    var end_txt_List = [];

    // Open Welcom text file
    wel_txt_List = parseTextFile(PATH_WEL_TXT);
    MAX_COL_WEL_TXT = wel_txt_List.length-1;

    // Open Message text file
    msg_txt_List = parseTextFile(PATH_MSG_TXT);
    MAX_COL_MSG_TXT = msg_txt_List.length-1;


    // Open End text file
    end_txt_List = parseTextFile(PATH_END_TXT);
    MAX_COL_END_TXT = end_txt_List.length-1;


    /**************************************************

        コンポジションの時間の定義(重要)

    **************************************************/
    //スライドページの枚数
    var PAGE_NUM = MAX_COL_MSG_TXT;
    $.writeln("PAGE NUM(TEXT NUM)="+PAGE_NUM);

    if(flg_durat == "bgm"){
        /*
            BGMの長さから、各固定時間を引いて、スライドショーページの時間を算出する
            BGM長さ = bgm_time;
        */
        try{
            $.writeln("flg_durat:bgm")
            // スライドショーコンポジションの長さ
            COMP_DURAT_SLP = bgm_time - COMP_DURAT_WEL - COMP_DURAT_END;
            // スライドの一枚の長さ
            COMP_DURAT_PAGE =COMP_DURAT_SLP/(1-CROSS)/(PAGE_NUM+1);
            // レンダーの全長さ
            COMP_DURAT_REN = (COMP_DURAT_TIT+COMP_DURAT_WEL+COMP_DURAT_SLP+COMP_DURAT_END);

        }catch(e){
            $.writeln(e);
        }

    }else if(flg_durat == "movietime"){
        /*
            全ムービの長さから、各固定時間を引いて、スライドショーページの時間を算出する
            全ムービ長さ = COMP_DURAT_REN;
        */
        try{
            $.writeln("flg_durat:movietime");
            var const_comp_time = COMP_DURAT_TIT + COMP_DURAT_WEL + COMP_DURAT_END;
            COMP_DURAT_SLP = COMP_DURAT_REN - const_comp_time;
            // スライドの一枚の長さ
            COMP_DURAT_PAGE =COMP_DURAT_SLP/(1-CROSS)/(PAGE_NUM+1);
        }catch(e){
            // var COMP_DURAT_SLP = CYCLE*(1-CROSS)*(PAGE_NUM+1);
            $.writeln(e);
        }

    }else{
        $.writeln("flg_duratの値を確認してください。");
        $.writeln(flg_durat);
    }

    // バッファータイムを末に追加(音のフェードアウト用)
    COMP_DURAT_REN = COMP_DURAT_REN + COMP_DURAT_BUFF;
    // 背景はレンダー長さと同値
    COMP_DURAT_BG = COMP_DURAT_REN;
    // BGMの長さ
    DURAT_BGM = COMP_DURAT_REN- COMP_DURAT_TIT;
    /**************************************************

        コンポジションの作成

    **************************************************/
    function getDefaultCompParam(){
        // 各コンポジションのパラメータ
        this.name = "Default";
        this.width = COMP_WIDTH;
        this.height = COMP_HEIGHT;
        this.pixasp = COMP_PIXASP;
        this.duration = 1; //COMP_DURAT_REN;
        this.fps = COMP_FPS;
    }

    try{
    // 各コンポジションのパラメータ
    var Renderer_param = new getDefaultCompParam();
    Renderer_param.name = "Renderer";
    Renderer_param.duration = COMP_DURAT_REN;

    var TitleComp_param = new getDefaultCompParam();
    TitleComp_param.name = "TitleComp";
    TitleComp_param.duration = COMP_DURAT_TIT,
    TitleComp_param.stime = 0;

    var WelcomeComp_param = new getDefaultCompParam();
    WelcomeComp_param.name = "WelcomeComp";
    WelcomeComp_param.duration = COMP_DURAT_WEL;
    WelcomeComp_param.stime = COMP_DURAT_TIT;

    var SlidePageComp_param = new getDefaultCompParam();
    SlidePageComp_param.name = "SlidePageComp";
    SlidePageComp_param.duration = COMP_DURAT_SLP;
    SlidePageComp_param.stime = COMP_DURAT_TIT+COMP_DURAT_WEL;

    var EndComp_param = new getDefaultCompParam();
    EndComp_param.name = "EndComp";
    EndComp_param.duration = COMP_DURAT_END;
    EndComp_param.stime = COMP_DURAT_TIT+COMP_DURAT_WEL+COMP_DURAT_SLP

    var BGComp_param = new getDefaultCompParam();
    BGComp_param.name = "BGComp";
    BGComp_param.duration = COMP_DURAT_BG;
    BGComp_param.stime = 0;

    // 各コンポジションの作成
    var RendererComp    = makeComp( Renderer_param );
    var TitleComp       = makeComp( TitleComp_param );
    var WelcomeComp     = makeComp( WelcomeComp_param );
    var SlidePageComp   = makeComp( SlidePageComp_param );
    var EndComp         = makeComp( EndComp_param );
    var BGComp      = makeComp( BGComp_param );

    // Rendererコンポへ格納(順番重要)
    var Render_bg = RendererComp.layers.add(BGComp);
    var Render_end = RendererComp.layers.add(EndComp);
    var Render_sld = RendererComp.layers.add(SlidePageComp);
    var Render_wel = RendererComp.layers.add(WelcomeComp);
    var Render_tit = RendererComp.layers.add(TitleComp);

    }catch(e){
        $.writeln("コンポジションの作成");
        $.writeln(e);

    }
    /**************************************************

        各コンポジションのシーケンスの設定

    **************************************************/
    try{
        Render_tit.startTime =  TitleComp_param.stime;
        Render_wel.startTime =  WelcomeComp_param.stime;
        Render_sld.startTime =  SlidePageComp_param.stime;
        Render_end.startTime =  EndComp_param.stime
    }catch(e){
        $.writeln("各コンポジションのシーケンスの設定");
        $.writeln(e);
    }

    /**************************************************

        TitleCompの作成

    **************************************************/
    // ファイルの指定
    var loadFile = PATH_CURRENT+PATH_TIT;
    var video = importFootage(loadFile);
    var myLay = TitleComp.layers.add(video);
    var scaleVal;
    // サイズをコンポジションの縦幅に合わせる。
    var newHeight = COMP_HEIGHT;
    var orgHeight = myLay.height
    var scaleValY = newHeight/myLay.height*100;
    scaleVal = scaleValY;
    myLay.transform.scale.setValue([scaleVal, scaleVal, scaleVal]);
    // alert('スライドショー画像のサイズ変更でえらー')

    /**************************************************

        WelcomeCompの作成

    **************************************************/
    try{
    // メッセージ用ボックステキストのサイズ
    var TEXT_WIDTH = TXT_WIDTH_WEL;
    var TEXT_HEIGHT = TXT_HEIGHT_WEL;
    var txt_pos_wel = [COMP_WIDTH/2, COMP_HEIGHT*0.5];

    var wel_obj_List=[];
    var txt = wel_txt_List[1];
    wel_obj_List[1] = makeSubCompToText(WelcomeComp,
                                                TEXT_WIDTH,
                                                TEXT_HEIGHT,
                                                txt,
                                                txt_pos_wel
                                                );

    var myLay = wel_obj_List[1];
    // テキストのプロパティの設定
    var txtDoc = getTextDocDefault();
    txtDoc.font             = FONT_FAMILY_WEL; //"MS Gothic" "Meiryo UI" 
    txtDoc.fontSize         = FONT_SIZE_WEL;  //40
    txtDoc.fillColor        = [0, 0, 0]; //黒
    txtDoc.strokeColor  = [1, 1, 1]; //白
    txtDoc.strokeWidth  = 1;
    setTextDocument(myLay, txtDoc);
    delete txtDoc;

    // 透過アニメーションの設定
    var myLayProp = myLay.property("ADBE Transform Group").property("ADBE Opacity");
    myLayProp.setValueAtTime(  COMP_DURAT_WEL *0.0, 0);
    myLayProp.setValueAtTime(  COMP_DURAT_WEL *CROSS, 100);
    myLayProp.setValueAtTime(  COMP_DURAT_WEL *(1 - CROSS), 100);
    myLayProp.setValueAtTime(  COMP_DURAT_WEL *1.0, 0);

    }catch(e){
        $.writeln("WelcomeCompの作成でエラー");
        $.writeln(e);
    }

    /**************************************************

        SlidePageCompの作成

    **************************************************/

    // 各ページ用 コンポジションの作成
    //***********************************************//
    var PageCompList = [];      // ページコンポジション
    try{
        // (順番重要)
        for (var i = PAGE_NUM ; i > 0; i--) {
            // ページ用コンポジションの作成と格納
            COMP_NAME = "PageComp_" + i;
            PageCompList[i] = app.project.items.addComp(COMP_NAME, COMP_WIDTH, COMP_HEIGHT, COMP_PIXASP, COMP_DURAT_PAGE, COMP_FPS);
            // スライドショー用コンポジションへの格納
            SlidePageComp.layers.add(PageCompList[i]);
        }
    }catch(e){
        $.writeln("SlidePageCompの作成でエラー");
        $.writeln(e);
    }

    // 写真の読み込み
    // /img/に000.jpgで入れておく。
    //***********************************************//
    var PhotoList=[];

    for (var i = 1; i <= PAGE_NUM ; i++) {
        // ファイルの指定
        var pNUM = ("00"+i).slice(-3);  // ゼロ埋め
        var loadFile = PATH_CURRENT+PATH_PHTO+pNUM+TYPE_PHOT;
        // // ファイルのインポート
        PhotoList[i] = importFootage(loadFile);
        if(PhotoList[i] == "shutdown!"){return 0;}

        //コンポジションに追加
        var myLay = PageCompList[i].layers.add( PhotoList[i] );

        var scaleVal;
        // サイズをコンポジションの縦幅に合わせる。
        var newHeight = COMP_HEIGHT;
        var orgHeight = myLay.height
        var scaleValY = newHeight/myLay.height*100;
        scaleVal = scaleValY;
        myLay.transform.scale.setValue([scaleVal, scaleVal, scaleVal]);
        // alert('スライドショー画像のサイズ変更でえらー')

        // スケールアニメーションの設定
        var myLayProp = myLay.property("ADBE Transform Group").property("ADBE Scale");
        myLayProp.setValueAtTime(  COMP_DURAT_PAGE *0.0, [SCALE_IN*scaleVal/100, SCALE_IN*scaleVal/100]);
        myLayProp.setValueAtTime(  COMP_DURAT_PAGE *1.0, [SCALE_OUT*scaleVal/100, SCALE_OUT*scaleVal/100]);
    }


    // メッセージ用オブジェクト テキストオブジェクトの作成
    //***********************************************//
    // テキストレイヤを作成
    TEXTPOS_X = COMP_WIDTH * TXTPOS_X_SPC;
    TEXTPOS_Y = COMP_HEIGHT* TXTPOS_Y_SPC;

    var MesObjList=[];
    for (var i = 1; i <= PAGE_NUM ; i++) {

        MesObjList[i] = makeSubCompToText(PageCompList[i], 
                                TEXT_WIDTH, 
                                TEXT_HEIGHT, 
                                msg_txt_List[i],
                                [TEXTPOS_X, TEXTPOS_Y]
                                );
        MesObjList[i].name = "Message Text"+i;
        // テキストのプロパティの設定
        var txtDoc = getTextDocDefault();
        txtDoc.fillColor = [1, 1, 1];
        txtDoc.strokeColor = [0, 0, 0];
        txtDoc.strokeWidth = 4;
        // txtDoc.justfication = ParagraphJustification.LEFT_JUSTIFY     //段落タブの段落指定。この場合テキストの中央揃え。
        setTextDocument(MesObjList[i], txtDoc);
        delete txtDoc;

    }

    // スライドショーの作成
    //***********************************************//
    var myLays = SlidePageComp.layers;
    for (var i=myLays.length; 0 < i ; i--){

        // 透過の設定
        myLayProp = myLays[i].property("ADBE Transform Group").property("ADBE Opacity");
        myLayProp.setValueAtTime(  COMP_DURAT_PAGE *0.0, 0);
        myLayProp.setValueAtTime(  COMP_DURAT_PAGE *CROSS, 100);
        myLayProp.setValueAtTime(  COMP_DURAT_PAGE *(1 - CROSS), 100);
        myLayProp.setValueAtTime(  COMP_DURAT_PAGE *1.0, 0);

        // シーケンスの設定
        myLays[i].startTime =  COMP_DURAT_PAGE *(i-1)*(1-CROSS);
    }

    /**************************************************

        EndCompの作成

    **************************************************/
    try{
    // メッセージ用ボックステキストのサイズ
    var TEXT_WIDTH = TXT_WIDTH_END;
    var TEXT_HEIGHT = TXT_HEIGHT_END;

    var txt_pos_end = [COMP_WIDTH/2, COMP_HEIGHT*0.5];
    var txt = "EndMessage";
    var end_obj_List=[];

    // テキストの作成
    var txt = end_txt_List[1];
    end_obj_List[1] = makeSubCompToText(EndComp, TEXT_WIDTH, TEXT_HEIGHT, txt, txt_pos_end);

    // テキストレイヤーのプロパティの設定
    var myLay = end_obj_List[1];
    // テキストのプロパティの設定
    var txtDoc = getTextDocDefault();
    txtDoc.font             = FONT_FAMILY_END; //"MS Gothic" "Meiryo UI" 
    txtDoc.fontSize         = FONT_SIZE_END;  //40
    txtDoc.fillColor        = [0, 0, 0]; //黒
    txtDoc.strokeColor  = [1, 1, 1]; //白
    txtDoc.strokeWidth  = 1;
    txtDoc.justfication = ParagraphJustification.LEFT_JUSTIFY    //段落タブの段落指定。この場合テキストの中央揃え。
    setTextDocument(myLay, txtDoc);
    delete txtDoc;

    // 透過アニメーションの設定
    var myLayProp = myLay.property("ADBE Transform Group").property("ADBE Opacity");
    myLayProp.setValueAtTime(  COMP_DURAT_END *0.0, 0);
    myLayProp.setValueAtTime(  COMP_DURAT_END *CROSS, 100);
    myLayProp.setValueAtTime(  COMP_DURAT_END *(1 - CROSS), 100);
    myLayProp.setValueAtTime(  COMP_DURAT_END *1.0, 0);

    }catch(e){
        $.writeln("EndCompの作成");
        $.writeln(3);
    }
    /**************************************************

        BGCompの作成

    **************************************************/
    // ファイルの指定
    var loadFile = PATH_CURRENT+PATH_BG;

    var video = importFootage(loadFile);
    video.mainSource.loop = BG_LOOP; // 30
    var bglay = BGComp.layers.add(video);

    if (BGCOMP_FIT == "width-fit"){

        // サイズをコンポジションの横幅に合わせる。
        var newWidth = COMP_WIDTH;
        var orgWidth = bglay.width;
        var scaleValX = newWidth/bglay.width*100;
        var scaleVal = scaleValX;
        bglay.transform.scale.setValue([scaleVal, scaleVal, scaleVal]);

    }else if(BGCOMP_FIT == "height-fit"){

        // サイズをコンポジションの縦幅に合わせる。
        var newHeight = COMP_HEIGHT;
        var orgHeight = myLay.height
        var scaleValY = newHeight/myLay.height*100;
        var scaleVal = scaleValY;
        bglay.transform.scale.setValue([scaleVal, scaleVal, scaleVal]);
    }else{
        alert("エラー。BGCOMP_FITはwidth-fitか、height-fitにしてください。")
    }

    /**************************************************

        ラスト白平面とENDの作成

    **************************************************/
    try{
        var w = COMP_WIDTH;
        var h = COMP_HEIGHT;
        var pa = COMP_PIXASP;
        var du = 10*60; //[s]

        // 平面レイヤ
        var myLay = BGComp.layers.addSolid([1, 1 ,1],"",w,h,pa,du);
        myLay.startTime = COMP_DURAT_REN - COMP_DURAT_BUFF/2;
        myLay.duration = COMP_DURAT_BUFF/2;
        // 透過アニメーションの設定
        var myLayProp = myLay.property("ADBE Transform Group").property("ADBE Opacity");
        myLayProp.setValueAtTime(  myLay.startTime, 0);
        myLayProp.setValueAtTime(  COMP_DURAT_REN , 100);

        // ENDテキストレイヤ(注意)
        var myLay = makeSubCompToText(BGComp, 500, 100, "END", [w/2, h*0.6]);
        myLay.startTime = COMP_DURAT_REN - COMP_DURAT_BUFF/2;
        myLay.duration = COMP_DURAT_BUFF/2;

        // テキストのプロパティの設定
        var txtDoc = getTextDocDefault();
        txtDoc.font             = FONT_FAMILY_END; //"MS Gothic" "Meiryo UI" 
        txtDoc.fontSize         = FONT_SIZE_END;  //40
        txtDoc.fillColor        = [0, 0, 0]; //黒
        txtDoc.strokeColor  = [1, 1, 1]; //白
        txtDoc.strokeWidth  = 1;
        setTextDocument(myLay, txtDoc);

        // 透過アニメーションの設定
        var myLayProp = myLay.property("ADBE Transform Group").property("ADBE Opacity");

        myLayProp.setValueAtTime(  myLay.startTime+myLay.duration*0.0, 0);
        myLayProp.setValueAtTime(  myLay.startTime+myLay.duration*0.1, 100);
        myLayProp.setValueAtTime(  myLay.startTime+myLay.duration*0.6, 100);
        myLayProp.setValueAtTime(  myLay.startTime+myLay.duration*0.9, 0);

    }catch(e){
        $.writeln(e);
    }

    /**************************************************

        BGMの配置

    **************************************************/
    // ファイルの指定
    var loadFile = PATH_CURRENT+LOCAL_PATH_BGM;
    var bgmfootage = importFootage(loadFile);
    var bgmLay = RendererComp.layers.add(bgmfootage);
    // 開始位置の設定
    bgmLay.startTime = COMP_DURAT_TIT;
    bgmLay.duration = DURAT_BGM;
    $.writeln(bgmLay.duration);
    try{
        // フェードアウト
        var myProp =  bgmLay.property("ADBE Audio Group").property("ADBE Audio Levels");
        var gain = myProp.value;
        $.writeln(gain);
        
        FADE_OUT_in = COMP_DURAT_REN - COMP_DURAT_BUFF - COMP_DURAT_END/2;
        FADE_OUT_out = COMP_DURAT_REN;
        
        var key1 = myProp.addKey(FADE_OUT_in);
        var key2 = myProp.addKey(FADE_OUT_out);

        myProp.setValueAtKey(key1, gain);
        myProp.setValueAtKey(key2, [-48, -48]);
        
        // var gain = bgmLay.property("ADBE Audio Group").property("ADBE Audio Levels").value;
        myProp.setInterpolationTypeAtKey(key1, KeyframeInterpolationType.LINEAR );
        myProp.setInterpolationTypeAtKey(key2, KeyframeInterpolationType.LINEAR );

        
    }catch(e){
        alert("BGMがおかしいです。")
        $.writeln(e);
    }

    /**************************************************

        フォルダリング

    **************************************************/
    // 各コンポジション用のフォルダ
    var SceneFolder = app.project.items.addFolder("SceneComp");
    TitleComp.parentFolder = SceneFolder;
    WelcomeComp.parentFolder = SceneFolder;
    SlidePageComp.parentFolder = SceneFolder;
    EndComp.parentFolder = SceneFolder;
    BGComp.parentFolder = SceneFolder;

    // 写真用フォルダ
    var photoFolder = app.project.items.addFolder("Photo ("+ (PhotoList.length-1) +")");
    var fNum = PhotoList.length;
    for (var i = 1; i <= fNum-1; i++) {
        PhotoList[i].parentFolder = photoFolder;
    };

    // スライドページコンポジション用フォルダ
    var pageFolder = app.project.items.addFolder("PageComp ("+ (PageCompList.length-1) +")");
    var fNum = PhotoList.length;
    for (var i = 1; i <= fNum-1; i++) {
        PageCompList[i].parentFolder = pageFolder;
    };

    // WelcomeComp.openInViewer();
    // SlidePageComp.openInViewer();
    // EndComp.openInViewer();
    RendererComp.openInViewer();

    $.writeln("スライドショーの作成に成功しました!");

};





/********************************************************

    ---- creatSetting   ver.0.0 ----
    ユーザ定義変数から環境変数を作成する

        by fifi  2014/10/21

/********************************************************/
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

// 絶対変数(後で実装)
#include "user-config.jsx"



app.endUndoGroup();
