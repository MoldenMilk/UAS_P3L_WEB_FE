<template>
<v-main>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-xxl">
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          Atma Jogja Rental Service
        </router-link>
        <div
          class="collapse navbar-collapse justify-content-end"
        >
          <div class="navbar-nav">
            <a class="nav-link" href="#home">HOME</a>
            <a class="nav-link" href="#brosur">BROSUR</a>
            <a class="nav-link" href="#pesan">ORDER</a>
            <a class="nav-link" href="#promo">PROMO</a>
            <a class="nav-link" href="#about">ABOUT</a>
            <router-link class="nav-link" :to="{ path: '/login'}">
              {{txtLogin}}
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid" id="home">
      <h1 id="taglineText">!!! ATMA JOGJA RENTAL !!!</h1>
      <div class="row justify-content-center">
        <img src="../assets/LogoAjr.png" alt="Gambar Beranda" style="width: 700px" />
      </div>
    </div>

    <div class="container-fluid mt-10 mb-10" style="width: 1000px" id="brosur">
      <h2 id="subJudul">Mobil-Mobil Tersedia<br>Harga Untuk Setiap Mobil Berbeda</h2>
      <div class="row justify-content-center mb-5" >
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div class="row justify-content-center btn" style="width: 1000px" id="pesan">
            <router-link :to="{ name: 'TrackOrder' }">
                <v-btn block color="#245399" class="text-white mr-3"> CEK PESANAN </v-btn>
            </router-link>
            <router-link :to="{ name: 'OrderMobil' }">
                <v-btn block color="#245399" class="text-white mr-3"> PESAN MOBIL </v-btn>
            </router-link>
      </div>
    </div>

    <div class="container-fluid" style="width: 1000px" id="promo">
      <h2 id="subJudul">Promo Berlangsung</h2>
      <div class="row justify-content-center mb-5">
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headers" :items="Promo" :search="search">
            </v-data-table>
        </v-card>
      </div>
    </div>

    <div class="container-fluid" style="width: 1000px" id="about">
          <div class="row justify-content-center">
            <div class="row justify-content-center m-2" style="text-align: justify">
              <h2 id="subJudul">
                Tentang Atma Jogja Rental :
              </h2>
                <h4>
                  <p>
                    Sebuah badan usaha yang menyediakan jasa penyewaan kendaraan
                    mobil yang berada di Kota Yogyakarta.
                  </p>
                </h4>
                <h4>
                  <p>
                    Atma Jogja Rental menyediakan mobil dengan 
                    berbagai merk yang ada di Indonesia.
                  </p>
                </h4>
                <h4>
                  <p>
                    Selain menyewakan mobil, Atma Jogja Rental juga 
                    menyediakan jasa driver untuk mengantar customer 
                    selama menyewa mobil di Yogyakarta.
                  </p>
                </h4>
                <h4>
                  <p>
                    AJR baru berdiri selama dua tahun yaitu sejak
                    19 Februari 2019 di Yogyakarta.
                  </p>
                </h4>
                <h6>
                  <p>
                    Email : AtmaJogjaRental@gmail.com | Phone : (021) 19181945 | Address
                    : Jl.Merdeka Raya No.45, Kota Rahasia, Indonesia
                  </p>
                </h6>
            </div>
          </div>
        </div>

    <footer class="text-center text-white" style="background-color: #eda60e">
          <!-- Grid container -->
          <div class="container p-4"></div>
          <!-- Grid container -->

          <!-- Copyright -->
          <div class="text-center p-3" style="background-color: #eda60e">
            © 2021 Copyright:
            <a class="text-white" href="#">Atma Jogja Rental</a>
          </div>
          <!-- Copyright -->
    </footer>
</v-main>
</template>

<style scoped>

.navbar {
  background-color: #eda60e !important;
  height: 80px;
}

.nav-link {
  color: white !important;
  font-family: 'Montserrat', sans-serif;
}

.navbar-brand {
  color: white !important;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}

h1 {
  color: #eda60e;
  font-weight: bold;
}

#txtBtn {
  font-family: 'Montserrat', sans-serif;
}

#taglineText {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  color: #eda60e;
  text-align: center;
  margin: 20px;
}

#subJudul {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  color: #eda60e;
  text-align: left;
  margin-bottom: 20px;
}
</style>

<script>
  export default {
    name: "Home",
    data () {
      return {
        Promo: [],
        search: null,
        txtLogin: "",
        items: [
          {
            src: 'http://images.summitmedia-digital.com/topgear/images/2021/02/23/toyota-vios-gr-s-ph-arrival-1614062835.jpg',
          },
          {
            src: 'http://www.carwriteups.co.uk/wp-content/uploads/2012/11/New-Honda-Civic-Front-Three-Quarter-View.jpg',
          },
          {
            src: 'https://s3.amazonaws.com/carmudi-blogs/carmudi-id/wp-content/uploads/2020/03/19165701/Foto-6.jpg',
          },
          {
            src: 'https://www.carblogindia.com/wp-content/uploads/2016/10/new-2016-honda-brio-facelift-official-images-colours-urban-titanium.jpg',
          },
          {
            src: 'https://img.cintamobil.com/2019/10/15/KM1pHMws/all-new-toyota-rush-g-2019-4-baa0.jpeg',
          },
          {
            src: 'https://techvorm.com/wp-content/uploads/2021/01/The-new-Fortuner-scaled.jpg',
          },
          {
            src: 'https://images.summitmedia-digital.com/topgear/images/2019/05/14/2019-toyota-avanza-main-temp-1557805092.jpg',
          },
          {
            src: 'https://www.autofreaks.com/wp-content/uploads/2016/04/2016_Toyota_Alphard-5.jpg',
          },
        ],
        headers: [
          { text: "Kode Promo", align: "start", sortable: true, value: "kodePromo" },
          { text: "Nama Promo", value: 'namaPromo' },
          { text: "Keterangan", value: 'keteranganPromo' },
        ],
      }
    },
    methods: {
      cekLogin() {
        if (localStorage.getItem("token") == null) {
          this.txtLogin = "LOGIN";
          return 'guest';
        } else if (localStorage.getItem("token")!=null) {
          this.txtLogin = "Hi, " + localStorage.getItem("Nama");
          return 'customers';
        }
      },
      //READ PROMO
      readData() {
        var url = this.$api + '/promo';
        this.$http.get(url, {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {
          this.Promo = response.data.data;
        })
      },
    },
    created() {
      this.cekLogin();
    },
    mounted() {
            this.readData();
        },
  };
</script>