<template>
  <b-container fluid>
    <b-card>
      <!-- Details -->
      <b-container fluid class="px-0">
        <b-row class="text-left">
          <b-col cols="3">Detail</b-col>
          <b-col cols="9">
            <b-row>
              <b-col cols="12">
                <b-form-group>
                <label for="Name">Name <span style="color:red">*</span></label>
                <b-form-select 
                  class="mb-2" 
                  v-model="selected"
                  :options="options"
                  value-field="id"
                  text-field="employee_name"
                  >
                    <template #first>
                      <b-form-select-option :value="null" disabled>Name</b-form-select-option>
                    </template>
                  </b-form-select>
          
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group>
                <label for="Name">Distribution Center <span style="color:red">*</span></label>
                  <b-form-select :disabled="disabledDistributionLoc" v-model="distLocSelected" :options="distributionLoc">
                    <template #first>
                      <b-form-select-option :value="null" disabled>Distribution Center</b-form-select-option>
                    </template>  
                  </b-form-select>  
                </b-form-group>
              </b-col>
            </b-row>

            <template v-if="isFilled">
              <b-row>
                <b-col cols="6">
                  <b-form-group>
                  <label for="Name">Payment Type <span style="color:red">*</span></label>
                    <b-form-select v-model="paymentTypeSelected" :options="paymentType">
                        <template #first>
                          <b-form-select-option :value="null" disabled>Payment Type</b-form-select-option>
                      </template>  
                    </b-form-select>  
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                  <label for="Name">Expired Date <span style="color:red">*</span></label>
                    <b-form-datepicker :min="minDate" v-model="datePicker" class="mb-2"></b-form-datepicker>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group>
                  <label for="Name">Notes</label>
                  <!-- v-model="text" -->
                    <b-form-textarea
                      id="textarea"
                      v-model="notes"
                      placeholder="add notes (optional)"
                      rows="3"
                      max-rows="6"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </template>  
          </b-col>
        </b-row>
      </b-container>
      <hr>
      <!-- Products -->
      <b-container fluid v-if="isFilled" class="px-0">
      <!-- <template v-for="(item, idx) in productData"> -->
        <b-row>
          <b-col cols="3">Products</b-col>
          <b-col cols="9">
            <template v-for="(item, idx) in productData">
            <b-container fluid :key="idx" class="mb-4 px-0">
            <b-row>
              <b-col cols="9">
                <b-form-group>
                <label for="Name">Product <span style="color:red">*</span></label>
                <!-- 
                  if use dropdown
                  <b-dropdown aria-role="list" v-bind:text="(selectedProduct.id == 0? 'Select here' : selectedProduct.name)">
                  <b-dropdown-item
                    v-for="(product, index) in products"
                    :key="index"
                    aria-role="listitem"
                    @click="setItem(product)"
                  >
                    {{ product.name }}
                  </b-dropdown-item>
              </b-dropdown> -->
                  <b-form-select @input="inputProduct(idx)" v-model="item.productSelected" :options="listProduct">
                    <template #first>
                      <b-form-select-option :value="null" disabled>Product Name</b-form-select-option>
                  </template>    
                  </b-form-select>  
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Unit <span style="color:red">*</span></label>
                  <b-form-select 
                  :disabled="item.disabledUnit" 
                  :options="item.listUnit" 
                  v-model="item.unitSelected"
                  @input="inputUnit(idx)"
                  value-field="price"
                  text-field="name"
                  ></b-form-select>  
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Quantity <span style="color:red">*</span></label>
                  <b-form-input placeholder="Quantity" v-model="item.qty" type="number"></b-form-input>  
                </b-form-group>
                <!-- <div>
                  <b-button @click="addProduct(productData.length)" variant="warning" text-variant="warning">NEW ITEM +</b-button>
                </div> -->
              </b-col>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Price <span style="color:red">*</span></label>
                  <b-form-input v-model="item.priceProduct" type="number"></b-form-input>  
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <div>
                  <b-form-group>
                    <div class="d-flex justify-content-end">
                      <label for="Name">Total Price <span style="color:red">*</span></label>
                    </div>
                    <b-form-input :disabled="disabledTotalPrice(idx)" v-model="item.totalPrice"></b-form-input>  
                  </b-form-group> 
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <span>Total Nett Price</span>
                  <span>{{toRupiah(item.totalNettPrice)}}</span>
                </div>
                <!-- <div class="d-flex justify-content-between">
                  <span>Total</span> 
                  <span>{{productData.total}}</span>
                </div> -->
              </b-col>
            </b-row>
            </b-container>
            </template>
          </b-col>
        </b-row>
      <!-- </template> -->

      <b-row class="my-3">
        <b-col cols="3"></b-col>
        <b-col cols="9">
          <div>
            <b-button @click="addProduct" variant="warning" text-variant="warning">NEW ITEM +</b-button>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3"></b-col>
        <b-col cols="9">
          <b-row align-h="end">
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <span>Total</span> 
                <span>{{toRupiah(total)}}</span>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <hr>
      </b-container>
      
      <!-- <b-row class="mt-5">
        <b-col cols="3"></b-col>
        <b-col cols="9">
          <b-row align-h="end">
            <b-col cols="6">
              <div class="d-flex justify-content-between">
                <span>Total</span> 
                <span>{{toRupiah(total)}}</span>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row> -->

      <!-- <hr> -->
      <b-row>
        <b-col>
          <div class="d-flex justify-content-end">
            <b-button variant="outline-secondary">Cancel</b-button>
            <b-button :disabled="disabledBtn" :variant="btnColor" class="ml-2">Confirm</b-button>
        </div>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
