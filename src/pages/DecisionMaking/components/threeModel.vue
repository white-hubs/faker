<template>
  <div id ="container" style="width:100%; height:100%;">
      <!-- <div id ="container"></div> -->

  </div>
</template>

<script>
// @ is an alias to /src
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  // import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
  // import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

  // import bmData from '../constant/BM_Data_0'
  // var SCREEN_WIDTH = window.innerWidth
  // var SCREEN_HEIGHT = window.innerHeight
  // var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
  export default {
    name: 'ThreeModel',
    data () {
      return {
        // container: null,
        camera: null,
        scene: null,
        renderer: null,
        controls: null,
        mainDiv: null,

        miniDiv: null,
        miniScene: null,
        miniCamera: null,
        miniRenderer: null,
        mouse: {},
        raycaster: null,
        height: null,
        width: null,

        objs: [],
        INTERSECTED: null
      }
    },
    destroyed () {
      console.log('销毁')
    },
    mounted () {
      this.sceneInit()
      // this.sceneMiniInit()
      this.seceneAnimate()
      // this.modelInit()
      document.getElementById('container').addEventListener('mousemove', this.documentMouseMove, false)
      window.addEventListener('resize', this.windowResize, false)
      document.getElementById('container').addEventListener('mousedown', this.mousedown, false)// 页面绑定鼠标点击事件

    // var objects = []
    },
    methods: {
      sendGetFloor (data) {
        // func: 是父组件指定的传数据绑定的函数，data子组件给父组件传递的数据
        this.$emit('func', data)
      },
      sceneInit: function () {
        this.container = document.getElementById('container')
        // 获取宽高
        this.width = this.container.getBoundingClientRect().width
        this.height = this.container.getBoundingClientRect().height
        this.mainDiv = document.createElement('div')
        // this.mainDiv.style.height = '100%'
        // this.mainDiv.setAttribute('id', 'newDiv')
        // this.mainDiv.style.position = 'absolute'
        this.container.appendChild(this.mainDiv)
        // document.body.appendChild(this.mainDiv)
        // PerspectiveCamera
        // this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
        this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 10000)
        this.camera.position.z = 50
        // this.camera.position = new THREE.Vector3(150, 150, 150)
        // 旋转为x朝外，z轴朝上
        // this.camera.up.set(0, 0, 1)

        this.scene = new THREE.Scene()
        // 背景图
        this.scene.background = new THREE.Color(0x102352)
        // this.scene.fog = new THREE.Fog(0x050505, 2000, 3500)
        // 栅格辅助
        var size = 100
        var divisions = 10

        var gridHelper = new THREE.GridHelper(size, divisions)
        // gridHelper.rotateX(Math.PI / 2)
        this.scene.add(gridHelper)
        //
        // 坐标轴辅助工具
        var axesHelper = new THREE.AxesHelper(5000)
        this.scene.add(axesHelper)
        // 环境光
        this.scene.add(new THREE.AmbientLight(0xffffff))
        // 平行光
        // var light1 = new THREE.DirectionalLight(0xffffff, 0.5)
        // light1.position.set(1, 1, 1)
        // this.scene.add(light1)
        // // 平行光
        // var light2 = new THREE.DirectionalLight(0xffffff, 1.5)
        // light2.position.set(0, -1, 0)
        // this.scene.add(light2)

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setPixelRatio(window.devicePixelRatio)
        // 设置宽高
        this.renderer.setSize(this.width, this.height)
        this.renderer.outputEncoding = THREE.sRGBEncoding
        this.mainDiv.appendChild(this.renderer.domElement)
        // 轨道控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        //   this.controls.update()
        // var mesh = new THREE.Mesh(
        //   new THREE.SphereBufferGeometry(100, 16, 8),
        //   new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
        // )
        // this.scene.add(mesh)
        // var manager = new THREE.LoadingManager();
        this.raycaster = new THREE.Raycaster()
        // "HCDLQSCSSLGYDYSDZDCXM2020072500324"
        new GLTFLoader().load('static/HCDLQSCSSLGYDYSDZDCXM202007250017.gltf', (gltf) => {
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
            // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
            // roughnessMipmapper.generateMipmaps( child.material );
            }
          })
          var cameraDis = 20
          this.objs = gltf.scene.children
          this.scene.add(gltf.scene)
          // console.log(gltf.scene.children)
          const box = new THREE.Box3().expandByObject(gltf.scene)
          const x = (box.min.x + box.max.x) * 0.5
          const y = (box.min.y + box.max.y) * 0.5
          const z = (box.min.z + box.max.z) * 0.5

          // var helper = new THREE.Box3Helper(box, 0x000000)
          // this.scene.add(helper)
          // console.log('中心', x, y, z)
          this.camera.position.set(x + cameraDis, y + cameraDis, z + cameraDis)
          this.controls.target = new THREE.Vector3(x, y, z)
        // this.camera.lookAt(new THREE.Vector3(x, y, z))
        })
      // MTLLoader 方式
      // new MTLLoader().load('LQ01-XCGCYZ01.mtl', (materials) => {
      //   materials.preload()
      //   new OBJLoader().setMaterials(materials).load('LQ01-XCGCYZ01.obj', (object) => {
      //     // object.position.y = -95
      //     this.scene.add(object)
      //     this.camera.lookAt(object)
      //   }, (xhr) => {
      //     // if (xhr.lengthComputable) {
      //     //   var percentComplete = xhr.loaded / xhr.total * 100
      //     // }
      //   }, (err) => {
      //     console.info('加载错误', err)
      //   })
      // })
      // this.renderer.autoClear = false
      },
      sceneMiniInit: function () {
        // 可以配置是否使用缩略图
        this.miniDiv = document.createElement('div')
        this.miniDiv.style.height = '200px'
        this.miniDiv.style.width = '200px'
        this.miniDiv.style.left = '50px'
        this.miniDiv.style.bottom = '50px'
        this.miniDiv.style.position = 'absolute'
        this.miniDiv.style.zIndex = '99999'
        // document.body.appendChild(this.miniDiv)
        this.container.appendChild(this.mainDiv)
        // orthographic 相机
        this.miniCamera = new THREE.OrthographicCamera(
          200 / -2, // Left
          200 / 2, // Right
          200 / 2, // Top
          200 / -2, // Bottom
          -5000, // Near
          10000) // Far
        this.miniCamera.up.set(0, 0, 1)
        // this.miniCamera.position.z = 200

        // this.miniCamera.up = new THREE.Vector3(0, 0, -1)
        // this.miniCamera.lookAt(0, 0, 0)

        this.miniScene = new THREE.Scene()

        this.miniScene.background = new THREE.Color(0xFFB6C1)
        // this.scene.fog = new THREE.Fog(0x050505, 2000, 3500)
        // 栅格辅助
        var size = 100
        var divisions = 10

        var gridHelper = new THREE.GridHelper(size, divisions)
        // gridHelper.rotateX(Math.PI / 2)
        this.miniScene.add(gridHelper)
        //
        // 坐标轴辅助工具
        var axesHelper = new THREE.AxesHelper(5000)
        this.miniScene.add(axesHelper)
        // // 环境光
        // this.miniScene.add(new THREE.AmbientLight(0x444444))
        // // 平行光
        // var light1 = new THREE.DirectionalLight(0xffffff, 0.5)
        // light1.position.set(1, 1, 1)
        // this.miniScene.add(light1)
        // // 平行光
        // var light2 = new THREE.DirectionalLight(0xffffff, 1.5)
        // light2.position.set(0, -1, 0)
        // this.miniScene.add(light2)

        this.miniRenderer = new THREE.WebGLRenderer()
        this.miniRenderer.setPixelRatio(window.devicePixelRatio)
        this.miniRenderer.setSize(200, 200)
        // this.miniRenderer.setViewport(0, 0, 200, 200)
        this.miniRenderer.outputEncoding = THREE.sRGBEncoding
        this.miniDiv.appendChild(this.miniRenderer.domElement)
        var mesh = new THREE.Mesh(
          new THREE.BoxBufferGeometry(100, 100, 100),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        )
        this.miniScene.add(mesh)
      },
      seceneAnimate: function () {
        requestAnimationFrame(this.seceneAnimate)

        this.renderer.render(this.scene, this.camera)
        this.raycaster.setFromCamera(this.mouse, this.camera)
        if (this.objs && this.objs.length) {
          var intersects = this.raycaster.intersectObjects(this.objs)
          if (intersects.length > 0) {
            if (this.INTERSECTED !== intersects[0].object) {
              if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex)

              this.INTERSECTED = intersects[0].object
              this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex()
              this.INTERSECTED.material.emissive.setHex(0xff0000)
            }
          } else {
            if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex)

            this.INTERSECTED = null
          }
        }
        if (this.miniRenderer != null) {
          // 因为指示器始终对的是0点，而常规相机平移时零点会变，所以指示器相机位置为常规相机和场景原点的差值
          const o = this.controls.target
          const v = new THREE.Vector3()
          v.subVectors(this.camera.position, o)
          this.miniCamera.position = v
          this.miniCamera.lookAt(0, 0, 0)
          this.miniRenderer.render(this.miniScene, this.miniCamera)
        }
        this.controls.update() // only required if controls.enableDamping = true, or if controls.autoRotate = true
      },
      documentMouseMove: function (event) {
        event.preventDefault()
        this.mouse.x = (event.offsetX / this.width) * 2 - 1
        this.mouse.y = -(event.offsetY / this.height) * 2 + 1
      },
      mousedown: function (event) {
        event.preventDefault()
        // 声明 raycaster 和 mouse 变量
        var raycaster = new THREE.Raycaster()
        var mouse = new THREE.Vector2()
        // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
        mouse.x = (event.offsetX / this.width) * 2 - 1
        mouse.y = -(event.offsetY / this.height) * 2 + 1
        // 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
        raycaster.setFromCamera(mouse, this.camera)
        // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
        var intersects = raycaster.intersectObjects(this.objs)
        if (intersects.length > 0) {
          const name = intersects[0].object.name
          // this.$parent.getFloor(uuid)
          this.sendGetFloor(name)
          console.log(intersects[0].object)
        }
      },
      windowResize: function () {
        console.log('能执行')
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.width, this.height)
      // this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
      }
    }
  }
</script>
