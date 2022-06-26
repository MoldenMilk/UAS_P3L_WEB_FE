<template>
    <v-main>
        <h3 class="text-h3" font-wight-medium mb-5>Jadwal Pegawai</h3>
        
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
            <v-data-table :headers="headers" :items="Jadwal" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">edit</v-btn>
                    <v-btn small @click="deleteHandler(item.id)">delete</v-btn>
                </template>
            </v-data-table>
        </v-card>
        
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card style="width: 600px">
                <v-card-title>
                    <span class="headline ml-2 mt-2">{{ formtitle }} Jadwal Pegawai</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field v-model="form.Nama" label="Nama Pegawai" required></v-text-field>
                        <v-text-field v-model="form.Shift" label="Shift" required></v-text-field>
                        <v-text-field v-model="form.Hari" label="Hari" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn class="ml-5 mb-3" color="#ce453d" text @click="cancel">Cancel</v-btn>
                    <v-btn class="mb-3" color="#ce453d" text @click="setForm">Save</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="1000px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning !</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus jadwal ini ?</v-card-text>
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
                    { text: "Nama Pegawai", align: "start", sortable: true, value: "Nama" },
                    { text: "Shift", value: 'Shift' },
                    { text: "Hari", value: 'Hari' },
                    { text: "Actions", value:'actions' },
                ],
                jadwal: new FormData,
                Jadwal: [],
                form: {
                    Nama: null,
                    Shift: null,
                    Hari : null,
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
                var url = this.$api + '/jadwal';
                this.$http.get(url, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.Jadwal = response.data.data;
                })
            },
            //SIMPAN
            save() {
                this.jadwal.append('Nama', this.form.Nama);
                this.jadwal.append('Shift', this.form.Shift);
                this.jadwal.append('Hari', this.form.Hari);

                var url = this.$api + '/jadwal/'
                this.load = true;
                this.$http.post(url, this.jadwal, {
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
                    Shift : this.form.Shift,
                    Hari : this.form.Hari,
                };
                var url = this.$api + '/jadwal/' + this.editId;
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
                var url = this.$api + '/jadwal/' + this.deleteId;
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
                this.form.Nama = item.Nama;
                this.form.Shift = item.Shift;
                this.form.Hari = item.Hari;
                this.dialog = true;
            },
            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = 'Tambah';
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
                    Shift: null,
                    Hari : null,
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