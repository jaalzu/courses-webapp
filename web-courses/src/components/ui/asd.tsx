const estadoInicial = {
    items:[],
    precioTotal:0,
    cantidadTotal:0,
    descuento:0
};

const acciones = {
    AGREGAR_PRODUCTO:(estado,payload) => {

        return{
            ...estado,
            items:[...estado.items,payload],
            total:estado.total + (payload.precio + payload.cantidad),
            cantidadTotal:estado.cantidadTotal + payload.cantidad
        }
    }
}
