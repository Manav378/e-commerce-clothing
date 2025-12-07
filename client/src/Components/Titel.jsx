import React from 'react'

const Titel = ({text1 , text2}) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 py-2">
  <span className="h-px w-16 bg-gray-400"></span>

  <p className="text-2xl tracking-widest text-gray-600">
    {text1} 
  </p>
  <p className="text-2xl tracking-widest text-black">
    {text2}
  </p>

  <span className="h-px w-16 bg-gray-400"></span>
</div>

    </div>
  )
}

export default Titel
