import React, {useState} from 'react';
import {Box} from '@material-ui/core';
import CarroDatePicker from '../../../components/date-picker/carro-date-picker.jsx';
import PageContainer from '../../../components/container/page-container/page-container.jsx';
import GeneralStatistics from './general-statistics/general-statistics.jsx';
import './statisticsStyle.jsx';

const StatisticsPage = () => { 

  const [dateValue, setDateValue] = useState((new Date()));

  return (
        <PageContainer>
            <Box width='90%' display='flex' flexDirection={'column'} justifyContent='center'>
              <Box textAlign='left'  fontSize='35px'>
                Statistici
              </Box>
              <Box paddingTop='1%' fontSize='18px' fontStyle='italic'>
                Alege data pentru a vedea statistici
              </Box>
              <Box paddingTop='1%' fontSize='18px' fontStyle='italic' width='250px'>
                <CarroDatePicker value={dateValue} onChange={(date)=>setDateValue(date)} disableFuture/>
              </Box>
            </Box>
            <Box width='90%' marginTop='20px' display='flex' flexDirection='column' justifyContent='center'>
              <Box textAlign='left'  fontSize='35px'>
                Statistici generale
              </Box>
              <Box paddingTop='2%'>
                <GeneralStatistics/>
              </Box>
            </Box>
        </PageContainer>
  );
}

export default StatisticsPage;
