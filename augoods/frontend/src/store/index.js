import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const testData = [];
// const thumbUrlWrong = "http:\\\/\\\/cdn.aumake.com\\\/product_main_1586249037379-sthumb";
let thumbUrl = "http://cdn.aumake.com/product_main_1586249037379-sthumb"
thumbUrl = thumbUrl.replace(/[\\]/g,'');
for (let i = 1; i <= 10; i++) {
  testData.push({
  id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
  description: `This is Product #${i}`, price: i * 50,
  thumbUrl:`${thumbUrl}`
  })
}
console.log(testData);

export default new Vuex.Store({
  strict: true,
  state: {
    products: testData
  }
})