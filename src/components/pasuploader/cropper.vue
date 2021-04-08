<template>
  <!-- 图片裁剪组件 -->
  <div class="wrapper cropper_box clearfix" :class="{'hide_left': isFirst }">
    <div class="cropper_bg" v-show="option.show" @click="hideFn()" ></div>
    <div class="file_cropper"  v-show="!option.show && !uploadedFileData.url && !url">
      <span class="tipt" >点击上传</span>
      <input type="file" class="file_uploads" @change="uploadImg($event)">
    </div>
    <div class="success successImg" v-show="url || uploadedFileData.url" @mouseenter="showOperation=true"  @mouseleave="showOperation=false">
      <img :src="url || uploadedFileData.url">
      <div class="mask" v-show="showOperation"></div>
      <div class="hoveraction" v-show="showOperation"><i class="el-icon-zoom-in" @click="dialogImgVisible=true"></i><i class="el-icon-circle-close" @click.stop="handleRemove()"></i></div>
    </div>
    <div class="cropper_wrap" v-show="option.show" >
      <div class="cropper_head">
        <p class="title">裁切图片</p>
        <i class="el-icon-close" @click="hideFn()"></i>
      </div>
      <div class="model" v-show="model" @click="model = false">
        <div class="model-show">
          <img :src="modelSrc" alt="">
        </div>
      </div>
      <div class="content">
        <div class="show-info">
          <div class="test test1">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :fixedBox="option.fixedBox"
              :original="option.original"
              @realTime="realTime"
              @imgLoad="imgLoad"
            ></vueCropper>
          </div>
          <div class="test-button">
            <label class="btn" for="uploads">更换图片</label>
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/jpeg, image/jpg" @change="uploadImg($event)">
            <button @click="startCrop" v-if="!crap" class="btn">开始裁切</button>
            <button @click="stopCrop" v-else class="btn">停止裁切</button>
            <button @click="clearCrop" class="btn">清除</button>
            <button @click="changeScale(1)" class="btn">+</button>
            <button @click="changeScale(-1)" class="btn">-</button>
            <button @click="rotateLeft" class="btn">左旋转</button>
            <button @click="rotateRight" class="btn">右旋转</button>
            <!-- <button @click="finish('base64')" class="btn">preview(base64)</button> -->
            <button @click="finish('blob')" class="btn">预览</button>
            <el-button @click="uoloadFn('blob')" type="success" class="submit">上传</el-button>
          </div>
          <!-- <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <div :style="previews.div">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div> -->

        </div>
      </div>
    </div>
    <div class="cut_btn" v-show="option.update">
      <span class="txt" >重新裁剪</span>
      <input type="file" class="file" @change="uploadImg($event, true)">
    </div>

    <el-dialog
      :visible.sync="dialogImgVisible"
      custom-class="prevous_modal"
      >
      <img class="img" :src="dialogImageUrl" alt="">
    </el-dialog>


  </div>
</template>

<script>
import vueCropper from './vue-cropper';
const rootUrl = CONFIG.rootUrl;
const Extensions = '3gpp,7z,ac3,asf,au,bmp,bzip2,cab,css,csv,doc,docx,dot,dtd,dwg,dxf,gif,gzip,htm,html,jp2,jpe,jpeg,jpg,js,json,mp2,mp3,mp4,mpeg,mpg,mpp,ogg,psd,pdf,png,pot,pps,ppt,pptx,rar,rtf,svf,tar,tif,tiff,txt,wdb,wim,wps,xhtml,xlc,xlm,xls,xlt,xlw,xml,xz,zip,xlsx';

const option = {
  show: false,
  update: false,
  img: '',
  size: 1,
  full: false,
  outputType: 'jpeg',
  canScale: true,
  autoCrop: true,
  // 只有自动截图开启 宽度高度才生效
  autoCropWidth: 600,
  autoCropHeight: 600,
  canMove: true,
  fixedBox: false,
  original: false,
  canMoveBox: true
}

