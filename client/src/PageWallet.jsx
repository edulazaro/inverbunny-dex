import Wallet from "./Wallet.jsx";

function PageWallet({
  web3,
  user,
  deposit,
  withdraw,
}) {
  return (
    <main className="container-fluid">
      <div id="wallet" className="p-2 row">
        <div className="col-sm-4 first-col mx-auto">
          <div>
            <Wallet
              web3={web3}
              user={user}
              deposit={deposit}
              withdraw={withdraw}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageWallet;
