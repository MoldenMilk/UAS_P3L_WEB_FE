<template>
    <v-main>
        <h3 class="text-h3" font-wight-medium mb-5>Driver</h3>
        
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
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="Driver" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline ml-2 mt-2">{{ formtitle }} Daftar Driver</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.Nama" label="Nama" required></v-text-field>
                        <v-text-field v-model="form.Email" label="Email" required></v-text-field>
                        <v-text-field v-model="form.Password" type=password label="Password" required></v-text-field>
                        <v-text-field v-model="form.Tanggal_Lahir" type=date label="Tanggal Lahir" required></v-text-field>
                        <v-text-field v-model="form.Alamat" label="Alamat" required></v-text-field>
                        <v-text-field v-model="form.Jenis_Kelamin" label="Jenis Kelamin" required></v-text-field>
                        <v-text-field v-model="form.No_Telepon" label="No Telepon" required></v-text-field>
                        <v-text-field v-model="form.Bahasa" label="Bahasa" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn class="ml-5 mb-3" color="#ce453d" text @click="cancel">Cancel</v-btn>
                    <v-btn class="mb-3" color="#ce453d" text @click="setForm">Save</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline">Warning!</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus driver ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn class="ml-2 mb-3" color="#ce453d" text @click="dialogConfirm = false">Cancel</v-btn>
                    <v-btn class="mb-3" color="#ce453d" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
    </v-main>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                headers: [
                    { text: "Nama", align: "start", sortable: true, value: "Nama" },
                    { text: "Email", value: 'Email' },
                    // { text: "Password", value: 'Password' },
                    { text: "Tanggal Lahir", value: 'Tanggal_Lahir' },
                    { text: "Alamat", value: 'Alamat' },
                    { text: "Jenis Kelamin", value: 'Jenis_Kelamin' },
                    { text: "No Telepon", value: 'No_Telepon' },
                    { text: "Bahasa", value: 'Bahasa' },
                    { text: "Actions", value:'actions' },
                ],
                driver: new FormData,
                Driver: [],
                form: {
                    Nama: null,
                    Email: null,
                    Password: null,
                    Tanggal_Lahir: null,
                    Alamat: null,
                    Jenis_Kelamin: null,
                    No_Telepon: null,
                    Bahasa: null,
                },
                deleteId: '',
                editId: ''
            };
        },

        methods: {
            setForm(){
                if(this.inputType !== 'Tambah'){
                    this.update();
                }else{
                    this.save();
                }
            },
            //READ
            readData() {
                var url = this.$api + '/driver';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Driver = response.data.data;
                })
            },
            //SIMPAN
            save() {
                this.driver.append('Nama', this.form.Nama);
                this.driver.append('Email', this.form.Email);
                this.driver.append('Password', this.form.Password);
                this.driver.append('Tanggal_Lahir', this.form.Tanggal_Lahir);
                this.driver.append('Alamat', this.form.Alamat);
                this.driver.append('Jenis_Kelamin', this.form.Jenis_Kelamin);
                this.driver.append('No_Telepon', this.form.No_Telepon);
                this.driver.append('Bahasa', this.form.Bahasa);

                var url = this.$api + '/driver/'
                this.load = true;
                this.$http.post(url, this.driver, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = true;
                this.close();
                this.readData();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
            },
            //UPDATE
            update() {
                let newData = {
                    Nama : this.form.Nama,
                    Email : this.form.Email,
                    Password: this.form.Password,
                    Tanggal_Lahir : this.form.Tanggal_Lahir,
                    Alamat : this.form.Alamat,
                    Jenis_Kelamin : this.form.Jenis_Kelamin,
                    No_Telepon : this.form.No_Telepon,
                    Bahasa : this.form.Bahasa,
                };
                var url = this.$api + '/driver/' + this.editId;
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = 'Tambah';
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
            },
            //HAPUS
            deleteData() {
                var url = this.$api + '/driver/' + this.deleteId;
                this.load = true;
                this.$http.delete(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green";
                this.snackbar = true;
                this.load = false;
                this.close();
                this.readData();
                this.resetForm();
                this.inputType = "Tambah";
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
            },
            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.Nama = item.Nama,
                this.Email = item.Email,
                this.Password = item.Password,
                this.Tanggal_Lahir = item.Tanggal_Lahir,
                this.Alamat = item.Alamat,
                this.Jenis_Kelamin = item.Jenis_Kelamin,
                this.No_Telepon = item.No_Telepon,
                this.Bahasa = item.Bahasa,
                this.dialog = true;
            },
            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = 'Tambah';
                this.dialogConfirm = false;
                this.readData();
            },
            cancel() {
                this.readData();
                this.resetForm();
                this.dialog = false;
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    Nama: null,
                    Email: null,
                    Password: null,
                    Tanggal_Lahir: null,
                    Alamat: null,
                    Jenis_Kelamin: null,
                    No_Telepon: null,
                    Bahasa: null,
                };
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
        },
    };
</script>