export default {
  components: {
    vueCropper
  },
  props:{
    // 原来存的值
    url: {
      type: String,
      default: ''
    },
    valueName: {
      type: String,
      default: 'url'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: option
    },
    size: {   //最大体积
      type: Number,
      default: 10 //单位为M
    },
    extensionsType: {
      type: Number,
      default: 1
    },
    postAction:{
      type: String,
      default: '/api/file/uploadProxy'
    },
    uploadedFileData: {
      type: Object,
      default: {
        url:'',
        fileName:''
      }
    },
    minWidth: {  //最小宽度
      type: Number,
      default: 600
    },
    maxWidth: {  //最大宽度
      type: Number,
      default: 4000
    },
    minHeight: {  //最小高度
      type: Number,
      default: 600
    },
    maxHeight: {  //最大高度
      type: Number,
      default: 4000
    },
  },
  data: function () {
    return {
      isFirst: true,  //是第一次操作
      dialogImgVisible: false, //预览对话框
      showOperation: false, //展示操作按钮
      fileName: '', //文件名
      model: false,
      modelSrc: '',
      crap: true,
      previews: {},
      dialogImageUrl: '',
      lists: [
        // {
        //  img: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'
        // },
        {
          img: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'
        },
        {
          img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'
        },
        {
          img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
        },
        {
          img: 'http://ofyaji162.bkt.clouddn.com/bg2.jpg',
        },
        {
          img: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
        },
        {
          img: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
        }
      ],
      downImg: '#',
    }
  },
  methods: {
    handleRemove(){
      this.dialogImageUrl = '';
      this.$emit('resetUploader', this.valueName);
    },
    // 上传
    uoloadFn (type) {
      var aLink = document.createElement('a');
      aLink.download = 'author-img' // 输出
      if (type === 'blob') {
        console.log(123)
        console.log(this)
        console.log(this.$refs.cropper.getCropBlob)
        this.$refs.cropper.getCropBlob((data) => {
          console.log(data)
          console.log(555)
          console.log(this.fileName)
          let param = new FormData()  // 创建form对象
          param.append('fileData', data, '委托书.jpg')  // 通过append向form对象添加数据
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          let hei_ = this.$refs.cropper.cropH;
          let wid_ = this.$refs.cropper.cropW;
          this.$http.post(rootUrl + this.postAction, param, config)
          .then (resp => {
            var response = resp.data;
            if (response.url) {
              this.dialogImageUrl = response.url;
              this.$emit('showStatus', false);
              this.$emit('submitFn', resp);
            }
            else{
              this.$alert(response.msg);
            }
          })
          .catch((err) => {
            this.$alert(err.response);
          })
       })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data;
          aLink.href = data;
          aLink.click()
        })
      }
    },
    hideFn () {
      this.$emit('showStatus', false);
    },
    changeImg () {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
    },
    startCrop () {
      // start
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop () {
      //  stop
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop () {
      // clear
      this.crap = false;
      this.$refs.cropper.clearCrop()
    },
    refreshCrop () {
      // clear
      this.$refs.cropper.refresh()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    finish (type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },

    finish2 (type) {
      this.$refs.cropper2.getCropData((data) => {
        this.model = true
        this.modelSrc = data
      })
    },
    finish3 (type) {
      this.$refs.cropper3.getCropData((data) => {
        this.model = true
        this.modelSrc = data
      })
    },
    down (type) {
      // event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'demo'
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },

    uploadImg (e, update) {
      //上传图片
      let self = this;
      self.isFirst = !update;
      console.log(e)
      console.log(self.isFirst)
      console.log(self.option.update)
      console.log(self.option.update && self.isFirst)
      let file = e.target.files[0];
      // 判断图片格式和大小
      if (self.extensionsType == 1 && file) {
        if (!/\.(jpg|jpeg)$/i.test(e.target.value)) {
           self.$alert('图片类型必须是.jpeg,jpg中的一种')
           return false
        };
      }
      else if (self.extensionsType == 2 && file) {
        if (!/\.(rar|zip|pdf|jpg|jpeg|bmp|png)$/i.test(e.target.value)) {
           self.$alert('图片类型必须是.rar,zip,pdf,jpeg,jpg,png中的一种')
           return false
        };
      }
      if (file.size > self.size*1024 *1024) {
        self.$alert('上传文件大小不能超过'+ self.size +'M');
        return false
      }
      // 实现裁切框操作
      let showFn = function(boolean) {
        self.fileName = file.name;
        var reader = new FileReader()
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          self.option.img = data;
          // 只有第一次选择的图片也就是重新裁剪按钮没显示的时候才需要马上提交裁切图
          if (boolean && !update) {
            let submitFn = function() {
              self.uoloadFn('blob');
            }
            setTimeout(submitFn, 100)
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);
      }
      // 判断图片宽高
      let url = window.URL || window.webkitURL;
      let img = new Image();              //手动创建一个Image对象
      img.src = url.createObjectURL(file);//创建Image的对象的url
      img.onload = function () {
        console.log(this.width)
        if (this.width<self.minWidth || this.height<self.minHeight) {
          self.$alert(`图形像素必须介于“${self.minWidth}×${self.minHeight}”－“${self.maxWidth}×${self.maxHeight}”之间`);
          return false;
        }
        else if (this.width<=self.maxWidth && this.height<=self.maxHeight){
          console.log('范围之内')
          if (update) {   //重新裁切，还是要弹出弹窗
            self.$emit('update', true);
            self.$emit('showStatus', true) //展示弹窗
            showFn(true);
          }
          else{
            let param = new FormData()  // 创建form对象
            param.append('fileData', file, '委托书.jpg')  // 通过append向form对象添加数据
            let config = {
              headers: {'Content-Type': 'multipart/form-data'}
            }
            self.$http.post(rootUrl + self.postAction, param, config)
            .then (resp => {
              var response = resp.data;
              if (response.url) {
                self.dialogImageUrl = response.url;
                self.$emit('showStatus', false);
                self.$emit('submitFn', resp);
                self.$emit('update', true);  //显示重新裁切按钮
              }
              else{
                self.$alert(response.msg);
              }
            })
            .catch((err) => {
              self.$alert(err.response);
            })
          }
        }
        else{
          console.log('范围之外')
          self.autoCropWidth = this.width;
          self.autoCropHeight = this.height;
          self.isFirst = false;
          self.$emit('showStatus', true) //展示弹窗
          showFn();
        }
      }
      e.srcElement.value = '';  //及时清空file按钮已选的信息，保证触发change事件
    },
    imgLoad (msg) {
      console.log(msg)
    }
  },
  components: {
    vueCropper
  },
  mounted () {
    this.dialogImageUrl = this.url;
    // hljs.configure({useBR: true})
    // var list = [].slice.call(document.querySelectorAll('pre code'))
    // list.forEach((val, index) => {
    //   hljs.highlightBlock(val)
    // })
  }
}
</script>

<style lang="less">
  .cropper_box {
    .cropper_bg {
      position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5); z-index: 1001;
    }
    .file_cropper {
      float: left; width: 120px; height: 120px; background: #F9F9F9 url(~assets/img/uploader/upload_bg.png) center 35px no-repeat; border: 1px solid #DFE2E5;border-radius: 2px; cursor: pointer;text-align: center;
      .tipt { display: inline-block; font-size: 12px; line-height: 14px; color: #999; position: relative; top: 62px; color: #7F8FA4;}
      .file_uploads {width: 120px; height: 120px; position: absolute; left: 0; top: 0; opacity: 0; z-index: 10; cursor: pointer;}
    }
    .successImg{
      width: 118px; height: 118px;padding:0; text-align: center; display: table-cell;vertical-align: middle; border: 1px solid #DFE2E5; background: #F9F9F9; position: relative;
      img{max-height: 118px;max-width: 118px;vertical-align: middle;}
      .mask{position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0.5;background-color: #000;}
      .hoveraction{position: absolute;top: 0;left: 0;width: 100%;height: 100%;
        i{font-size:20px;margin-right:20px;opacity: 1;color: #fff;cursor: pointer;margin-top: 47px;}
        i:last-child{margin-right:0;}
      }
    }
    .cropper_wrap {
      width: 1200px; height: 730px; position: fixed; left: 50%; margin-left: -600px; top: 50px; background: #fff; z-index: 1002;
      .cropper_head {
        width: 100%; box-sizing:border-box; padding: 20px 20px 10px 20px; display: flex; justify-content:space-between; align-items:center;
        .title {text-align: left; font-size: 16px; color: #333;}
        .el-icon-close {color: #ccc; cursor: pointer;}
      }
      .content {
        margin: auto;
        max-width: 1200px;
        margin-bottom: 100px;
      }
      .test-button {
        margin-top: 15px;
        padding: 0 20px;
        width: 100%;
      }
      .btn {
        width: 100px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin:0 15px 10px 0;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #50bfff;
        border-color: #50bfff;
        transition: all .2s ease;
        text-decoration: none;
        user-select: none;
        float: left;
      }
      .submit {
        float: right;
      }
      .des {
        line-height: 30px;
      }
      code.language-html {
        padding: 10px 20px;
        margin: 10px 0px;
        display: block;
        background-color: #333;
        color: #fff;
        overflow-x: auto;
        font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
        border-radius: 5px;
        white-space: pre;
      }
      .show-info {
        margin-bottom: 50px;
      }
      .show-info h2 {
        line-height: 50px;
      }
      /*.title, .title:hover, .title-focus, .title:visited {
        color: black;
      }*/
      .title {
        display: block;
        text-decoration: none;
        text-align: center;
        line-height: 1.5;
        margin: 0;
        background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
        color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        animation: slide 5s infinite linear;
        font-size: 40px;
      }
      .test {
        height: 600px;
        overflow-y: auto;
      }
      .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
      }
      .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }
      .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
      }
      .c-item {
        display: block;
        padding: 10px 0;
        user-select: none;
      }
    }
    @keyframes slide {
      0%  {
        background-position: 0 0;
      }
      100% {
        background-position: -100% 0;
      }
    }
  }
  .hide_left {
    .cropper_bg {left: -100%; transition:all 1s;}
    .cropper_wrap {left: -100%; transition:all 1s;}
  }
  .cut_btn {
    width: 100px; height: 30px; position: relative;
    .txt {width: 100%; height: 100%; font-size: 13px; color: #333; position: absolute; left: 0; top: 0; text-align: center; background: #eee; border-radius: 5px;}
    .file {position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0;}
  }
  .prevous_modal {
    max-width: 900px;
    min-height: 600px;
    .el-dialog__body {
      text-align: center;
      img {width: auto; max-width: 900px; width:100%;}
    }
  }
</style>
