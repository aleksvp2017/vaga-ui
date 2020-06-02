<template>
    <v-container>
        <v-row>
            <v-col>
                <v-form ref="form">
                    <v-text-field 
                    label="Nome"
                    v-model="usuario.nome"
                    :rules="regrasNome"
                    type="text"/>
                    <!--
                    <v-file-input label="Foto"/>
                    <v-autocomplete
                        :items="ufs"
                        v-model="usuario.uf"
                        label="UF"/>-->
                    <!--<v-text-field label="Data de nascimento" v-model="usuario.datanascimento" readonly="true"/>
                    <v-date-picker v-model="usuario.datanascimento" locale="pt-br"/>-->
                    <v-text-field 
                    label="E-mail"
                    v-model="usuario.email"
                    type="email"
                    :rules="regrasEmail"
                    />
                    <v-btn color="primary" @click="salvarUsuario">Salvar</v-btn>
                    <v-btn color="error" @click.stop="dialog = true">Excluir conta</v-btn>
                    <v-spacer></v-spacer>
                    <v-alert :type="tipoAlerta" class="mt-10" dense outlined dismissible v-model="mostrarAlerta">
                        {{alerta}}
                    </v-alert>
                </v-form>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-dialog
            word-break="break-all"
            v-model="dialog"
            max-width="290"
            >
                <v-card>
                    <v-card-title class=".text-no-wrap">Deseja realmente apagar sua conta?</v-card-title>
                        <v-card-text>
                        Sua conta será excluída definitivamente e sua sessão automaticamente encerrada. 
                        </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">Cancelar</v-btn>
                        <v-btn color="primary" dark text @click="apagarUsuario">Confirmar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    import {obterUsuario, alterarUsuario, excluirUsuario} from '../../services/Usuario'

    export default {
        data(){
            return {
                dialog: false,
                showPassword: false,
                usuario: {},
                regrasNome: [
                    valor => !!valor || 'Nome deve ser preenchido'
                ],
                regrasEmail: [
                    valor => !! valor || 'E-mail deve ser preenchido'
                ],
                mostrarAlerta: false,
                alerta: '',
                tipoAlerta: 'error'
            }
        },
        methods: {
            salvarUsuario(){
                let formValid = this.$refs.form.validate()
                if (!formValid){ 
                    return
                }
                alterarUsuario(this.usuario).then((response) => {
                    this.alerta = response.body.message
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'info'                    
                }).catch(error => {
                    this.alerta = error.body.error
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'error'
                    console.log('Error:', error)
                })
            },
            apagarUsuario(){
                let formValid = this.$refs.form.validate()
                if (!formValid){ 
                    return
                }
                excluirUsuario(this.usuario).then((response) => {
                    this.alerta = response.body.message
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'info'    
                    this.dialog = false                                    
                    this.$store.dispatch('ActionLogout')
                }).catch(error => {
                    this.alerta = error.body.error
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'error'
                    console.log('Error:', error)
                })
            },
            limpar(){
                this.$refs.form.reset()
            }
        },
        created() {
            this.usuario = obterUsuario()    
        },
    }

</script>

<style>

</style>