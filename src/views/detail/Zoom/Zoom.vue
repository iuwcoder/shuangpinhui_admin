<template>
  <div class="spec-preview">
    <img :src="images.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="images.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>

export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currrntIndex: 0,
    };
  },
  computed: {
    images() {
      return this.skuImageList[this.currrntIndex] || {};
    },
  },
  methods: {
    handler(event) {
      // 获取遮罩层
      let mask = this.$refs.mask;
      let big = this.$refs.big;

      // 计算住移动的时候遮罩层的left/top
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      // 约束范围
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;

      if (top <= 0) top = 0;
      if (top >= mask.offsetWidth) top = mask.offsetHeight;
      // 修改元素的left与top
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 放大镜是原图的2倍
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
  mounted() {
    /*  下面这种写法:
      相当于动态给组件实例添加属性，并非响应式数据。【响应式属性:数据发生变化，视图立马更新】
      响应式属性，应该现在data当中进行定义【Object.defineProperty:setter、getter监听数据变化、渲染视图】
      this.currentIndex= index; 不行的，因为没有在data当中声明过，并非响应式属性，数据变了，但是视图不会变
      可以的写法：通过组件实例的$set方法实现给组件动态添加新的响应式属性
      向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
      $set:后面后台管理系统项目当中会使用 
    */
    // 接收兄弟组件ImageList传来的索引值
      this.$bus.$on('getIndex',(index)=>{
      this.currrntIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>