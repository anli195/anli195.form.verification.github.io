var oI = $('<i class="prompt"></i>');
$(function(){
	var sex = $("[name=sex]")
	var sexParents = sex.eq(0).parents("p");
	var userNameReg = /^[\u4e00-\u9fa5]/;
	var passWordReg = /^[a-zA-Z0-9]\w{5,17}/;
	var phoneReg = /^1[34578]\d{9}$/;
	validation($("#userName"),"昵称必须是中文，且不能超过6位","昵称不能为空","昵称格式有误，请重新输入",userNameReg);
	validation($("#setPwd"),"密码有6到16位字母，数字，下划线构成","密码不能为空","密码格式有误，请重新输入",passWordReg);
	validation($("#tel"),"请输入11位手机号","手机号不能为空","手机号格式有误，请重新输入",phoneReg);
	verification(120);
	sex.each(function(){
		$(this).click(function(){
			sexParents.find("i").remove();
		});
	});
	$("#okPwd").on("blur",function(){
		if($(this).val() == $("#setPwd").val()){
			oI.text("ok");
			$(this).after(oI);
		}else{
			$(this).val("").focus();
		}
	});
	$("#regBtn").on("click",function(){
		var sexNum = $("[name=sex]:checked").length;
		if(sexNum == 0){
			oI.text("请选择性别！").addClass("error");
			sexParents.append(oI);
			return;
		}
		if(birth($("#year"),"年","请选择年份！")){
			return;
		}
		if(birth($("#month"),"月","请选择月份！")){
			return;
		}
		if(birth($("#day"),"日","请选择日期！")){
			return;
		}
		if(birth($("#province"),"省份","请选择省份！")){
			return;
		}
		if(birth($("#city"),"市区","请选择市区！")){
			return;
		}
	});
});
//聚焦和失焦事件
function validation(obj,prompt,empty,errorInfo,reg){
	obj.on({
		focus : function(){
			oI.removeClass("error").text(prompt);
			$(this).after(oI);
			$(this).select();
		},
		blur  : function(){
			if($(this).val() == ""){
				oI.addClass("error").text(empty);
			}else if(reg.test($(this).val())){
				oI.text("ok");
			}else{
				oI.addClass("error").text(errorInfo);
				$(this).select();
//				$(this).trigger("focus");
			}
		}
	});
};
//获取验证码
function verification(num){
	$("p").on("click","#codeBtn",function(){
		var btn = $('<a href="javascript:void(0)" id="codeBtn" class="codeBtn">获取手机验证码</a>')
		var countdown = $("<em class='codeBtn'><b>" +num + "</b></em>");
		var second = countdown.find("b").text();
		var timer = setInterval(function(){
			second--;
			countdown.find("b").text(second);
			if(second < 1){
				countdown.after(btn).remove();
				clearInterval(timer);
			}
		},1000);
		$("#codeBtn").after(countdown).remove();
	});
};
//select 菜单
function birth(obj,result,choice){
	if(obj.val() == result){
		oI.text(choice).addClass("error");
		obj.parents("p").append(oI);
		return  true;
	}else{
		obj.parents("p").find("i").remove();
		return false;
	}
};
