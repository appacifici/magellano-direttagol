import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDetail({ movieDetail }: { movieDetail: any }) {
	const initStatus 		= movieDetail ? true : false;
	const [show, setShow] 	= useState(false);
	const handleClose 		= () => setShow(false);
	const handleShow 		= () => setShow(true);

	useEffect(() => {
		if (movieDetail) {
			setShow(true);
		}
		return () => {
		}
	}, [movieDetail])

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>{movieDetail?.Title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>Attori: {movieDetail?.Actors}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalDetail;