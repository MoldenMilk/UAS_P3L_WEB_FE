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
            <div>
              <a class="nav-link" @click="logout">LOGOUT</a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid" style="margin-top: 150px; width:700px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline ml-2"><b>Profile Customer</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="Nama" label="Nama" disabled></v-text-field>
              <v-text-field v-model="Alamat" label="Alamat Lengkap" disabled></v-text-field>
              <v-text-field v-model="Tanggal_Lahir" label="Tanggal Lahir" disabled></v-text-field>
              <v-text-field v-model="Jenis_Kelamin" label="Jenis Kelamin" disabled></v-text-field>
              <v-text-field v-model="Email" label="E-mail" disabled></v-text-field>
              <v-text-field v-model="No_Telepon" label="Nomor Telepon" disabled></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="#eda60e" class="text-white mr-3" @click="deleteHandler()"> DELETE </v-btn> -->
            <router-link :to="{ name: 'EditProfile' }">
                <v-btn color="#eda60e" class="text-white mr-3"> EDIT </v-btn>
            </router-link>
          </v-card-actions>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>

    <!-- <v-dialog v-model="dialogConfirm" persistent max-width="400px">
        <v-card>
            <v-card-title>
                <span class="headline">Warning !</span>
            </v-card-title>
            <v-card-text> Anda yakin ingin menghapus akun ini ? </v-card-text>
            <v-card-action>
                <v-spacer></v-spacer>  
                <v-btn class="mb-2 ml-2" color="#eda60e" text @click="dialogConfirm= false">Cancel</v-btn>
                <v-btn class="mb-2" color="#eda60e" text @click="hapusAkun">Delete</v-btn>
            </v-card-action>
        </v-card>
    </v-dialog>  -->

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }} </v-snackbar> 
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
        name: "Profile",
        data(){
            return{
                load: false,
                snackbar:false,
                error_message: '',
                color: '',
                dialogConfirm:false,
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
            logout() {
                var url = this.$api + "/logout";
                this.load = true;
                this.$http
                    .get(url, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) =>{
                        this.error_message = response.data.message;
                        this.load = false;
                        alert("Logout Berhasil !");
                        localStorage.removeItem("id");
                        localStorage.removeItem("token");
                        localStorage.removeItem("customer");
                        localStorage.removeItem("Nama");
                        localStorage.removeItem("Alamat");
                        localStorage.removeItem("Tanggal_Lahir");
                        localStorage.removeItem("Jenis_Kelamin");
                        localStorage.removeItem("Email");
                        localStorage.removeItem("No_Telepon");
                        this.$router.push({
                            name: "Home",
                        });
                    })
                    .catch((error) => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    });
                },
            // hapusAkun() {
            //     var url = this.$api + '/user/' + this.deleteId;
            //     this.load = true;
            //     this.$http.delete(url,{
            //         headers: {
            //             'Authorization' : 'Bearer ' + localStorage.getItem('token')
            //         }
            //     }).then(response => {
            //         this.error_message = response.data.message;
            //         this.load = false;
            //         localStorage.removeItem("id");
            //         localStorage.removeItem("token");
            //         localStorage.removeItem("user");
            //         localStorage.removeItem("alamat");
            //         localStorage.removeItem("nama");
            //         localStorage.removeItem("notelp");
            //         this.dialogConfirm = false;
            //         this.$router.push({
            //             name: "Beranda",
            //         });
            //         alert("Akun Berhasil Dihapus !");
                    
            //     }).catch(error => {
            //         this.error_message = error.response.data.message;
            //         this.color = "red";
            //         this.snackbar = true;
            //         this.load = false;
            //     });
            // },
            deleteHandler(){
                this.deleteId = localStorage.getItem("id");
                this.dialogConfirm = true;
            },
        },
        created() {
        this.isiField();
        },
    };
</script>