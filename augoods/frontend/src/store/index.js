import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";

Vue.use(Vuex);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

// const testData = [];
// // const thumbUrlWrong = "http:\\\/\\\/cdn.aumake.com\\\/product_main_1586249037379-sthumb";
// let thumbUrl = "http://cdn.aumake.com/product_main_1586249037379-sthumb"
// thumbUrl = thumbUrl.replace(/[\\]/g,'');
// for (let i = 1; i <= 10; i++) {
//   testData.push({
//   id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
//   description: `This is Product #${i}`, price: i * 50,
//   thumbUrl:`${thumbUrl}`
//   })
// }
// console.log(testData);

export default new Vuex.Store({
  strict: true,
  modules: { cart: CartModule },
  state: {
    products: [],
    categoriesData: [],
    allProducts: [],
    productsTotal: 0,
    currentPage:1,
    pageSize: 4,
    currentCategory: "全部"
  },
  getters:{
    productsFilteredByCategory: state => state.products
    .filter(p=>state.currentCategory == "全部"
    || p.category == state.currentCategory),

    processedProducts:(state, getters) => {
      let index = (state.currentPage -1) * state.pageSize;
      return getters.productsFilteredByCategory
      .slice(index, index + state.pageSize);
    },
    pageCount: (state, getters) =>
    Math.ceil(getters.productsFilteredByCategory.length / state.pageSize), 
    categories: state => ["全部", 
      ...state.categoriesData]
  },
  mutations: {
    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setPageSize(state, size) {
      state.pageSize = size;
      state.currentPage = 1;
    },
    setCurrentCategory(state,category) {
      state.currentCategory=category;
      state.currentPage =1;
    },
    setData(state, data) {
      state.products = data.pdata;
      state.productsTotal = data.pdata.length;
      state.categoriesData = data.cdata.sort();
    }
  },
  actions: {
    async getData(context) {
      let pdata = (await Axios.get(productsUrl)).data;
      let cdata = (await Axios.get(categoriesUrl)).data;
      context.commit("setData", {pdata, cdata});
    }
    // ,
    // getData(context) {
    //   Axios.get('http://localhost:8000/augoods/backend/ajaxfile.php')
    //     .then(function(response){
    //       let pdata =response.data.products;
    //       let cdata =response.data.categories;
    //       context.commit("setData", {pdata, cdata});
    //     })
    //     .catch(function(error){
    //       console.log(error);
    //     });
    // }
  }

})