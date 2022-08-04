import { useSortable } from "@dnd-kit/sortable";

import { PrintPhoto } from "../styles";

const ON_DRAG_STYLES_CONFIG = {
	activeOpacity: 0.5,
	normalOpacity: 1
}

export default function SortableItem({image}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		isDragging,
	} = useSortable({
		id: image
	});

	const style = {
		zIndex: Number(isDragging),
		opacity: isDragging ? ON_DRAG_STYLES_CONFIG.activeOpacity : ON_DRAG_STYLES_CONFIG.normalOpacity
	};

	return (
		<PrintPhoto ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<img src={image} alt="" />
		</PrintPhoto>
	);
}
