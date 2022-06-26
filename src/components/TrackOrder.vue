<template>
    <v-main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-xxl"> 
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          Atma Jogja Rental Service
        </router-link>
      </div>
    </nav>

    <div class="container-fluid mt-10" style="width: 1300px">
        <div class="row justify-content-center">
            <v-card class="justify-content-center">
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
            
            <v-data-table :headers="headers" :items="tempTransaksi" :search="search">
            </v-data-table>
            </v-card>
        </div>
    </div>

    </v-main>
</template>

<style scoped>

.navbar {
  background-color: #eda60e !important;
  height: 80px;
}

.navbar-brand {
  color: white !important;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}

</style>

<script>
    export default {
        name: "TrackOrder",
        data() {
            return {
                search: null,
                headers: [
                    { text: "Nama", align:"start", sortable: true, value: "Nama"},
                    { text: "Tanggal Mulai", value: "tgl_mulai"},
                    { text: "Tanggal Selesai", value: "tgl_selesai"},
                    { text: "Mobil", value: "mobil"},
                    { text: "Promo", value: "promo"},
                    { text: "Driver", value: "driver"},
                    { text: "Status", value: "status" },
                ],
                transaksi: new Array(),
                tempTransaksi: new Array(),
            };
        },
        methods: {
            readData(){
                var url = this.$api +'/showTransaksi';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.transaksi = response.data.data;
                    this.bacaStatus(this.transaksi);
                })
            },
            bacaStatus(transaksi) {
                this.tempTransaksi = transaksi;
                for (var i = 0; i < transaksi.length; i++) {

                    if(transaksi[i].status == 0){
                        this.tempTransaksi[i].status = "Belum Ada Status";
                    } else if (transaksi[i].status == 1) {
                        this.tempTransaksi[i].status = "Belum Verif";
                    } else if (transaksi[i].status == 2) {
                        this.tempTransaksi[i].status = "Sudah Verif";
                    }
                }
            },
        },
        mounted() {
            if(localStorage.getItem("token")==null){
                this.$router.push({
                    name: "Home",
                });
                alert("Login Terlebih Dahulu");
            } else {
                this.readData();
            }
        }
    }
</script>