<template>
	<div class="login">
		<div class="header">
			<div class="header_left fl">
				<img src="~assets/img/logo.png" alt="">
				<p class="left ml15">拾贝引擎管理台</p>
			</div>
			<!-- <div class="header_right fr">
				<a :href="homeUrl" target="_blank">拾贝网</a>
				<a :href="spUrl" target="_blank" class="m60">服务商平台</a>
				<a href="http://www.cnsebe.com/manager_login_frame.html#/manager_login/" target="_blank">创新保后台</a>
			</div> -->
		</div>
		<div class="login_info clearfix">
			<div class="info_list">
				<p class="tit mb20">登录</p>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" @keyup.native.enter="submitForm('ruleForm')">
					<el-form-item prop="name">
						<p>用户名</p>
						<el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
					</el-form-item>

					<el-form-item prop="password">
						<p>密码</p>
						<el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
					<!-- <el-form-item prop="code" v-if="errLoginCount>3">
						<p>验证码</p>
						<el-input v-model="ruleForm.code" class="code" @blur="msg=''" placeholder="请输入验证码" :maxlength="4"></el-input>
						<img :src="imageCode" @click="imgCode" alt="">
					</el-form-item> -->
				</el-form>
				<p class="err" v-if="msg">{{msg}}</p>
				<button class="mt10" @click="submitForm('ruleForm')">登录</button>
			</div>
		</div>
		<!-- <div class="footer">
			<p>© 2018 拾贝公司 All Rights Reserved</p>
		</div> -->
	</div>
</template>

<script>
	import qs from 'qs'
	import md5 from 'md5'
	const loginSuffixUrl = CONFIG.rootUrl + '/api/admin/login';
	export default {
		components: {
		},
		data() {
			return {
				ruleForm:{
					name:'',
					password:'',
					// code:''
				},
				rules: {
					name: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					// code: [
					// 	{ required: true, message: '请输入验证码', trigger: 'blur' },
					// 	{ min: 4, max: 4, message: '验证码长度四个字符', trigger: 'blur' }
					// ]
				},
				imageCode:'',
				msg:''
			}
		},
		mounted() {
			//this.imgCode();
		},
		methods: {
			submitForm(formName) {
				this.msg = "";
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.login();
					} else {
						return false;
					}
				});
			},
			login(){
				var self = this;
				var data = {
					name:this.ruleForm.name,
					password: md5(this.ruleForm.password),
				}
				this.$http.post(loginSuffixUrl, data)
				.then((resp) => {
					self.$router.push({name: 'order'});
				})
				.catch((error) => {
					var error = error.response.data;
					self.msg = error.msg;
				});
			}
		},
		filters: {
		},
		watch:{
		}
	}
</script>

<style lang='less'>
html,body,#app{height:100%;}
	.login{background: url(~assets/img/banner.jpg) no-repeat;width: 100%;height: 100%;padding: 40px 60px 60px;min-height: 800px;min-width: 1200px;background-size: cover;position: relative;background-color: #02254b;
		.header_left{
			p{display: inline-block;font-size: 16px;color: #FFFFFF;vertical-align: bottom;line-height: 26px;padding-top: 10px}
			img {width: 150px; height:25px;}
		}
		.header_right{
			.m60{margin: 0 60px;}
			a{text-decoration: none;color:#fff;font-size: 16px;cursor:pointer}
		}
		.login_info{width:1120px;height: 100%;margin:0 auto;position: relative;
			.info_list{position: absolute;right: 0;top: 50%;transform: translateY(-50%);width:422px;max-height:458px;background-color:#fff;border: 1px solid #D3DCE6;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);border-radius: 4px;padding:50px 60px 80px;
				.code{
					input{padding-right: 80px;}
				}
				.tit{font-size: 20px;color: #1F2D3D;line-height:26px;}
				.demo-ruleForm{
					p{font-size: 14px;color: #1F2D3D;line-height:20px;}
					>div{position: relative;
						img{width:65px;height:26px;position: absolute;bottom:2px;right: 2px;cursor: pointer;}
					}
				}
				.err{color: #ff4949;font-size: 12px;line-height: 1;padding-top: 4px;position: absolute;bottom:135px;}
				button{width:300px;height:40px;line-height:40px;text-align: center;color:#FFF;background: #20A0FF;border-radius: 4px;font-size: 16px;}
				.el-form-item{
					.el-form-item__content{
						line-height: 30px;
						.el-input{height: 30px;margin-top: 5px;}
					}
				}

			}
		}
		.footer{background: #0C2745;width:100%;height:60px;position: absolute;bottom:0px;left:0;
			p{font-size: 12px;color: #999999;text-align:center;line-height:60px;}
		}
	}
</style>
