<template>
  <div class="row">    
    <div class="mx-auto m-1 p-3">
      <button v-bind:disabled="currentPage == 1"
        v-on:click="setCurrentPage(currentPage - 1)"
        class="btn btn-secondary btn-sm mx -1"><span style="font-size:20px;transform: scale(.5, 1);">&laquo;</span>上一页</button>
      <span v-if="currentPage > 4">
        <button v-on:click="setCurrentPage(1)"
          class="btn btn-secondary btn-sm mx-1">1</button>
        <span class="h4">...</span>
      </span>
      <span class="mx-1">
        <button v-for="i in pageNumbers" v-bind:key="i"
          class="btn btn-sm btn-secpmdary"
          v-bind:class="{ 'btn-primary': i == currentPage }"
          v-on:click="setCurrentPage(i)">{{ i }}</button>
      </span>
      <span v-if="currentPage <= pageCount - 4">
        <span class="h4">...</span>
        <button v-on:click="setCurrentPage(pageCount)"
          class="btn btn-secondary btn-sm mx-1">{{ pageCount}}</button>
      </span>
      <button v-bind:disabled="currentPage == pageCount"
        v-on:click="setCurrentPage(currentPage + 1)"
        class="btn btn-secondary btn-sm mx-1">下一页<span style="font-size:20px;transform: scale(.5, 1);">&raquo;</span></button>
    </div>
    <br>
    <div class="col-3 form-group" style="margin-top:10px;">
      <select v-on:change="changePageSize">
        <option value="4">每页显示4件商品</option>
        <option value="8">每页显示8件商品</option>
        <option value="12">每页显示12件商品</option>
      </select>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions } from "vuex";
  export default {
    computed: {
      ...mapState(["currentPage"]),
      ...mapGetters(["pageCount"]),
      pageNumbers() {
        if (this.pageCount < 4) {
          return [...Array(this.pageCount + 1).keys()].slice(1);
        } else if (this.currentPage <= 4) {
          return [1, 2, 3, 4, 5];
        } else if (this.currentPage > this.pageCount - 4) {
          return [...Array(5).keys()].reverse()
            .map(v => this.pageCount - v);
        } else {
          return [this.currentPage -1, this.currentPage,
            this.currentPage + 1];
        }
      }
    },
    methods:{
      ...mapActions(["setCurrentPage", "setPageSize"]),
      changePageSize($event) {
        this.setPageSize(Number($event.target.value));
      }
    }
  }
</script>