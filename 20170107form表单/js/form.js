(function(){
	// radio
	$.fn.formRadio = function(){
		return this.each(function(){
			var $this = $(this);
			if($this.hasClass("hidden")) return;
			var $parent = $this.addClass("hidden").wrap("<span class='formRadio'></span>").parent();
			if($this.is(":checked")) $this.parent("span").addClass("formRadioCurr");
			$parent.on("click",function(){
				$(this).addClass("formRadioCurr").siblings("span").removeClass("formRadioCurr");
				$this.prop("checked",true);
			});
		});
	}
	// checkbox
	$.fn.formCheckBox = function(){
		return this.each(function(){
			var $this = $(this);
			if($this.hasClass("hidden")) return;
			var $parent = $this.addClass("hidden").wrap("<span class='formCheckbox'></span>").parent();
			if($this.is(":checked")) $this.parent("span").addClass("formCheckboxCurr");
			$parent.on("click",function(){
				if($(this).hasClass("formCheckboxCurr")){
					$(this).removeClass("formCheckboxCurr");
					$this.prop("checked",false);
				}else {
					$(this).addClass("formCheckboxCurr");
					$this.prop("checked",true);
				}
			});
		});
	}
	// select
	$.fn.formSelect = function(){
		return this.each(function(){
			var $this = $(this);
			var $parent = $this.addClass("hidden").wrap('<div class="formSelect"></div>').parent();
			$parent.prepend('<span></span><em></em><ul></ul>').width($this.width());
			var $ul = $("ul",$parent);
			$("option",$this).each(function(){
				var oLi = '<li>' + $(this).val() + '</li>';
				$ul.append(oLi);
			});
			$parent.on("click","span,em",function(e){
				$(".formSelect ul").slideUp();
				if($("li",$ul).length >=5){
					$ul.css({
						height : "150px",
						overflow : "auto"
					});
				}
				$ul.slideDown();
				return false;
			});
			$("li",$ul).on("click",function(){
				var index = $(this).index();
				$("option",$this).eq(index).prop("selected",true);
				$(this).addClass("curr").siblings("li").removeClass("curr");
				$("span",$parent).html($(this).text());
				$ul.slideUp();
			});
			$("li",$ul).eq(0).trigger("click");
			$(document).on("click",function(){
				$ul.slideUp();
			});
		});
	}
	
	$.fn.jqForm = function(){
		$("input:radio").formRadio();
		$("input:checkbox").formCheckBox();
		$("select").formSelect();
	}
	
})(jQuery);
