import { SideBody, FlexBody, MainHeader, Search } from "../components";

function Home() {
  return (
    <>
      <SideBody mw="md">
        <FlexBody mw="md" jc="center">
          <MainHeader name={process.env.NEXT_PUBLIC_APPNAME} />
          <Search />
        </FlexBody>
      </SideBody>
    </>
  );
}

export default Home;
