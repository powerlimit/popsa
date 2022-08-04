import {useState} from "react";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay
} from "@dnd-kit/core";
import {
	sortableKeyboardCoordinates,
	useSortable
} from "@dnd-kit/sortable";

import {DraggableImage, PrintPhoto} from "./styles";

export const DndContextWrap = ({children, items, setItems}) => {
	const [activeItem, setActiveItem] = useState(null);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragStart = (e) => {
		setActiveItem(e.active)
	}

	const handleDragEnd = (e) => {
		const {active, over} = e
		if (activeItem !== over.id) {
			const newItems = JSON.parse(JSON.stringify(items));
			const currentContainerId = active.data.current.sortable.containerId
			const newContainerId = over.data.current.sortable.containerId
			const prevImages = newItems[Number(currentContainerId)].images
			const imagesToUpdate = newItems[Number(newContainerId)].images
			const oldIndex = prevImages.indexOf(active.id)
			const newIndex = imagesToUpdate.indexOf(over.id)
			prevImages[oldIndex] = over.id
			imagesToUpdate[newIndex] = active.id
			setItems(newItems)
		}
	}

	return <DndContext
		collisionDetection={closestCenter}
		sensors={sensors}
		onDragStart={handleDragStart}
		onDragEnd={handleDragEnd}
		id="dnd-context"
	>
		{children}
		<DragOverlay>
			{activeItem && <DraggableImage src={activeItem.id} />}
		</DragOverlay>
	</DndContext>
}

export const Sortable = ({image}) => {
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
		opacity: isDragging ? .5 : 1
	};


	return (
		<PrintPhoto ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<img src={image} alt="" />
		</PrintPhoto>
	);
}
