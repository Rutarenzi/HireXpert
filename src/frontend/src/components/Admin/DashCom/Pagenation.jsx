const Pagination =({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers = [];
    
    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
       pageNumbers.push(i)
    }
   return(
  <>
  <nav>
    <ul className="pagination">
        {
            pageNumbers.map((item)=> {
            return(
                <li key={item} onClick={()=>{paginate(item)}} className="page-item">
                    <a href="#"  className="page-link">
                      {item}
                    </a>
                </li>
            )
        })
        }
    </ul>
  </nav>
  </>
   )   
}

export default Pagination