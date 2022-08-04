import Actions from "./actions";
import {Header, PrintWrapper, Title, Wrapper} from "./styles";
import PrintPhotos from "./PrintPhotos";

export default function PrintPage({ data }) {
  return (
    <Wrapper>
      {Object.values(data).map(({title, images}, i) => {
        return (
          <PrintWrapper key={i}>
            <Header>
              <Title>{title}</Title>
              <Actions />
            </Header>
            <PrintPhotos images={images} />
          </PrintWrapper>
        );
      })}
    </Wrapper>
  );
}