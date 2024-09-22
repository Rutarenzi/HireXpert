const AdminCard =({Name, Amount})=>{
    return(
        <>
          <div className="AAccBox">
             <div className="AAccTitle">
                 <p className="AccText">{Name}</p>
             </div>
             <hr></hr>
             <div className="AccNumber">
                 {Amount.toString()}
             </div>
          </div> 
        </>
    )
}
export default AdminCard