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
							<p class="tit">机构名称</p>
							<p class="txt">{{ infoDetailData.spName }}</p>
						</li>
						<li>
							<p class="tit">用户名</p>
							<p class="txt">{{ infoDetailData.spAccount }}</p>
						</li>
						<li>
							<p class="tit">联系人</p>
							<p class="txt">{{ infoDetailData.spContacts }}</p>
						</li>
						<li>
							<p class="tit">联系手机号</p>
							<p class="txt">{{ infoDetailData.spPhone }}</p>
						</li>
						<li>
							<p class="tit">余额</p>
							<p class="txt">{{ infoDetailData.balance | priceformat }}</p>
						</li>
                        <li>
							<p class="tit">创建时间</p>
							<p class="txt">{{ infoDetailData.createTime|dateFormat }}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="result">
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th class="alignc" width="60">序号</th>
						<th class="minWidth">用户名</th>
						<th class="comWidth">交易编号</th>
						<th class="comWidth">交易时间</th>
						<th class="minWidth">收支类型</th>
						<th class="minWidth">交易类型</th>
						<th class="minWidth">金额</th>
						<th class="comWidth">订单号</th>
						<th class="minWidth">余额</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
						<td class="alignc">{{item.seqNo}}</td>
						<td style="padding-left: 0">{{infoDetailData.spAccount}}</td>
						<td>{{item.tradeSn}}</td>
						<td>{{item.tradeTime | dateFormat}}</td>
						<td>{{item.inandexType | shouzhiformat}}</td>
						<td>{{item.tradeType | jiaoyiformat }}</td>
						<td>{{item.money | priceformat}}</td>
						<td>{{item.paymentSn | priceformat}}</td>
						<td>{{item.balance | priceformat}}</td>
					</tr>
					<tr class="empty" v-show="!loading && !dataList.length">
						<td colspan="9" class="norecord">
							<div class="empty_ic"><span>暂无信息</span></div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="my_loading" v-show="loading" v-loading="loading">
			</div>
			<div class="tb_pagination" v-if="!loading && dataList.length">
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="pgIndex"
					:page-size="pgCount"
					layout="total, prev, pager, next"
					:total="total" class="fr">
				</el-pagination>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
import Filters from "utils/filters/";
import {store} from 'utils/';
const bsOrderListUrl = '/api/admin/findCapitalDetailList'
export default {
	data() {
		return {
			loading: false,
			infoDetailData: {
			},
			id:'',
			dataList:[],
			pgIndex: 1,
			pgCount: 10,
			total:0,
		};
	},
	created() {
		this.id = this.$route.params.id;
		this.infoDetailData = store.get('spItemData')
	},
	mounted() {
        
		this.search(true);
	},
	methods: {
       search(extra){
				var ret = {}
				ret.pgIndex = extra ? 1 : this.pgIndex;
				ret.pgCount = this.pgCount;
				ret.spId = this.id
				var data = Object.assign({}, this.dataObj, ret);
				//console.log(data)
				this.getOrderList(data);
			},
			handleCurrentChange(val) {
				this.pgIndex = val;
				this.search();
			},
			//查询数据
			getOrderList(paramsData){
				paramsData = paramsData || {};
				this.loading = true;
				this.$http.get(bsOrderListUrl, {params: paramsData})
				.then((resp) => {
					this.loading = false;
					var data = resp.data;
					var dataList = data.elements;
					this.dataList = dataList;
					this.pgIndex = data.pageNo || 1;
					this.total = data.totalElements;
					this.$router.replace({query: Object.assign({}, paramsData)});
				})
				.catch((err) => {
					this.loading = false;
					console.log(err);
				});
			},
	},
	filters: {
		priceformat: Filters.priceformat,
		dateFormat: Filters.formatDate.dateFormat,
		datesFormat: Filters.formatDate.dateFormatYMD,
		shouzhiformat: Filters.shouzhiformat,
		jiaoyiformat: Filters.jiaoyiformat
	},
};
</script>
<style lang="less">
.myorderdetail {
	background-color: #fff;
	padding: 30px;
	border-radius: 0 2px 2px 2px;
    min-height: 500px;
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
	.result{
		padding: 10px 0 0 0;
		.table_handle{
			height: 50px;background: #F9F9F9;border: 1px solid #DFE2E5;border-bottom:0;padding:14px 0 0;font-size: 16px;color:#DFE2E5;line-height: 20px;vertical-align: top;
			.all{
				margin-left: 20px;height: 20px;display: inline-block;
				.el-checkbox{height: 20px;vertical-align: top;}
			}
			.table_handle_btn{margin-left: 20px;margin-right: 20px;font-size: 14px;color:#479CFF;display: inline-block;display: inline-block;cursor: pointer;}
			.batch{}
		}
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;}
					th.minWidth{min-width: 60px;}
					th.comWidth{min-width: 120px;}
					th.alignc{text-align: center;}
					th.alignr{text-align: right;}
					th.paddingR{padding-right: 10px;}
					th.paddingL{padding-left: 10px;}
					th.minWidth.paddingR{min-width: 70px;}
					th.minWidth.paddingL{min-width: 70px;}
				}
			}
			tbody{
				tr{
					height: 50px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 50px;font-size: 13px;color: #556677;padding:5px 3px;
						.el-checkbox{position: relative;top: -1px;}
					}
					td.check_wrap{padding-left: 20px;padding-right: 20px;width: 16px;}
					td.minWidth{min-width: 60px;}
					td.comWidth{min-width: 120px;}
					td.alignc{text-align: center;}
					td.alignr{text-align: right;}
					td.paddingR{padding-right: 10px;}
					td.paddingL{padding-left: 10px;}
					td.action{
						a{color: #479CFF;}
						a:hover{text-decoration: none;color: #408CE6;}
					}
					td.pay{color: #36AF47;}
					td.nopay{color: #F64744;}
				}
				tr:hover,tr.hover{
					background-color: #F9F9F9;
				}
				tr.empty{
					.empty_ic{
						height: 200px;text-align: center;padding-top:83px;
						span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
					}
					&:hover{background-color: #fff;}
				}
			}
			tfoot{

			}
		}
		.my_loading{border: 1px solid #DFE2E5;height: 400px;margin-top: -1px;margin-bottom: 75px;}
		.tb_pagination{
			padding-top: 20px;
			.el-pagination{padding:0;}
		}
	}
}

</style>
