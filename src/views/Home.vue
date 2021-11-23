<template>
  <b-container fluid>
    <b-modal v-model="alertSuccess" id="modal-center" centered hide-footer hide-header hide-header-close>
      <b-row align-h="center">
        <b-col cols="6">
          <dialog-success-paid></dialog-success-paid>
        </b-col>
      </b-row>
    </b-modal>
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
                  name="input-name"
                  class="mb-2" 
                  v-model="selected"
                  :options="options"
                  value-field="id"
                  text-field="employee_name"
                  v-validate="{ required: true }"
                  :state="validateState('input-name')"
                  aria-describedby="input-name-feedback"
                  data-vv-as="name"
                  >
                    <template #first>
                      <b-form-select-option :value="null" disabled>Name</b-form-select-option>
                    </template>
                  </b-form-select>
                  <b-form-invalid-feedback id="input-name-feedback">{{ veeErrors.first('input-name') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group>
                <label for="Name">Distribution Center <span style="color:red">*</span></label>
                  <b-form-select 
                    name="input-distLoc"
                    :disabled="disabledDistributionLoc" 
                    v-model="distLocSelected" 
                    :options="distributionLoc"
                    v-validate="{ required: true }"
                    :state="validateState('input-distLoc')"
                    aria-describedby="input-distLoc-feedback"
                    data-vv-as="distribution center"
                    >
                    <template #first>
                      <b-form-select-option :value="null" disabled>Distribution Center</b-form-select-option>
                    </template>  
                  </b-form-select>  
                  <b-form-invalid-feedback id="input-distLoc-feedback">{{ veeErrors.first('input-distLoc') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>

            <template v-if="isFilled && productData.length > 0">
              <b-row>
                <b-col cols="6">
                  <b-form-group>
                  <label for="Name">Payment Type <span style="color:red">*</span></label>
                    <b-form-select 
                      name="input-payment-type"
                      v-model="paymentTypeSelected" 
                      :options="paymentType"
                      v-validate="{ required: true }"
                      :state="validateState('input-payment-type')"
                      aria-describedby="input-payment-feedback"
                      data-vv-as="payment type"
                      >
                        <template #first>
                          <b-form-select-option :value="null" disabled>Payment Type</b-form-select-option>
                      </template>  
                    </b-form-select>
                    <b-form-invalid-feedback id="input-payment-feedback">{{ veeErrors.first('input-payment-type') }}</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                  <label for="Name">Expired Date <span style="color:red">*</span></label>
                    <b-form-datepicker
                      name="input-date"
                      :min="minDate"
                      v-model="datePicker" 
                      class="mb-2"
                      v-validate="{ required: true }"
                      :state="validateState('input-date')"
                      aria-describedby="input-date-feedback"
                      data-vv-as="date"
                    >
                    </b-form-datepicker>
                      <b-form-invalid-feedback id="input-date-feedback">{{ veeErrors.first('input-date') }}</b-form-invalid-feedback>
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
      <b-container fluid v-if="isFilled && productData.length > 0" class="px-0">
        <b-row>
          <b-col cols="3">Products</b-col>
          <b-col cols="9">
            <template v-for="(item, idx) in productData">
            <b-container fluid :key="idx" class="mb-4 px-0">
            <b-row>
              <b-col cols="9">
                <b-form-group>
                <label for="Name">Product <span style="color:red">*</span></label>
                  <b-form-select 
                    name="input-product"
                    @input="inputProduct(idx)" 
                    v-model="item.productSelected" 
                    :options="listProduct"
                    v-validate="{ required: true }"
                    :state="validateState('input-product')"
                    aria-describedby="input-product-feedback"
                    data-vv-as="product"
                    >
                    <template #first>
                      <b-form-select-option :value="null" disabled>Product Name</b-form-select-option>
                  </template>    
                  </b-form-select>  
                  <b-form-invalid-feedback id="input-product-feedback">{{ veeErrors.first('input-product') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Unit <span style="color:red">*</span></label>
                  <b-form-select 
                  name="input-unit"
                  :disabled="item.disabledUnit" 
                  :options="item.listUnit" 
                  v-model="item.unitSelected"
                  @input="inputUnit(idx)"
                  value-field="price"
                  text-field="name"
                  v-validate="{ required: true }"
                  :state="validateState('input-unit')"
                  aria-describedby="input-unit-feedback"
                  data-vv-as="unit"
                  ></b-form-select>
                  <b-form-invalid-feedback id="input-unit-feedback">{{ veeErrors.first('input-unit') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Quantity <span style="color:red">*</span></label>
                  <b-form-input
                    name="input-qty"
                    placeholder="Quantity" 
                    v-model="item.qty" 
                    type="number"
                    v-validate="{ required: true, min_value:1}"
                    :state="validateState('input-qty')"
                    aria-describedby="input-qty-feedback"
                    data-vv-as="quantity"
                    >
                    </b-form-input>  
                    <b-form-invalid-feedback id="input-qty-feedback">{{ veeErrors.first('input-qty') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Price <span style="color:red">*</span></label>
                  <b-form-input 
                    name="input-price"
                    v-model="item.priceProduct" 
                    type="number"
                    v-validate="{ required: true }"
                    :state="validateState('input-price')"
                    aria-describedby="input-price-feedback"
                    data-vv-as="price"
                    >
                  </b-form-input>
                  <b-form-invalid-feedback id="input-price-feedback">{{ veeErrors.first('input-price') }}</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <div>
                  <b-form-group>
                    <div class="d-flex justify-content-end">
                      <label for="Name">Total Price <span style="color:red">*</span></label>
                    </div>
                    <b-form-input
                      name="input-total-price"
                      :disabled="disabledTotalPrice(idx)" 
                      v-model="item.totalPrice"
                      :readonly="true"
                      v-validate="{ required: true , min_value:1}"
                      :state="validateState('input-total-price')"
                      aria-describedby="input-total-price-feedback"
                      data-vv-as="total price"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback id="input-total-price-feedback">{{ veeErrors.first('input-total-price') }}</b-form-invalid-feedback>  
                  </b-form-group> 
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <span>Total Nett Price</span>
                  <span>{{toRupiah(item.totalNettPrice)}}</span>
                </div>
              </b-col>
            </b-row>
            </b-container>
            </template>
          </b-col>
        </b-row>

        <b-row class="my-3">
          <b-col cols="3"></b-col>
          <b-col cols="9">
            <div>
              <b-button @click="addProduct" variant="warning" text-variant="warning"><span style="font-size:12px; color: white">NEW ITEM +</span> </b-button>
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
    
      <b-row>
        <b-col>
          <div class="d-flex justify-content-end">
            <b-button id="btn-cancel" @click="resetForm()" variant="outline-secondary">Cancel</b-button>
            <b-button id="btn-confirm" @click.prevent="onSubmit" :disabled="disabledBtn" :variant="btnColor" class="ml-2">Confirm</b-button>
        </div>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import Axios from 'axios'
import stringToCurrency from '../helper/stringToCurrency.js';
import dialogSuccessPaid from '../components/dialogSuccess.vue'

export default {
  mixins:[stringToCurrency],
  components:{
    'dialog-success-paid': dialogSuccessPaid
  },
  data() {
    return {
      alertSuccess: false,
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
    }
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
        if(val) {
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
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref) ;
      }
      return null;
    },
    async getAllUser(){
      /** for req api employee:
          http://dummy.restapiexample.com/api/v1/employees
          result.data.data
          text = employee_name
          value = id
          for req dummy json : 
          https://jsonplaceholder.typicode.com/users
          value = username
          text = name
          result.data */
        
        try {
          const result = await Axios.get('https://jsonplaceholder.typicode.com/users') 
          this.options = result.data
          const userName = result.data.map(obj => obj.name)
          this.options = userName

        } catch (err) {
          console.log(err)
        }
    },
    initDate(){
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      this.minDate = new Date(today)
    },
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
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }

        this.alertSuccess = true
        setTimeout(()=>{
          this.alertSuccess = false
          this.resetForm()
        },3000)
      });
    },
    resetForm() {
      window.location.reload()

      this.$nextTick(() => {
        this.$validator.reset();
      });
    },
  }
}
</script>

<style scoped>
</style>