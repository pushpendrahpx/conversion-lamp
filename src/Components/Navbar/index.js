import React from 'react';
import {
	Nav,
	Bars,
	NavLink,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
	return (
		<>
		<Nav>
			<Bars />
			<NavMenu>
				<NavLink to='/about' activeStyle >
					Home
				</NavLink>
				<NavLink to='/about' activeStyle >
					Overview
				</NavLink>
				<NavLink to='/about' activeStyle >
					Details
				</NavLink>
			</NavMenu>
			<NavBtn>
				<NavBtnLink>Contact</NavBtnLink>
			</NavBtn>
		</Nav>
		</>
	)
}

export default Navbar;