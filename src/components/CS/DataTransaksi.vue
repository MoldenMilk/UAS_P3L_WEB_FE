<template>
    <v-main>
        <h3 class="text-h3" font-wight-medium mb-5>Daftar Transaksi</h3>
        
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
            <v-data-table :headers="headers" :items="tempTransaksi" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline ml-2 mt-2">{{ formtitle }} Transaksi</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.id_customer" label="ID Customer" disabled></v-text-field>
                        <v-text-field v-model="form.tgl_mulai" label="Tanggal Mulai" disabled></v-text-field>
                        <v-text-field v-model="form.tgl_selesai" label="Tanggal Selesai" disabled></v-text-field>
                        <v-text-field v-model="form.durasi" label="Durasi Sewa" disabled></v-text-field>
                        <v-text-field v-model="form.Nama_Mobil" label="Mobil" disabled></v-text-field>
                        <v-text-field v-model="form.kodePromo" label="Promo" disabled></v-text-field>
                        <v-text-field v-model="form.Nama" label="Driver" disabled></v-text-field>
                        <v-select
                            v-model="status"
                            :items="namaStatus"
                            label="Status"
                            required
                            @change="getStatus"
                        ></v-select>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn class="ml-5 mb-3" color="#ce453d" text @click="cancel">Cancel</v-btn>
                    <v-btn class="mb-3" color="#ce453d" text @click="update">Save</v-btn>
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
                namaStatus: ['Belum Ada Status', 'Belum Verif', 'Sudah Verif'],
                headers: [
                    { text: "ID Customer", align: "start", sortable: true, value: "id_customer" },
                    { text: "Tanggal Mulai", value: 'tgl_mulai' },
                    { text: "Tanggal Selesai", value: 'tgl_selesai' },
                    { text: "Durasi Sewa", value: 'durasi' },
                    { text: "Mobil", value: 'Nama_Mobil' },
                    { text: "Promo", value: 'kodePromo' },
                    { text: "Driver", value:'Nama' },
                    { text: "Status", value:'status' },
                    { text: "Actions", value:'actions'},
                ],
                transkasi: new FormData,
                Transaksi: new Array(),
                tempTransaksi: new Array(),
                tempStatus: null,
                form: {
                    id_customer: null,
                    tgl_mulai: null,
                    tgl_selesai: null,
                    durasi: null,
                    Nama_Mobil: null,
                    kodePromo: null,
                    Nama: null,
                    status: null,
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
                var url = this.$api + '/showTransaksi';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Transaksi = response.data.data;
                    this.bacaStatus(this.Transaksi);
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
            //SIMPAN
            save() {
                this.transkasi.append('id_customer', this.form.id_customer);
                this.transkasi.append('tgl_mulai', this.form.tgl_mulai);
                this.transkasi.append('tgl_selesai', this.form.tgl_selesai);
                this.transkasi.append('durasi', this.form.durasi);
                this.transkasi.append('Nama_Mobil', this.form.Nama_Mobil);
                this.transkasi.append('kodePromo', this.form.kodePromo);
                this.transkasi.append('Nama', this.form.Nama);
                this.transkasi.append('status', this.form.status);

                var url = this.$api + '/addTransaksi/'
                this.load = true;
                this.$http.post(url, this.transkasi, {
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
                    // id_customer : this.form.id_customer,
                    // tgl_mulai : this.form.tgl_mulai,
                    // tgl_selesai : this.form.tgl_selesai,
                    // Nama_Mobil : this.form.Nama_Mobil,
                    // kodePromo : this.form.kodePromo,
                    // Nama : this.form.Nama,
                    status : this.tempStatus,
                };
                var url = this.$api + '/updateStatus/' + this.editId;
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

            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.id_customer = item.id_customer;
                this.form.tgl_mulai = item.tgl_mulai;
                this.form.tgl_selesai = item.tgl_selesai;
                this.form.durasi = item.durasi;
                this.form.Nama_Mobil = item.Nama_Mobil;
                this.form.kodePromo = item.kodePromo;
                this.form.Nama = item.Nama;
                this.status = item.status;
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
                this.dialog = false;
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    id_customer: null,
                    tgl_mulai: null,
                    tgl_selesai: null,
                    durasi: null,
                    Nama_Mobil: null,
                    kodePromo: null,
                    Nama: null,
                    status: null,
                };
            },
            getStatus(){
                if(this.status == "Belum Ada Status"){
                    this.tempStatus = 0;
                } else if(this.status == "Belum Verif"){
                    this.tempStatus = 1;
                } else if(this.status == "Sudah Verif"){
                    this.tempStatus = 2;
                }
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