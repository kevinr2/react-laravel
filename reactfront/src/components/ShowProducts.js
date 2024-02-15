import React, {useEffect,useState} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowProducts = () => {
    const [products, setProducts]=useState([])

    useEffect(()=>{
        getAllProducts()
    },[products])

    const getAllProducts = async ()=>{
      const response =  await axios.get(`${endpoint}/products`)
      setProducts(response.data)
    }

    const deleteProdcut = async (id)=>{
        axios.delete(`${endpoint}/product/${id}`)
        getAllProducts()
    }

  return (
    <div>
        <div className='d-grip gap-2'>
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
        </div>
        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>description</th>
                    <th>price</th>
                    <th>stock</th>
                    <th>action</th>
                </tr>

            </thead>
            <tbody>
                {
                  products.map((product)=>(
                    <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.price} </td>
                        <td>{product.stock}</td>
                        <td>
                            <Link to={`/edit/${product.id}`}className='btn btn-warning'>Edit</Link>
                            <button onClick={(()=>deleteProdcut(product.id))} className='btn btn-danger'>delete</button>
                        </td>
                    </tr>
                  ))

                } 
                
            </tbody>
            
        </table>
    </div>
  )
}

export default ShowProducts