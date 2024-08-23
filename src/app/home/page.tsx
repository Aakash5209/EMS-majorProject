'use client'

import React from 'react';
import Sidebar from './MainContainer/Sidebar';
import {useAppSelector} from '../../lib/store/hooks/index'
import Info from './MainContainer/Info';
import ManageApproval from './ManageApproval/ManageApproval';
import ManageSalary from './ManagerSalary/ManageSalary';
import ManageUsers from './ManageUser/ManageUsers';

export interface HomePageProps {
  username: string;
  email: string;
  role: string;
  reporting_manager: string
}

const Home: React.FC = () => {
  const activeTabreducer = useAppSelector(state=>state.tab.activeTab)
  

  return (
      <div className="flex">
        <Sidebar />
        {
          activeTabreducer === 'Home' && <Info  />
        }
        {
          activeTabreducer === 'Manage Users' && <ManageUsers/>
        }
        {
          activeTabreducer === 'Manage Salary' && <ManageSalary/>
        }
        {
          activeTabreducer === 'Manage Approval' && <ManageApproval/>
        }
      </div>
  );
};

export default Home;
