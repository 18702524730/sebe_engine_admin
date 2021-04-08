
/**
 * 过滤器
 */
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
	var len = len - (s + '').length;
	for (var i = 0; i < len; i++) { s = '0' + s; }
	return s;
};

export default {
	getQueryStringByName: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		var context = "";
		if (r != null)
				context = r[2];
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ? "" : context;
	},
	formatDate: {
		//日期转yyyy-mm-dd格式
		format: function (date, pattern) {
			pattern = pattern || DEFAULT_PATTERN;
			return pattern.replace(SIGN_REGEXP, function ($0) {
				switch ($0.charAt(0)) {
					case 'y': return padding(date.getFullYear(), $0.length);
					case 'M': return padding(date.getMonth() + 1, $0.length);
					case 'd': return padding(date.getDate(), $0.length);
					case 'w': return date.getDay() + 1;
					case 'h': return padding(date.getHours(), $0.length);
					case 'm': return padding(date.getMinutes(), $0.length);
					case 's': return padding(date.getSeconds(), $0.length);
				}
			});
		},
		parse: function (dateString, pattern) {
			var matchs1 = pattern.match(SIGN_REGEXP);
			var matchs2 = dateString.match(/(\d)+/g);
			if (matchs1.length == matchs2.length) {
					var _date = new Date(1970, 0, 1);
					for (var i = 0; i < matchs1.length; i++) {
							var _int = parseInt(matchs2[i]);
							var sign = matchs1[i];
							switch (sign.charAt(0)) {
									case 'y': _date.setFullYear(_int); break;
									case 'M': _date.setMonth(_int - 1); break;
									case 'd': _date.setDate(_int); break;
									case 'h': _date.setHours(_int); break;
									case 'm': _date.setMinutes(_int); break;
									case 's': _date.setSeconds(_int); break;
							}
					}
					return _date;
			}
			return null;
		},
		//日期转时间戳
		timeStamp:function(date){
			var timestamp = Date.parse(new Date(date));
			timestamp = timestamp / 1000;
			return timestamp
		},
		//日期格式转换
		dateFormat: function (input,type) {
			if(input == null || input=='' || typeof(input) == "undefined"){
					return "--";
			}
			var _date = new Date(input);
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
			var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
			var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
			var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
			var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
			if(type == "date"){
					return year + "-" + month + "-" + day;
			} else if(type == "time") {
					return hour + ":" + minutes + ":" + seconds;
			} else {
					return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
			}
			return "--";
		},
		datesFormat: function (input) {
			if(input == null || input=='' || typeof(input) == "undefined"){
					return "--";
			}
			var _date = new Date(input);
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
			var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
			return year + "-" + month + "-" + day;
		},
		FormatTime: function (input,type) {
			if(input == null || input=='' || typeof(input) == "undefined"){
					return "--";
			}
			var _date = new Date(input);
			var year = _date.getFullYear();
			var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
			var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
			var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
			var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
			var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
			if(type == "date"){
					return year + "-" + month + "-" + day;
			} else if(type == "time") {
					return hour + ":" + minutes + ":" + seconds;
			} else {
					return year + "-" + month + "-" + day;
			}
			return "--";
		}
	},
	trademarktypeformat:function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "文字商标";
				break;
			case '2':
				ret = "图形商标";
				break;
			case '3':
				ret = "文字图形组合商标";
				break;
		}
		return ret;
	},
	//收支类型
	shouzhiformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "收入";
				break;
			case '2':
				ret = "支出";
				break;
		}
		return ret;
	},
	// 交易类型
	jiaoyiformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "充值";
				break;
			case '2':
				ret = "消费";
				break;
			case '3':
				ret = "退款";
				break;
		}
		return ret;
	},
	// 订单状态
	orderstateformat: function (input) {
		var ret = ''
		switch (input+''){
			case '0':
				ret = "已支付";
				break;
			case '1':
				ret = "待审核";
				break;
			case '2':
				ret = "审核不通过";
				break;
			case '3':
				ret = "审核通过";
				break;
			case '4':
				ret = "订单关闭";
				break;
			case '20':
				ret = "已提交到商标局";
				break;
			case '21':
				ret = "商标局已接受";
				break;
			case '22':
				ret = "商标局不予受理";
				break;
			case '23':
				ret = "商标局受理通过";
				break;
			case '29':
				ret = "商标局部分驳回";
				break;
			case '30':
				ret = "商标局驳回";
				break;
			case '31':
				ret = "商标局审通过";
				break;
			case '99':
				ret = "申请成功结束";
				break;
		}
		return ret;
	},
	fileStateNameformat: function (input) {
		var ret = ''
		switch (input+''){
			case '21':
				ret = "商标局回执";
				break;
			case '22':
				ret = "不予受理通知书";
				break;
			case '23':
				ret = "受理通知书";
				break;
			case '29':
				ret = "部分驳回通知书";
				break;
			case '30':
				ret = "驳回通知书";
				break;
			case '31':
				ret = "审核通过通知书";
				break;
			case '99':
				ret = "商标证通知书";
				break;
		}
		return ret;
	},
	// 补正状态
	bzstateformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "初始化";
				break;
			case '2':
				ret = "待补正";
				break;
			case '3':
				ret = "放弃补正";
				break;
			case '4':
				ret = "已补正";
				break;
			case '5':
				ret = "补正超时";
				break;
			case '6':
				ret = "补正已递交";
				break;
		}
		return ret;
	},
	//申请人类型
	sqrformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "个人";
				break;
			case '2':
				ret = "企业";
				break;
		}
		return ret;
	},
	bsTypeFormat: function (inputs) {
		if(inputs == 1) {
			return "商标注册"
		}
	},
	areaformat: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "大陆";
				break;
			case '2':
				ret = "中国香港";
				break;
			case '3':
				ret = "中国澳门";
				break;
			case '4':
				ret = "中国台湾";
				break;
			case '5':
				ret = "海外";
				break;
		}
		return ret;
	},
	//价格保留两位小数
	priceformat: function (input) {
		var ret = '';
		// input 有可能是数字0
		if (input !== null && input !== undefined) {
			ret = input - 0 +'';
			if(ret === 0){
				ret = 0;
			}else{
				ret = (ret-0).toFixed(2);
			}
		}
		return ret;
	},
	//价格转换为万元
	priceUnitFilter(td){
		var ret = td/10000+'';
		if(ret.indexOf('.') !== -1){
			ret = (ret-0).toFixed(2);
			ret = ret.replace(/((\.0{1,2})|0)$/, '');
		}
		return ret;
	},
	refundStateFilter(input){
		var ret = ''
		switch (input+''){
			case '0':
				ret = "待受理";
				break;
			case '1':
				ret = "退款中";
				break;
			case '2':
				ret = "已退款";
				break;
			case '3':
				ret = "已驳回";
				break;
		}
		return ret;
	},
	notarizationStatusformat(input){
		var ret = ''
		switch (input+''){
			case '0':
				ret = "待存证";
				break;
			case '1':
				ret = "存证中";
				break;
			case '2':
				ret = "存证失败";
				break;
			case '3':
				ret = "存证成功";
				break;
		}
		return ret;
	},
	orderStatus: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "待服务";
				break;
			case '2':
				ret = "服务中";
				break;
			case '3':
				ret = "服务完成";
				break;
			case '4':
				ret = "服务关闭";
				break;
		}
		return ret;
	},
	notarizationUsesformat(input){
		var ret = ''
		switch (input+''){
			case '1':
				ret = "电商维权";
				break;
			case '2':
				ret = "自媒体内容维权";
				break;
			case '3':
				ret = "设计作品未经授权发布";
				break;
			case '4':
				ret = "文字创作存证";
				break;
			case '5':
				ret = "美术作品存证";
				break;
			case '6':
				ret = "音乐作品存证";
				break;
			case '7':
				ret = "影像摄影存证";
				break;
			case '8':
				ret = "其他";
				break;
		}
		return ret;
	},
	fileSizeFilter(v){
		if (!v) {
			return '';
		}
		var ret = v;
		if (v > 1024*1024) {
			ret = (ret/1024/1024).toFixed(1) + 'M';
		}else{
			var t = (ret/1024).toFixed(1);
			ret = (t === '0.0' ? '0.1' : t) + 'KB';
		}
		return ret;
	},
	formatPatent:{
		//专利类型转换
		format: function (input) {
			if(input == null || input=='' || typeof(input) == "undefined"){
				return "";
			}else{
				switch (input){
					case 1:
							return "发明专利";
					case 2:
							return "实用新型专利";
					case 3:
							return "外观设计专利";
				}
			}
		}
	},
	formatIPRClassify:{
		//知产分类转换
		format: function (input) {
			switch (input){
				case 0:
					return "商标";
				case 1:
					return "专利";
			}
		}
	},
	formatStatus:{
		//会员状态转换
		format: function (input) {
			switch (input){
				case false:
					return 0;
				case true:
					return 1;
			}
		}
	},
	//申请主体类型
	subjectTypeFormat(input) {
		switch (input){
			case 1:
				return "大陆个体";
			case 2:
				return "大陆企业";
			case 3:
				return "港澳台及境外个人";
			case 4:
				return "港澳台及境外企业";
		}
	},

	//申请主体类型(cxb)
	subjectTypeCxbFormat(input) {
		switch (input){
			case 0:
				return "国内个体";
			case 1:
				return "国内企业";
			case 2:
				return "国外自然人";
			case 3:
				return "国外企业";
		}
	},
	titleLengthFormat (input, num) {
		if (input && input.length>num+1) {
			return input.slice(0,num)+'...';
		}
		return input;
	},
	// 售后状态 
  refundState: function(txt){
    var ret = '';
    // input 有可能是数字0
    switch (txt +''){
      case '0':
        ret = "退款审核中";
        break;
      case '1':
        ret = "已退款";
        break;
      case '2':
        ret = "退款已驳回";
        break;
      case 'null':
        ret = "--";
        break;
		}
		return ret;
	},
	//性别
  sex: function (input) {
    var ret = ''
    switch (input+''){
      case '1':
        ret = "男";
        break;
      case '2':
        ret = "女";
        break;
    }
    return ret;
  },
  //申请主体类型
	invoiceTypeFormat(input) {
		switch (input){
			case 1:
				return "增值税普通发票";
			case 2:
				return "增值税专用发票";
		}
	},
	// 是否费减feeDeduct
	feeDeductFormat(input) {
		switch (input){
			case 0:
				return "否";
			case 1:
				return "是";
		}
	},
	//发票类型
	patentInvoiceTypeFormat(input) {
		switch (input){
			case 1:
				return "专票";
			case 2:
				return "普票";
		}
	},
	//电子发票、纸质发票
	paperFormat(input) {
		switch (input){
			case 1:
				return "电子发票";
			case 2:
				return "纸质发票";
		}
	},
	//寄送方式
	sendTypeFormat(input) {
		switch (input){
			case 1:
				return "快递邮寄";
			case 2:
				return "商务代领";
		}
	},
	//监控状态
	monitorStateFormat(input) {
		switch (input){
			case 1:
				return "未逾期";
			case 2:
				return "已逾期";
		}
	},
	//审查结果
	trialReviewResultFormat(input){
		switch (input){
			case 1:
				return "通过";
			case 2:
				return "补正/审查";
			case 3:
				return '驳回'
		}
	},
	//专利类型
	patentTypeFormat(input){
		switch (input){
			case 1:
				return "外观专利";
			case 2:
				return "发明专利";
			case 3:
				return '实用新型'
		}
	},
	// 年费缴纳方式
	yearFeeTurnInTypeFormat(input){
		var ret = '';
		if(input ==1){
			ret = '我司代缴'
		}
		if(input ==2){
			ret = '客户自缴'
		}
		return ret
	},
  //主体信息显示
  mainBodeSbj(input) {
    switch (input){
      case 1:
        return "申请人";
      case 2:
        return "企业";
      case 3:
        return "申请人";
      case 4:
        return "企业";
      case 5:
        return "申请人";
    }
  },
  // 开票信息
  mainBodeNumber(input) {
    switch (input){
      case 1:
        return "申请人身份证号";
      case 2:
        return "企业营业执照号";
      case 3:
        return "申请人护照号";
      case 4:
        return "";
      case 5:
        return "申请人身份证号";
    }
  },
  fileName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "申请人身份证";
        break;
      case '2':
        ret = "企业营业执照副本复印件";
        break;
      case '3':
        ret = "申请人护照";
        break;
      case '4':
        ret = "企业登记证件";
        break;
    }
    return ret;
  },
  licenseName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "个体工商户营业执照";
        break;
      case '2':
        ret = "";
        break;
      case '3':
        ret = "中文护照译本";
        break;
      case '4':
        ret = "企业登记证件译本";
        break;
    }
    return ret;
  },
  downFileName: function(data){
    var ret = ''
    switch (data+''){
      case '1':
        ret = "申请号回执";
        break;
      case '2':
        ret = "受理通知书";
        break;
      case '3':
        ret = "不予受理通知书";
        break;
      case '4':
        ret = "初审公告书";
        break;
      case '5':
        ret = "部分驳回通知书";
        break;
      case '6':
        ret = "驳回通知书";
        break;
      case '7':
        ret = "注册公告";
        break;
      case '8':
        ret = "部分异议通知书";
        break;
      case '9':
        ret = "异议通知书";
        break;
      case '10':
        ret = "注册证";
        break;
      case '11':
        ret = "未办理驳回复审";
        break;
      case '12':
        ret = "驳回复审通过";
        break;
      case '13':
        ret = "驳回复审不通过";
        break;
      case '14':
        ret = "未办理异议答辩";
        break;
      case '15':
        ret = "异议答辩通过";
        break;
      case '16':
        ret = "异议答辩不通过";
        break;
      case '17':
        ret = "初审公告书";
        break;
      case '18':
        ret = "退款告知函";
        break;
    }
    return ret;
  },
  picType: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "黑白色";
				break;
			case '2':
				ret = "指定色";
				break;
		}
		return ret;
	},
	timeStatus: function (input, stage) {
		var ret = ''
		if (stage<10) {
			switch (input+''){
				case '':
					ret = "收文时间";
					break;
				case '5':
					ret = "收文时间";
					break;
				case '6':
					ret = "通知书下发时间";
					break;
				case '-6':
					ret = "通知书收文时间";
					break;
			}
		}else if(stage == 10 || stage == 12 || stage == 13 || stage == 16 || stage == 15  || stage == 17){
			ret = "通知书收文时间";
		}else if(stage == 14){
			ret = "注册证收文时间";
		}
		return ret;
	},
	nameFile: function (input, stage) {
		var ret = ''
		if (stage<10) {
			switch (input+''){
				case '':
					ret = "申请号回执单";
					break;
				case '5':
					ret = "申请号回执单";
					break;
				case '6':
					ret = "受理通知书";
					break;
				case '-6':
					ret = "不予受理通知书";
					break;
			}
		}else if(stage == 10){
			switch (input+''){
				case '12':
					ret = "初审公告书";
					break;
				case '13':
					ret = "部分驳回通知书";
					break;
				case '14':
					ret = "驳回通知书";
					break;
			}
		}else if(stage == 12){
			switch (input+''){
				case '15':
					ret = "注册公告";
					break;
				case '16':
					ret = "部分异议通知书";
					break;
				case '17':
					ret = "异议通知书";
					break;
			}
		}else if(stage == 13){
			switch (input+''){
				case '12':
					ret = "初审公告书";
					break;
				case '15':
					ret = "初审公告书";
					break;
			}
		}else if(stage == 14){
			switch (input+''){
				case '18':
					ret = "注册证";
					break;			}
		}else if(stage == 15){
			switch (input+''){
				case '19':
					ret = "驳回复审决定书";
					break;
				case '20':
					ret = "驳回复审决定书";
					break;
			}
		}else if(stage == 16){
			ret = "注册公告";
		}else if(stage == 17){
			ret = "异议答辩决定书";
		}
		return ret;
	},
	fileStateName: function (input) {
		var ret = ''
		switch (input+''){
			case '1':
				ret = "待接单";
				break;
			case '2':
				ret = "服务商已接单";
				break;
			case '3':
				ret = "已接单待提交";
				break;
			case '4':
				ret = "已提交待确认";
				break;
			case '5':
				ret = "已确认待支付加项费用";
				break;
			case '6':
				ret = "已确认待审核";
				break;
			case '7':
				ret = "已审核待申报";
				break;
			case '8':
				ret = "已申报待商标局收文";
				break;
			case '9':
				ret = "商标局已收文待形式审查";
				break;
			case '11':
				ret = "形式审查通过待实质审查";
				break;
			case '12':
				ret = "实质审查通过待初审公告";
				break;
			case '13':
				ret = "形式审查通过待实质审查";
				break;
			case '14':
				ret = "实质审查不通过被驳回";
				break;
			case '15':
				ret = "初审公告通过待发放注册证";
				break;
			case '16':
				ret = "实质审查通过待初审公告";
				break;
			case '17':
				ret = "初审公告不通过被异议";
				break;
			case '18':
				ret = "已发放注册证";
				break;
			case '22':
				ret = "实质审查通过带初审公告";
				break;
			case '99':
				ret = "办理终止";
				break;
		}
		return ret;
	},
	auditName: function (input) {
		var ret = ''
		switch (input+''){
			case '7':
				ret = "提交商标局";
				break;
			case '8':
				ret = "反馈申请回执结果";
				break;
			case '9':
				ret = "反馈受理通知结果";
				break;
			case '10':
				ret = "反馈实质审查结果";
				break;
			case '12':
				ret = "反馈初审公告结果";
				break;
			case '13':
				ret = "反馈部分驳回结果";
				break;
			case '14':
				ret = "发放注册证";
				break;
			case '15':
				ret = "反馈驳回复审结果";
				break;
			case '16':
				ret = "反馈部分异议结果";
				break;
			case '17':
				ret = "反馈异议答辩结果";
				break;
		}
		return ret;
	},
	btnState: function(input){
		var ret = ''
		switch (input+''){
			case '7':
				ret = "手动申报";
				break;
			case '8':
				ret = "反馈申请回执结果";
				break;
			case '9':
				ret = "反馈受理通知结果";
				break;
			case '10':
				ret = "反馈实质审查结果";
				break;
			case '11':
				ret = "反馈部分驳回结果";
				break;
			case '12':
				ret = "反馈初审公告结果";
				break;
			case '13':
				ret = "反馈部分异议结果";
				break;
			case '14':
				ret = "发放注册证";
				break;
			case '15':
				ret = "反馈驳回复审结果";
				break;
			case '17':
				ret = "反馈异议答辩结果";
				break;
		}
		return ret;
	},
};

