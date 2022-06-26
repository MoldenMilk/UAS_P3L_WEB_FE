<template>
    <v-main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-xxl"> 
        <router-link class="navbar-brand" :to="{ name: 'Home' }">
          Atma Jogja Rental Service
        </router-link>
      </div>
    </nav>

    <div class="container-fluid" style="margin-top: 250px; width:450px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline ml-2"><b>Pesan Mobil</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-select
                v-model="customer"
                item-text="Nama"
                item-value="id_customer"
                :items="Customer"
                label="ID Customer"
                required></v-select>
                <v-text-field label="Tanggal Mulai" v-model="form.tgl_mulai" type="date" required></v-text-field>
                <v-text-field label="Tanggal Selesai" v-model="form.tgl_selesai" type="date" required></v-text-field>
                <v-select
                    v-model="mobil"
                    item-text="Nama_Mobil"
                    item-value="id_mobil"
                    :items="Mobil"
                    label="Nama Mobil"
                    required
                ></v-select>
                <v-select
                    v-model="promo"
                    item-text="kodePromo"
                    item-value="id_promo"
                    :items="Promo"
                    label="Promo"
                ></v-select>
                <v-select
                    v-model="driver"
                    item-text="Nama"
                    item-value="id_driver"
                    :items="Driver"
                    label="Driver"
                ></v-select>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="{ name: 'Home' }">
                <v-btn class="ml-5 mb-3" color="#ce453d" text @click="cancel">Cancel</v-btn>
            </router-link>
            <v-btn class="mb-3" color="#ce453d" text @click="pesan">Pesan</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }} </v-snackbar>
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
        name: "List",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                dialog: false,
                dialogConfirm: false,
                transaksi: new FormData,
                Transaksi: [],
                form: {
                    customer: null,
                    tgl_mulai: null,
                    tgl_selesai: null,
                    mobil: null,
                    promo: null,
                    driver: null,
                    status: 0,
                    id_pegawai: 7,
                },
                Customer:[],
                customer:null,
                Mobil: [],
                mobil: null,
                Promo: [],
                promo: null,
                Driver: [],
                driver: null,
            };
        },
        methods: {
            // isiField(){
            //     this.form.Nama = localStorage.getItem("Nama");
            // },
            //READ ID CUSTOMER
            readDataCustomer() {
                var url = this.$api + '/customer';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Customer = response.data.data;
                })
            },  
            //READ MOBIL
            readDataMobil() {
                var url = this.$api + '/mobil';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Mobil = response.data.data;
                })
            },
            //READ PROMO
            readDataPromo() {
                var url = this.$api + '/promo';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Promo = response.data.data;
                })
            },
            //READ DRIVER
            readDataDriver() {
                var url = this.$api + '/driver';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Driver = response.data.data;
                })
            },
            //ORDER
            pesan(){
                this.transaksi.append('id_customer', this.customer)
                this.transaksi.append('tgl_mulai', this.form.tgl_mulai);
                this.transaksi.append('tgl_selesai', this.form.tgl_selesai);
                this.transaksi.append('id_pegawai', this.form.id_pegawai);
                if(this.mobil == null){
                    this.error_message = "Harus Pilih Mobil";
                    this.color = "red";
                    this.snackbar = true;
                }else{
                    this.transaksi.append('id_mobil', this.mobil);
                    if(this.promo == null){
                        this.transaksi.append('id_Promo', "-");
                    }else{
                        this.transaksi.append('id_Promo', this.promo);
                        if(this.driver == null){
                            this.transaksi.append('id_driver', "-");
                            this.transaksi.append('status', this.form.status);
                        }else{
                            this.transaksi.append('id_driver', this.driver);
                            this.transaksi.append('status', this.form.status);
                        }
                    }

                    var url = this.$api + '/addTransaksi'
                    this.load = true;
                    this.$http.post(url, this.transaksi, {
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.load = true;
                        alert('Pesanan Berhasil Dibuat');
                        this.resetForm();
                        this.$router.push({
                            name: "Home",
                        });
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
                }
            },
            cancel() {
                this.readDataCustomer();
                this.readDataMobil();
                this.readDataPromo();
                this.readDataDriver();
                this.resetForm();
                this.dialog = false;
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    customer: null,
                    tgl_mulai: null,
                    tgl_selesai: null,
                    mobil: null,
                    promo: null,
                    driver: null,
                    status: 0,
                };
            },
        },  
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            if(localStorage.getItem("token")==null){
                this.$router.push({
                    name: "Home",
                });
                alert("Login Terlebih Dahulu");
            }else{
                // this.isiField();
                this.readDataCustomer();
                this.readDataMobil();
                this.readDataPromo();
                this.readDataDriver();
            }
        },
    }
</script>