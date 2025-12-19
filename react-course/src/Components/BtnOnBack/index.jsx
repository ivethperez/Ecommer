import { ArrowUturnLeftIcon  } from '@heroicons/react/24/outline'
function BtnOnBack({onBack}) {
    return (<div className="mb-4">
        <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-pink-600 text-pink-600 font-semibold hover:text-pink-800 border-1 border-pink-600 hover:border-pink-800 rounded-full"
        >
            <ArrowUturnLeftIcon className="h-4 w-4"></ArrowUturnLeftIcon>
            {/* <span>Volver</span> */}
        </button>
    </div>)
}
export default BtnOnBack;