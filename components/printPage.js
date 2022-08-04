import styled from "styled-components";
import Actions from "./actions";
import { Reorder } from "framer-motion"
import {useState} from "react";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`;

const PrintWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const PageLayout = styled(Reorder.Group)`
  display: flex;
  flex-wrap: wrap;
  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;
  align-items: center;
  height: 225px;
`;

const PrintPhoto = styled(Reorder.Item)`
  width: calc(50% - 10px);
  background-position: center center;
  background-image: url(${({bg}) => bg});
  background-size: cover;
  height: 184px;
  list-style: none;
`;

const whileDragStyles = {
  border: '5px solid white',
  width: 184,
  borderRadius: '50%',
  objectFit: 'cover',
}


function PrintPhotos ({images}) {
  const [items, setItems] = useState([0, 1])

  return (
    <PageLayout values={items} onReorder={setItems}>
      {items.map((item) => {
        return (
          <PrintPhoto
            dragMomentum={false}
            whileDrag={whileDragStyles}
            bg={images[item]}
            key={item}
            value={item}
            drag
          />
        );
      })}
    </PageLayout>
  )
}

export default function PrintPage({ data }) {
  return (
    <Wrapper>
      {Object.values(data).map((entry, i) => {
        return (
          <PrintWrapper key={i}>
            <Header>
              <Title>{entry.title}</Title>
              <Actions />
            </Header>
            <PrintPhotos images={entry.images} />
          </PrintWrapper>
        );
      })}
    </Wrapper>
  );
}