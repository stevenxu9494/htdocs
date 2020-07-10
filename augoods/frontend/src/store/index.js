import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";
import OrdersModule from "./orders";
import AuthModule from "./auth";

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
  modules: { cart: CartModule, orders: OrdersModule, auth: AuthModule },
  state: {
    // products: [],
    categoriesData: [],
    allProducts: [],
    // productsTotal: 0,
    currentPage:1,
    pageSize: 4,
    currentCategory: "全部",
    pages: [],
    serverPageCount: 0,
    searchTerm: "",
    showSearch: true,
    currentProduct: {},
    showHideDetail: false
  },
  getters:{
    // productsFilteredByCategory: state => state.products
    // .filter(p=>state.currentCategory == "全部"
    // || p.category == state.currentCategory),

    // processedProducts:(state, getters) => {
    //   let index = (state.currentPage -1) * state.pageSize;
    //   return getters.productsFilteredByCategory
    //   .slice(index, index + state.pageSize);
    // },
    // pageCount: (state, getters) =>
    // Math.ceil(getters.productsFilteredByCategory.length / state.pageSize), 
    // categories: state => ["全部", 
    //   ...state.categoriesData]
    // ---------------------------------------------------
    // productsFilteredByCategory: state => state.products
    // .filter(p => state.currentCategory == "All"
    // || p.category == state.currentCategory),
    processedProducts: (state) => {
      return state.pages[state.currentPage];
    },
    pageCount: (state) => state.serverPageCount,
    categories: state => ["全部", ...state.categoriesData]
  },
  mutations: {
    // setCurrentPage(state, page) {
    //   state.currentPage = page;
    // },
    // setPageSize(state, size) {
    //   state.pageSize = size;
    //   state.currentPage = 1;
    // },
    // setCurrentCategory(state,category) {
    //   state.currentCategory=category;
    //   state.currentPage =1;
    // },
    // setData(state, data) {
    //   state.products = data.pdata;
    //   state.productsTotal = data.pdata.length;
    //   state.categoriesData = data.cdata.sort();
    // }

    _setCurrentPage(state, page) {
      state.currentPage = page;
    },
    _setCurrentProduct(state, product) {
      state.currentProduct = product;
    },
    _setPageSize(state, size) {
    state.pageSize = size;
    state.currentPage = 1;
    },
    _setCurrentCategory(state, category) {
    state.currentCategory = category;
    state.currentPage = 1;
    },
    // setData(state, data) {
    // state.products = data.pdata;
    // state.productsTotal = data.pdata.length;
    // state.categoriesData = data.cdata.sort();
    // },
    addPage(state, page) {
      for (let i = 0; i < page.pageCount; i++) {
        Vue.set(state.pages, page.number + i,
        page.data.slice(i * state.pageSize,
        (i * state.pageSize) + state.pageSize));
      }
    },
    clearPages(state) {
      state.pages.splice(0, state.pages.length);
    },
    setCategories(state, categories) {
      state.categoriesData = categories;
    },
    setCurrentProduct(state, product) {
      state.currentProduct = product
    },
    setPageCount(state, count) {
      state.serverPageCount = Math.ceil(Number(count) / state.pageSize);
    },
    setShowSearch(state, show) {
      state.showSearch = show;
    },
    setShowHideDetail(state, show) {
      state.showHideDetail = show;
    },
    setSearchTerm(state, term) {
      state.searchTerm = term;
      state.currentPage = 1;
    },
  },
  actions: {
    // async getData(context) {
    //   let pdata = (await Axios.get(productsUrl)).data;
    //   let cdata = (await Axios.get(categoriesUrl)).data;
    //   context.commit("setData", {pdata, cdata});
    // }
    // ------------------------
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
    async getData(context) {
      await context.dispatch("getPage", 2);
      context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
    },
    async getPage(context, getPageCount = 1) {
      let url = `${productsUrl}?_page=${context.state.currentPage}`
        + `&_limit=${context.state.pageSize * getPageCount}`;
      if (context.state.currentCategory != "全部") {
        url += `&category=${context.state.currentCategory}`;
      }

      // add search url
      if (context.state.searchTerm != "") {
        url += `&q=${context.state.searchTerm}`;
      }

      let response = await Axios.get(url);
      context.commit("setPageCount", response.headers["x-total-count"]);
      context.commit("addPage", { number: context.state.currentPage,
      data: response.data, pageCount: getPageCount});
    },
    setCurrentPage(context, page) {
      context.commit("_setCurrentPage", page);
      if (!context.state.pages[page]) {
        context.dispatch("getPage");
      }
    },
    setCurrentProduct(context, product) {
      context.commit("_setCurrentProduct", product);
    },

    setPageSize(context, size) {
      context.commit("clearPages");
      context.commit("_setPageSize", size);
      context.dispatch("getPage", 2);
    },
    setCurrentCategory(context, category) {
      context.commit("clearPages");
      context.commit("_setCurrentCategory", category);
      context.dispatch("getPage", 2);
    },
    search(context, term) {
      context.commit("setSearchTerm", term);
      context.commit("clearPages");
      context.dispatch("getPage", 2);
    },
    clearSearchTerm(context) {
      context.commit("setSearchTerm", "");
      context.commit("clearPages");
      context.dispatch("getPage", 2);
    }
  }

})