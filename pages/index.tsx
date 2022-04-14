import { Body, FlexBody, Header, Search } from "../components";

function Home() {
  return (
    <Body mw="lg">
      <FlexBody mw="lg">
        <Header name="ApexStats" />
        <Search />
      </FlexBody>
    </Body>
  );
}

export default Home;
