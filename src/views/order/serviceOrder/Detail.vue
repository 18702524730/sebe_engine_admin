<template>
	<div
		class="myorderdetail"
		v-loading="loading"
		element-loading-text="拼命加载中"
	>
		<div v-if="!loading">
            <div class="basic_lists">
				<p>订单信息</p>
				<div class="basic_category clearfix">
					<ul class="twocollist clearfix">
						<li>
							<p class="tit">订单号</p>
							<p class="txt">{{ infoDetailData.orderId }}</p>
						</li>
						<li>
							<p class="tit">订单类型</p>
							<p class="txt">{{ infoDetailData.bsType | bsTypeFormat }}</p>
						</li>
						<li>
							<p class="tit">订单时间</p>
							<p class="txt">{{ infoDetailData.createTime | dateFormat}}</p>
						</li>
						<li>
							<p class="tit">订单状态</p>
							<p class="txt">{{ infoDetailData.state|orderFormat }}</p>
						</li>
						<li>
							<p class="tit">订单金额</p>
							<p class="txt">{{ infoDetailData.orderAmount | priceFormat }}</p>
						</li>
                        <li>
							<p class="tit">阿里云金额</p>
							<p class="txt">{{ infoDetailData.alyAmount|priceFormat }}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="basic_lists">
				<p>商标进度跟踪</p>
				<div class="basic_category clearfix">
					<ul class="hasvoucherfw">
						<li>
							<p class="tit">申请注册号</p>
							<p class="txt">{{ infoDetailData.trademarkNumber}}</p>
						</li>
					</ul>
				</div>
                <div class="recordbox">

                
                <ul v-if="list.length" class="zhuangtailist">
                    <li v-for="info in list" :key="info.deliveryTime">
                        <div class="state_list">
                            <!-- 最大的圆 -->
                            <i class="max_round success_bg"></i>
                            <div class="list_top success_border success_color" >
                            <p>{{info.state | orderFormat}}</p>
                            </div>
                            <div class="list_bot success_border" >
                            <p><span>_</span></p>
                            <ul class="clearfix" v-if="info.state!=20">
                                <li class="fl clearfix list_l">
                                <p class="tit fl">上传时间</p>
                                <p class="txt fl">{{info.uploadTime | dateFormat}}</p>
                                </li>
                                <li class="fl clearfix list_m">
                                <p class="tit fl">发文时间</p>
                                <p class="txt operation fl">{{info.deliveryTime| dateFormat}}</p>
                                </li>
                                <li class="fl clearfix list_r" v-if="info.officialFile">
                                <p class="tit fl">官文</p>
                                <p class="txt note_txt fl">{{info.state | fileStateName}}</p>
                                <a class="fl note_button" :href="info.officialFile" target="_blank">下载</a>
                                <!-- <p class="fl note_button" @click="preview(info.officialFile)">预览</p> -->
                                </li>
                                <li class="fl clearfix list_r" v-if="!info.officialFile && info.state>20">
                                <p class="tit fl">官文</p>
                                <p class="txt note_txt fl">未上传</p>
                                <p class="fl note_button" @click="uploadfile(info)">上传官文</p>
                                
                                </li>
                            </ul>
                            </div>
                        </div>
                    </li>
                </ul>
                </div>
			</div>
			<div class="basic_lists">
				<p>委托书与法律文件</p>
				<div class="basic_category clearfix">
					<div class="basic_img fl clearfix">
						<div
							class="fl mr30"
							@click="preview(infoDetailData.sebeLegalNoticeOss)"
						>
							<img :src="infoDetailData.sebeLegalNoticeOss" alt="" />
							<p title="法律文件">法律文件</p>
						</div>
						<div
							class="fl"
							@click="preview(infoDetailData.entrustFile)"
						>
							<img :src="infoDetailData.entrustFile" alt="" />
							<p title="委托书">委托书</p>
						</div>
					</div>
				</div>
			</div>
			<!-- <div style="padding: 50px;">
				<qrcode v-if="qcodeUrl" :val="qcodeUrl" :size="180"></qrcode>
			</div> -->
			<div class="basic_lists mb10">
				<p>商标基本信息</p>
				<div class="basic_category clearfix">
					<ul class="fl hasvoucherfw">
						<li>
							<p class="tit">商标名称</p>
							<p class="txt">
								{{ infoDetailData.trademarkName }}
							</p>
						</li>
						<li>
							<p class="tit">
								商标类型
							</p>
							<p class="txt">
								{{ infoDetailData.trademarkType|trademarkTypeFormat }}
							</p>
						</li>
						<li>
							<p class="tit">
								商标说明
							</p>
							<p class="txt">{{ infoDetailData.trademarkDesc }}</p>
						</li>
					</ul>
					<div class="basic_img fl">
						<div @click="preview(infoDetailData.trademarkIcon)">
							<img :src="infoDetailData.trademarkIcon" alt="" />
								<p>商标图样</p>
							<!-- <a  target="_blank" :href="infoDetailData.trademarkIcon">
								<img :src="infoDetailData.trademarkIcon" alt="" />
								<p>商标图样</p>
							</a> -->
						</div>
					</div>
				</div>
				<ul class="trademarktypes">
					<li>
						<div class="tradetype">商标类别：</div>
						<div class="typeinfo">
							<h3>第{{infoDetailData.cls}}类 {{infoDetailData.clsName}}</h3>
							<p>{{infoDetailData.minsName}}</p>
						</div>
					</li>
				</ul>
			</div>
            <div class="basic_lists clearfix" v-if="infoDetailData.supplementId">
				<p>补正信息</p>
				<div class="basic_category clearfix">
					<ul class="twocollist">
						<li>
							<p class="tit">补正ID</p>
							<p class="txt">{{ infoDetailData.supplementId }}</p>
						</li>
						<li>
							<p class="tit">补正状态</p>
							<p class="txt">{{ infoDetailData.supplementState | bzstateformat}}</p>
						</li>
						<li>
							<p class="tit">发文编号</p>
							<p class="txt">{{ infoDetailData.serialNumber }}</p>
						</li>
						<li>
							<p class="tit">补正官文</p>
							<p class="txt"><span class="btnspan" @click="downloadfile(infoDetailData.supplementOfficialFile)">下载</span></p>
						</li>
						<li>
							<p class="tit">商标局发文日期</p>
							<p class="txt">{{ infoDetailData.sendTime|datesFormat }}</p>
						</li>
                        <li>
							<p class="tit">回复截止日期</p>
							<p class="txt">{{ infoDetailData.acceptExpirationDate|datesFormat }}</p>
						</li>
                        <li>
							<p class="tit">有关说明文件</p>
							<p class="txt"><span class="btnspan" @click="downloadfile(infoDetailData.userFiles)">下载</span></p>
						</li>
						<li>
							<p class="tit">对回文的相关说明</p>
							<p class="txt">{{ infoDetailData.content }}</p>
						</li>
                        <li>
							<p class="tit">用户操作时间</p>
							<p class="txt">{{ infoDetailData.operateTime|dateFormat }}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 图片预览 -->
		<el-dialog
			:visible.sync="pdfDialogVisible"
			width="700px"
		>
			<img width="100%" :src="previewImg" alt="" />
		</el-dialog>
        <el-dialog :visible.sync="uploadshow" width="700px" :close-on-click-modal="false" title="官文上传" top="30vh">
            <div>
                <div class="clearfix">
                    <div class="fl uploadlabel">
                        上传文件
                    </div>
                    <div class="fl">
                        <uploader
                            @complete="setUploadedMaterial"
                            @resetUploader="resetUploader"
                            :fileName="licence_name"
                            :canPreview="false"
                            :postAction="'/sebe_engine/api/file/uploadFile'"
                            :url="licence"
                            :valueName="'licence'"
                            :size='50'
                        ></uploader>
                    </div>
                </div>
                <div class="uploadbtnsbox">
                    <span class="qx" @click="qxupload">取消</span>
                    <span class="qr" @click="sureupload">确定</span>
                </div>
            </div>
        </el-dialog>
	</div>
