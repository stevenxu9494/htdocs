<style type="text/css">
  tr:nth-child(even) {background-color: #f2f2f2;}
</style>
<template>
<div>
<h4 class="bg-info text-white text-center p-2">全部订单</h4>
<div class="form-group text-center">
<input class="form-check-input" type="checkbox" v-model="showShipped" />
<label class="form-check-label">显示已经邮寄的订单</label>
</div>
<table class="table table-sm table-bordered">
<thead>
<tr>
<th>单号</th><th>姓名</th><th>地址</th><th>电话</th><th class="text-center">订单内容</th>
<th class="text-right">总价</th>
</tr>
</thead>
<tbody>
<tr v-if="displayOrders.length == 0">
<td colspan="5">全部订单已处理</td>
</tr>
<tr v-for="o in displayOrders" v-bind:key="o.id">
<td>{{ o.id }}</td>
<td>{{ o.name }}</td>
<td>{{ o.address }}</td><td>{{`${o.mobile}`}}</td>
<div v-for="i in o.cartLines" v-bind:key="i" style="max-width:100%;max-height:100%;">
<td>商品：{{i.product.name}}</td>
<td>单价：{{i.product.sellPrice|currency}}</td>
<td>数量：{{ i.quantity }}</td>
</div>
<td class="text-right">{{ getTotal(o) | currency }}</td>
<td class="text-center">
<button class="btn btn-sm btn-danger"
v-on:click="shipOrder(o)">
{{ o.shipped ? '已发货' : '未发货' }}
</button>
</td>

</tr>

</tbody>
</table>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
data: function() {
return {
showShipped: false
}
},
computed: {
...mapState({ orders: state => state.orders.orders}),
displayOrders() {
return this.showShipped ? this.orders
: this.orders.filter(o => o.shipped != true);
}
},
methods: {
...mapMutations(["changeOrderShipped"]),
...mapActions(["getOrders", "updateOrder"]),
getTotal(order) {
if (order.cartLines != null && order.cartLines.length > 0) {
return order.cartLines.reduce((total, line) =>
total + (line.quantity * line.product.sellPrice), 0)
} else {
return 0;
}
},
shipOrder(order) {
this.updateOrder(order);
}
},
created() {
this.getOrders();
}
}
</script>