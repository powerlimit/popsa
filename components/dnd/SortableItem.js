import { useSortable } from "@dnd-kit/sortable";

import { PrintPhoto } from "../styles";

const OpacityConfig = {
	ACTIVE: 0.5,
	DEFAULT: 1
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
		opacity: isDragging ? OpacityConfig.ACTIVE : OpacityConfig.DEFAULT
	};

	return (
		<PrintPhoto ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<img src={image} alt="" />
		</PrintPhoto>
	);
}
