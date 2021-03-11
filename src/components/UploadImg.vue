<template>
  <div class="co-upload">
    <div class="co-upload__uploader">
      <input
        @change="handleFileChange"
        ref="fileInput"
        type="file"
        style="display: none;"
      />
      <el-button
        class="co-upload__btn"
        @click="handleClickBtn"
        :loading="isUploading"
        style="background:#04BEC4;color:#fff;"
      >
        <i v-show="!isUploading" />
        {{ load }}
      </el-button>
    </div>
    <ul class="co-upload__list co-upload-list" style="clear: both;">
      <li
        class="co-upload-list__item"
        style="height:100%;"
        v-for="(file, index) in fileList"
        :key="index"
      >
        <!-- <i class="hk-icon-file"/> -->
        <!-- <span>{{file.name}}</span> -->
        <img
          v-if="!video"
          width="120px"
          height="80px"
          :src="fileUrlReplacement() + file.url"
          style="margin-top:15px;"
        />
        <span v-if="video">{{ file.name ? file.name : "" }}</span>
        <i class="el-icon-close" @click="handleDeleteFile(index)" />
      </li>
    </ul>
  </div>
</template>

<script>
// import * as tus from "tus-js-client";
  import axios from 'axios'
  // import retry from "../utils/retry";

  // const TusUploader = tus.Upload;
  // const fileServerEndPoint = process.env.VUE_APP_FILE_UPLOAD_SERVER
  // const fileUrlReplacement = process.env.VUE_APP_FILE_DOWNLOAD_SERVER

  const fileServerEndPoint = 'http://192.168.40.133:28080/group1'
  const fileUrlReplacement = 'http://192.168.40.133:28080'

  const bigFileThreshold = 250 * 1024 * 1024
  // const chunkSize = 1 * 1024 * 1024;

  export default {
    name: 'UploadImg',
    model: {
      prop: 'fileList',
      event: 'fileChange'
    },

    data () {
      return {
        isUploading: false
      }
    },

    props: {
      // 默认不支持一次提交多个文件
      multiple: {
        type: Boolean,
        default: true
      },
      video: {
        type: Boolean,
        default: false
      },
      load: {
        type: String,
        default: '上 传'
      },

      fileList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      fileUrlReplacement () {
        return 'http://192.168.40.133:28080'
      },

      handleClickBtn () {
        !this.isUploading && this.$refs.fileInput.click()
      },

      async handleFileChange (e) {
        const [file] = e.target.files
        const fileName = file.name.split('.')
        const fileNameType = fileName.pop()
        if (
          fileNameType !== 'png' &&
          fileNameType !== 'jpg' &&
          fileNameType !== 'jpeg'
        ) {
          // png/jpg/jpeg
          this.$message('请上传图片格式为png/jpg/jpeg')
          return
        }
        try {
          this.isUploading = true
          if (file.size >= bigFileThreshold) {
            // await this.uploadBigFile(file)
            this.$message('上传文件过大请重新上传')
          } else {
            await this.upload(file)
          }
        } catch (e) {
          console.error(e)
          this.$message('上传失败,请稍后再试', 'error')
        } finally {
          this.$refs.fileInput.value = ''
          this.isUploading = false
        }
      },

      handleUploadSuccess (file, downloadUrl) {
        const list = this.fileList
        if (this.multiple) {
          list.push({
            name: file.name,
            url: downloadUrl.replace(fileUrlReplacement, ''),
            arrUrl: downloadUrl
          })
        } else {
          list[0] = {
            name: file.name,
            url: downloadUrl.replace(fileUrlReplacement, ''),
            arrUrl: downloadUrl
          }
        }
        this.$emit('fileChange', list)
      },
      async upload (file) {
        const data = new FormData()
        data.append('filename', file.name)
        data.append('file', file)
        data.append('output', 'json2')
        const response = await axios.request({
          url: `${fileServerEndPoint}/upload`,
          method: 'post',
          data
        })
        const {
          data: { url },
          message,
          status
        } = response.data
        if (status === 'ok') {
          this.handleUploadSuccess(file, url)
        } else {
          console.error(message)
          throw new Error(message)
        }
      },

      // uploadBigFile(file) {
      //   return new Promise(resolve => {
      //     const uploadConfig = {
      //       endpoint: `${fileServerEndPoint}/big/upload/`,
      //       retryDelays: [0, 3000, 5000, 10000, 20000],
      //       chunkSize,
      //       metadata: {
      //         filename: file.name,
      //         filetype: file.type
      //       }
      //     };
      //     uploadConfig.onSuccess = async () => {
      //       const md5 = uploader.url.replace(
      //         `${fileUrlReplacement}/group1/big/upload/`,
      //         ""
      //       );
      //       await retry(async () => {
      //         const output = await axios.get(`${fileServerEndPoint}/upload`, {
      //           params: {
      //             md5,
      //             output: "json2"
      //           }
      //         });
      //         const {
      //           data: { path },
      //           message,
      //           status
      //         } = output.data;
      //         if (status === "ok") {
      //           this.handleUploadSuccess(file, path);
      //         } else {
      //           throw new Error(message);
      //         }
      //       });
      //       resolve();
      //     };
      //     const uploader = new TusUploader(file, uploadConfig);
      //     uploader.start();
      //   });
      // },

      handleDeleteFile (index) {
        this.fileList.splice(index, 1)
        this.$emit('fileChange', this.fileList)
      }
    }
  }
</script>

<style scoped>
::v-deep .co-upload-list__item .el-icon-close {
  position: absolute;
  left: 110px;
  width: 20px;
  border-radius: 10px;
  background: red;
  text-align: center;
  line-height: 20px;
  top: 43px;
}
::v-deep .co-upload-list__item {
  float: left;
  margin-right: 15px;
  /* opacity: 0.5; */
}
::v-deep .el-icon-close:before {
  color: #fff;
  text-align: center;
}
</style>
