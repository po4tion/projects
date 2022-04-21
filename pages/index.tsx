import { SideBody, FlexBody, Header, Search } from "../components";

function Home() {
  return (
    <SideBody mw="lg">
      <FlexBody mw="lg">
        <Header name={process.env.NEXT_PUBLIC_APPNAME} />
        <Search />
      </FlexBody>
    </SideBody>
  );
}

export default Home;
