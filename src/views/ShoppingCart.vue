<template>
    <div class="row">
        <h1 class="col-12">Shopping Cart</h1>
        <div class="col">
            <ul class="list-group">
                <li class="list-group-item  active">
                    <div class=" d-flex justify-content-between align-items-center">
                        <h5>Items</h5>
                        <small>${{total}}</small>
                    </div>
                    <div class=" d-flex justify-content-between align-items-center">
                        <p>Add as many as you'd like</p>
                        <button @click="add" class="btn btn-sm btn-success">Add</button>
                    </div>
                </li>
                <li v-for="(item, i) in items" :key="i" class="list-group-item ">
                    <div v-if="!item.isEditing" class="d-flex justify-content-between align-items-center">
                        <div class="btn-group btn-group-sm" role="group" aria-label="">
                            <button @click="item.isEditing = true" type="button" class="btn btn-primary">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button @click="remove(i)" type="button" class="btn btn-primary">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </div>
                        {{item.name}} ({{item.qty}})
                        <span class="badge badge-secondary badge-pill">${{item.qty * item.pricePerItem}}</span>
                    </div>
                        <form class="form-inline" v-if="item.isEditing">
                            <div class="form-group">
                                <label for="name">Item</label>
                                <input type="text" v-model="item.name" class="form-control" placeholder="" aria-describedby="helpId" style="width:270px">
                                <small id="helpId" class="text-muted">name of item</small>
                            </div>
                            <div class="form-group">
                                <label for="price">Price</label>
                                <input type="text" v-model="item.pricePerItem" id="price" class="form-control" placeholder="" aria-describedby="helpId" style="width:70px">
                            </div>
                            <div class="form-group">
                                <label for="qty">Quantity</label>
                                <input type="number" v-model="item.qty" id="qty" class="form-control" placeholder="" aria-describedby="helpId" style="width:70px">
                            </div>
                            <button @click="item.isEditing = false" class="btn btn-lg btn-primary">
                                <i class="fa fa-save" aria-hidden="true"></i>
                            </button>
                        </form>
                </li>
            </ul>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">
                    Payment
                    <span class="badge badge-secondary badge-pill pull-right">${{total}}</span>

                </div>
                <div class="card-body">
                    
                    <form @submit.prevent="submit" id="payment-form">
                    <div class="form-row">
                        <label for="card-element">
                        Credit or debit card
                        </label>
                        <div id="card-element">
                        <!-- A Stripe Element will be inserted here. -->
                        </div>

                        <!-- Used to display form errors. -->
                        <div id="card-errors" role="alert"></div>
                    </div>
                    <input class="form-control" type="email" v-model="email" placeholder="email">
                    <button class="btn btn-primary">Submit Payment</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*globals Stripe */
import * as toastr from 'toastr';
import * as api from '@/models/api';
export default {
    data: ()=>({
        items: [ { name: "Bannanas", qty: 2, pricePerItem: 1.99, isEditing: false } ],
        email: null
    }),
    mounted(){
        this.stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLIC);
        var elements = this.stripe.elements();

        var style = {};

        // Create an instance of the card Element.
        this.card = elements.create('card', {style: style});

        // Add an instance of the card Element into the `card-element` <div>.
        this.card.mount('#card-element');

        this.card.addEventListener('change', function(event) {
            if (event.error) {
                toastr.error(event.error.message);
            }
        });
    },
    methods: {
        add(){
            this.items.push({ isEditing: true })
        },
        remove(i){
            this.items.splice(i, 1);
        },
        async submit(){
            try {
                const result = await this.stripe.createToken(this.card);
                if (result.error) {
                    toastr.error(result.error.message);
                } else {
                    const charge = await api.api('stripe/charge', { token: result.token.id, amount: this.total * 100, email: this.email });
                    console.log(charge);
                }
                
            } catch (error) {
                toastr.error(error.message);
            }
        }
    },
    computed:{
        total(){ return this.items.reduce( (prev, x)=> prev + (+x.qty) * (+x.pricePerItem), 0 ) }
    }
}
</script>

<style>
    label {
        position: absolute;
        font-size: small;
        margin: -15px 5px;
    }
    input.form-control {
        padding: 25px 5px;
    }
    .text-muted {
        position: absolute;
        margin: 15px 5px;
    }

    .StripeElement {
        box-sizing: border-box;

        height: 40px;
        width: 100%;

        padding: 10px 12px;

        border: 1px solid transparent;
        border-radius: 4px;
        background-color: white;

        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
        border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
</style>
