<template>
<div class="container-fluid">
<div class="row">
<div class="col bg-secondary text-white">
<a class="navbar-brand">澳驰管理员页面</a>
</div>
</div>
<div class="row">
<div class="col-3 bg-secondary p-2">
<router-link to="/admin/products" class="btn btn-block btn-primary"
active-class="active">
商品
</router-link>
<router-link to="/admin/orders" class="btn btn-block btn-primary"
active-class="active">
订单
</router-link>
</div>
<div class="col-9 p-2">
<router-view />
</div>
</div>
</div>
</template>