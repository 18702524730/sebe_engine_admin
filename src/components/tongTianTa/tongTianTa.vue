<template>
	<div>
		<transition name="fade">
			<div id="ifrDialog" v-show="visible">
				<span class="tip" v-if="tipVisible">需要先配置环境，如已配置请忽略。</span>
				<!-- <div class="ifr_header">
					<div class="logo fl">
						<img src="~assets/img/tongTianTa/logo.png"><h1>拾贝通天塔</h1>
					</div>
					<div class="rightNav fr">
						<span class="orderSn">服务单号：{{orderSn}}</span>
						<span class="next">下一单</span>
						<span class="ifrClose" @click="close">关闭</span>
					</div>
				</div> -->
				<span class="ifrClose" @click="close">关闭</span>
				<iframe v-if="ifrNameStr" id="sbj_ifr" :name="ifrNameStr" src="http://wssq.saic.gov.cn:9080/tmsve" :style="ifr_height"></iframe>
				<!-- <div class="ifr_footer">
					
					http://wssq.saic.gov.cn:9080/tmsve
					<div class="tmInfo fl">
						<img :src="orderInfo.information && orderInfo.information.blackWhitePicUrl">
						<span>商标名称：{{orderInfo.information && orderInfo.information.trademarkName}}</span>
						<span>商标分类：{{orderInfo.orderInformation && (orderInfo.orderInformation.intCls< 10 ? '0'+orderInfo.orderInformation.intCls : orderInfo.orderInformation.intCls) + ' ' + clsData[orderInfo.orderInformation.intCls-1].goodsname}}</span>
						<span>申报主体：{{orderInfo.subject && orderInfo.subject.applyName}}</span>
					</div>
					<div class="action fr">
						<span class="prev">上一步</span>
						<span class="next">下一步</span>
						<span class="fill">填充当前页面</span>
					</div>
				</div> -->
			</div>
		</transition>
	</div>
</template>
<script>
	import Vue from 'vue'
	import VueCookie from 'vue-cookie'
	import $ from 'jquery'
	import cateIdData from 'apis/intClsData.js'
	const detailReportUrl = './api/findTrademarkDetail';
	export default {
    props:{
    	visible: {
    		type: Boolean,
    		default: false
    	},
    	needSpider: {
    		type: Number,
    		default: 0
    	},
    	orderInfo: {
    		type: Object,
    		default: {}
    	}
    },
    data() {
      return {
      	tipVisible: true,
      	ifr_height:'',
      	token:'',
      	orderSn:'',
      	ifrNameData:{
      		orderSn:'',
      		token:'',
      		tmName:'',
      		tmUrl:'',
      		intCls:'',
      		intClsName:'',
      		applyName:''
      	},
      	ifrNameStr:'',
      	clsData:cateIdData.cateIdData,
      }
    },
    methods: {
    	// 查询详情
			query(){
				var self = this;
				//this.$http.get(detailReportUrl+'?orderSn='+this.orderSn)
				//.then((resp) => {
					//self.orderInfo = resp.data;
					var info = this.orderInfo.information;
					var order = this.orderInfo.orderInformation;
					this.ifrNameData.tmUrl = info.specifyPicUrl ? info.specifyPicUrl : info.blackWhitePicUrl;
					this.ifrNameData.tmHbUrl = info.specifyPicUrl ? info.blackWhitePicUrl : '';
					this.ifrNameData.tmName = info && info.trademarkName;
					this.ifrNameData.intCls = order && order.intCls;
					this.ifrNameData.intClsName = order && (order.intCls< 10 ? '0'+order.intCls : order.intCls) + ' ' + this.clsData[order.intCls-1].goodsname;
					this.ifrNameData.applyName = this.orderInfo.subject && this.orderInfo.subject.applyName;
					this.ifrNameData.needSpider = this.needSpider;
					this.ifrNameStr = JSON.stringify(this.ifrNameData);
					console.log(this.ifrNameStr)
				/*})
				.catch((error) => {
					console.log(error);
				});*/
			},
    	close(){
    		$('body,html').css({overflow: 'auto'});
    		this.$emit('update:visible', false);
    	},
    	show(){
	      $('body,html').css({overflow: 'hidden'});
			}
    },
    created(){
    	this.orderSn = this.$route.params.id;
    	this.token = VueCookie.get('token');
    	this.ifrNameData.orderSn = this.orderSn;
    	this.ifrNameData.token = this.token;
    },
    mounted() {
    	this.query();
    	this.ifr_height = 'width:100%;height:'+ $(window).height() + 'px';
    },
    watch:{
    	visible () {
    		if (this.visible) {
    			this.show();
    			this.tipVisible = true;
    			setTimeout(() => {
    				this.tipVisible = false;
    			}, 5000)
    		}
    	}
    }
  }
