// 发布对应的
'use strict'
// 获取参数
var scpEnv = process.argv[2]

console.info('scp_env = ' + scpEnv)

publish2Service()

function publish2Service () {
  var scpClient = require('scp2')

  if (scpEnv === 'stage') {
    console.info('打包完成===========测试环境==========开始上传')
    scpClient.scp('dist/', 'root:Hankang@2020@192.168.40.131:/home/www/lqs', function (error) {
      // console.log(error);
      if (error) {
        console.log('上传失败: ' + error)
      } else {
        console.log('上传文件成功！！！！！！')
      }
    })
  } else if (scpEnv === 'production') {
    console.info('打包完成===========生产环境==========完成')
  }
}
