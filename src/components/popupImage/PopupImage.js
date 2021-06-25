import style from './PopupImage.module.css'
import { useState } from 'react'

function PopupImage(props) {

	console.log(props)

  return (
  		<>
  			<div className={style.backdrop} onClick={()=>props.setShow(false)}> </div>
		   	<div className={style.container} onClick={()=>props.setShow(false)}>
		   		<img src={props.image} className={style.image}/>
		   	</div>
		</>

  );
}

export default PopupImage;