</script>
<style lang='less'>
#ifrDialog{
	position: fixed;top: 0;left: 0;width: 100%;height:100%;margin-left: 50%;transform: translateX(-50%); -ms-transform: translateX(-50%); -moz-transform: translateX(-50%); -webkit-transform: translateX(-50%); -o-transform: translateX(-50%); z-index: 10002;background-color: #fff;
	span.tip{
		position: absolute;top: 0;left: 50%;margin-left: -130px;width:260px;height: 30px;line-height: 30px;color:#fff;font-size: 14px;text-align: center;background-color: #e6a23c;
	}
	.ifr_header{
		height: 50px;background: #324057;overflow: hidden;
		.logo{
			vertical-align: top;
			img{position: relative;margin-left: 20px;margin-right: 8px;display: inline-block;margin-top: 8px;vertical-align: top;}
			h1{display:inline-block;line-height: 50px;height: 50px;font-size: 16px;color: #FFFFFF;font-weight: bold;vertical-align: top;}
		}
		.rightNav{
			vertical-align: top;padding-top: 12px;padding-right: 20px;
			span{display: inline-block;text-align: center;height: 26px;line-height: 24px;vertical-align: top;}
			.orderSn{font-size: 14px;color: #FFFFFF;margin-right: 20px;line-height: 26px;}
			.next{background: #479CFF;border-radius: 2px;width: 70px;line-height: 26px;color: #fff;margin-right: 10px;cursor: pointer;}
			.next:hover{background: #206FCC;}
			.ifrClose{width: 56px;cursor: pointer;color: #fff;border: 1px solid #FFFFFF;border-radius: 2px;}
			.ifrClose:hover{background: #345066;}
		}
	}


	.ifrClose{position: absolute;top: 12px;right: 38px;width: 56px;display: inline-block;text-align: center;height: 26px;line-height: 24px;vertical-align: top;cursor: pointer;color: #fff;border: 1px solid #FFFFFF;border-radius: 2px;}
			.ifrClose:hover{background: #345066;}
	/* .ifr_footer{
		position: absolute;bottom: 0;left:0;width: 100%;height: 50px;background: #324057;color: #fff;
		.tmInfo{
			position: relative;height: 50px;line-height: 50px;vertical-align: top;
			img{margin-left: 20px;width: 70px;height: 70px;margin-top:-28px;border: 1px solid #324057;border-radius: 3px;}
			span{height: 50px;line-height: 50px;display: inline-block;font-size: 14px;vertical-align: top;margin-left: 20px;}
		}
		.action{
			padding-right: 20px;padding-top: 12px;
			span{display: inline-block;text-align: center;height: 26px;line-height: 26px;vertical-align: top;background: #479CFF;border-radius: 2px;color: #fff;margin-left: 10px;cursor: pointer;}
			span:hover{background: #206FCC;}
			.prev{width: 70px;}
			.next{width: 70px;}
			.fill{width: 112px;}
		}
	} */
	iframe{border:0;background-color: #fff;}
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  opacity: 0
}
</style>
