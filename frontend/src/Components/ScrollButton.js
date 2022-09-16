import React from 'react';
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const ScrollButton = () =>{

const scrollToTop = () =>{
	window.scrollTo({
	top: 0,
	behavior: 'smooth'
	});
};

const styling ={
	display: "inline",
    fontSize: "2.5rem",
    position: "fixed",
    right: "1rem",
    top: "90vh"
}

return (
	<BsFillArrowUpCircleFill   onClick={scrollToTop} style={styling} />
);
}

export default ScrollButton;
