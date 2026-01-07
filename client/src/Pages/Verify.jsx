import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const Verify = () => {


    const {navigate,setCartItems,backendUrl} = useContext(ShopContext)
    const [searchParams, setsearchParams] = useSearchParams();
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const VerifyPayement = async()=>{
            try {
                
            const response = await axios.post(backendUrl+'/api/orders/verifyStripe' , {success , orderId} , {withCredentials:true})
             if(response.data.success){
                setCartItems({});
                navigate('/Orders')
             }else{
                navigate('/Cart')
             }

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
    }

    useEffect(() => {
        
      VerifyPayement()
    }, []);

  return (
    <div>
  
    </div>
  )
}

export default Verify
