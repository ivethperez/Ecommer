import './style.css'
import React, { useContext } from 'react'
import { useShopiContext } from '../../Context'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Fragment, useRef, useState } from 'react'

const ProductDetail = () => {
    const { setOpenModal, productShow, openModal, increment } = useShopiContext();
    const cancelButtonRef = useRef(null)
    const addProductsToCart = (e) => {
        increment(e, productShow);
        setOpenModal(false)
    }
    return (
        <Transition.Root show={openModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Detalle del producto
                                            </Dialog.Title>
                                            <figure className='flex h-40'>
                                                <img
                                                    className='w-full  h-full object-cover rounded-lg'
                                                    src={productShow.images[0]}
                                                />
                                            </figure>
                                            <p >
                                                {productShow.title}
                                            </p>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {productShow.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className="mt-1 text-sm ">
                                            ${productShow.price == null ? productShow.priceKilo : productShow.price}
                                        </div>
                                        <div className="overflow-hidden rounded-full bg-slate-50">
                                            <button className='top-0 right-0 flex justify-center items-center  color-btn-confirmar mb-2 color-btn-confirmar text-white rounded-lg' onClick={(e) => {
                                                addProductsToCart(e)
                                            }}>
                                                <ShoppingBagIcon className='h-6 w-6'></ShoppingBagIcon></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpenModal(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default ProductDetail
