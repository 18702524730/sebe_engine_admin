<template>
	<div class="upload_wrap">
		<file-upload
			:title="etc.title"
			:events="etc.events"
			:name="name"
			:post-action="postAction"
			:extensions="extensions"
			:accept="etc.accept"
			:multiple="etc.multiple"
			:size="size*1024*1024"
			:drop="etc.drop"
			:filter="uploadFilter"
			:files="etc.files"
			:maxHeight="maxHeight"
			:maxWidth="maxWidth"
			:minWidth="minWidth"
			:minHeight="minHeight"
			@input-file="inputFile"
			ref="etc" v-show="showIpt">
		</file-upload>

    <div class="file-uploader" :class="{'canPreview': canPreview, 'file-uploader-onbg': startShow, 'disabled': disabled}" @click="addFile">
      <span class="tipt" v-if="!uploadedFileData.url">点击上传</span>
      <div class="success" v-if="ishtml4 && startShow && !uploadedFileData.url">
        <img style="position: relative;width:100px;height: 100px;margin:0;top:10px;left: -5px;display: block;" src="~assets/img/uploader/Spinner.gif" alt="">
      </div>
      <el-progress type="circle" :percentage="progress" :status="uploadStatus" :width="94" :stroke-width="4" v-if="!ishtml4 && (uploadStatus || progress!=100) && startShow"></el-progress>
      <div v-if="canPreview && uploadedFileData.url" style="width:100%;height: 100%;">
	      <div class="success successImg" v-if="isPdf(suffix)" @mouseenter="dialogImageUrl=pdfPreviewImg">
	      	<img :src="pdfPreviewImg">
	      	<div class="mask"></div>
          <div class="hoveraction"><i class="el-icon-zoom-in" @click="yulan"></i><i v-if="!disabled" class="el-icon-circle-close" @click.stop="handleRemove()"></i></div>
	      </div>
	      <div class="success successImg" v-else-if="isImg(suffix)" @mouseenter="dialogImageUrl=url">
	        <img :src="url">
	        <div class="mask"></div>
          <div class="hoveraction"><i class="el-icon-zoom-in" @click="yulan"></i><i v-if="!disabled" class="el-icon-circle-close" @click.stop="handleRemove()"></i></div>
	      </div>
	      <div class="success" v-else>
	        <p class="suc-tip1">重新上传</p>
	        <p class="name">{{processedFileName}}</p>
	        <!-- <p class="size">{{uploadedFileData.fileSize|fileSizeFilter}}</p> -->
	      </div>
      </div>
      <div class="success" v-if="!canPreview && uploadedFileData.url">
        <p class="suc-tip">上传成功</p>
        <p class="name">{{decodeURIComponent(uploadedFileData.fileName)}}</p>
        <!-- <p class="size">{{uploadedFileData.fileSize|fileSizeFilter}}</p> -->
      </div>
    </div>
    <!-- <form onsubmit="return false;">
    <el-dialog :visible.sync="dialogImgVisible" :custom-class="pdfPreviewImgs.length && pdfPreviewImgs.length>1 ? 'previewDialog previewDialog_trans' : 'previewDialog'" :modal-append-to-body="true" :lock-scroll="true" :top="pdfPreviewImgs.length && pdfPreviewImgs.length>1 ? '50vh' : isDialog ? '0' : '15vh'" :modal="isDialog? false: true" ref="previewDialog">
      <el-carousel :interval="5000" arrow="always" :autoplay='false' trigger="click" v-if="pdfPreviewImgs.length && pdfPreviewImgs.length>1" indicator-position="none">
		    <el-carousel-item v-for="(item, index) in pdfPreviewImgs" :key="index">
		      <div class="img_wrap"><img :src="item" alt=""></div>
		    </el-carousel-item>
		  </el-carousel>
		  <div v-else-if="isDialog" style="height: 725px;overflow: auto;">
		  	<img width="100%" :src="dialogImageUrl" alt="">
		  </div>
		  <div v-else style="height: 725px;overflow: auto;margin:0 20px;">
		  	<img width="100%" :src="dialogImageUrl" alt="">
		  </div>
    </el-dialog>
    </form> -->
	<div id="movediv" v-if="yulanshow" ><img :src="dialogImageUrl" alt=""><div class="meng" @click.prevent.stop></div><span class="closebtn"><i class="el-icon-close" @click.stop="yulanshow =false"></i></span></div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import $ from 'jquery'
	import {LimitDrag} from 'utils/drag.js'
	import fileUpload from './FileUpload/'
	const rootUrl = CONFIG.rootUrl;
	const Extensions = '3gpp,7z,ac3,asf,au,bmp,bzip2,cab,css,csv,doc,docx,dot,dtd,dwg,dxf,gif,gzip,htm,html,jp2,jpe,jpeg,jpg,js,json,mp2,mp3,mp4,mpeg,mpg,mpp,ogg,psd,pdf,png,pot,pps,ppt,pptx,rar,rtf,svf,tar,tif,tiff,txt,wdb,wim,wps,xhtml,xlc,xlm,xls,xlt,xlw,xml,xz,zip,xlsx';
	const ishtml4 = !window.FormData;
	// 检查标签是否支持该属性
	function ElementSupportAttribute(elm, attr) {
		var test = document.createElement(elm);
		return attr in test;
	}
	export default {
  	components: {
  		fileUpload
    },
    props:{
		minHeight:{
      type: Number,
      default: 1
    },
    minWidth:{
      type: Number,
      default: 1
    },
    maxHeight:{
      type: Number,
      default: 4000
    },
    maxWidth:{
      type: Number,
      default: 4000
    },
      // 是否可预览
      canPreview: {
        type: Boolean,
        default: true
      },
      // 是否禁用，禁用后只读，不可再上传
      disabled: {
        type: Boolean,
        default: false
      },
      // 如果在弹框中要求可预览，则设置为true
      isDialog: {
    		type: Boolean,
    		default: false
    	},
      // 上传文件url对应的字段名
    	valueName: {
    		type: String,
    		default: 'url'
    	},
    	indexkey: {
    		type: Number,
    		default: -1
    	},
    	url:{
    		type: String,
    		default: ''
    	},
      // 上传文件名称对应的字段名
    	fileName:{
    		type: String,
    		default: ''
    	},
      // 允许的文件后缀
    	extensions: {
    		type: String,
    		default: Extensions
    	},
      // action
    	postAction:{
    		type: String,
    		default: rootUrl + '/api/file/uploadAdapt'
    	},
      // name
    	name: {
    		type: String,
    		default: 'fileData'
    	},
      // 允许的文件大小 整数，单位为M
    	size: {
    		type: Number,
    		default: 10 //单位为M
    	}
    },
    data() {
      return {
      	showIpt: true,
      	dialogImgVisible: false,
      	dialogImageUrl:'',
      	pdfPreviewImg:'',
      	pdfPreviewImgs:[],
      	suffix:'',
      	processedFileName:'',
      	auto: true,
        progress: 0,
        startShow: false, //开始上传
        uploadStatus:null, //上传错误
        ishtml4: ishtml4,
        uploadedFileData:{
        	url:'',
        	fileName:''
		},
		yulanshow: false,
        etc:{
          accept: '*/*',
          multiple: false,
          files: [],
          size: 1024 * 1024 * 10,
          drop: true,
          title: '上传文件'
        }
      }
    },
    methods: {
		yulan(){
            this.yulanshow = true;
			setTimeout(()=>{
				let odiv = document.getElementById('movediv')
				let oimg = odiv.getElementsByTagName('img')
				let w  = oimg[0].offsetWidth;
				let h =oimg[0].offsetHeight;
				if(w>h){
					oimg[0].style.width = '800px';
					odiv.style.width ='800px';
				}else{
					oimg[0].style.height = '725px';
					odiv.style.height ='725px';
				}
				
				new LimitDrag('movediv')
			},0)
			
		},
    	handleRemove(){
    		this.pdfPreviewImg = '';
    		this.startShow = false;
    		this.suffix = '';
    		this.$emit('resetUploader', this.valueName, this.indexkey);
    	},
    	typeIs(url){
    		if (!url) {
    			this.suffix = '';
    			return;
    		}
    		var arr = url.split('.');
    		var len = arr.length;
    		this.suffix = arr[len - 1].toLowerCase();
    		var suffix = this.suffix;
    		/*if (suffix == 'pdf') {
    			this.transformPdf(this.url);
    		}*/
    		this.showIpt = !this.isPdf(suffix) && !this.isImg(suffix)
    	},
    	isPdf(suffix){
    		var ret = false;
    		suffix = suffix.toLowerCase();
    		if(suffix == 'pdf'){
    			ret = true;
    		}
    		return ret;
    	},
    	isImg(suffix){
    		var ret = false;
    		suffix = suffix.toLowerCase();
    		if(suffix == 'jpg' || suffix == 'jpeg' || suffix == 'png' || suffix == 'gif' || suffix == 'bmp'){
    			ret = true;
    		}
    		return ret;
    	},
    	// 点击上传
      addFile(e){
      	//document.getElementById('fileup').click();
      	console.log(e.target)
        if (this.disabled) {
          return;
        }
        if (this.canPreview) {
          var suffix = this.suffix;
        	if (this.isPdf(suffix) || this.isImg(suffix)) {
        		return;
        	}
        }
      	var p = $(e.target).parents('.upload_wrap');
        p.find('input[type="file"]').click();
      },
      //上传文件限制
      uploadFilter(file) {
        //上传文件大小不能超过10M
        if (file.size > this.size*1024 *1024) {
          file = this.$refs.upload.update(file, {error: 'size'})
        }
        return file
      },
      //上传文件处理
      inputFile(newFile, oldFile) {
        var self = this;
        if (newFile && !oldFile) {
          //console.log('add', newFile)
          this.fileUploadAdd(newFile);
		  var URL = window.URL || window.webkitURL
          if (URL && URL.createObjectURL) {
            this.$refs.etc.update(newFile, {blob: URL.createObjectURL(newFile.file)})
          }
        }

				if (newFile && oldFile) {
					var res = newFile.response;

					//console.log('update', newFile, oldFile)
					if (newFile.progress != oldFile.progress) {
						//console.log('progress', newFile.progress)
						this.progress = newFile.progress-0;
					}

					//上传结束
					//console.log('etc.uploaded',this.$refs.etc.uploaded)
					if (this.$refs.etc.uploaded) {
						//console.log(newFile.error)
						var err = newFile.error;
						if(err=='chaochu'){
							this.startShow = false;
							self.$alert(`图形像素必须介于“${self.minWidth}×${self.minHeight}”－“${self.maxWidth}×${self.maxHeight}”之间`);
							return;
						}
						if (err == 'extension') {
							this.startShow = false;
							this.$alert('上传文件的格式不支持');
							return;
						}
						if (err == 'size') {
							this.startShow = false;
							this.$alert('上传文件大小不能超过'+ (this.size < 1 ? this.size*1000 + 'KB' : this.size + 'M'));
							return;
						}
						if (res && typeof res == 'string') {
							try {
								res = JSON.parse(res);
							}
							catch(error){

							}
						}
						//console.log('res.url', res && !res.url)
						if (res && !res.url) {
							this.uploadStatus = 'exception';
							if (this.ishtml4) {
								this.ishtml4 = !ishtml4;
								this.progress = 50;
							}
							// if(res.status=='601'){
								// this.$message.error(res.msg||'上传pdf文件过大');
							/*if(res.status=='601'){
								this.$message.error('上传pdf文件过大');
							}else if(res.status=='604'){
								this.$message.error(res.msg);
							}*/
							//} 
							//打补丁
							$('<style>.el-progress .el-icon-close::before{content: "重新上传";}</style>').appendTo('head');
							return;
						} else {
							this.progress = '100.00'
						}
					}
					//console.log('progress', this.progress)
					//上传成功
					if (this.progress == '100.00' && res && (res.url || res.msg)) {
						this.setFileData(res);
					}
				}

				if (!newFile && oldFile) {
					console.log('remove', oldFile)
				}

				if (this.auto && !this.$refs.etc.uploaded && !this.$refs.etc.active) {
					this.$refs.etc.active = true
				}
			},
			// 上传前回调
			fileUploadAdd(file){
				this.uploadedFileData = {};
				this.progress = 1;
				this.startShow = true;
				this.ishtml4 = ishtml4;
				this.uploadStatus = null;
			},
			// 存证文件上传成功后回调
			setFileData(data){
				var code = data.code;
				/*if (code) {
					if (code == 4010008) {
						this.$message.error('请先登录!');
						this.showMini = true;
					}else if(code == 3010018){
						this.$alert('您上传的文件内容为空，请重新上传');
					}else{
						this.$message.error('上传异常');
					}
				}else{*/
          if (data.code) {
            this.startShow = false;
          }
					this.uploadedFileData = data;
					this.$emit('complete', {data, valueName: this.valueName, indexkey: this.indexkey});
				//}
			},
			textHidden( str, sub_length){
				if (!str) { return '';}
				var temp1 = str.replace(/[^\x00-\xff]/g,"**");
				var temp2 = temp1.substring(0,sub_length);
				//找出有多少个*
				var x_length = temp2.split("\*").length - 1 ;
				var hanzi_num = x_length /2 ;
				sub_length = sub_length - hanzi_num ;//实际需要sub的长度是总长度-汉字长度
				var res = str.substring(0,sub_length);
				if(sub_length < str.length ){
					var end = res+"..." ;
				}else{
					var end = res ;
				}
				return end ;
			},
			initFileName(){
				if (!this.fileName) {
					return '';
				}
				var arr = decodeURIComponent(this.uploadedFileData.fileName).split('.');
				return this.textHidden(arr[0], 23) + '.' + arr[arr.length - 1];
			},
			transformPdf(url){
				var self = this;
				self.$http.get('./api/preview?pdf_url='+url)
				.then((response) => {
					self.pdfPreviewImg = response.data.urls[0];
          if (!self.pdfPreviewImg) {
            self.$message.error('pdf预览失败');
          }
					self.pdfPreviewImgs = response.data.urls;
				})
				.catch((error) => {
					self.$message.error('pdf预览失败');
				});
			}
		},
		mounted() {
			this.uploadedFileData.url = this.url;
			this.uploadedFileData.fileName = this.fileName;
			this.processedFileName = this.initFileName();
			this.typeIs(this.url);
			if (this.isDialog) {
				this.$refs.previewDialog.$el.style.overflow = 'visible'
			}
		},
		watch:{
			url(){
				this.uploadedFileData.url = this.url;
				this.uploadedFileData.fileName = this.fileName;
				this.processedFileName = this.initFileName();
				this.typeIs(this.url);
				if (!this.url) {
					this.startShow = false;
				}
			},
			suffix(){
				var suffix = this.suffix;
    		if (this.canPreview && suffix == 'pdf') {
    			this.transformPdf(this.url);
    		}
				this.showIpt = !this.isPdf(suffix) && !this.isImg(suffix)
			}
		}
	}