// import userApi from '../api/user'
import Axios from 'axios'
import { mapMutations, mapGetters } from "vuex";
import stringToCurrency from '../helper/stringToCurrency.js';

export default {
  mixins:[stringToCurrency],
  data() {
    return {
      disabledBtn: true,
      selected: null,
      btnColor: 'secondary',
      distLocSelected: null,
      disabledDistributionLoc: true,
      isFilled: false,
      datePicker: '',
      minDate: '',
      notes: '',
      productData:[{
        productSelected: null,
        unitSelected: null,
        disabledUnit: true,
        priceProduct: 0,
        totalPrice:0,
        totalNettPrice: 0,
        qty: 0,
        listUnit:[]
      }],
      total:0,
      paymentTypeSelected: '',
      options: [],
      distributionLoc: [
        {value: 'tangerang' , text:'DC Tangerang'},
        {value: 'cikarang' , text:'DC Cikarang'}
      ],
      paymentType:[
        {value: 'cH+1' , text:'Cash H+1'},
        {value: 'cH+3' , text:'Cash H+3'},
        {value: 'ch+7' , text:'Cash H+7'},
        {value: 'trfH+1' , text:'Cash H+1'},
        {value: 'trfH+3' , text:'Cash H+3'},
        {value: 'trfH+7' , text:'Cash H+7'}
      ],
      listProduct: [
        {text: "Morning Dew Milk", 
          value: [{name: "pak", price: 10000}, {name: "pcs", price:1000}]},
        {text: "Le Minerale 600ml", 
          value: [{name: "pak", price: 50000}, {name: "karton", price:100000}]},
        {text: "Greenfield Full Cream Milk 1L", 
          value: [{name: "pak", price: 150000}, {name: "pcs", price:15000}, {name:'karton', price: 300000}]}
      ],
      // listUnit:[]
      /**if use dropdown **/
      // products: [
      //   {
      //     id: 1,
      //     name: "test1",
      //     value: 1,
      //     etc: "..."
      //   },
      //   {
      //     id: 2,
      //     name: "test2",
      //     value: 2,
      //     etc: "..."
      //   }
        
      // ],
      // selectedProduct: {
      //   id: 0,
      //   name: "",
      //   value: 0,
      //   etc: "..."
      // }
    }
  },
  computed: {
    ...mapGetters({ count: "getCount" }),
  },
  watch:{
    selected: {
      immediate: true,
      handler(val) {

        if(val == null) {
          this.disabledDistributionLoc = true
        } else {
          this.disabledDistributionLoc = false
        }
      }
    },
    distLocSelected: {
      immediate: true,
      handler(val) {
        if(val != null) {
          this.isFilled = true

        } else {
          this.isFilled = false
        }
      }
    }
  },
  created(){
    this.getAllUser()
    this.initDate()
  },
  methods: {
    ...mapMutations(["addToCartStore"]),
    async getAllUser(){
      // return (async (resolve, reject)=>{
        // for req api employee:
        //http://dummy.restapiexample.com/api/v1/employees. 
        // result.data.data
        // employee_name
        // id
        // for req dummy json : 
        // https://jsonplaceholder.typicode.com/users
        // username
        // name
        // result.data
        try {
          const result = await Axios.get('http://dummy.restapiexample.com/api/v1/employees') 
          this.options = result.data.data
          console.log(this.options)

        } catch (err) {
          console.log(err)
        }
    },
    initDate(){
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      this.minDate = new Date(today)
    },
    // setItem(product) {
    //   this.selectedProduct = product;
    // },
    inputProduct(idx){
      if (this.productData[idx].productSelected != null) {
        this.productData[idx].disabledUnit = false
        
        this.productData[idx].listUnit = [...this.productData[idx].productSelected]
      } else {
        this.productData[idx].disabledUnit = true
      }
      
    },
    inputUnit(idx){
      this.productData[idx].priceProduct = this.productData[idx].unitSelected
    },
    calculateTotal(idx){
      this.productData[idx].totalPrice = this.productData[idx].qty * this.productData[idx].priceProduct
      this.productData[idx].totalNettPrice = this.productData[idx].qty * this.productData[idx].priceProduct

      const result = this.productData.map(data => {
        return data.totalPrice
      }).reduce((a, b) => a + b, 0)
      this.total = result
    },
    addProduct() {
      let newData = {
        productSelected: null,
        disabledUnit: true,
        priceProduct: 0,
        totalPrice:0,
        totalNettPrice: 0,
        qty: 0,
        listUnit:[]
      }

      this.productData.push(newData)
    },
    disabledTotalPrice(idx){
      if(this.productData[idx].qty != 0 && this.productData[idx].priceProduct != 0){
        this.calculateTotal(idx)
        this.allowBtn()
        return false
      } 

      return true
      
    },
    allowBtn(){
      this.disabledBtn = false
      this.btnColor = 'success'
    }
  }
}
</script>

<style scoped>
</style>