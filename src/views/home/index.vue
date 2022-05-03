<template>
  <div class="home">
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand />
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import ListContainer from "./listContainer";
import Recommend from "./recommend";
import Rank from "./rank";
import Like from "./like";
import Floor from "./floor";
import Brand from "./brand";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  mounted() {
    // 获取floor组件的数据
    this.$store.dispatch("getFloorList"); 
  },
};
</script>
