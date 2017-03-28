var oI = $('<i class="prompt"></i>');
$(function(){
	var userNameReg = /^[\u4e00-\u9fa5]/;
	var passWordReg = /^[a-zA-Z0-9]\w{5,17}/;
	validation($("#userName"),"昵称必须是中文，且不能超过6位","昵称不能为空！","昵称格式有误，请重新输入",userNameReg)
	validation($("#setPwd"),"密码有6到16位字母，数字，下划线构成","密码不能为空！","密码格式有误，请重新输入",passWordReg)
	var sex = $("[name=sex]");
	var sexParents = sex.eq(0).parents("p");
	sex.each(function(){
		$(this).click(function(){
			sexParents.find("i").remove();	
		});
	});
	$("#regBtn").on("click",function(){
		var sexNum = $("[name=sex]:checked").length;
		if(sexNum == 0){
			oI.text("请选择性别！").addClass("error");
			sexParents.append(oI);
			return;
		}else {
			var sexType = $("[name=sex]:checked").val();
			console.log(sexType);
		}
		if($("#year").val() == "年"){
			alert("请选择年份")
		}
		var person = {
			"user" :  $("#userName").val(),
			"sex"  :  sexType,
			"year" : $("#year").val()
		}	
	});
})




function validation(obj,prompt,empty,errorInfo,reg){
	obj.on({
		focus : function(){
			oI.removeClass("error").text(prompt);
			$(this).after(oI);
		},
		blur  : function(){
			if($(this).val() == ""){
				oI.text(empty).addClass("error");
			}else if(reg.test($(this).val())){
				oI.text("ok");
			}else {
				oI.text(errorInfo).addClass("error");
				var val = $(this).val();
				$(this).val(val).select();
			}
		}
	});
}
function countNum(num){
	var btn = $('<a href="javascript:void(0)" onclick="countNum(3)" id="codeBtn" class="codeBtn">获取手机验证码</a>');
	var countdown = $('<em class="codeBtn"><b>' + num + '</b>秒后重新获取</em>');
	var second  = countdown.children("b").text();
	var time = setInterval(function(){
		second--;
		if(second < 1){
			countdown.after(btn).remove();
			clearInterval(time);
		}
		countdown.children("b").text(second);
	},1000);
	$("#codeBtn").after(countdown).remove();
};