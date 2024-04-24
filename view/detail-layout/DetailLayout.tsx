import './DetailLayout.css';
import {Card} from "../../data/Card.model";
import {StageContent} from "../../data/StageContent.data";
import {ConceptContent} from "../../data/ConceptContent.data";
import React, {useEffect, useState, useRef, ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import {Galleria} from "primereact/galleria";
import {ProgressSpinner} from 'primereact/progressspinner';

function DetailLayout(props: {type: string, value: string}): ReactElement {
	const card: Card | undefined = getCard(props.type, props.value);

	function getCard(type: string, value: string): Card | undefined {
		if (!type || !value) { return undefined; }

		let card;
		if (type === 'stage') {
			card = StageContent.filter((card: Card) => { return card.path === `${type}/${value}`; }).at(0);
		} else if (type === 'concept') {
			card = ConceptContent.filter((card: Card) => { return card.path === `${type}/${value}`; }).at(0);
		}

		return card
	}

	const navigate = useNavigate();
	const [data, setData] = useState<any>(null);

	useEffect((): void => {
		/* Scroll to top */
		window.scrollTo(0, 0);

		/* Verify path */
		if (!card) { navigate("/"); }

		/* Image data request */
		getImageData(card?.resource)
			.then(response => response.json())
			.then(data => setImageData(data))
			.then(() => setProgressSpinnerStyle("hidden"));
	}, [navigate, card]);

	async function getImageData(resource: String | undefined) {
		return await fetch(`/resources/${resource}`);
	}

	function setImageData(data: String[]): void {
		const imageDataArray: Object[] = [];
		data?.forEach((path: String) => {
			const absolutePath = `/${path}`;
			imageDataArray.push({
				"itemImageSrc": absolutePath,
				"thumbnailImageSrc": absolutePath,
				"title": "",
				"alt": ""
			});
		});

		setData(imageDataArray);
	}

	const galleria = useRef<Galleria>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [progressSpinnerStyle, setProgressSpinnerStyle] = useState<string>("");

	const itemTemplate = (item: any) => {
		return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
	}

	const captionTemplate = (item: any) => {
		return <p className="text-700 font-italic my-0">Photo by {card?.imageAttribution}</p>;
	}

	return (
		<>
			<div className="border-bottom-1 border-gray-800 border-round-xl">
				<div className="text-2xl lg:text-3xl font-medium text-700 text-center">
					{card?.title}
				</div>
				<div className="text-sm lg:text-base font-medium text-700 text-center mb-4 flex flex-column lg:flex-row justify-content-center">
					<div className="hidden lg:block">{card?.text[0]} | {card?.text[1]} | </div>
					<div className="block lg:hidden">{card?.text[0]} | {card?.text[1]}</div>
					<div>{card?.text[2]}</div>
				</div>
			</div>
			<div className="pt-4 card flex justify-content-center">
				<ProgressSpinner className={progressSpinnerStyle} />
				<Galleria ref={galleria} value={data} item={itemTemplate} caption={captionTemplate}
						  style={{ maxWidth: '1000px' }} onItemChange={ (e) => setActiveIndex(e.index) }
						  circular fullScreen showItemNavigators showThumbnails={false} activeIndex={activeIndex} />
				<div className="grid" style={{ maxWidth: '2000px' }}>
					{
						data && data.map((image: any, index: number) => {
							return (
								<div className="col-6 lg:col-3" key={index}>
									<img src={image.thumbnailImageSrc} alt={image.alt}
										 className="border-round shadow-1 transition" style={{ height: '100%', width: '100%', cursor: 'pointer' }}
										 onClick={ () => { setActiveIndex(index); galleria.current!.show() } } />
								</div>
							)
						})
					}
				</div>
			</div>
		</>
    );
}

export default DetailLayout;
