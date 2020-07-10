<template>
<div>
<h4 class="text-center text-white p-2" v-bind:class="themeClass">
{{ editMode ? "编辑商品" : "新建商品" }}
</h4>
<h4 v-if="$v.$invalid && $v.$dirty"
class="bg-danger text-white text-center p-2">
值不可为空
</h4>
<div class="form-group" v-if="editMode">
<label>ID (不可编辑)</label>
<input class="form-control" disabled v-model="product.id" />
</div>
<div class="form-group">
<label>商品名</label>
<input class="form-control" v-model="product.name" />
</div>
<div class="form-group">
<label>进货价</label>
<input class="form-control" v-model="product.price" />
</div>
<div class="form-group">
<label>成本</label>
<input class="form-control" v-model="product.cost" />
</div>
<div class="form-group">
<label>售价</label>
<input class="form-control" v-model="product.sellPrice" />
</div>
<div class="form-group">
<label>品牌</label>
<input class="form-control" v-model="product.brand" />
</div>
<div class="form-group">
<label>种类</label>
<select v-model="product.category" class="form-control">
<option v-for="c in categories" v-bind:key="c">
{{ c }}
</option>
</select>
</div>
<div class="form-group">
<label>销量</label>
<input class="form-control" v-model="product.sales" />
</div>
<div class="form-group">
<label>净重</label>
<input class="form-control" v-model="product.netWeight" />
</div>
<div class="form-group">
<label>单位</label>
<input class="form-control" v-model="product.unit" />
</div>
<div class="form-group">
<label>小图</label>
<img v-bind:src="product.thumbUrl" style="width:180px;height:200px;"/>
<input class="form-control" v-model="product.thumbUrl" />
</div>
<div class="form-group">
<label>高清图</label>
<img v-bind:src="product.imageUrl" style="width:180px;height:200px;"/>
<input class="form-control" v-model="product.imageUrl" />
</div>
<div class="text-center">
<router-link to="/admin/products"
class="btn btn-secondary m-1">取消
</router-link>
<button class="btn m-1" v-bind:class="themeClassButton"
v-on:click="handleSave">
{{ editMode ? "保存" : "创建"}}
</button>
</div>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
data: function() {
return {
product: {}
}
},
computed: {
...mapState({
pages: state => state.pages,
currentPage: state => state.currentPage,
categories: state => state.categoriesData
}),
editMode() {
return this.$route.params["op"] == "edit";
},
themeClass() {
return this.editMode ? "bg-info" : "bg-primary";
},
themeClassButton() {
return this.editMode ? "btn-info" : "btn-primary";
}
},
validations: {
product: { 
name: { required },
price: { required },
cost: { required },
sellPrice: { required },
brand: { required },
category: { required },
sales: { required },
netWeight: { required },
unit: { required },
thumbUrl: { required },
imageUrl: { required }
}
},
methods: {
...mapActions(["addProduct", "updateProduct"]),
async handleSave() {
this.$v.$touch();
if (!this.$v.$invalid) {
  if (this.editMode) {
await this.updateProduct(this.product);
} else {
await this.addProduct(this.product);
}
this.$router.push("/admin/products");
}
}
},
created() {
if (this.editMode) {
Object.assign(this.product,
this.$store.getters.productById(this.$route.params["id"]))
}
}
}
</script>