import React, { useState, Fragment, useEffect } from 'react'
import './Modal.css';
import Pupup from './Popup'
import UKUMEVENT from '../Images/UKUM-EVENT.png'
import IndustrailVisit from '../Images/Industrail-Visit.png'
import InstituteResearchDay from '../Images/Institute-Research-day.png'
import { Dialog, Transition } from '@headlessui/react'
function ModalBox() {

    let [isOpen, setIsOpen] = useState(false)
    let [content, setContent] = useState(1)
    let [data, setData] = useState([])

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
        // setContent()
    }


    useEffect(() => {
        let url = 'https://script.googleusercontent.com/macros/echo?user_content_key=GKbMK6uG5IxsPCqugJAPE1Kd9QQJ4K7QbwGrvVETl5DjIEeRU6kvXt2lEzAK2Gt-SZOCzB3dh53heGsJ0LvAoX1MpmhyMF5Jm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO0I1a398ypfvhspNksEQYs8ipYUeO26w1Cg9JdxKLbgvSHx6xe6rfw6Mx5ZmdSvkpTb3VNX9hGdA3w_8CSZKkInEtft3-T0uA&lib=MLNQzpdsxEt8A-8Kv0XvZGdNSyhx4ziTX';
        fetch(url)
            .then((response) => response.json())
            .then(json => {
                // Do something with the data
                console.log(json[0].data1);
                setData(json[0].data1)

            });

    }, [])




    return (
        <>

            <div className=''>
                <div className='text-center'>
                    <h1 className="text-4xl font-bold mb-12 ">Events</h1>
                </div>

            </div>
            <div className="">
                <div className="flex flex-wrap justify-center">
                    {Array.isArray(data) &&
                        data.map((event, index) => (
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4" key={index}>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <img className="rounded-t-lg" src={event.imageUrl} alt={event.title} />
                                    </a>
                                    <div className="p-5">
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.title}</h5>
                                        </a>

                                        <button
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => {
                                                openModal()
                                                setContent(index)
                                            }}
                                        >
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="lg:w-[50vw] sm:w-[75vw] h-[50vh] transform overflow-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-5xl mb-9 text-center font-medium leading-6 text-gray-900"
                                    >
                                        {data[content] ? data[content].title : ""}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {data[content] ? data[content].desc : ""}

                                        </p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </>
    )

}

export default ModalBox