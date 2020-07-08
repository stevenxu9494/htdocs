<template>
    <div v-if="showSearch" class="row my-2" style="">
        <label class="col-2 col-form-label text-right"><i class="fa fa-search" aria-hidden="true"></i></label>
        <input class="col form-control mx-3" 
            v-bind:value="searchTerm" v-on:input="doSearch"
            placeholder="搜索 澳驰 商品/种类" />
        <!-- <button class="col-1 btn btn-sm btn-secondary mx-4" 
                v-on:click="handleClose">
            关闭
        </button> -->
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(["showSearch", "searchTerm"])
    },
    methods: {
        ...mapMutations(["setShowSearch"]),
        ...mapActions(["clearSearchTerm", "search"]),
        handleClose() {
            this.clearSearchTerm();
            this.setShowSearch(false);
        },
        doSearch($event) {
            this.search($event.target.value);
        }
    }
}
</script>