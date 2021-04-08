<template>
	<div class="upload_wrap_photo">
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
      @input-file="inputFile"
      ref="etc" v-show="showIpt">
    </file-upload>

    <div class="file-uploader" :class="{'file-uploader-onbg': startShow}" @click="addFile">
      <span class="tipt" v-if="!uploadedFileData.url">头像上传</span>
      <div class="success" v-if="ishtml4 && startShow && !uploadedFileData.url">
        <img src="~assets/img/uploader/Spinner.gif" alt="">
      </div>
      <el-progress type="circle" :percentage="progress" :status="uploadStatus" :width="80" :stroke-width="4" v-if="!ishtml4 && (uploadStatus || progress!=100) && startShow"></el-progress>
      <div class="img-wrap" v-if="uploadedFileData.url">
	      <img :src="url">
	      <div class="img-hover">
	        <p class="hover-tip">更换头像</p>
	      </div>
      </div>
    </div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import $ from 'jquery'
	import fileUpload from './FileUpload/'
	const rootUrl = CONFIG.rootUrl;
	const Extensions = '3gpp,7z,ac3,asf,au,bmp,bzip2,cab,css,csv,doc,docx,dot,dtd,dwg,dxf,gif,gzip,htm,html,jp2,jpe,jpeg,jpg,js,json,mp2,mp3,mp4,mpeg,mpg,mpp,ogg,psd,pdf,png,pot,pps,ppt,pptx,rar,rtf,svf,tar,tif,tiff,txt,wdb,wim,wps,xhtml,xlc,xlm,xls,xlt,xlw,xml,xz,zip,xlsx';
	const ishtml4 = !window.FormData;
	export default {
  	components: {
  		fileUpload
    },
    props:{
    	isDialog: {
    		type: Boolean,
    		default: false
    	},
    	valueName: {
    		type: String,
    		default: 'url'
    	},
    	url:{
    		type: String,
    		default: ''
    	},
    	fileName:{
    		type: String,
    		default: ''
    	},
    	extensions: {
    		type: String,
    		default: Extensions
    	},
    	postAction:{
    		type: String,
    		default: rootUrl + '/api/file/upload'
    	},
    	name: {
    		type: String,
    		default: 'fileData'
    	},
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
        uploadStatus:'', //上传错误
        ishtml4: ishtml4,
        uploadedFileData:{
        	url:'',
        	fileName:''
        },
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
    	handleRemove(){
    		this.startShow = false;
    		this.suffix = '';
    		this.$emit('resetUploader', this.valueName);
    	},
    	typeIs(url){
    		if (!url) {
    			this.suffix = '';
    			return;
    		}
    		var arr = url.split('.');
    		var len = arr.length;
    		this.suffix = arr[len - 1].toLowerCase();
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
      	var p = $(e.target).parents('.upload_wrap_photo');
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
            if (err == 'extension') {
            	this.startShow = false;
              this.$alert('上传文件的格式不支持');
              return;
            }
            if (err == 'size') {
            	this.startShow = false;
              this.$alert('上传文件大小不能超过'+ this.size +'M');
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
        this.uploadStatus = '';
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
          this.uploadedFileData = data;
          this.$emit('complete', {data, valueName: this.valueName});
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
    		if (suffix == 'pdf') {
    			this.transformPdf(this.url);
    		}
    		this.showIpt = !this.isPdf(suffix) && !this.isImg(suffix)
    	}
    }
  }
</script>
<style lang='less'>
	.upload_wrap_photo{
		position: relative;width: 92px;height: 92px;border-radius: 45px;overflow: hidden;border:1px solid #DFE2E5;
		.file-uploads{opacity: 0;-ms-filter: 'progid: DXImageTransform.Microsoft.Alpha(Opacity=0)'; position: absolute;left: 0;top: 0;width: 90px;height: 90px;cursor: pointer;}
    .file-uploader{
      float:left;width: 90px;height: 90px;cursor: pointer;text-align: center;background-color: #f5f5f5;
      .tipt{
        display:inline-block;
        font-size: 12px;
        line-height: 14px;
        color: #999;
        position:relative;
        top:35px;
        color: #7F8FA4;
      }
      .success{
        width:100%;height: 100%;padding:0 15px;background-color: #F9F9F9;font-size: 12px;text-align: left;
        .suc-tip{height: 73px;padding-top: 52px;line-height: 22px;color: #7F8FA4;font-size:12px;line-height: 14px;text-align: center;}
        .name{text-align: center;line-height: 18px;color: #7F8FA4;overflow: hidden;word-break: break-all;max-height: 36px;}
        .size{color: #999;line-height: 30px;}
      }
      .successImg{
      	width: 118px; height: 118px;padding:0;
      	text-align: center;
      	display: table-cell;vertical-align: middle;
      	img{max-height: 100%;max-width: 100%;vertical-align: middle;}
      	.mask{display: none;position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0.5;background-color: #000;}
	      .hoveraction{display: none;position: absolute;top: 0;left: 0;width: 100%;height: 100%;
	        i{font-size:20px;margin-right:20px;opacity: 1;color: #fff;cursor: pointer;margin-top: 47px;}
	        i:last-child{margin-right:0;}
	      }
      }
      .successImg:hover{
	      .mask,.hoveraction{display:block;}
	    }
      .el-progress{margin-top: 5px;}
      .img-wrap{
      	position: relative;height: 100%;line-height: 90px;text-align: center;
      	.img-hover{
      		position: absolute;top: 0;left:0;width: 100%;height: 100%;display: none;background-color: rgba(0, 0, 0, 0.6);
      		p{width: 100%;height: 100%;line-height: 90px;color: #fff;font-size: 13px;}
      	}
      	img{width: 90px;height: 90px;}
      }
      .img-wrap:hover{
      	.img-hover{display: block;}
      }
    }
    .file-uploader-onbg{
      background-image: none;
      .tipt{display: none;}
    }
    .previewDialog{
    	width: 900px!important;min-height: 600px;
    	.el-carousel{
    		.el-carousel__container{
    			height: 490px;
	    		.el-carousel__item{
	    			.img_wrap{overflow-y: auto;height: 100%;width: 86%;margin:0 auto;}
	    			img{width: 100%;}
	    		}
    		}
    	}
    }
    .previewDialog_trans{
    	transform: translate(-50%, -50%);
    }
	}
</style>
