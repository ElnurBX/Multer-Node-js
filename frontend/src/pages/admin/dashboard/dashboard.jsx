
    import React, { useContext } from 'react'
    import { Helmet } from 'react-helmet'
    import MainContext from '../../../context/context'
    import axios from 'axios';
    const Dashboard = () => {
        const {data,setdata} = useContext(MainContext)
        const deleteData = (id)=>{
            axios.delete(`http://localhost:8080/api/Produce/${id}`).then((res)=>{
                setdata([...res.data])
            })
        }
        return (
        <>
                <Helmet>
                    <title>Dashboard</title>
                </Helmet>
                <div>
                <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
   {
       data.map((item,index)=>{
           return(
               <tr>
                   <td>{index}</td>
                   <td>{item.title}</td>
                   <td>{item.price}</td>
                   <td><button onClick={()=>deleteData(item._id)} class="btn btn-danger">Delete</button></td>
               </tr>
           )
       })
   }
  </tbody>
</table>
                </div>
        </>
        )
    }
    
    export default Dashboard
        