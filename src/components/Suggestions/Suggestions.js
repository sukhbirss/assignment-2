import style from './suggestions.module.css'
import { useState,useEffect } from 'react'

function Suggestions(props) {
	const [prevSearch, setPrevSerach] = useState(JSON.parse(localStorage.getItem("previousSearch")))
	const removeSearch = () =>{
		localStorage.removeItem('previousSearch')

	}

	
  return (
  	<>
  		{prevSearch && 
		   	<div className={style.container}>
		   		{prevSearch.map((el) =>{
		   			return(
		   					<p onClick={() =>props.setSearch(el)}>{el}</p>
		   				)
		   		})}
		   			<div className={style.clear} onClick={() => {removeSearch()}}>
		   				<p>Clear</p>
		   			</div>
		   	</div>
		}
   	</>
  );
}

export default Suggestions;


