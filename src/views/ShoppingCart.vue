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
                <li v-for="(item, i) in items" :key="item.name" class="list-group-item ">
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
                        <form class="form-inline d-flex justify-content-between align-items-center" v-if="item.isEditing">
                            <div class="form-group">
                                <label for="name">Item</label>
                                <input type="text" v-model="item.name" id="name" class="form-control" placeholder="" aria-describedby="helpId">
                                <small id="helpId" class="text-muted">name of item</small>
                            </div>
                            <div class="form-group">
                                <label for="price">Price</label>
                                <input type="text" v-model="item.pricePerItem" id="price" class="form-control" placeholder="" aria-describedby="helpId">
                                <small id="helpId" class="text-muted">price of item</small>
                            </div>
                            <div class="form-group">
                                <label for="qty">Quantity</label>
                                <input type="number" v-model="item.qty" id="qty" class="form-control" placeholder="" aria-describedby="helpId">
                                <small id="helpId" class="text-muted">name of item</small>
                            </div>
                            <button @click="item.isEditing = false" class="btn btn-sm btn-primary">
                                <i class="fa fa-subway" aria-hidden="true"></i>
                            </button>
                        </form>
                </li>
            </ul>
        </div>
        <div class="col"></div>
    </div>
</template>

<script>
export default {
    data: ()=>({
        items: [ { name: "Bannanas", qty: 2, pricePerItem: 1.99, isEditing: false } ]
    }),
    methods: {
        add(){
            this.items.push({ isEditing: true })
        },
        remove(i){
            this.items.splice(i, 1);
        }
    },
    computed:{
        total(){ return this.items.reduce( (prev, x)=> prev + (+x.qty) * (+x.pricePerItem), 0 ) }
    }
}
</script>

<style>

</style>
