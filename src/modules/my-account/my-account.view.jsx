import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useMediaQuery } from "react-responsive";

import useMyAccountTabs, { MY_ACCOUNT_TAB } from './hooks/useMyAccountTabs'
import AccountUpdate from './update-my-account/update-my-account.view'
import PasswordUpdate from './update-password/update-password'
import Paper from '@material-ui/core/Paper'
import { UserInfoProvider } from './context/BottomPanelContext';

const MAPPED_MY_ACCOUNT = {
  [MY_ACCOUNT_TAB.accountInfo]: <AccountUpdate />,
  [MY_ACCOUNT_TAB.changePassword]: <PasswordUpdate />,
}

const tabs = [
  {
    label: 'Thông tin tài khoản',
    tab: MY_ACCOUNT_TAB.accountInfo,
    tag: 'accountInfo'
  },
  {
    label: 'Thay đổi mật khẩu',
    tab: MY_ACCOUNT_TAB.changePassword,
    tag: 'changePassword'
  },
]

const MyAccount = (props) => {
  const { currentTab, tabIndex, handleChangeTab } = useMyAccountTabs()
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <UserInfoProvider>
      <div className='tabs_acc'>
        {tabs.map(({ label, tab, tag }, index) => (
          <div key={index} className={`tab_item ${tag == currentTab ? 'active' : ''}`} onClick={() => handleChangeTab(tab)}>
            {label}
          </div>
        ))}
      </div>
      {/* <div className={`${isTabletOrMobile ? 'mb-5' : ''}`}>
        <Tabs
          orientation={`${isTabletOrMobile ? 'vertical' : 'horizontal'}`}
          value={tabIndex}
          aria-label="My account vertical tabs"
        >
          {tabs.map(({ label, tab }, index) => (
            <Tab key={index} label={label} onClick={() => handleChangeTab(tab)} style={isTabletOrMobile ? { alignSelf: 'flex-start' } : {}} />
          ))}
        </Tabs>
      </div> */}
      <Paper className="m-2 p-4">{MAPPED_MY_ACCOUNT[currentTab]}</Paper>
    </UserInfoProvider>
  )
}

export default MyAccount
