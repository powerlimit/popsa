import {useState} from "react";
import {
	closestCenter,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {DraggableImage} from "../styles";

export default function DndContextWrap({children, items, setItems}) {
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

	const handleDragEnd = ({active, over}) => {
		if (activeItem !== over.id) {
			const newItems = JSON.parse(JSON.stringify(items));

			const {containerId: currentContainerId} = active.data.current.sortable
			const {containerId: newContainerId} = over.data.current.sortable
			const {images: prevImages} = newItems[Number(currentContainerId)]
			const {images: imagesToUpdate} = newItems[Number(newContainerId)]

			const oldIndex = prevImages.indexOf(active.id)
			const newIndex = imagesToUpdate.indexOf(over.id)

			prevImages[oldIndex] = over.id
			imagesToUpdate[newIndex] = active.id
			setItems(newItems)
		}
	}

	return (
		<DndContext
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
	)
}