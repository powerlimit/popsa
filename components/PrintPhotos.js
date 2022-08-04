import {useState} from "react";import {PageLayout, PrintPhoto, whileDragStyles} from "./styles";export default function PrintPhotos ({images}) {	const [items, setItems] = useState([0, 1])	return (		<PageLayout values={items} onReorder={setItems}>			{items.map((item) => {				return (					<PrintPhoto						dragMomentum={false}						whileDrag={whileDragStyles}						bg={images[item]}						key={item}						value={item}						drag					/>				);			})}		</PageLayout>	)}