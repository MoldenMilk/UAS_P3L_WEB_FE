<template>
    <v-main>
        <h3 class="text-h3" font-wight-medium mb-5>Data Mitra</h3>
        
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
            <v-data-table :headers="headers" :items="Mitra" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline ml-2 mt-2">{{ formtitle }} Daftar Mitra</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.Nama" label="Nama" required></v-text-field>
                        <v-text-field v-model="form.Alamat" label="Alamat" required></v-text-field>
                        <v-text-field v-model="form.No_Telepon" label="No Telepon" required></v-text-field>
                        <v-text-field v-model="form.KTP" label="KTP" required></v-text-field>
                        <v-text-field v-model="form.Kontrak_Mulai" type=date label="Kontrak Mulai" required></v-text-field>
                        <v-text-field v-model="form.Kontrak_Selesai" type=date label="Kontrak Selesai" required></v-text-field>
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
                <v-card-text>Anda yakin ingin menghapus mitra ini?</v-card-text>
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
                    { text: "Alamat", value: 'Alamat' },
                    { text: "No Telepon", value: 'No_Telepon' },
                    { text: "KTP", value: 'KTP' },
                    { text: "Kontrak Mulai", value: 'Kontrak_Mulai' },
                    { text: "Kontrak Selesai", value: 'Kontrak_Selesai' },
                    { text: "Actions", value:'actions' },
                ],
                mitra: new FormData,
                Mitra: [],
                form: {
                    Nama: null,
                    Alamat: null,
                    No_Telepon: null,
                    KTP: null,
                    Kontrak_Mulai: null,
                    Kontrak_Selesai: null,
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
                var url = this.$api + '/mitra';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Mitra = response.data.data;
                })
            },
            //SIMPAN
            save() {
                this.mitra.append('Nama', this.form.Nama);
                this.mitra.append('Alamat', this.form.Alamat);
                this.mitra.append('No_Telepon', this.form.No_Telepon);
                this.mitra.append('KTP', this.form.KTP);
                this.mitra.append('Kontrak_Mulai', this.form.Kontrak_Mulai);
                this.mitra.append('Kontrak_Selesai', this.form.Kontrak_Selesai);

                var url = this.$api + '/mitra/'
                this.load = true;
                this.$http.post(url, this.mitra, {
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
                    Alamat : this.form.Alamat,
                    No_Telepon : this.form.No_Telepon,
                    KTP : this.form.KTP,
                    Kontrak_Mulai : this.form.Kontrak_Mulai,
                    Kontrak_Selesai : this.form.Kontrak_Selesai,
                };
                var url = this.$api + '/mitra/' + this.editId;
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
                var url = this.$api + '/mitra/' + this.deleteId;
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
                this.Alamat = item.Alamat,
                this.No_Telepon = item.No_Telepon,
                this.KTP = item.KTP,
                this.Kontrak_Mulai = item.Kontrak_Mulai,
                this.Kontrak_Selesai = item.Kontrak_Selesai,
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
                    Alamat: null,
                    No_Telepon: null,
                    KTP: null,
                    Kontrak_Mulai: null,
                    Kontrak_Selesai: null,
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