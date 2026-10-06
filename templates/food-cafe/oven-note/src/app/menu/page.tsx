import {copy} from '../../data/copy';
import { MenuBoard, PairMaker } from '../../components/Interactive';
import PageHeading from '../../components/PageHeading';
import { absolute } from '../../lib/urls';
export const metadata = { description: copy["n44"], title: copy["n42"], alternates: { canonical: absolute('/menu/') } };
export default function Page() { return <><PageHeading label="THE LITTLE MENU" title={copy["n43"]} description={copy["n44"]}/><section className="section"><MenuBoard /></section><section className="section pair" id="pair"><PairMaker /></section></>; }
