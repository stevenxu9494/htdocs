<template>
  <div class="row">    
    <div class="mx-auto m-1 p-3">
      <button v-bind:disabled="currentPage == 1"
        v-on:click="setCurrentPage(currentPage - 1)"
        class="btn btn-secondary btn-sm mx -1">&lt;</button>
      <span v-if="currentPage > 2">
        <button v-on:click="setCurrentPage(1)"
          class="btn btn-secondary btn-sm mx-1">1</button>
        <span class="h5">...</span>
      </span>
      <span class="mx-1">
        <button v-for="i in pageNumbers" v-bind:key="i"
          class="btn btn-sm btn-secpmdary"
          v-bind:class="{ 'btn-primary': i == currentPage }"
          v-on:click="setCurrentPage(i)">{{ i }}</button>
      </span>
      <span v-if="currentPage <= pageCount - 2">
        <span class="h5">...</span>
        <button v-on:click="setCurrentPage(pageCount)"
          class="btn btn-secondary btn-sm mx-1">{{ pageCount}}</button>
      </span>
      <button v-bind:disabled="currentPage == pageCount"
        v-on:click="setCurrentPage(currentPage + 1)"
        class="btn btn-secondary btn-sm mx-1">&gt;</button>
    </div>
    <br>
    <div class="col-3 form-group mx-auto" style="margin-top:10px;">
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
        if (this.pageCount < 2) {
          return [...Array(this.pageCount + 1).keys()].slice(1);
        } else if (this.currentPage <= 2) {
          return [1, 2, 3];
        } else if (this.currentPage > this.pageCount - 2) {
          return [...Array(3).keys()].reverse()
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