import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import ProductModal from '../../Components/ProductModal'
import { Link } from 'react-router-dom'
import { useShopiContext } from '../../Context'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import Alert from '../../Components/Alert'
import ShoppingCart from '../../Components/ShoppingCart'
import WhatsAppButton from '../../Components/WhatsAppButton'
import '../../Styles/styles.css'
import { useState, useRef, useEffect } from 'react'

function Ecommer() {
  const { openModal, search, filteredItems, showAlert, setSearchByCategory } = useShopiContext();
  const [categoriaActiva, setCategoriaActiva] = useState("Paquete");
  const filtro = (val) => {
    setSearchByCategory(val);
    setCategoriaActiva(val)
  }
  const categorias = [
    {
      title: '🍺⚽ Para compartir o\n🎁 Para regalo',
      desc: 'Sorprende con algo diferente',
      filtro: 'Paquete'
    },
    {
      title: '🔥 Para botanear',
      desc: 'Para cualquier momento',
      filtro: 'Botanas'
    },
    {
      title: '🍫 Antojo de chocolate',
      desc: 'Para los amantes del cacao',
      filtro: 'Chocolate'
    },
    {
      title: '🍬 Antojo de gomitas',
      desc: 'Dulces, ácidas y adictivas',
      filtro: 'Gomitas'
    }

  ]
  const renderView = () => {
    if (filteredItems?.length > 0) {
      return (
        filteredItems?.map(item => (
          item.product.active ?
            <Card key={item.product.id} data={item}> </Card> : ""
        ))
      )
    } else {
      return (
        <div className='flex items-center'>
          <div role="status" className="mt-10 absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
            <svg aria-hidden="true" className=" w-40 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <div className="">Cargando productos...</div>
          </div>
        </div>
      )
    }

  }

  // reviews.js
  const reviews = [
    {
      id: 1,
      name: "Nereo Mendez",
      rating: 5,
      comment: "Deliciosas botanas, gran calidad y servicio. Excelente para cualquier ocasión.",
      source: "Facebook"
    },
    {
      id: 2,
      name: "Emma Perez",
      rating: 5,
      comment: "💯% Calidad, Deliciosa Botana para Disfrutar con Amigos 🥜🙂‍↔️",
      source: "Facebook"
    },
    {
      id: 3,
      name: "Ny Johana",
      rating: 5,
      comment: "Lo mejor!! Excelente calidad/precio. 🤩",
      source: "Facebook"
    },
    {
      id: 4,
      name: "Iveth P",
      rating: 5,
      comment: "Excelente calidad, estan deliciosas, todo súper rico 😍",
      source: "Facebook"
    }
  ];

  function Stars({ value = 5 }) {
    return (
      <div className="text-yellow-500 text-sm leading-none">
        {"★".repeat(value)}
      </div>
    );
  }
  function ReviewCard({ r }) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">{r.name}</span>
            <Stars value={r.rating} />
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            “{r.comment}”
          </p>
        </div>
<span className="text-[11px] text-slate-500 mt-3 bg-slate-100 px-2 py-1 rounded-full w-fit tracking-wide">
  ★ Facebook
</span>
      </div>
    );
  }

  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const timerRef = useRef(null);
  const pauseRef = useRef(false);

  // Responsive: cuántas cards visibles
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 768) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - perView);

  // Autoplay
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!pauseRef.current) {
        setIndex((i) => (i >= maxIndex ? 0 : i + 1));
      }
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [maxIndex]);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));


  return (
    <div className=" mx-auto max-w-7xl">

      {showAlert ?
        <Alert></Alert>
        :
        <div></div>
      }

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

        {/* TÍTULO - Más limpio y profesional */}
        <div className="mb-8">
          <h4 className="text-3xl font-extrabold tracking-tight text-slate-900">
            ¿Qué se te antoja hoy?
          </h4>
          <p className="text-slate-500 text-sm mt-1">Explora nuestras categorías seleccionadas</p>
        </div>

        {/* MOBILE: categorías horizontal (Pills modernas) */}
        <div className="lg:hidden mb-8 ">
          <div className="flex flex-col gap-2 ">
            {categorias.map((cat, index) => {
              const active = categoriaActiva === cat.filtro;
              return (
                <button
                  key={index}
                  onClick={() => filtro(cat.filtro)}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap text-xs font-bold transition-all duration-200 border
              ${active
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                >
                  {cat.title.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* DESKTOP SIDEBAR - Estilo Minimalista */}
          <div className="hidden lg:block h-fit sticky top-24">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              Categorías
            </h5>

            <div className="flex flex-col gap-1">
              {categorias.map((cat, index) => {
                const active = categoriaActiva === cat.filtro;
                return (
                  <button
                    key={index}
                    onClick={() => filtro(cat.filtro)}
                    className={`text-left p-4 rounded-xl transition-all duration-300 group
                ${active ? 'bg-slate-50 border-l-4 border-slate-900' : 'hover:bg-slate-50 border-l-4 border-transparent'}
              `}
                  >
                    <p className={`text-[10px] uppercase font-bold tracking-tight mb-0.5 
                ${active ? 'text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`}>
                      {cat.desc}
                    </p>
                    <p className={`text-sm font-bold whitespace-pre-line
                ${active ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                      {cat.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONTENIDO */}
          <div className="lg:col-span-3">

            {/* BUSCADOR - Estilo sutil */}
            <div className="mb-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar en el menú..."
                  onChange={search}
                  className="w-full bg-slate-100 border-none rounded-2xl px-5 py-3 text-sm  focus:ring-slate-800/10  placeholder:text-slate-400 text-slate-700"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {/* Aquí podrías poner un icono de lupa pequeño */}
                </div>
              </div>
            </div>

            {/* GRID PRODUCTOS (Asegúrate de que el gap sea consistente) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {renderView()}
            </div>

          </div>
        </div>


      </div>


      <section
        className="w-full py-8"
        onMouseEnter={() => (pauseRef.current = true)}
        onMouseLeave={() => (pauseRef.current = false)}
      >
        {/* Header que vende */}
        <div className="flex items-end justify-between mb-4 px-2">
          <div>
            <h3 className="text-xl font-bold">Lo que dicen nuestros clientes</h3>
            <p className="text-sm text-gray-500">
              Calificaciones reales ⭐⭐⭐⭐⭐ desde Facebook
            </p>
          </div>

          {/* Controles */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prev}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              ←
            </button>
            <button
              onClick={next}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              →
            </button>
          </div>
        </div>

        {/* Viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(index * 100) / perView}%)`,
            }}
          >
            {reviews.map((r) => (
              <div
                key={r.id}
                className="px-2"
                style={{ minWidth: `${100 / perView}%` }}
              >
                <ReviewCard r={r} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-black" : "w-2 bg-gray-300"
                }`}
            />
          ))}
        </div>
      </section>

<div className="fixed right-6 bottom-20 z-[100] flex flex-col items-end gap-4">
      <ShoppingCart />
      <WhatsAppButton />
</div>

      {openModal && (
        <ProductModal>
          <ProductDetail></ProductDetail>
        </ProductModal>
      )}
      <CheckoutSideMenu></CheckoutSideMenu>
    </div>
  )
}

export default Ecommer