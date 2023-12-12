import React 				from 'react';
import Container 			from 'react-bootstrap/Container';
import Nav 					from 'react-bootstrap/Nav';
import Navbar 				from 'react-bootstrap/Navbar';
import Badge 				from 'react-bootstrap/Badge';
import Row 					from 'react-bootstrap/Row';
import Col 					from 'react-bootstrap/Col';
import { 
	useDispatch, 
	TypedUseSelectorHook, 
	useSelector } 			from 'react-redux';
import { clickTabMatch } 	from '../match/slice/TabMatchSlice';
import stlHeader      		from '../../scss/header.module.scss';

function Menu() {

	const dispatch = useDispatch();	

	const useTypedSelector: TypedUseSelectorHook<any> = useSelector;
    const tabStatusMatch     = useTypedSelector( state => state.tabMatch ); //riceve lo stato dallo store

	const manageClick: React.MouseEventHandler<HTMLButtonElement> = (event):void => {
        event.preventDefault();		
        dispatch( clickTabMatch(event.currentTarget.id) ); //Fa dispatch dell'azione
    }

	const primary:string = 'primary';

	return (
		<>
			{['lg'].map((expand) => (
				<Navbar key={expand} expand={expand} className={stlHeader.navtab}>
					<Container fluid="md">												
						<Nav className="justify-content-center flex-grow-1 pe-3">
							<Row>
								<Col className="mb-lg-0 pb-lg-0 border-lg-0 w-25">
									<Badge id="all" onClick={manageClick} role="button" bg={tabStatusMatch === 'all' && primary} className="float-end ms-2 mt-1 w-100">Tutte</Badge>									
								</Col>
								<Col className="mb-lg-0 pb-lg-0 border-lg-0 w-25">
									<Badge id="live" onClick={manageClick} role="button" bg={tabStatusMatch === 'live' && primary} className="float-end ms-2 mt-1 w-100">Live</Badge>
								</Col>
								<Col className="mb-lg-0 pb-lg-0 border-lg-0 w-25">
									<Badge id="ended" onClick={manageClick} role="button" bg={tabStatusMatch === 'ended' && primary} className="float-end ms-2 mt-1 w-100">Concluse</Badge>
								</Col>
								<Col className="mb-lg-0 pb-lg-0 border-lg-0 w-25">
									<Badge id="next" onClick={manageClick} role="button" bg={tabStatusMatch === 'next' && primary} className="float-end ms-2 mt-1 w-100">Prossime</Badge>
								</Col>
								<Col className="mb-lg-0 pb-lg-0 border-lg-0 w-25">
									<Badge id="follow" onClick={manageClick} role="button" bg={tabStatusMatch === 'follow' && primary} className="float-end ms-2 mt-1 w-100">Seguite</Badge>
								</Col>
							</Row>
						</Nav>
					</Container>
				</Navbar>
			))}
		</>
	);
}

export default Menu;