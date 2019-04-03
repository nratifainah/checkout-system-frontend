import Vue from 'vue'
// import * as config from './../config'
import VueResource from 'vue-resource'




export default {

    login (context) {
        // console.log("fetching products in  service")
        return new Promise((resolve, reject) => {

            context.$http.get( 'http://localhost:8000/api/login',{
                headers: {
                    'Authorization':  "Bearer " . localStorage.getItem('id_token'),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                    resolve(response.body)
                },
                (response) => {
                    reject
                })
        })
    },


}
