import {copy} from '../../data/copy';
import PageHeading from '../../components/PageHeading';
import { absolute } from '../../lib/urls';
export const metadata = { description: copy["n91"], title: copy["n39"], alternates: { canonical: absolute('/privacy/') } };
export default function Page() { return <><PageHeading label="PRIVACY / DEMO NOTICE" title={copy["n90"]} description={copy["n91"]}/><article className="prose"><h2>{copy["n92"]}</h2><p>{copy["n93"]}</p><h2>{copy["n94"]}</h2><p>{copy["n95"]}</p><h2>{copy["n96"]}</h2><p>{copy["n97"]}</p></article></>; }