</script>
<style lang='less'>
	.upload_wrap{
		position: relative;width: 120px;height: 120px;
		.file-uploads{opacity: 0;-ms-filter: 'progid: DXImageTransform.Microsoft.Alpha(Opacity=0)'; position: absolute;left: 0;top: 0;width: 120px;height: 120px;cursor: pointer;}
    .file-uploader{
      float:left;width:120px;height: 120px;background: #F9F9F9 url(~assets/img/uploader/upload_bg.png) center 30px no-repeat;border: 1px solid #DFE2E5;border-radius: 2px;cursor: pointer;text-align: center;
      .tipt{
        display:inline-block;
        font-size: 12px;
        color: #999;
        position:relative;
        top:72px;
      }
      .success{
        width:100%;height: 100%;padding:15px;background-color: #f5f5f5;font-size: 12px;text-align: left;
        img{margin-top:-10px;margin-left:-5px;}
        .suc-tip{height: 28px;padding-bottom: 6px;line-height: 22px;padding-left: 28px;background: transparent url(~assets/img/uploader/success_ok.png) 0 0 no-repeat;color: #6acea5;color: 16px;font-size:14px;}
        .name{line-height: 18px;color: #666;overflow: hidden;word-break: break-all;max-height: 36px;}
        .size{color: #999;line-height: 30px;}
      }
      .el-progress{margin-top: 13px;}
    }
    .canPreview{
      .tipt{
        line-height: 14px;
        top:65px;
        color: #7F8FA4;
      }
      .success{
        padding:0 15px;background-color: #F9F9F9;
        img{margin-top:0px;margin-left:auto;}
        .suc-tip1{height: 73px;padding-top: 70px;line-height: 22px;background: #F9F9F9 url(~assets/img/uploader/upload_bg.png) center 30px no-repeat;color: #7F8FA4;font-size:12px;line-height: 14px;text-align: center;}
        .name{text-align: center;line-height: 18px;color: #7F8FA4;}
      }
      .successImg{
      	width: 118px; height: 118px;padding:0;
      	text-align: center;
      	display: table-cell;vertical-align: middle;
      	img{max-height: 118px;max-width: 118px;vertical-align: middle;}
      	.mask{display: none;position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0.5;background-color: #000;}
	      .hoveraction{display: none;position: absolute;top: 0;left: 0;width: 100%;height: 100%;
	        i{font-size:20px;margin-right:20px;opacity: 1;color: #fff;cursor: pointer;margin-top: 50px;}
	        i:last-child{margin-right:0;}
	      }
      }
      .successImg:hover{
        .mask,.hoveraction{display:block;}
      }
    }
    .disabled{cursor: default;}
    .file-uploader-onbg{
      background-image: none;
      .tipt{display: none;}
    }
    .previewDialog{
    	width: 900px!important;min-height: 835px;
    	.el-carousel{
    		.el-carousel__container{
    			height: 725px;
	    		.el-carousel__item{
	    			.img_wrap{overflow-y: auto;height: 100%;width: 86%;margin:0 auto;}
	    			img{width: 100%;}
	    		}
    		}
    	}
    }
    .previewDialog_trans{
    	transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%) !important;
      .el-carousel{
        button{width: 36px;height: 36px;border-radius:50%;background-color:rgba(31,45,61,.11);}
      }
    }
	}
#movediv{
	position: fixed;
	width: 500px;
	min-height: 500px;
	max-height: 725px;
	background-color: #fff;
	border: 1px solid #ccc;
	right: 200px;
	top: 100px;
	z-index: 99999;
	img{
		max-width: 800px;
		max-height: 725px;
	}
	.meng{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top:0;
		opacity: 0.01;
		
	}
	.closebtn{
		position: absolute;
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		right: 20px;
		top: 20px;
		font-size: 26px;
		background-color: #fff;
		color: #000;
		cursor: pointer;
	}
}
</style>
