<template>
  <b-container fluid>
    <b-card>
      <!-- Details -->
      <b-row class="text-left">
        <b-col cols="3">Detail</b-col>
        <b-col cols="9">
          <b-row>
            <b-col cols="12">
              <b-form-group>
              <label for="Name">Name <span style="color:red">*</span></label>
                <b-form-select class="mb-2" v-model="selected" :options="options"></b-form-select>  
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group>
              <label for="Name">Distribution Center <span style="color:red">*</span></label>
                <b-form-select v-model="selected" :options="options"></b-form-select>  
              </b-form-group>
            </b-col>
          </b-row>
          <template>
          <b-row>
            <b-col cols="6">
              <b-form-group>
              <label for="Name">Payment Type <span style="color:red">*</span></label>
                <b-form-select v-model="selected" :options="options"></b-form-select>  
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
              <label for="Name">Expired Date <span style="color:red">*</span></label>
                <b-form-select v-model="selected" :options="options"></b-form-select>  
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group>
              <label for="Name">Notes</label>
                <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          </template>  
        </b-col>
      </b-row>
      <hr>
      <!-- Products -->
      <template>
        <b-row>
          <b-col cols="3">Products</b-col>
          <b-col cols="9">
            <b-row>
              <b-col cols="9">
                <b-form-group>
                <label for="Name">Product <span style="color:red">*</span></label>
                  <b-form-select v-model="selected" :options="options"></b-form-select>  
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Unit <span style="color:red">*</span></label>
                  <b-form-select v-model="selected" :options="options"></b-form-select>  
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Quantity <span style="color:red">*</span></label>
                  <b-form-select v-model="selected" :options="options"></b-form-select>  
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group>
                <label for="Name">Price <span style="color:red">*</span></label>
                  <b-form-select v-model="selected" :options="options"></b-form-select>  
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <div>
                <b-form-group>
                <label for="Name">Total Price <span style="color:red">*</span></label>
                  <b-form-select v-model="selected" :options="options"></b-form-select>  
                </b-form-group> </div>
                <hr>
                <div class="d-flex justify-content-between">
                  <span>Total Nett Price</span>
                  <span>0</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Total</span> 
                  <span>0</span>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </template>

      <hr>
      <b-row>
        <b-col>
          <div class="d-flex justify-content-end">
            <b-button variant="outline-secondary">Cancel</b-button>
            <b-button :disabled="disabled" :variant="btnColor" class="ml-2">Confirm</b-button>
        </div>
        </b-col>
      </b-row>
    </b-card>
      <!-- <b-row>
          <b-col>
              asdasd
          </b-col>
      </b-row> -->
  </b-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      disabled: true,
      selected: null,
      btnColor: 'null',
      options: [
        { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
      ],
    };
  },
  computed: {
    ...mapGetters({ count: "getCount" }),
  },
  watch:{
    disabled: {
      immediate: true,
      handler(val) {

        if(val == true) {
          this.btnColor = 'secondary' 
        } else {
          this.btnColor = 'success'
        }
      }
    }
  },
  methods: {
    ...mapMutations(["addToCartStore"]),
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    addToCart(data) {
      this.isAdded = true;
      this.addToCartStore(data);
    },
    getId(data) {
      this.id = data.id;
    },
    deleteProduct() {
      alert("This feature will be added soon!");
    },
  },
};
</script>

<style scoped>

  .card-footer{
    text-align: right;
    background-color: #ffffff;
  }
.nav {
  background-color: rgb(215, 18, 73);
  color: white;
  font-size: 16px;
  height: 30px;
}

.card img {
  text-align: center;
  width: 100px;
  height: 100px;
}

.cart {
  position: fixed;
  background-color: rgb(224, 228, 20);
  border: 1px solid rgb(215, 18, 73);
  top: 10px;
  right: 0px;
  width: 40px;
  height: 40px;
  border-radius: 25%;
  z-index: 1;
}

.cart span {
  position: absolute;
  top: 17%;
  left: 55%;
  text-align: center;
  color: rgb(215, 18, 73);
}

.cart img {
  position: absolute;
  top: 25%;
  left: 13%;
  text-align: center;
}
</style>