<template>
    <v-main>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-xxl"> 
                <router-link class="navbar-brand" :to="{ name: 'Home' }">
                Atma Jogja Rental Service
                </router-link>
                <div class="collapse navbar-collapse justify-content-end"></div>
            </div>
        </nav>

        <div class="container-fluid" style="margin-top: 150px; width:700px">
        <v-form v-model="valid" ref="form">
            <v-card persistent min-width="400px" elevation="8">
            <v-card-title class="backgroundhead">
                <span class="headline ml-2"><b>Profile Customer</b></span>
            </v-card-title>
            
                <v-card-text>
                    <v-container class="ml-2">
                    <v-text-field v-model="form.Nama" label="Nama"></v-text-field>
                    <v-text-field v-model="form.Alamat" label="Alamat"></v-text-field>
                    <v-text-field v-model="form.Tanggal_Lahir" type="date" label="Tanggal Lahir"></v-text-field>
                    <v-text-field v-model="form.Jenis_Kelamin" label="Jenis Kelamin"></v-text-field>
                    <v-text-field v-model="form.Email" label="Email"></v-text-field>
                    <v-text-field v-model="form.No_Telepon" label="No Telepon"></v-text-field>
                    </v-container>
                </v-card-text>
            
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#eda60e" text @click="clear">CLEAR</v-btn>
                <v-btn color="#eda60e" class="text-white mr-3" @click="edit"> SUBMIT </v-btn>
            </v-card-actions>
            <v-card-actions>
                <v-spacer></v-spacer>
            </v-card-actions>
            </v-card>
        </v-form>
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

.nav-link {
  color: white !important;
  font-family: 'Montserrat', sans-serif;
}

</style>

<script>
    export default {
        name: "EditProfile",
        data(){
            return{
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                user: new FormData,
                form: {
                     Nama:null, 
                     Alamat: null, 
                     Tanggal_Lahir: null,
                     Jenis_Kelamin: null,
                     Email: null,
                     No_Telepon: null,
                },
            };
        },
        methods: {
            isiField() {
                this.form.Nama = localStorage.getItem("Nama");
                this.form.Alamat = localStorage.getItem("Alamat");
                this.form.Tanggal_Lahir = localStorage.getItem("Tanggal_Lahir");
                this.form.Jenis_Kelamin = localStorage.getItem("Jenis_Kelamin");
                this.form.Email = localStorage.getItem("Email");
                this.form.No_Telepon = localStorage.getItem("No_Telepon");
            },
            edit() {
                let newData= {
                    Nama: this.Nama,
                    Alamat: this.Alamat,
                    Tanggal_Lahir: this.Tanggal_Lahir,
                    Jenis_Kelamin: this.Jenis_Kelamin,
                    Email: this.Email,
                    No_Telepon: this.No_Telepon
                };
                var url = this.$api + '/customer/' + localStorage.getItem("id");
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token") 
                    }
                }).then(response =>{
                    this.error_message = response.data.message;
                    this.load = false;
                    localStorage.setItem("Nama", this.form.Nama);
                    localStorage.setItem("Alamat", this.form.Alamat);
                    localStorage.setItem("Tanggal_Lahir", this.Tanggal_Lahir);
                    localStorage.setItem("Jenis_kelamin", this.form.Jenis_Kelamin);
                    localStorage.setItem("Email", this.form.Email);
                    localStorage.setItem("No_Telepon", this.form.No_Telepon);
                    alert('Edit Profile Berhasil !');
                    this.$router.push({
                        name: "Beranda",
                    });
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            clear() {
                this.form = {
                    Nama: null,
                    Alamat: null,
                    Tanggal_Lahir: null,
                    Jenis_Kelamin: null,
                    Email: null,
                    No_Telepon: null
                };
            },
        },
        created(){
            this.isiField();
        },
    }
</script>