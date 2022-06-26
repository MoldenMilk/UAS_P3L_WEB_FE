<template>
    <v-main>
        <h3 class="text-h3" font-wight-medium mb-5>Daftar Mobil</h3>
        
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
            <v-data-table :headers="headers" :items="Mobil" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline ml-2 mt-2">{{ formtitle }} Daftar Mobil</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.Nama_Mobil" label="Nama Mobil" required></v-text-field>
                        <v-text-field v-model="form.Tipe_Mobil" label="Tipe Mobil" required></v-text-field>
                        <v-text-field v-model="form.Transmisi" label="Transmisi" required></v-text-field>
                        <v-text-field v-model="form.Plat_Nomor" label="Plat Nomor" required></v-text-field>
                        <v-text-field v-model="form.Warna_Mobil" label="Warna Mobil" required></v-text-field>
                        <v-text-field v-model="form.Kapasitas" label="Kapasitas" required></v-text-field>
                        <v-text-field v-model="form.Fasilitas" label="Fasilitas" required></v-text-field>
                        <v-text-field v-model="form.Tanggal_Servis" type=date label="Tanggal Servis" required></v-text-field>
                        <v-text-field v-model="form.Bahan_Bakar" label="Bahan Bakar" required></v-text-field>
                        <v-text-field v-model="form.Volume_Bahan_Bakar" label="Volume BBM" required></v-text-field>
                        <v-text-field v-model="form.Harga_Sewa" label="Harga Sewa" required></v-text-field>
                        <v-text-field v-model="form.No_STNK" label="No STNK" required></v-text-field>
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
                <v-card-text>Anda yakin ingin menghapus mobil ini?</v-card-text>
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
                    { text: "Nama Mobil", align: "start", sortable: true, value: "Nama_Mobil" },
                    { text: "Tipe Mobil", value: 'Tipe_Mobil' },
                    { text: "Transmisi", value: 'Transmisi' },
                    { text: "Plat Nomor", value: 'Plat_Nomor' },
                    { text: "Warna Mobil", value: 'Warna_Mobil' },
                    { text: "Kapasitas", value: 'Kapasitas' },
                    { text: "Fasilitas", value: 'Fasilitas' },
                    { text: "Tanggal Servis", value: 'Tanggal_Servis' },
                    { text: "Bahan Bakar", value: 'Bahan_Bakar' },
                    { text: "Volume BBM", value: 'Volume_Bahan_Bakar' },
                    { text: "Harga Sewa", value: 'Harga_Sewa' },
                    { text: "No_STNK", value: 'No_STNK' },
                    { text: "Actions", value:'actions' },
                ],
                mobil: new FormData,
                Mobil: [],
                form: {
                    Nama_Mobil: null,
                    Tipe_Mobil: null,
                    Transmisi: null,
                    Plat_Nomor: null,
                    Warna_Mobil: null,
                    Kapasitas: null,
                    Fasilitas: null,
                    Tanggal_Servis: null,
                    Bahan_Bakar: null,
                    Volume_Bahan_Bakar: null,
                    Harga_Sewa: null,
                    No_STNK: null,
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
                var url = this.$api + '/mobil';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Mobil = response.data.data;
                })
            },
            //SIMPAN
            save() {
                this.mobil.append('Nama_Mobil', this.form.Nama_Mobil);
                this.mobil.append('Tipe_Mobil', this.form.Tipe_Mobil);
                this.mobil.append('Transmisi', this.form.Transmisi);
                this.mobil.append('Plat_Nomor', this.form.Plat_Nomor);
                this.mobil.append('Warna_Mobil', this.form.Warna_Mobil);
                this.mobil.append('Kapasitas', this.form.Kapasitas);
                this.mobil.append('Fasilitas', this.form.Fasilitas);
                this.mobil.append('Tanggal_Servis', this.Tanggal_Servis);
                this.mobil.append('Bahan_Bakar', this.form.Bahan_Bakar);
                this.mobil.append('Volume_Bahan_Bakar', this.Volume_Bahan_Bakar);
                this.mobil.append('Harga_Sewa', this.form.Harga_Sewa);
                this.mobil.append('No_STNK', this.form.No_STNK);

                var url = this.$api + '/mobil/'
                this.load = true;
                this.$http.post(url, this.mobil, {
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
                    Nama_Mobil : this.form.Nama_Mobil,
                    Tipe_Mobil : this.form.Tipe_Mobil,
                    Transmisi : this.form.Transmisi,
                    Plat_Nomor : this.form.Plat_Nomor,
                    Warna_Mobil : this.form.Warna_Mobil,
                    Kapasitas : this.form.Kapasitas,
                    Fasilitas : this.form.Fasilitas,
                    Tanggal_Servis : this.Tanggal_Servis,
                    Bahan_Bakar : this.form.Bahan_Bakar,
                    Volume_Bahan_Bakar : this.Volume_Bahan_Bakar,
                    Harga_Sewa : this.form.Harga_Sewa,
                    No_STNK : this.form.No_STNK,
                };
                var url = this.$api + '/mobil/' + this.editId;
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
                var url = this.$api + '/mobil/' + this.deleteId;
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
                this.Nama_Mobil = item.Nama_Mobil,
                this.Tipe_Mobil = item.Tipe_Mobil,
                this.Transmisi = item.Transmisi,
                this.Plat_Nomor = item.Plat_Nomor,
                this.Warna_Mobil = item.Warna_Mobil,
                this.Kapasitas = item.Kapasitas,
                this.Fasilitas = item.Fasilitas,
                this.Tanggal_Servis = item.Tanggal_Servis,
                this.Bahan_Bakar = item.Bahan_Bakar,
                this.Volume_Bahan_Bakar = item.Volume_Bahan_Bakar,
                this.Harga_Sewa = item.Harga_Sewa,
                this.No_STNK = item.No_STNK,
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
                    Nama_Mobil: null,
                    Tipe_Mobil: null,
                    Transmisi: null,
                    Plat_Nomor: null,
                    Warna_Mobil: null,
                    Kapasitas: null,
                    Fasilitas: null,
                    Tanggal_Servis: null,
                    Bahan_Bakar: null,
                    Volume_Bahan_Bakar: null,
                    Harga_Sewa: null,
                    No_STNK: null,
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