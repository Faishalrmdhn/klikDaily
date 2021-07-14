<template>
  <b-container fluid>
      <b-row>
          <b-col>
              asdasd
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      name: "Home",
      items: [
        {
          id: "1923",
          name: "Tas Pria Ransel Distro Original",
          price: 100000,
          stuff: {
            image_url:
              "https://s2.bukalapak.com/img/2584349902/small/Tas_Pria_Ransel__Distro_Original_Bandung________________tas_.jpg",
            stock: 4,
          },
          store: {
            id: 129,
            name: "Kobeo Store",
          },
          category: {
            id: 1,
            name: "Asessoris Pria",
          },
        },
        {
          id: "1987",
          name: "Sepatu Running Adidas Original",
          price: 175000,
          stuff: {
            image_url:
              "https://s1.bukalapak.com/img/6024418382/small/SEPATU.jpg",
            stock: 8,
          },
          store: {
            id: 315,
            name: "sepatuonlineinc",
          },
          category: {
            id: 2,
            name: "Sepatu Pria",
          },
        },
        {
          id: "2001",
          name:
            "Jaket Virendra Polos. Tersedia Semua Logo Club Bola. Jacket Soccer Waterproof Promo",
          price: 200000,
          stuff: {
            image_url:
              "https://s0.bukalapak.com/img/5759820062/small/Jaket_Virendra_Polos_Tersedia_Semua_Logo_Club_Bola_Jacket_So.jpg",
            stock: 15,
          },
          store: {
            id: 177,
            name: "Butik Soccer ID",
          },
          category: {
            id: 3,
            name: "Pakaian",
          },
        },
        {
          id: "2024",
          name:
            "Baju Koko Shaquille Biru Kemeja Soccer Baju Sholat Muslim Gamis Kemko",
          price: 140000,
          stuff: {
            image_url:
              "https://s2.bukalapak.com/img/2681803562/small/Baju_Koko_Shaquille_Hiaju_Kemeja_Soccer_Baju_Sholat_Muslim_G.jpg",
            stock: 20,
          },
          store: {
            id: 177,
            name: "Butik Soccer ID",
          },
          category: {
            id: 3,
            name: "Pakaian",
          },
        },
        {
          id: "2531",
          name: "SEPATU SNEAKERS PRIA SEPATU PRIA",
          price: 185000,
          stuff: {
            image_url:
              "https://s1.bukalapak.com/img/6453738872/small/1530104514938_scaled.jpg",
            stock: 4,
          },
          store: {
            id: 398,
            name: "NF Footwear",
          },
          category: {
            id: 2,
            name: "Sepatu Pria",
          },
        },
      ],
      id: null,
      isAdded: false,
    };
  },
  computed: {
    ...mapGetters({ count: "getCount" }),
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