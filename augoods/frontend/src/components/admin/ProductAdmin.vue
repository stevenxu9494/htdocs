<template>
<div>
<router-link to="/admin/products/create" class="btn btn-primary my-2">
新建商品
</router-link>
<router-link to="/" class="btn btn-success my-2 mx-4">
返回商店
</router-link>
<table class="table table-sm table-bordered">
<thead>
<th>ID</th><th>商品名</th><th>种类</th>
<th class="text-right">售价</th>
</thead>
<tbody>
<tr v-for="p in products" v-bind:key="p.id">
<td>{{ p.id }}</td>
<td>{{ p.name }}</td>
<td>{{ p.category }}</td>
<td class="text-right">{{ p.sellPrice | currency }}</td>
<td class="text-center">
<button class="btn btn-sm btn-danger mx-1"
v-on:click="removeProduct(p)">删除</button>
<button class="btn btn-sm btn-warning mx-1"
v-on:click="handleEdit(p)">编辑</button>
</td>
</tr>
</tbody>
</table>
<page-controls />
</div>
</template>
<script>
import PageControls from "../PageControls";
import { mapGetters, mapActions } from "vuex";
export default {
components: { PageControls },
computed: {
...mapGetters({
products: "processedProducts"
})
},
methods: {
...mapActions(["removeProduct"]),
handleEdit(product) {
this.$router.push(`/admin/products/edit/${product.id}`);
}
}
}
</script>