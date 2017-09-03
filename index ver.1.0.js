/*
*System.createCell();->8*8のセルと各種ボタン
*System.finishGame();->勝敗判定とウィンドウの処理
*System.pauseTurn();->ターンチェンジ
*System.resetCell();->変数の初期化と再読み込み
*System.sendMail();->メーラー起動
*System.changeCell(x,y);->セルの裏返し判定と処理
*/
"use strict";
let change=false;
let turn=false;
let black=0;
let white=0;
let ally='white';
let enemy='black';
const System={
	createCell:function(){
		for(let wid=0;wid<8;wid++)
		for(let hei=0;hei<8;hei++)
			document.write("<input class='cell' id='"+wid+"_"+hei+"' onclick=System.changeCell("+wid+","+hei+"); style='font-size:625%;background-color:green;color:green;width:12.5%;' type='button' value='●'>");
		document.write("<input id='pause' onclick=System.pauseTurn(); style='font-size:312.5%;width:25%;' type='button' value='パス'>");
		document.write("<input id='pause' onclick=System.finishGame(); style='font-size:312.5%;width:25%;' type='button' value='終了'>");
		document.write("<input id='reset' onclick=System.resetCell(); style='font-size:312.5%;width:25%;' type='button' value='リセット'>");
		document.write("<input id='mail' onclick=System.sendMail(); style='font-size:312.5%;width:25%;' type='button' value='問い合わせ'>");
		document.getElementById("3_3").style.color='white';
		document.getElementById("4_4").style.color='white';
		document.getElementById("3_4").style.color='black';
		document.getElementById("4_3").style.color='black';
		window.alert("生成しました");
	},
	finishGame:function(){
		for(let x=0;x<8;x++)
		for(let y=0;y<8;y++){
			if(document.getElementById(x+"_"+y).style.color=='black')
				black++;
			if(document.getElementById(x+"_"+y).style.color=='white')
				white++;
		}
		if(black>white)
			window.alert("黒の勝ちです");
		if(black<white)
			window.alert("白の勝ちです");
		if(black==white)
			window.alert("引き分けです");
		window.alert("ゲームを終了します");
		window.close();
	},
	pauseTurn:function(){
		turn=(!turn);
		window.alert("パスしました");
	},
	resetCell:function(){
		location.reload();
		window.alert("リセットしました");
	},
	sendMail:function(){
		location.href='mailto:tirin.script.modder@gmail.com';
		window.alert("メールを送信します");
	},
	changeCell:function(x,y){
		if(document.getElementById(x+"_"+y).style.color=='green'){
			change=false;
			switch(turn){
				case true:
				ally='black';
				enemy='white';
				break;
				case false:
				ally='white';
				enemy='black';
				break;
			}
			for(let i=x-1;i>-1;i--){
				if(document.getElementById(i+"_"+y).style.color==enemy)
					continue;
				if(document.getElementById(i+"_"+y).style.color=='green')
					break;
				if(document.getElementById(i+"_"+y).style.color==ally){
					for(let ii=x-1;ii>i;ii--){
						document.getElementById(ii+"_"+y).style.color=ally;
						document.getElementById(x+"_"+y).style.color=ally;
						change=true;
					}
					break;
				}
			}
			for(let i=x+1;i<8;i++){
				if(document.getElementById(i+"_"+y).style.color==enemy)
					continue;
				if(document.getElementById(i+"_"+y).style.color=='green')
					break;
				if(document.getElementById(i+"_"+y).style.color==ally){
					for(let ii=x+1;ii<i;ii++){
						document.getElementById(ii+"_"+y).style.color=ally;
						document.getElementById(x+"_"+y).style.color=ally;
						change=true;
					}
					break;
				}
			}
			for(let i=y-1;i>-1;i--){
				if(document.getElementById(x+"_"+i).style.color==enemy)
					continue;
				if(document.getElementById(x+"_"+i).style.color=='green')
					break;
				if(document.getElementById(x+"_"+i).style.color==ally){
					for(let ii=y-1;ii>i;ii--){
						document.getElementById(x+"_"+ii).style.color=ally;
						document.getElementById(x+"_"+y).style.color=ally;
						change=true;
					}
					break;
				}
			}
			for(let i=y+1;i<8;i++){
				if(document.getElementById(x+"_"+i).style.color==enemy)
					continue;
				if(document.getElementById(x+"_"+i).style.color=='green')
					break;
				if(document.getElementById(x+"_"+i).style.color==ally){
					for(let ii=y+1;ii<i;ii++){
						document.getElementById(x+"_"+ii).style.color=ally;
						document.getElementById(x+"_"+y).style.color=ally;
						change=true;
					}
					break;
				}
			}
			if(change)
				turn=(!turn);
		}
	}
};
