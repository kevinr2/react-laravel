import React, { useEffect,useState } from 'react'
import axios from 'axios'

import { useNavigate,useParams } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api/product/'

const EditProduct = () => {
  const [description,setDescription]= useState('')
  const [price,setPrice]= useState(0)
  const [stock, setStock]= useState(0)
  const navigate = useNavigate()
  const {id} = useParams()
  const update = async (e) =>{
      e.preventDefault()
      await axios.put(`${endpoint}${id}`,
          {
              description:description,
              price:price,
              stock:stock
          })
          navigate('/')
  }
  useEffect(()=>{
    const getProductById = async ()=>{
       const response= await axios.get(`${endpoint}${id}`)
       setDescription(response.data.description)
       setPrice(response.data.price)
       setStock(response.data.stock)
    }
    getProductById()
    
  },[])
  return (
    <div>
<h3>Edit Product</h3>
        <form onSubmit={update}>
            <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input 
                    value={description}
                    onChange={ (e)=>setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Price</label>
                <input 
                    value={price}
                    onChange={ (e)=>setPrice(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Stock</label>
                <input 
                    value={stock}
                    onChange={ (e)=>setStock(e.target.value)}
                    type='number'
                    className='form-control'
                />
            </div>
            <button type='submit' className='btn btn-primary'>Edit</button>
        </form>
        {console.log(price)}
    </div>
  )
}

export default EditProduct