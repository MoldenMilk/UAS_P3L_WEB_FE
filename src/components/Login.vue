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
            <span class="headline ml-2"><b>Login</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
              <v-text-field label="Password" v-model="password" type=password :rules="passwordRules" required></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <router-link :to="{ path: '/register' }" style="text-decoration: none">
              <v-btn class="mr-2 mb-2" color="#eda60e" text> Register </v-btn>
            </router-link>
            <v-btn color="#eda60e" class="text-white mb-2 mr-2" @click="login"> Login </v-btn>
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

.navbar-brand {
  color: white !important;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}


.backgroundhead {
  background-color: #F0F1F2;
}

.headline {
    font-family: 'Montserrat', sans-serif !important;
    color:#2F4858;
}

</style>

<script>
  export default {
    name: "Login",
    data() {
      return {
        load: false,
        snackbar: false,
        error_message: '',
        color: '',
        valid: false,
        password: '',
        passwordRules: [
          (v) => !!v || 'Password tidak boleh kosong !',
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail tidak boleh kosong !',
        ]
      };
    },
    methods: {
      // login() {
      //   if(this.$refs.form.validate()){
      //     this.load = true;
      //     this.$http
      //       .post(this.$api + "/login", {
      //         email: this.email,
      //         password: this.password,
      //       })
      //       .then((response)=> {
      //           if(this.email == "admin@gmail.com" && this.password == "admin"){
      //             this.clear();
      //             localStorage.setItem('token',response.data.access_token)
      //             localStorage.setItem("user", "admin");
      //             alert("Welcome Admin !");
      //             this.$router.push({
      //               name: "Admin",
      //             });
      //           } else if(this.email == "manager@gmail.com" && this.password == "manager"){
      //             this.clear();
      //             localStorage.setItem('token',response.data.access_token)
      //             localStorage.setItem("user", "manager");
      //             alert("Welcome Manager !");
      //             this.$router.push({
      //               name: "Manager",
      //             });
      //           } else {
      //             this.clear();
      //             localStorage.setItem('token',response.data.access_token)
      //             localStorage.setItem("user", "user");
      //             localStorage.setItem("Nama", response.data.user.Nama);
      //             localStorage.setItem("Alamat", response.data.user.Alamat);
      //             localStorage.setItem("Tanggal_lahir", response.data.user.Tanggal_lahir);
      //             localStorage.setItem("Jenis_kelamin", response.data.user.Jenis_Kelamin);
      //             localStorage.setItem("Email", response.data.user.email);
      //             localStorage.setItem("No_Telepon", response.data.user.No_Telepon);
      //             alert("Login Berhasil !");
      //             this.$router.push({
      //               name: "Home",
      //             });
      //           }
      //       })
      //       .catch((error) => {
      //         this.error_message = error.response.data.message;
      //         this.color = "red";
      //         this.snackbar = true;
      //         localStorage.removeItem("token");
      //         this.load = false;
      //       });
      //   }
      // },
      login() {
                if(this.$refs.form.validate()) {
                    //cek validasi data yang terkirim
                    this.load = true;
                    this.$http.post(this.$api + '/login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        //simpan data id user yang diinput
                        localStorage.setItem('id', response.data.user.id);
                        localStorage.setItem('token', response.data.access_token);
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.clear();
                        this.$router.push({
                            name: 'Home',
                        });
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        localStorage.removeItem('token');
                        this.load = false;
                    })
                }
            },
      clear(){
        this.$refs.form.reset();
      }
    }
  }
</script>