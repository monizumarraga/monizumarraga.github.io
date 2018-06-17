import React, { Component } from 'react';
import './FaceRecognition.css';

const FaceRecognition =({imageUrl}) => {
	return (
		<div className="">
			<div className= 'center mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
			</div>
		</div>
		);
}

export default FaceRecognition;
