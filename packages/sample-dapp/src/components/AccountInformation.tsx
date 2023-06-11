import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { formatPlatformCoin } from '../libs/platformCoin';
import { accountAtom, loginStatusAtom, networkAtom } from '../store';

function AccountInformation() {
  const isLoggedIn = useRecoilValue(loginStatusAtom);
  const account = useRecoilValue(accountAtom);
  const network = useRecoilValue(networkAtom)!;

  if (!isLoggedIn || !account || !account.balance || !account.address) {
    return null;
  }

  return (
    <div className="AccountInformation">
      <div className="notification is-primary is-light">
        {account.address && <div>Address: {account.address}</div>}
        {account.balance && <div>Balance: {formatPlatformCoin(account.balance, network)}</div>}
      </div>
    </div>
  );
}

export default AccountInformation;
