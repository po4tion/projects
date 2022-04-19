import { Body, FlexBody, Header, Search } from "../components";

function Home() {
  return (
    <Body mw="lg">
      <FlexBody mw="lg">
        <Header name={process.env.NEXT_PUBLIC_APPNAME} />
        <Search />
      </FlexBody>
    </Body>
  );
}

export default Home;
