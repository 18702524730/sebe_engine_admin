<template>
	<div>
		<div class="state">
			<!-- 已提交待确认 -->
			<div class="state_list" v-if="stateData[2]&&stateData[2].length">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[2]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[2],'success_color':stateData[2]}">
					<p>已提交待确认</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[2]}" v-if="stateData[2]">
					<template v-for="item in stateData[2]">
						<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
						<ul class="clearfix">
							<li class="fl clearfix list_l">
								<p class="tit fl">操作时间</p>
								<p class="txt fl">{{item.operating_time | dateFormat}}</p>
							</li>
							<li class="fl clearfix list_m">
								<p class="tit fl">操作人</p>
								<p class="txt operation fl">{{item.operator}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 已确认待上报 -->
			<div class="state_list" v-if="stateData[5]&&stateData[5].length">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[5]}"></i>
				<div class="list_top" :class="{'success_border success_color' : stateData[5]}">
					<p>已确认待上报</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[5]}" v-if="stateData[5]">
					<template v-for="item in stateData[5]">
						<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
						<ul class="clearfix">
							<li class="fl clearfix list_l">
								<p class="tit fl">操作时间</p>
								<p class="txt fl">{{item.operating_time | dateFormat}}</p>
							</li>
							<li class="fl clearfix list_m">
								<p class="tit fl">操作人</p>
								<p class="txt operation fl">{{item.operator}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 已上报待审核-->
			<div class="state_list" v-if="stateData[6]||!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[6]}"></i>
				<div class="list_top" :class="{'success_border success_color' : stateData[6]}">
					<p>已上报待审核</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[6]}" v-if="stateData[6]">
					<template v-for="item in stateData[6]">
						<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
						<ul class="clearfix">
							<li class="fl clearfix list_l">
								<p class="tit fl">操作时间</p>
								<p class="txt fl">{{item.operating_time | dateFormat}}</p>
							</li>
							<li class="fl clearfix list_m">
								<p class="tit fl">操作人</p>
								<p class="txt operation fl">{{item.operator}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 已审核待申报 -->
			<div class="state_list" v-if="stateData[7]||!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[7]}"></i>
				<div class="list_top" :class="{'success_border success_color' : stateData[7]}">
					<p>已审核待申报</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[7]}" v-if="stateData[7]">
					<template v-for="item in stateData[7]">
						<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
						<ul class="clearfix">
							<li class="fl clearfix list_l">
								<p class="tit fl">操作时间</p>
								<p class="txt fl">{{item.operating_time | dateFormat}}</p>
							</li>
							<li class="fl clearfix list_m">
								<p class="tit fl">操作人</p>
								<p class="txt operation fl">{{item.operator}}</p>
							</li>
							<li class="fl clearfix list_r">
								<p class="tit fl">备注</p>
								<p class="txt note_txt fl">{{item.memo || '--'}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 已申报待商标局收文 -->
			<div class="state_list" v-if="stateData[9]||!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[9]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[9],'success_color':stateData[9]}">
					<p>已申报待商标局收文</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[9]}" v-if="stateData[9]">
					<template v-for="item in stateData[9]">
						<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
						<ul class="clearfix">
							<li class="fl clearfix list_l">
								<p class="tit fl">操作时间</p>
								<p class="txt fl">{{item.operating_time | dateFormat}}</p>
							</li>
							<li class="fl clearfix list_m">
								<p class="tit fl">操作人</p>
								<p class="txt operation fl">{{item.operator}}</p>
							</li>
							<li class="fl clearfix list_r">
								<p class="tit fl">备注</p>
								<p class="txt note_txt fl">{{item.memo || '--'}}</p>
							</li>
						</ul>
					</template>
				</div>
			</div>
			<!-- 商标局已收文待形式审查 -->
			<div class="state_list" v-if="stateData[10]||!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[10]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[10],'success_color':stateData[10]}">
					<p>商标局已收文待形式审查</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[10]}" v-if="stateData[10]" v-for="item in stateData[10]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 形式审查通过待实质审查 11 -->
			<div class="state_list" v-if="stateData[11]||!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[11]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[11],'success_color':stateData[11]}">
					<p>形式审查通过待实质审查</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[11]}" v-if="stateData[11]&&stateData[11].length" v-for="item in stateData[11]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 实质审查不通过被驳回 -->
			<div class="state_list" v-if="stateData[14]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[14]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[14],'success_color':stateData[14]}">
					<p>实质审查不通过被驳回</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[14]}"  v-for="info in stateData[14]" v-if="stateData[14]">
					<p><span>_</span>{{info.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{info.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{info.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="info.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{info.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+info.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(info.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{info.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{info.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 实质审查通过待初审公告 -->
			<div class="state_list" v-if="stateData[12]&&stateData[12].length">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[12]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[12],'success_color':stateData[12]}">
					<p>实质审查通过待初审公告</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[12]}" v-if="stateData[12]&&stateData[12].length" v-for="item in stateData[12]">
					<p><span>_</span>{{stateData[12][0].bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 初审公告不通过被异议 -->
			<div class="state_list" v-if="stateData[17]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[17]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[17],'success_color':stateData[17]}">
					<p>初审公告不通过被异议</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[17]}"  v-for="info in stateData[17]" v-if="stateData[17]">
					<p><span>_</span>{{info.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{info.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{info.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="info.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{info.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+info.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(info.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{info.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{info.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 初审公告通过待发放注册证 -->
			<div class="state_list" v-if="stateData[15]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[15]}"></i>
				<div class="list_top" :class="{'success_border' : stateData[15],'success_color':stateData[15]}">
					<p>初审公告通过待发放注册证</p>
				</div>
				<div class="list_bot" :class="{'success_border' : stateData[15]}" v-if="stateData[15]" v-for="item in stateData[15]">
					<p><span>_</span>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 已发放注册证 -->
			<div class="state_list" v-if="!stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[18]}"></i>
				<div class="list_end" :class="{'success_border' : stateData[18],'success_color':stateData[18]}">
					<p>已发放注册证</p>
				</div>
				<div class="list_bot_end" v-if="stateData[18]" v-for="item in stateData[18]">
					<p>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 办理终止 -->
			<div class="state_list" v-if="stateData[99]">
				<!-- 最大的圆 -->
				<i class="max_round" :class="{'success_bg' : stateData[99]}"></i>
				<div class="list_end" :class="{'success_border' : stateData[99],'success_color':stateData[99]}">
					<p>办理终止</p>
				</div>
				<div class="list_bot_end" v-if="stateData[99]" v-for="item in stateData[99]">
					<p>{{item.bs_feedback_operate || '--'}}</p>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">操作时间</p>
							<p class="txt fl">{{item.operating_time | dateFormat}}</p>
						</li>
						<li class="fl clearfix list_m">
							<p class="tit fl">操作人</p>
							<p class="txt operation fl">{{item.operator}}</p>
						</li>
						<li class="fl clearfix list_r" v-if="item.url">
							<p class="tit fl">官文</p>
							<p class="txt note_txt fl">{{item.type | downFileName}}</p>
							<a class="fl note_button" :href="rootUrl+'/api/downNetFile?url='+item.url+'&access_token='+token" target="_blank">下载</a>
							<p class="fl note_button" @click="previewImg(item.url)">预览</p>
						</li>
					</ul>
					<ul class="clearfix">
						<li class="fl clearfix list_l">
							<p class="tit fl">官文下发时间</p>
							<p class="txt fl">{{item.state_update_time | dateFormat('date')}}</p>
						</li>
						<li class="fr clearfix list_r">
							<p class="tit fl">备注</p>
							<p class="txt note_txt fl">{{item.memo || '--'}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 证书预览 -->
		<el-dialog
			:visible.sync="dialogImg"
			size="tiny" class="img_preview" :modal-append-to-body="true">
			<el-carousel indicator-position="none" :interval="5000" arrow="always" :autoplay='false' trigger="click">
				<el-carousel-item v-for="(srcImg,$index) in proxyImg" :key="$index">
					<img :src="srcImg" alt="">
				</el-carousel-item>
			</el-carousel>
		</el-dialog>
	</div>

</template>
<script>
import VueCookie from 'vue-cookie'
import Filters from 'utils/filters/filters.js'
const rootUrl = CONFIG.rootUrl;
export default{
	props:[
		'stateData'
	],
	data(){
		return{
			rootUrl:rootUrl,
			token:'',
			imgsrc:'',
			proxyImg:'',
			dialogImg:false,
		}
	},
	mounted(){
		this.token = VueCookie.get('token');
	},
	methods:{
	// 状态部分pdf查看
	certificatePreview(url){
		this.proxyImg = url;
		this.dialogImg = true;
	},
	// 状态图片预览
	previewImg(url){
		this.$http.get('./api/preview?pdf_url='+url)
		.then((response) => {
			if(response.data.urls){
				this.certificatePreview(response.data.urls);
			}
		})
		.catch((error) => {
			this.$message({
				message: 'pdf预览生成失败',
				type: 'error'
			});
		});
	}
	},
	filters: {
		dateFormat:Filters.formatDate.dateFormat,
		downFileName: Filters.downFileName,
	}
}
</script>
<style lang="less">
.state{background-color:#fff;border: 1px solid #DFE2E5;padding:30px;
	//完成该状态
	.state_list{position: relative;
		// 圆
		i{background-color:#DFE2E5;}
		// 颜色判断
		.success_bg{background-color:#36AF47;}
		.max_round{width:11px;height:11px;border-radius:50%;display:block;position: absolute;top: 0px;left:-5px;z-index:10;}
		.min_round{width:9px;height:9px;border-radius:50%;display:block;position: absolute;top: 38px;left:-4px;}
		.list_top{border-left:1px solid #dfe2e5;padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;z-index:1;
			p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
		}
		.list_end{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;z-index:1;
			p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
		}
		.list_fotter{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
			p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
		}
		// 边框颜色判断
		div.success_border{border-color:#36AF47;}
		div.success_color >p{color:#36AF47;}
		.list_bot{padding-bottom: 20px;border-left:1px solid #dfe2e5;padding-left: 30px;z-index:1;margin-top: -5px;
			>p{font-size: 13px;color: #556677;line-height:100%;position: relative;margin-top:10px;
				span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
				&:first-child{margin-top: 0;}
			}
			ul{padding-top: 10px;
				.list_l{width:30%;}
				.list_m{width:30%;}
				.list_r{width:40%;
					a{text-decoration:none}
				}
				li{
					.tit{text-align:left;}
					.txt{color: #7F8FA4;margin-left:30px;word-break:break-all;}
					.note_txt{max-width: 77%;min-width:100px;}
					.operation{max-width:180px;}
					.note_button{width:60px;text-align:center;height:24px;line-height:24px;background: #479CFF;color:#fff;font-size:13px;border-radius:2px;margin-left:10px;margin-top:-3px;cursor:pointer;}
				}
			}
		}
		.list_bot_end{padding-bottom: 20px;padding-left: 30px;z-index:1;margin-top: -5px;
			>p{font-size: 13px;color: #556677;line-height:100%;position: relative;
				span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
			}
			ul{padding-top: 10px;
				.list_l{width:30%;}
				.list_m{width:30%;}
				.list_r{width:40%;
					a{text-decoration:none}
				}
				li{
					.tit{text-align:left;}
					.txt{color: #7F8FA4;margin-left:30px;word-break:break-all;}
					.note_txt{max-width: 77%;min-width:100px;}
					.operation{max-width:180px;}
					.note_button{width:60px;text-align:center;height:24px;line-height:24px;background: #479CFF;color:#fff;font-size:13px;border-radius:2px;margin-left:10px;margin-top:-3px;cursor:pointer;}
				}
			}
		}
	}
}
</style>
