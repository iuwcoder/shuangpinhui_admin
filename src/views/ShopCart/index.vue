<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              v-model="cart.isChecked"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:void(0)"
              class="sindelet"
              @click="deleteCart(cart)"
              >删除</a
            >
            <br />
            <a href="javascript:void(0)">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @change="updateCheckedAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#">移到我的关注</a>
        <a href="#">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{calcCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  computed: {
    ...mapGetters(["cartList"]),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算总价
    totalPrice() {
      return this.cartInfoList
        .filter((item) => {
          return item.isChecked;
        })
        .reduce((pre, item) => {
          return pre + item.skuNum * item.skuPrice;
        }, 0);
      // let sum = 0;
      // this.cartInfoList.forEach((item) => {
      //   sum += item.skuNum * item.skuPrice;
      // });
      // return sum;
      // let res = this.getcartInfoList.filter(item => {return item.isChecked === 1}).map(item =>
      // {return item.skuNum * item.skuPrice}).reduce((pre,cur) => {return pre + cur})
      // return res

      // let sum = this.cartInfoList.filter(item =>{})
    },

    // 结算数量
    calcCount() {
      return this.cartInfoList.filter((item) => item.isChecked).length;
    },

    // 全选
    isAllCheck() {
      //遍历数组里面的每一个元素（产品）：如果每一个产品的isChecked属性都为1->勾上
      //如果有一个产品isChecked属性为零，底下计算返回的是布尔值false->不够选上
      return (
        this.cartInfoList.every((item) => item.isChecked == 1) &&
        this.cartInfoList.length > 0
      );
    },
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },

    // 修改产品个数
    handler: throttle(function (type, disNum, cart) {
      // type: 区分这三个元素
      // disNum: +变化量+1，-变化量-1， input最终的个数
      // cart: 哪一个产品
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "mins":
          // 判断产品个数大于1，才可以传递给服务器-1
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          disNum =
            isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum;
          break;
      }
      this.$store
        .dispatch("addShopCart", { skuId: cart.skuId, skuNum: disNum })
        .then(() => {
          this.getData();
        });
    }, 500),

    // 删除商品
    deleteCart(cart) {
      this.$store.dispatch("deleteCartList", cart.skuId).then(() => {
        this.getData();
      });
    },

    // 删除全部商品，没有删除全部商品的接口
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.getData();
      } catch (error) {
        alert("删除失败");
      }
    },

    // 全选
    updateCheckedAll(event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        this.$store.dispatch("updateAllChecked", isChecked);
        this.getData();
      } catch (error) {
        alert("修改失败");
      }
    },

    // 修改产品勾选状态
    updateChecked(cart, event) {
      // 带给服务器的参数不是布尔值，是1或0
      let isChecked = event.target.checked ? "1" : "0";
      this.$store
        .dispatch("updateChecked", { skuId: cart.skuId, isChecked })
        .then(() => {
          this.getData();
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 32%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 18%;
        }

        .cart-list-con5 {
          width: 10.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 11.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>