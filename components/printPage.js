import {useState} from "react";
import {rectSortingStrategy, SortableContext} from "@dnd-kit/sortable";

import Actions from "./actions";
import {Header, PageLayout, PrintWrapper, Title, Wrapper} from "./styles";
import {DndContextWrap, Sortable} from "./dndComponents";

export default function PrintPage({ data }) {
  const [items, setItems] = useState(data)

  return (
    <DndContextWrap items={items} setItems={setItems}>
      <Wrapper>
        {Object.values(items).map((entry, i) => {
          return (
            <PrintWrapper key={i}>
              <Header>
                <Title>{entry.title}</Title>
                <Actions />
              </Header>
              <PageLayout>
                <SortableContext id={i.toString()} items={entry.images} strategy={rectSortingStrategy}>
                  {entry.images.map((image) => {
                    return <Sortable image={image} key={image}/>
                  })}
                </SortableContext>
              </PageLayout>
            </PrintWrapper>
          );
        })}
      </Wrapper>
    </DndContextWrap>
  );
}