<template>
    <v-main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-xxl"> 
            <router-link class="navbar-brand" :to="{ name: 'Home' }">
            Atma Jogja Rental Service
        </router-link>
        </div>
    </nav>

    <div class="container-fluid" style="margin-top: 150px; width:700px">
      <v-form v-model="valid" ref="form">
        <v-card persistent min-width="400px" elevation="8">
          <v-card-title class="backgroundhead">
            <span class="headline ml-2"><b>Register</b></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field v-model="Nama" label="Nama" :rules="namaRules" required></v-text-field>
              <v-text-field v-model="password" label="Password" :rules="passwordRules" type="password" required></v-text-field>
              <v-text-field v-model="Alamat" label="Alamat Lengkap" :rules="alamatRules" required></v-text-field>
              <v-text-field v-model="Tanggal_Lahir" label="Tanggal Lahir" :rules="tanggalRules" type="date" required></v-text-field>
              <v-text-field v-model="Jenis_Kelamin" label="Jenis Kelamin" :rules="kelaminRules" required></v-text-field>
              <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
              <v-text-field v-model="SIM" label="SIM"></v-text-field>
              <v-text-field v-model="KTP" label="KTP"></v-text-field>
              <v-text-field v-model="No_Telepon" label="Nomor Telepon" :rules="notelpRules" required></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn block color="#eda60e" class="text-white mb-2" @click="submit"> Register </v-btn>
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
  name: "Register",
  data() {
    return {
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      valid: false,
      Nama: "",
      namaRules: [(v) => !!v || "Nama Tidak Boleh Kosong !"],
      password: "",
      passwordRules: [(v) => !!v || "Password Tidak Boleh Kosong !"],
      Alamat: "",
      alamatRules: [(v) => !!v || "Alamat Tidak Boleh Kosong !"],
      Tanggal_Lahir: "",
      tanggalRules: [(v) => !!v || "Tanggal Lahir Tidak Boleh Kosong !"],
      Jenis_Kelamin: "",
      kelaminlRules: [(v) => !!v || "Jenis Kelamin Tidak Boleh Kosong !"],
      email: "",
      emailRules: [(v) => !!v || "E-mail Tidak Boleh Kosong !"],
      No_Telepon: "",
      notelpRules: [(v) => !!v || "No Telp Tidak Boleh Kosong !"],
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()){
        this.load = true;
        this.$http
          .post(this.$api + "/register", {
            Nama: this.Nama,
            password: this.password,
            Alamat: this.Alamat,
            Tanggal_Lahir: this.Tanggal_Lahir,
            Jenis_Kelamin: this.Jenis_Kelamin,
            email: this.email,
            SIM: this.SIM,
            KTP: this.KTP,
            No_Telepon: this.No_Telepon
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.load = false;
            localStorage.setItem("id", response.data.user.id);
            this.clear();
            alert("Registrasi Berhasil !");
            this.$router.push({
              path: "/login",
            });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            localStorage.removeItem("token");
            this.load = false;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>