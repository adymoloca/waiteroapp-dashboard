import React from 'react';
import { Box } from '@material-ui/core';
import PageContainer from '../../../components/container/page-container/page-container.jsx';
import GeneralStatistics from '../statistics/general-statistics/general-statistics.jsx';
import ActiveSubscriptions from './subscriptions/subscriptions.jsx';

const HomePage = () => {

  return (
    <PageContainer>
      <Box width='90%' display='flex' flexDirection='column' justifyContent='center'>
        <Box textAlign='left' fontSize='35px'>
          Statistici generale
        </Box>
        <Box paddingTop='2%'>
          <GeneralStatistics />
        </Box>
      </Box>
      <Box width='90%' display='flex' flexDirection='column' justifyContent='center' paddingTop='2%'>
        <Box textAlign='left' fontSize='35px'>
          Abonati
        </Box>
        <Box paddingTop='2%' width={'100%'}>
          <ActiveSubscriptions />
        </Box>
      </Box>
    </PageContainer>
  )
}

export default HomePage;
