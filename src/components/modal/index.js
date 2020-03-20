import React, { useRef } from 'react';
import { CircularProgress, Modal, Backdrop } from '@material-ui/core';
import { useMainStore } from '../../store';
import { useObserver } from 'mobx-react';

export default function ModalWrap() {
    const
        wrapImage = useRef(null),
        store = useMainStore();

    const getAdditional = (id) => {
		return fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
			.then(resp => resp.json())
			.then(async resp => {
				if (resp) {
					return {
						...resp.flavor_text_entries.find(text => text.language.name === 'en' && text.version.name === 'x')
					};
				}
			}).catch(error => {
				return {};
			});
	};

    const loadImage = (item) => {
		const image = document.createElement('img');
		image.srcset = `https://pokeres.bastionbot.org/images/pokemon/${store.modal.id}.png`;
		
		image.onload = async () => {
			item.desc = await getAdditional(item.id);
            wrapImage.current.append(image);
            store.setLoadingImage(false);
		};
	};

    return useObserver(() => (
        <Modal
            open={store.modal ? true : false}
            onClose={() => {store.setModal(false)}}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            onRendered={() => {loadImage(store.modal)}}
        >
            <div className="modal__body">
                {!store.loadingImage && <div className="modal__title">{store.modal.name}</div>}

                <div className="modal__image" ref={wrapImage}>
                    {store.loadingImage && <div className="progress">
                        <CircularProgress color="primary"/>
                    </div>}
                </div>

                {store.modal.desc && <div className="modal__desc">{store.modal.desc.flavor_text}</div>}
            </div>
        </Modal>
    ));
};