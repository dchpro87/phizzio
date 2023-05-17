import AddClient from './AddClient';
import NoClient from './NoClients';

export default function ClientsMain() {
  //  get all clients for this userId from db via api/v1/clients

  return (
    <>
      <NoClient />
      <AddClient />
    </>
  );
}
