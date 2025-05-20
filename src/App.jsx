import React, {useState, useEffect, useCallback} from 'react'
import './App.css'
const App = () => {

  
  const [allData, setData] = useState();  // total data array
  const [page, setPage] = useState(0);   // selected page
  const [pageQuant, setPageQuant] = useState(5);  // number of data items per page (DEFAULT : 5)
  const [dataSize, setDataSize] = useState();  // Length of the total data array
  const pages = Math.ceil(dataSize/pageQuant);  // number of pagination pages

  let startIndex = page*pageQuant; 
  let endIndex = startIndex+pageQuant;

  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = useCallback(async()=>{          // memoised function
    const apiData = await fetch('https://dummyjson.com/products');
    const jsonData = await apiData.json();
    const data = jsonData.products;
    setData(data);
    setDataSize(data.length);
    console.log('Data = ',data);
  })

  const renderPagination = ()=>{
    if(pages <= 3)
    {
      console.log("Pages = ", pages);
      console.log("Data Printing = ", allData);
      return(
        <div className='pagination'>
          <div> <li className="page-item"><a className="page-link" href="#" onClick={()=>{ page!=0 ? setPage((curr)=>curr-1) : null}}>Previous</a></li> </div>

            {
              [...Array(pages).keys()].map((item, index)=>{
                return(
                  <>
                    {/* <span key={index} onClick={()=>{setPage(item)}} className='numbers' style={{margin:'5px'}} >{item}</span> */}
                    <li key={index} className="page-item"><a className="page-link" href="#" onClick={()=>{setPage(item)}}>{item}</a></li>
                  </>
                )
              })
            }

          <li className="page-item"><a className="page-link" href="#" onClick={()=>{page != (pages-1) ? setPage((curr)=>curr+1) : null}}>Next</a></li>
        </div>
      )
    }
    else
    {
      return(
        <div className='pagination'>

          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li className="page-item"><a className="page-link" href="#" onClick={()=>{ page!=0 ? setPage((curr)=>curr-1) : null}}>Previous</a></li>
              <li className="page-item"><a className="page-link" href="#" onClick={()=>{setPage(1)}}>1</a></li>
              <li className="page-item"><a className="page-link" href="#" onClick={()=>{setPage(2)}}>2</a></li>
              <li className="page-item"><a className="page-link" href="#" onClick={()=>{setPage(3)}}>3</a></li>
              <li className="page-item"><a className="page-link" href="#" >...</a></li>
              <li className="page-item"><a className="page-link" href="#" onClick={()=>{setPage(pages-1)}}>{pages-1}</a></li>
              <li className="page-item"><a className="page-link" href="#" onClick={()=>{page != (pages-1) ? setPage((curr)=>curr+1) : null}}>Next</a></li>
            </ul>
          </nav>

        </div>
      )
    }
  }

  ////////////////////////// RENDERING //////////////////////////////

  return !allData? <h1>No data found</h1> : (
    <div className='container'>
      
      {console.log("PAGE RENDERED")}

      {renderPagination()}

      {/* INPUT for the number of items in a page */}
      <span>Number of items per page: </span>
      <div className='itemsNumber'>

        <input type="number" style={{width: '50px'}}onChange={(e) => {
            setPageQuant(e.target.value);
            setPage(0); // reset to page 0 to avoid out-of-bound issue
        }}/>

        {/*
        Why setPage(0) has to be done?
        
        Let's say:
        You have 30 items
        Current pageQuant = 5
        So: pages = Math.ceil(30 / 5) = 6
        Suppose you're on page = 5 (i.e., last page)
        Now you change pageQuant = 10, but don’t reset the page.
        
        Now watch what changes:
        pages = Math.ceil(30 / 10) = 3
        But you're still on page = 5
        startIndex = 5 * 10 = 50
        endIndex = 60 */}

      </div>

      <h1>Total pages = {pages}</h1>
      
      <div className='pageData'>
        {
          allData.slice(startIndex, endIndex).map((item)=>{
            return (
              <div key={item.id}>
                  {item.title}
              </div>
            )
          })
        }
      </div>



    </div>
  )
  
}

export default App