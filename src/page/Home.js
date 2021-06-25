
import style from "./home.module.css";
import { useState,useEffect } from 'react'
import axios from 'axios'
import Suggestions from "../components/Suggestions/Suggestions"
import PopupImage from "../components/popupImage/PopupImage"

function Home() {
	const [search, setSearch] = useState(null);
	const [data, setData] = useState(null);
	const [image, setImage] = useState(false);
	const [show, setShow] = useState(false)
	const [trigger, setTrigger] = useState(false)

	//this will fetch default pics
	useEffect(() => {
		    axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=3ec9ec9a2955f1c26c23353f07319320&per_page=21&page=10&format=json&nojsoncallback=1')
        .then(response => {
	                    setData(response.data.photos)
              })
	}, [])



	//this will fetch pics by from serach bar

		useEffect(() => {
			if(search){
			    const delayDebounceFn = setTimeout(() => {
			      	axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3ec9ec9a2955f1c26c23353f07319320&text=${search}&format=json&nojsoncallback=1`)
					        .then(response => {
						                    setData(response.data.photos)
					              })
					let previousSearch = JSON.parse(localStorage.getItem("previousSearch"))
						if(previousSearch && !previousSearch.includes(search)){

							localStorage.setItem('previousSearch', JSON.stringify([...previousSearch,search]));
						}
						else{
							localStorage.setItem('previousSearch', JSON.stringify([search]));
						}
			    }, 500);
			    return () => clearTimeout(delayDebounceFn);
			}
  	}, [search]);


  return (
  	<>
    	<div className={style.header} >
	    	<h1> Search Photos </h1>
	    	<div>
		    	<input value={search} onChange={(e)=>{setSearch(e.target.value);}} className={style.search} onClick={() =>setTrigger(true)}/>

		    	{trigger && <Suggestions  setSearch={setSearch}/>}
	    	</div>
	    </div>


    	<div className={style.image_container} onClick={() =>setTrigger(false)} >
    		{
    			data?.photo ? 

    				data.photo.map((el) => {
    					return (
    						<div className={style.image} onClick={()=>{setImage(`http://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}.jpg`); setShow(true)}}>
    							<img src={`http://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}.jpg`} onClick={()=>{setImage(`http://farm${el.farm}.staticflickr.com/${el.server}/${el.id}_${el.secret}.jpg`); setShow(true)}} />
    						</div>
    					)
    				})
		:
			<h1>Loading</h1>
    		}
    	</div>

    	{show &&
	    	<PopupImage image={image}  setShow={setShow}/>
	    }
	</>
  );
}

export default Home;

