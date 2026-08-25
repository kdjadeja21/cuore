import Nav from "./components/Nav";
import Opening from "./components/Opening";
import Heart from "./components/Heart";
import Room from "./components/Room";
import Kitchen from "./components/Kitchen";
import Table from "./components/Table";
import Occasion from "./components/Occasion";
import Finale from "./components/Finale";

export default function Home() {
  return (
    <main id="top">
      <Nav />
      <Opening />
      <Heart />
      <Room />
      <Kitchen />
      <Table />
      <Occasion />
      <Finale />
    </main>
  );
}
