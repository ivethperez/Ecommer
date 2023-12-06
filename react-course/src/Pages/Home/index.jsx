import React, { useState } from 'react';
import { useShopiContext } from '../../Context'
import ReCAPTCHA from 'react-google-recaptcha'
import '../../Styles/styles.css'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Switch } from '@headlessui/react'
function HomePage() {

  const [email,setEmail] = useState('')
  const [captcha,setCaptcha] = useState(false)

  const { form,sendEmail } = useShopiContext();

  return (
    <div className='w-full '>

      <div class="sm:px-8 mt-9"><div class="mx-auto w-full max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <div class="max-w-full">
              <h1 class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">Snack´s Leier</h1>
              <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              En Snack´s Leier, nos especializamos en hacer que tus eventos sean irresistiblemente deliciosos. Imagina una experiencia única donde la diversión y el sabor se unen en cada bocado. Somos tu socio perfecto en la creación de momentos inolvidables, proporcionando paquetes de botanas de alta calidad para todo tipo de eventos.</p>

            </div>
          </div>
        </div>
      </div>
      </div>

      <div class="mt-16 sm:mt-20 ">
        <div class="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          <div class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl rotate-2">
            <img alt="" loading="lazy" width="3744" height="5616" decoding="async" data-nimg="1" class="absolute inset-0 h-full w-full object-cover"
              sizes="(min-width: 640px) 18rem, 11rem"
              src="https://media.istockphoto.com/id/1372396798/es/foto/colorido-golosinas.jpg?s=1024x1024&w=is&k=20&c=65qjK3a25y9aP7UT3-5Ab8puj4ZilvtdsdkVM_DLCtI=" />
          </div>
          <div class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl -rotate-2">
            <img alt="" loading="lazy" width="3936" height="2624" decoding="async" data-nimg="1" class="absolute inset-0 h-full w-full object-cover" src="https://media.istockphoto.com/id/1362087297/es/foto/bocadillos-con-salchichas-queso-manteca-de-cerdo-y-varias-salsas-en-una-boda-ucraniana.jpg?s=2048x2048&w=is&k=20&c=KlfPtZmzH67uAbWfktl7-hcy_rB4i8N1rgYToJgDQc4=" /></div><div class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl rotate-2">
            <img alt="" loading="lazy" width="5760" height="3840" decoding="async" data-nimg="1" class="absolute inset-0 h-full w-full object-cover" src="https://media.istockphoto.com/id/672552464/es/foto/barra-de-caramelo-de-boda-con-nueces-frutas-y-pasteler%C3%ADa.jpg?s=2048x2048&w=is&k=20&c=kOUGIdZzT7oHN__7RAGacraPeFAByZnH-4hnQBPSPjg=" /></div><div class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl rotate-2">
            <img alt="" loading="lazy" width="2400" height="3000" decoding="async" data-nimg="1" class="absolute inset-0 h-full w-full object-cover" src="https://media.istockphoto.com/id/513943132/es/foto/dulces-surtidos-sobre-la-mesa.jpg?s=2048x2048&w=is&k=20&c=ffaI83Y9fomrsdGm48b04WtfUhD4T9agJi7otKQBS_4=" /></div><div class="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl -rotate-2">
            <img alt="" loading="lazy" width="4240" height="2384" decoding="async" data-nimg="1" class="absolute inset-0 h-full w-full object-cover" src="https://media.istockphoto.com/id/178565437/es/foto/yogur-helado-ingredientes.jpg?s=2048x2048&w=is&k=20&c=3FeQk1y0TvNo4EY-VjJgifsOW1UCUJ2-qw2orrPQFsE=" /></div></div></div>

      <div className="sticky top-0 z-50"><div className="sm:hidden" data-headlessui-state="">
        <div className="relative flex items-center px-4 py-3 bg-white/95 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur">
          <span className="ml-4 text-base font-medium text-slate-900"><span className="hidden lg:inline">Table of contents</span><span className="lg:hidden">Contents</span></span>
          <button className="-mr-1 ml-auto flex h-8 w-8 items-center justify-center" aria-label="Toggle navigation menu" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:R9aemla:"><span className="absolute inset-0"></span>
            <svg aria-hidden="true" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" className="h-6 w-6 stroke-slate-700">
              <path d="m15 16-3 3-3-3M15 8l-3-3-3 3"></path></svg></button></div>
        <div className="absolute inset-x-0 bottom-full z-10 h-4 bg-white"></div></div>
        <div >
        </div><div className="hidden sm:flex sm:h-32 sm:justify-center sm:border-b sm:border-slate-200 sm:bg-white/95 sm:[@supports(backdrop-filter:blur(0))]:bg-white/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur">
          <ol role="list" className="mb-[-2px] grid auto-cols-[minmax(0,15rem)] grid-flow-col text-base font-medium text-slate-900 [counter-reset:section]">
            <li className="flex [counter-increment:section]">
              <a href="#paquetes" className=" decoration-transparent text-black flex w-full flex-col items-center justify-center border-b-2 before:mb-2 before:font-mono before:text-sm  border-transparent before:text-slate-500 hover:bg-blue-50/40 hover:before:text-slate-900">
                <span className="hidden lg:inline">Paquetes</span></a>
            </li><li className="flex [counter-increment:section]">
              <a href="#contacto" className="flex w-full flex-col items-center justify-center border-b-2 before:mb-2 before:font-mono before:text-sm border-transparent before:text-slate-500 hover:bg-blue-50/40 hover:before:text-slate-900 decoration-transparent text-black">
                Contactanos</a></li>

          </ol>



        </div></div>

      <section id="paquetes" aria-labelledby="pricing-title" className=" bg-body-tertiary py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="pricing-title" className="text-3xl font-medium tracking-tight text-gray-900">
            ¡Saborea la Diversión! Descubre nuestros irresistibles paquetes de botanas para tus eventos</h2>
            <p className="mt-4 text-lg text-gray-600">
            Nuestros paquetes están cuidadosamente diseñados para satisfacer todos los gustos y necesidades. Desde eventos corporativos elegantes hasta fiestas informales con amigos, en Snack´s Leier tenemos la combinación perfecta para ti. ¿Quieres sorprender a tus invitados con una selección gourmet de sabores exquisitos? ¿O tal vez prefieres una mezcla divertida y colorida que complazca a todas las edades? Sea cual sea tu visión, estamos aquí para convertirla en realidad.</p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-3"><section className="flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 bg-white"><h3 className="flex items-center text-sm font-semibold text-gray-900"><svg viewBox="0 0 40 40" aria-hidden="true" className="h-6 w-6 flex-none color-amarillo-fill"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"></path></svg><span className="ml-4">Starter</span></h3><p className="relative mt-5 flex text-3xl tracking-tight text-gray-900">$0</p><p className="mt-3 text-sm text-gray-700">You’re new to investing but want to do it right. Get started for free.</p><div className="order-last mt-6"><ul role="list" className="-my-2 divide-y text-sm divide-gray-200 text-gray-700"><li className="flex py-2"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none color-verde-text"><path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor"></path><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
            <span className="ml-4">Commission-free trading</span></li>

          </ul></div>
            <a className="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors color-rosa text-white hover:color-rosa active:color-rosa active:text-white/80 mt-6" aria-label="Get started with the Starter plan for [object Object]" href="/register">
            Contratar</a>
          </section>
            <section className="flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 bg-white">
              <h3 className="flex items-center text-sm font-semibold text-gray-900"><svg viewBox="0 0 40 40" aria-hidden="true" className="h-6 w-6 flex-none color-amarillo-fill"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"></path></svg><span className="ml-4">Investor</span></h3>
              <p className="relative mt-5 flex text-3xl tracking-tight text-gray-900"><span aria-hidden="false" className="transition duration-300">$7</span><span aria-hidden="true" className="absolute left-0 top-0 transition duration-300 pointer-events-none -translate-x-6 select-none opacity-0">$70</span>
              </p>
              <p className="mt-3 text-sm text-gray-700">You’ve been investing for a while. Invest more and grow your wealth faster.</p><div className="order-last mt-6">
                <ul role="list" className="-my-2 divide-y text-sm divide-gray-200 text-gray-700">
                  <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none color-verde-text"><path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor">
                    </path><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
                    <span className="ml-4">Commission-free trading</span></li>
                  <li className="flex py-2"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none color-verde-text">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor">
                    </path><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
                    <span className="ml-4">Multi-layered encryption</span></li>
                  <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none color-verde-text"><path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor"></path>
                    <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg><span className="ml-4">One tip every hour</span></li><li className="flex py-2"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none color-verde-text"><path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor"></path><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg><span className="ml-4">Invest up to $15,000 each month</span></li><li className="flex py-2"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none color-verde-text"><path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor"></path><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg><span className="ml-4">Basic transaction anonymization</span></li></ul></div><a className="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors color-rosa text-white hover:color-rosa active:color-rosa active:text-white/80 mt-6" aria-label="Get started with the Investor plan for [object Object]" href="/register">
                    Contratar</a></section>
                    <section className="flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5 order-first color-rosa lg:order-none"><h3 className="flex items-center text-sm font-semibold text-white"><svg viewBox="0 0 40 40" aria-hidden="true" className="h-6 w-6 flex-none color-amarillo-fill"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"></path></svg>
                    <span className="ml-4">VIP</span></h3>
                    <p className="relative mt-5 flex text-3xl tracking-tight text-white"><span aria-hidden="false" className="transition duration-300">$199</span>
                    <span aria-hidden="true" className="absolute left-0 top-0 transition duration-300 pointer-events-none -translate-x-6 select-none opacity-0">$1,990</span></p>
                    <p className="mt-3 text-sm text-gray-300">You’ve got a huge amount of assets but it’s not enough. To the moon.</p><div className="order-last mt-6"><ul role="list" className="-my-2 divide-y text-sm divide-gray-200 text-gray-300">
                    <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none text-white">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor"></path>
                    <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    </circle></svg><span className="ml-4">Commission-free trading</span></li>
                    <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none text-white">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor">
                    </path>
                    <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    </circle></svg>
                    <span className="ml-4">Multi-layered encryption</span>
                    </li>
                    <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none text-white">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor">
                    </path>
                    <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                    </svg>
                    <span className="ml-4">Real-time tip notifications</span></li>
                    <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none text-white">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor">

                    </path>
                    <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
                    <span className="ml-4">No investment limits</span></li>
                    <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none text-white">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor">

                    </path>
                    <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
                    <span className="ml-4">Advanced transaction anonymization</span></li>
                    <li className="flex py-2">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 flex-none text-white">
                    <path d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z" fill="currentColor"></path>
                    <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle></svg>
                    <span className="ml-4">Automated tax-loss harvesting</span></li></ul>
                    </div>
                    <a className="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors relative overflow-hidden color-btn-confirmar text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors mt-6" aria-label="Get started with the VIP plan for [object Object]" href="/register">
                    Contratar</a>
                    </section>
                    </div>
                    </div>
                    </section>

      <section id="contacto" aria-labelledby="author-title" className="relative scroll-mt-14 pb-3 pt-8 sm:scroll-mt-32 sm:pb-16 sm:pt-10 lg:pt-16">
        <div className="absolute inset-x-0 bottom-0 top-1/2 text-slate-900/10 [mask-image:linear-gradient(transparent,white)]">
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full"><defs>
            <pattern id=":S7:" width="128" height="128" patternUnits="userSpaceOnUse" x="50%" y="100%">
              <path d="M0 128V.5H128" fill="none" stroke="currentColor"></path></pattern></defs><rect width="100%" height="100%" fill="url(#:S7:)"></rect></svg></div>
        <div className=" rounded-3xl relative mx-auto max-w-5xl pt-16 sm:px-6">
          <div className="bg-slate-50 pt-px sm:rounded-3xl">
            <div className="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72">
              <img alt="" /></div>
            <div className="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
              <h2 className="inline-flex items-center rounded-full px-4 py-1 text-blue-600 ring-1 ring-inset ring-blue-600" id="author-title">
            
                <span className="ml-3 text-base font-medium tracking-tight">Contacto</span></h2>
              <p className="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                <span className="block text-blue-600"></span>
                </p>

                <h2 id="pricing-title" className="text-3xl font-display ml-3 font-medium tracking-tight text-gray-900">
                Conéctate con el sabor: </h2>
                <p  className="mt-4 text-lg text-gray-600">¡Contáctanos para personalizar tus paquetes de botanas en Snack´s Leier!</p>
              <p className="mt-4 text-lg tracking-tight text-slate-700"></p>
              <p className="mt-8">
              <a className="inline-flex items-center text-base font-medium tracking-tight text-blue-600" href="#">
             
              </a></p>

              
              <form ref={form} class="max-w-sm mx-auto" method='post' onSubmit={(e) =>{sendEmail(e)}}>
  <div class="mb-5">
    <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
    <input type="text" id="name" value={email} name='user_name' onChange={(e)=>setEmail(e.target.value)} 
    class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="" required/>
  </div>
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
    <input type="email" name="user_email" id="email" class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div class="mb-5">
    <label for="telefono" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
    <input id="telefono"  class="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
  </div>
  <div class="mb-5">
  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mensaje</label>
  <textarea name="message" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe tus comentarios..."></textarea>
  </div>
  <div class="flex items-start mb-5">
    <ReCAPTCHA sitekey='6Lf-jigpAAAAAPNbDIaiNC3rKwVuPg7ngZYGTNWd' onChange={(val) => setCaptcha(val)}></ReCAPTCHA>
  </div>
  <button  disabled={!captcha} class="text-white color-btn-confirmar focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Enviar mensaje</button>
</form>









<div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact sales</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Company
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>

        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>









              </div>

              </div>
              </div>
              </section>
    </div>
  )
}
export default HomePage