<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="pageNum.start > 1" @click="$emit('getPageNo', 1)">1</button>
    <button v-if="pageNum.start > 2">···</button>

    <!-- 中部连续页数 -->
    <button
      v-for="(page, index) in pageNum.end"
      :key="index"
      v-show="page >= pageNum.start"
      :class="{ active: pageNo == page }"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>

    <button v-if="pageNum.end < totalPage - 1">···</button>
    <button
      v-if="pageNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 当前页数
    pageNo: {
      type: Number,
      default: 1,
    },
    // 页面展示数量
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总数量
    total: {
      type: Number,
      default: "",
    },
    // 连续页码数量
    continues: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    // 计算总页数，向上取整
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },

    // 计算连续页码的 起始数字与结束数字
    pageNum() {
      // 解构，省略this
      const { continues, pageNo, totalPage } = this;
      // 存储起始页码
      let start = 0;
      let end = 0;
      // 连续页码数5页，至少有5页数据
      // 总页数不满足分页需求
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 计算起始和结束页码
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 解决边界情况：处于前两页和最后两页
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  float: right;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #eb2929;
      color: #fff;
    }
  }
}
</style>

