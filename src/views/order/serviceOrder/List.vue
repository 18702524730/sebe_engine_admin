<template>
	<div class="commonListAll myServiceOrder">
		<div class="condition clearfix">
			<div class="form_control"><el-input v-model="dataObj.orderId" placeholder="请输入订单号"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.trademarkName" placeholder="请输入商标名"></el-input></div>
			<div class="form_control"><el-input v-model="dataObj.applicant" placeholder="请输入申请人名称"></el-input></div>
			<div class="form_control">
				<el-select v-model="dataObj.state" clearable placeholder="订单状态">
					<el-option
						v-for="item in payStatusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.supplementState" clearable placeholder="补正状态">
					<el-option
						v-for="item in bzOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="data_pickerbox">
				<el-date-picker
					v-model="payment_time"
					type="daterange"
					align="right"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束"
					:picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<!-- <div class="form_control">
				<el-select v-model="dataObj.sp_id" clearable placeholder="请选择服务商" @change="spChange(dataObj.sp_id)">
					<el-option
						 v-for="(item, index) in allSpData" :label="item.name" :value="item.sp_id " :key="item.sp_id">
					</el-option>
				</el-select>
			</div> -->
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<button class="reset" @click="reset()">重置</button>
			</div>
		</div>
		<div class="result">
			<!-- <div class="table_handle">
				<div class="all"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange"></el-checkbox></div><div class="table_handle_btn batch" @click="batch">接单</div>|<div class="table_handle_btn infoSubmit" @click="infoSubmit">办理</div>|<div class="table_handle_btn batchDistribute" @click="getOperators" v-if="distributeIsAllowed">分配</div>
			</div> -->
			<table class="result_type">
				<thead>
					<tr class="thead">
						<th class="alignc" width="50">序号</th>
						<th>服务商</th>
						<th class="minWidth">订单号</th>
						<th>业务类型</th>
						<th class="minWidth">申请人名称</th>
						<th class="minWidth">商标名称</th>
						<th class="minWidth">申请类别</th>
						<th>服务商金额</th>
						<th class="minWidth">阿里云金额</th>
						<th class="minWidth">申请号</th>
						<th class="comWidth">创建时间</th>
						<th class="minWidth">订单状态</th>
						<th class="minWidth">补正状态</th>
						<th width="60" style="padding-right: 17px;text-align: right;">操作</th>
					</tr>
				</thead>
				<tbody class="tr-color">
					<tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
						<td class="alignc">{{item.seqNo}}</td>
						<td style="padding-left: 0">{{item.spName}}</td>
						<td>{{item.orderId}}</td>
						<td>{{item.bsType|bsTypeFormat}}</td>
						<td>{{item.applicant}}</td>
						<td>{{item.trademarkName}}</td>
						<td>{{item.cls}}</td>
						<td>{{item.orderAmount | priceformat}}</td>
						<td>{{item.alyAmount | priceformat}}</td>
						<td>{{item.trademarkNumber}}</td>
						<td>{{item.createTime | dateFormat}}</td>
						<td>{{item.state | orderStateFormat}}</td>
						<td>{{item.supplementState | bzstateFormat}}</td>
						<td class="alignc action">
							<a href="#" class="view" @click.prevent="view(item)">查看</a>
						</td>
					</tr>
					<tr class="empty" v-show="!loading && !dataList.length">
						<td colspan="14" class="norecord">
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
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import {store} from 'utils/';
	const bsOrderListUrl = '/api/findAdminTrademarkOrderList';
	const payStatusOptions = [
		{
			value: '0',
			label: '已支付'
		}, {
			value: '1',
			label: '待审核'
		},
		{
			value: '2',
			label: '审核不通过'
		}, {
			value: '3',
			label: '审核通过'
		},
		{
			value: '4',
			label: '订单关闭'
		}, {
			value: '20',
			label: '已提交到商标局'
		},
		{
			value: '21',
			label: '商标局已接受'
		}, {
			value: '22',
			label: '商标局不予受理'
		},
		{
			value: '23',
			label: '商标局受理通过'
		}, {
			value: '29',
			label: '商标局部分驳回'
		},
		{
			value: '30',
			label: '商标局驳回'
		}, {
			value: '31',
			label: '商标局审通过'
		},
		{
			value: '99',
			label: '申请成功结束'
		}
	];
	const bzOptions = [
		{
			value: '1',
			label: '初始化'
		},
		{
			value: '2',
			label: '待补正'
		}, {
			value: '3',
			label: '放弃补正'
		},
		{
			value: '4',
			label: '已补正'
		}, {
			value: '5',
			label: '补正超时'
		},
		{
			value: '6',
			label: '补正已递交'
		}
	];
	const dataObj = {//条件数据
		orderId: null,
		applicant: null,
		trademarkName: null,
		state: null,
		supplementState: null
	};
	export default {
		name: 'order-list',
		data() {
			return {
				distributeIsAllowed: false,
				queryObj: {},
				dataObj: Object.assign({}, dataObj), //除时间和商品分类外的筛选条件
				order_state:'',
				order_tasking_state:'',
				order_service_state:'',
				bzOptions: bzOptions,
				payment_time: '',
				finished_time:'',
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				payStatusOptions: payStatusOptions,
				dataList:[],
				//currentPage: 1,
				pgIndex: 1,
				pgCount: 10,
				total:0,
				operator_id:'',//代理顾问id
				operatorData: [],
				allSpData:[],
				allOperatorData:[],
				loading: false,
				userInfo:{},
			}
		},
		mounted() {
			// this.userInfo = store.get('userinfo');
			// this.recoverQueryData()
			this.search(true);
		},
		methods: {
			getAllSpData(){
				this.$http.get(allSpUrl)
				.then((resp) => {
					var data = resp.data;
					this.allSpData = data;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			getAllOperatorData(id){
				this.$http.get(allOperatorUrl+'?sp_id='+id)
				.then((resp) => {
					var data = resp.data;
					this.allOperatorData = data.elements;
				})
				.catch((err) => {
					console.log(err);
				});
			},
			//恢复路由上的查询参数
			recoverQueryData(){
				var queryObj = this.queryObj = this.$route.query;
				var dataObj = this.dataObj;
				var typeobj = this.typeobj;
				for (var n in dataObj){
					if (dataObj.hasOwnProperty(n)) {
						dataObj[n] = queryObj[n];
					}
				}
				for (var m in typeobj){
					if (typeobj.hasOwnProperty(m)) {
						typeobj[m] = queryObj[m] ? queryObj[m] - 0 : '';
					}
				}
				this.payment_time = queryObj.startTime && [new Date(queryObj.startTime-0), new Date(queryObj.endTime-86390000)];

				this.pgIndex = queryObj.pgIndex;
			},
			//查询条件整合
			search(extra){
				var ret = {}
				// if (this.finished_time) {
				// 	ret.finished_start_time = this.finished_time[0] ? new Date(this.finished_time[0]).getTime() : null;
				// 	ret.finished_end_time = this.finished_time[1] ? new Date(this.finished_time[1]).getTime() + 86390000 : null;
				// }
				if (this.payment_time) {
					ret.startTime = this.payment_time[0] ? new Date(this.payment_time[0]).getTime() : null;
					ret.endTime = this.payment_time[1] ? new Date(this.payment_time[1]).getTime() + 86390000 : null;
				}
				// ret.bs_calss_id = this.typeobj.fou_id || this.typeobj.thi_id || this.typeobj.sec_id || this.typeobj.fir_id
				// ret.bs_calss_type = this.typeobj.fou_id ? 4 : this.typeobj.thi_id ? 3 : this.typeobj.sec_id ? 2 : this.typeobj.fir_id ? 1 : ''
				// ret.order_service_state = this.order_service_state;
				// ret.order_state = this.order_state;
				// ret.order_tasking_state = this.order_tasking_state;

				ret.pgIndex = extra ? 1 : this.pgIndex;
				ret.pgCount = this.pgCount;
				var data = Object.assign({}, this.dataObj, ret);
				//console.log(data)
				this.getOrderList(data);
			},
			reset(){
				this.dataObj = Object.assign({}, dataObj);
				this.payment_time = '';
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
			view(item){
				this.$router.push({name: 'orderDetail', params: {id: item.id}})
			},
			getselectedItemsPropertyByName(name){
				var arr = [];
				var selectedItems = this.selectedItems;
				selectedItems.forEach((item, i) => {
					arr.push(item[name]);
				});
				return arr;
			},
		},
		filters: {
			dateFormat: Filters.formatDate.dateFormat,
			orderStateFormat: Filters.orderstateformat,
			bzstateFormat: Filters.bzstateformat,
			priceformat:Filters.priceformat,
			bsTypeFormat: Filters.bsTypeFormat
		},
	}
</script>
<style lang='less'>
.commonListAll{
	/* border: 1px solid #DFE2E5; */width: 100%;overflow: hidden;padding:0 10px 20px 10px;margin-top: -10px;
	.commonListHead{
		position: relative;
		height: 50px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 0;}
		.el-tabs__item{padding: 0 20px;height: 50px;line-height: 50px;}
	}
	.condition{
		padding-left: 0;padding-top: 15px;
		.form_control{
			float: left;width: 200px;margin-right: 10px;margin-bottom: 10px;
		}
		.data_pickerbox{
			float: left;
			width: 260px;
			margin-right: 10px;
			margin-bottom: 10px;
			.el-range-editor.el-input__inner {
				width: 100%;
			}
			.el-date-editor .el-range-separator {
				width: 15%;
			}
		}
		.form_submit{
			float: left;
			button{float: left;width: 120px;height: 40px;line-height: 40px;text-align:center;color:#fff;font-size:14px;border:1px solid #479CFF;background: #479CFF;border-radius: 2px;margin-right: 10px;}
			.submit{}
			.reset{background-color: #fff;color:#479CFF;}
			.submit:hover{border-color: #408CE6;background-color: #408CE6;}
			.reset:hover{border-color: #408CE6;color: #408CE6;}
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

	.distributeDialog{
		// 弹框公用样式继承自common.css
		.el-dialog{
			width: 330px;transform:translate(-50%,-50%);
			.distribute_in{
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio-group{line-height: 18px;}
					.el-radio{width: 96px;overflow: hidden;margin-bottom: 8px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
				>p{text-align: right;padding-top: 12px;}
			}
		}
	}

	.memoDialog{
		.el-dialog{
			width: 500px;height: 256px;
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{font-size: 14px;}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.el-textarea{margin-top: 10px;}
			}
		}
	}

}
.dialog_con_box .circular{width: 30px;height: 30px;}
</style>
