<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌字段 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 商品排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOrder }" @click="changeOrder('1')">
                  <a
                    >综合
                    <i v-show="isOrder" class="iconfont" :class="isSort"></i>
                  </a>
                </li>
                <li :class="{ active: !isOrder }" @click="changeOrder('2')">
                  <a
                    >价格
                    <i v-show="!isOrder" class="iconfont" :class="isSort"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品数据 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a @click="toDetail(good.id)"
                      ><img v-lazy="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import Pagination from "@/components/pagination/Pagination";
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Search",
  components: {
    TypeNav,
    Pagination,
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        category1Id: "", // 一级分类ID
        category2Id: "", // 二级分类ID
        category3Id: "", // 三级分类ID
        categoryName: "", // 分类名称
        keyword: "", // 搜索关键字
        props: [], // 商品属性的数组
        trademark: "", // 品牌: "品牌ID:品牌名称"
        order: "1:desc", // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序
        pageNo: 1, // 页码
        pageSize: 5, // 每页数量
      },
    };
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),

    // 判断排序类型，综合/价格
    isOrder() {
      return this.searchParams.order.indexOf("1") != -1;
    },

    // 判断 降序 升序
    isSort() {
      return this.searchParams.order.indexOf("desc") != -1
        ? "icon-xiajiang"
        : "icon-shangsheng";
    },
  },
  methods: {
    // 跳转商品详情页
    toDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    // 发送请求
    getSearch() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },

    // 删除面包屑中的分类名字
    removeCategoryName() {
      // 清空数据
      this.searchParams.categoryName = "";
      // this.clearParams();
      //清除路由当中的query参数，如果存在params参数应该带着，不应该删除
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },

    // 删除关键字
    removeKeyword() {
      this.searchParams.keyword = "";
      //清除路由当中的params参数，
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },

    // 品牌属性
    trademarkInfo(trademark) {
      // 品牌: "品牌ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getSearch();
    },

    // 删除品牌
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getSearch();
    },

    // 售卖属性 ["属性ID:属性值:属性名"]
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getSearch();
      }
    },

    // 删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getSearch();
    },

    // 排序分类和方式
    changeOrder(flag) {
      let orginOrder = this.searchParams.order;
      // 获取最开始状态
      let orginFlag = this.searchParams.order.split(":")[0];
      let orginSort = this.searchParams.order.split(":")[1];
      // 准备新的order属性
      let newOrder = "";
      if (flag == orginFlag) {
        newOrder = `${orginFlag}:${orginSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      // 将新的order赋给searchParams
      this.searchParams.order = newOrder;
      // console.log(newOrder);
      this.getSearch();
    },

    // 获取当前点击页码
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getSearch();
    },

    // 清空路由参数
    clearParams() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },

  watch: {
    // 只要路由发生变化，立即在向服务器发请求
    $route() {
      //清除上一次发请求的id，用undefined就不会向服务器发送这个参数请求
      this.clearParams();
      //先收集最新的搜索条件（再次整理参数），再向服务器发请求
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getSearch();
    },
  },

  //组件挂载完毕发起一次请求
  mounted() {
    this.getSearch();
  },
  beforeMount() {
    //在发请求之前，把携带给服务器参数整理好，携带服务器
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
              .iconfont {
                font-size: 14px;
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    width: 100%;
                    height: 100%;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>