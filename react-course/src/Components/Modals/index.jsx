import './style.css'
import { useShopiContext } from '../../Context'
import { XMarkIcon } from '@heroicons/react/24/solid'
const ModalConfirmation = ({titulo, mensaje, children}) =>{
    const { setOpenModal,openModal } = useShopiContext();
     return (
        <div>
        {openModal && (
             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => setOpenModal(false)}>
                    <div className="bg-white p-6 rounded-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-2 right-2" onClick={() => setOpenModal(false)}>
                            <XMarkIcon className=' w-6 h-6' />
                        </button>
                        <h2 className="text-xl font-bold mb-4">{titulo}</h2>
                          <div className=' flex items-center'>
                  <p className="">{mensaje}</p>
                  </div>
                  <div className='flex justify-end gap-2'>              
                    {children}
                    </div>
                    </div>
                </div>
        )}
        </div>
     )

}
export default ModalConfirmation