
    import React, { useContext } from 'react'
    import { Helmet } from 'react-helmet'
    import MainContext from '../../../context/context'
    
    const Home = () => {
        const {data,setdata} = useContext(MainContext)
        return (
        <>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <div className="container">
                    <div className="cards row">
                        {
                            data.map((item) => {
                                console.log(item);
                                
                                return(
                                    <div className="card col-4">
                                        <h1>{item.title}</h1>
                                        {item.imgs.length!==1 ?
                                        <div style={{display:"flex",overflowX:"scroll"} }>
                                            {
                                                item.imgs.map((img) => {
                                                    console.log(img);
                                                    return(
                                                        <img width={"100%"} height={"300px"} src={`http://localhost:8080/uploads/${img}`} alt="img" />
                                                    )
                                                })
                                            }
                                        </div>
                                        : 
                                        <img width={"100%"} height={"300px"} src={`http://localhost:8080/uploads/${item.imgs}`} alt="img" />}
                                        <p>{item.price}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
        </>
        )
    }
    
    export default Home
        