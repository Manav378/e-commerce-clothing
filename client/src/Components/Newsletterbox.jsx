import React from 'react'

const Newsletterbox = ({open}) => {
    const onsubmitHandeler = (event)=>{
            event.preventDefault()
    }
  return (
    <div className={`text-center `}>
      <p className='md:text-2xl font-medium text-sm  cormorant text-gray-800'>Suscribe now to get 20% off</p>
        <p className='w-3/4 text-xs sm:text-sm m-auto md:text-base text-center text-gray-700 cormorant'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, exercitationem?</p>
        {/*Email feedback form*/}
        <form onSubmit={onsubmitHandeler} className=' flex flex-col sm:flex-row md:flex-row    items-center py-4 justify-center'>

            <div  className=' flex  w-[43vw] flex-col h-[5vh] md:w-[28vw] md:h-[7vh] lg:w-[30vw] lg:flex-row border  sm:flex-row sm:w-[45vw] justify-center items-center  border-slate-300'><input type="email" placeholder='Enter your email' className='w-full h-full cormorant  text-gray-500 py-3 px-2' /></div>
            <button type='submit' className='bg-black cormorant text-white w-[43vw] h-[5vh]  md:h-[7vh] sm:w-[25vw]  hover:text-gray-600 cursor-pointer '>Suscribe</button>

        </form>
    </div>
  )
}

export default Newsletterbox