</template>
<script>
import Filters from "utils/filters/";
import uploader from "cps/uploader/uploader.vue";
import VueCookie from 'vue-cookie'
const infoConfirmQueryUrl = CONFIG.rootUrl + "/api/findAdminTrademarkOrderDetail/{id}";
const uploadUrl = CONFIG.rootUrl + '/api/uploadOfficialDocument'
export default {
	data() {
		return {
			fileid: '',
            confirmVisible: false,
            current: 1,
			reffer: 1,
			loading: false,
			previewImg: "",
			voucherUrlImg: "",
            pdfDialogVisible: false,
            licence_name: '',
            licence: '',
            licence_oss:'',
            token: '',
			step: 3,
			workOrderSn: "",
            extraMinMum: 0,
            deliveryTime: '',
			applicant: {

			},
			infoDetailData: {
				voucherUrl: "",
			}, //总的数据集合
			trademark: {
				proxy_url: "",
			}, //商标
			trademarkSubject: {
				standby1: "",
				standby2: "",
			}, //主体
			service_nice_min: {}, //小项
			workOrderInvoice: {}, //发票
			workOrderServiceList: {}, //服务单
			standby1_data: [],
			standby2_data: [],
			voucherUrl_data: [],
			// 委托书
			proxy_url_data: [],
			imgArr: [],
			id_list_delete: [],
            trademark_contact: [], //联系人信息
            uploadshow: false,
            list: []
		};
    },
    components: {
        uploader
    },
	mounted() {
        this.workOrderSn = this.$route.params.id;
        this.token = VueCookie.get('admin_token')
		this.queryDetail();
	},
	methods: {
        changetb(num) {
            this.current = num
            if (num == 2) {
                this.$router.push({ name: 'traderecord', params: {id: this.workOrderSn} })
            }
            
        },
        setUploadedMaterial(data) {
			var dat = data.data;
			let d = Object.assign({}, dat);
			if (d.url) {
				this[data.valueName] = d.url;
                this[data.valueName + "_name"] = d.fileName;
                this[data.valueName + "_oss"] = d.ossKey
			} else {
				this.uploaderErrCallback(d);
			}
			console.log(data);
		},
		resetUploader(valueName) {
			this[valueName] = "";
            this[valueName + "_name"] = "";
            this[data.valueName + "_oss"] = ""
		},
		uploaderErrCallback(data) {
			this.$alert(data.msg);
        },
		preview(src) {
			this.previewImg = src
			this.pdfDialogVisible = true;
			
		},
		downloadfile(url) {
			window.open(url)
		},
		queryDetail() {
			this.loading = true;
			this.$http.get(infoConfirmQueryUrl.replace('{id}',this.workOrderSn))
			.then((res) => {
				this.loading = false;
				this.infoDetailData = res.data
                this.applicant = res.data.applicant
                this.list = res.data.trademarkFeedbacks || []
				console.log(this.applicant)
				console.log(res.data)
			})
			.catch((err) => {
				this.loading = false;
				console.log(err);
			});
        },
        uploadfile(it) {
            this.fileid = it.id
            this.licence = ''
            this.licence_name = ''
            this.licence_oss = ''
            this.uploadshow = true
        },
        qxupload() {
            this.licence = ''
            this.licence_name = ''
            this.licence_oss = ''
            this.uploadshow = false
        },
        sureupload() {
            if(!this.licence) {
                this.$message.warning('请上传官文')
                return
            }
            const data = {
                id: this.fileid,
                officialFile: this.licence
            }

            this.$http.post(uploadUrl, data).then(res => {
                this.$message.success('上传成功')
                this.queryDetail()
                this.qxupload()
            }).catch(err => {
                this.$message.error(err.response.data.msg || '上传失败') 
            })
        }
	},
	filters: {
		sqrFormat: Filters.sqrformat,
		areaFormat: Filters.areaformat,
		bzstateformat: Filters.bzstateformat,
		trademarkTypeFormat: Filters.trademarktypeformat,
		priceFormat: Filters.priceformat,
		dateFormat: Filters.formatDate.dateFormat,
		datesFormat: Filters.formatDate.datesFormat,
        orderFormat: Filters.orderstateformat,
        bsTypeFormat: Filters.bsTypeFormat,
        fileStateName: Filters.fileStateNameformat
	},
};
</script>
<style lang="less">
.myorderdetail {
	background-color: #fff;
	padding: 30px;
	border-radius: 0 2px 2px 2px;
    min-height: 500px;
    .detailtab {
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 20px;
        > span {
            float: left;
            padding: 10px 15px;
            margin-right: 20px;
            font-size: 14px;
            cursor: pointer;
            &.active {
                color: #3367A2;
                border-bottom: 2px solid #3367A2;
            }
        }
    }
	.basic_lists {
		border: 1px solid #F5F5F5;
		.kpl {
			li {
				width: 33%;
			}
		}
		> p {
			font-size: 14px;
			color: #223344;
			height: 60px;
			line-height: 60px;
			margin-bottom: 10px;
			background-color: #f5f5f5;
			padding-left: 20px;
		}
		//左侧
		//公共部分，主要是间距，字体大小，颜色
		.basic_category {
			text-align: left;
			padding-bottom: 20px;
			padding-top: 10px;
			padding-left: 20px;
			.category_left {
				width: 66%;
			}
			ul {
				width: 33%;
				li {
					overflow-x: hidden;
					p {
						float: left;
						line-height: 18px;
						margin-bottom: 10px;
					}
					// 已支付
					p.topay {
						color: #36af47;
					}
					.tit {
						width: 120px;
						font-size: 13px;
						color: #556677;
					}
					.txt {
						font-size: 13px;
						color: #7f8fa4;
						max-width: 66%;
						margin-left: 10px;
						word-break: break-all;
					}
				}
			}
			.hasvoucherfw {
				width: 60%;
				padding-right: 10px;
			}
			.voucherbox {
				float: left;
				position: relative;
				widows: 100px;
				height: 120px;
				border: 1px solid #dfe2e5;
				cursor: pointer;
				img {
					width: 98px;
					height: 118px;
				}
				p {
					width: 100px;
					text-align: center;
					background: rgba(0, 0, 0, 0.6);
					color: #fff;
					line-height: 26px;
					font-size: 13px;
					position: absolute;
					bottom: 0;
					cursor: pointer;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					left: -1px;
				}
            }
            .twocollist {
                width: 100%;
                > li {
                    float: left;
                    width: 50%;
                }
            }
			//右侧图片预览定位
			.basic_img {
				width: 32%;
				text-align: left;
				div {
					position: relative;
					width: 100px;
					height: 120px;
					border: 1px solid #dfe2e5;
					cursor: pointer;
					a {
						display: block;
						width: 100%;
						height: 100%;
					}
					img {
						width: 98px;
						height: 118px;
					}
					p {
						width: 100px;
						text-align: center;
						background: rgba(0, 0, 0, 0.6);
						color: #fff;
						line-height: 26px;
						font-size: 13px;
						position: absolute;
						bottom: 0;
						left: -1px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
        }
        .btnspan {
            margin-right: 20px;
            cursor: pointer;
            color: #379dea;
        }
	}
	// 预览
	.img_preview {
		.el-dialog--tiny {
			width: 940px;
			img {
				width: 900px;
			}
		}
	}
	.previewDialog {
		width: 900px;
		min-height: 600px;
		.el-carousel {
			.el-carousel__container {
				height: 490px;
				.el-carousel__item {
					.img_wrap {
						overflow-y: auto;
						height: 100%;
						width: 86%;
						margin: 0 auto;
					}
					img {
						width: 100%;
					}
				}
			}
		}
	}
	.previewDialog_trans {
		transform: translate(-50%, -50%);
	}
	.service_data {
		padding-top: 20px;
		.tal {
			text-align: left;
		}
		.tar {
			text-align: right;
		}
		.tb01 {
			width: 15%;
			padding-left: 20px;
		}
		.tb02 {
			width: 23%;
		}
		.tb03 {
			width: 12%;
		}
		.tb04 {
			width: 10%;
			min-width: 40px;
		}
		.tb05 {
			width: 20%;
		}
		.tb06 {
			width: 20%;
			padding-right: 30px;
			a {
				color: #479cff;
				text-decoration: none;
			}
		}
		> p {
			font-size: 14px;
			color: #223344;
			height: 20px;
			line-height: 20px;
			margin-bottom: 10px;
		}
		.service_tab {
			border: 1px solid #dfe2e5;
			.tab_tit {
				background: #f5f5f5;
				line-height: 40px;
				font-size: 13px;
				color: #223344;
			}
			.tab_list {
				line-height: 40px;
				font-size: 13px;
				color: #223344;
				ul {
					border-top: 1px solid #dfe2e5;
				}
			}
		}
	}
	.hov {
		color: #479cff;
	}

	.trademarktypes {
		padding-top: 20px;
		> li {
			display: flex;
			padding: 20px 25px;
			background-color: #F5F5F5;
			font-size:14px;
			color:rgba(34,51,68,1);
			line-height:20px;
			.tradetype {
				width: 130px;
			}
			.typeinfo {
				flex: 1;
				> h3 {
					font-weight: normal;
					margin-bottom: 10px;
				}
				> p {
					word-break: break-all;
				}
			}
		}
    }
    .uploadlabel {
        width: 200px;
    }
    .uploadbtnsbox {
        padding-top: 50px;
        text-align: right;
        font-size: 0;
        > span {
            display: inline-block;
            width: 120px;
            height: 30px;
            margin-left: 20px;
            text-align: center;
            line-height: 30px;
            border-radius: 2px;
            font-size: 14px;
            cursor: pointer;
            &.qx {
                border: 1px solid #ccc;
                color: #234;
            }
            &.qr {
                background-color: #379dea;
                color: #fff;
            }
        }
    }
}
.el-dialog {
	z-index: 3000;
}
.recordbox {
    position: relative;
    padding: 30px;
    .recordback {
        position: absolute;
        right: 30px;
        top: 20px;
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        background-color: #f5f5f5;
        color: #000;
        border-radius: 4px;
        font-size: 14px;
    }
    .detailtab {
        border-bottom: 1px solid #f5f5f5;
        margin-bottom: 20px;
        > span {
            float: left;
            padding: 10px 15px;
            margin-right: 20px;
            font-size: 14px;
            cursor: pointer;
            &.active {
                color: #3367A2;
                border-bottom: 2px solid #3367A2;
            }
        }
    }
    .state_list{position: relative;left: 5px;
      .list_end{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;z-index:1;
        p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
      }
			// 圆
			i{background-color:#DFE2E5;}
			// 颜色判断
			.success_bg{background-color:#36AF47;z-index:100;}

			.max_round{width:11px;height:11px;border-radius:50%;display:block;position: absolute;top: 0px;left:-5px;}
			.min_round{width:9px;height:9px;border-radius:50%;display:block;position: absolute;top: 38px;left:-4px;}
			.list_top{border-left:1px solid #dfe2e5;padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			.list_fotter{padding-left: 15px;padding-bottom:25px;z-index: 10;position: relative;
				p{font-size: 14px;color: #7F8FA4;letter-spacing: 0;line-height: 14px;}
			}
			// 边框颜色判断
			div.success_border{border-color:#36AF47;}
			div.success_color >p{color:#36AF47;}
			.list_bot{padding-bottom: 20px;border-left:1px solid #dfe2e5;padding-left: 30px;z-index:1;margin-top: -5px;
				>p{font-size: 13px;color: #223344;line-height:100%;position: relative;
          span{position: absolute;left:-30px;top:-10px;color: #36AF47;font-size:20px;display:inline-block;}
        }
				ul{padding-top: 10px;
					.list_l{width:30%;}
					.list_m{width:25%;}
					.list_r{width:45%;}
					li{
						.tit{text-align:left;color:#556677;}
						.txt{color: #7F8FA4;margin-left:30px;}
						.note_txt{max-width: 77%;min-width:100px;word-break:break-all;}
						.operation{max-width:77%;word-break:break-all;}
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
          .list_m{width:25%;}
          .list_r{width:45%;
            a{text-decoration:none}
          }
          li{
            .tit{text-align:left;color:#556677;}
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
