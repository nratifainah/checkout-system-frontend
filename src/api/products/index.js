import Vue from 'vue'
import VueResource from 'vue-resource'




export default {

    getProducts (context) {
        return new Promise((resolve, reject) => {

            context.$http.get(process.env.VUE_APP_API_URL + '/api/products',{
                headers: {
                    'Authorization':  "Bearer " + localStorage.getItem('id_token'),
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

    checkout (context, products) {
        return new Promise((resolve, reject) => {

            context.$http.post( process.env.VUE_APP_API_URL +'/api/checkout', products, {
                headers: {
                    'Authorization':  "Bearer " + localStorage.getItem('id_token'),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                    resolve(response.body)
            }, (error) => {
                alert("Oops, something went wrong!!");
            })
        })
    },

}
