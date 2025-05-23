const OrderCard = props => {
    const { id, title, imageUrl, price, quantity, unidadMedida } = props

    const med = () => {
        const unidadesFiltradas = unidadMedida.filter(item => item.precio === price);
        return unidadesFiltradas[0].unidad.Nombre;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div className='flex items-center gap-2'>
                    <figure className='w-20 h-20'>
                        <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
                    </figure>

                    <div className="flex flex-col items-start gap-1">
                        <p className="font-light text-sm">{title}</p>
                        <div className="flex justify-between items-center w-[80px]">
                            <p>{quantity}</p>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-0'>
                    <p className='text-md items-center pl-2 pr-2 mb-2'>{med()}</p>
                    <p className='text-lg items-center gap-1 pr-1 mb-2'>${price * quantity}</p>
                </div>
            </div>
        </div>

    )
}
export default OrderCard