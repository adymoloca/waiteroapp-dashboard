import React, { useEffect, useState, useRef } from 'react';
import './clients.jsx';
import { Box } from '@material-ui/core';
import PageContainer from '../../../components/container/page-container/page-container.jsx';
import WaiteroTextField from '../../../components/text-field/waitero-text-field.jsx';
import SearchIcon from '@material-ui/icons/Search';
import ClientsTable from '../../../components/table/clients-table.jsx';
import { InputAdornment } from '@material-ui/core';
import AddClientModal from '../../../components/modal/add-client-modal.jsx';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import WaiteroAlert from '../../../components/alert/alert';
import { cleanErrorMessage } from '../../../redux/types/AdminTypes.js';
import { getClients } from '../../../api/api-admin/admin-requests.js';

const Clients = ({ adminReducer, cleanErrorMessage, getClients }) => {

    const isScreenMounted = useRef(true);

    const [searched, setSearched] = useState('');

    useEffect(() => {
        if (!isScreenMounted.current) return;
        else {
            getClients()
        }
        return () => isScreenMounted.current = false;
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <PageContainer>
                <Box width="90%" display="flex" justifyContent="space-between" alignItems="baseline" paddingBottom="2%">
                    <Box textAlign="left" fontSize="35px">
                        Clienti
                    </Box>
                    <AddClientModal />
                </Box>
                <Box width="90%" display="flex" flexDirection="column" justifyContent="center" >
                    <Box textAlign="left" fontSize="35px">
                        <WaiteroTextField variant="outlined" value={searched} onChange={(e) => setSearched(e.target.value)} label="Cauta un client" fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>
                <Box width="90%" display="flex" flexDirection="column" justifyContent="center" paddingTop="2%" >
                    <ClientsTable searched={searched} />
                </Box>
                <WaiteroAlert isError={adminReducer.hasErrors} message={adminReducer.message} cleanError={() => cleanErrorMessage()} />
            </PageContainer>
        </>
    );
};

const mapStateToProps = (state) => ({
    adminReducer: state.adminReducer,
});

const mapDispatchToProps = (dispatch) => ({
    cleanErrorMessage: () => dispatch(cleanErrorMessage()),
    getClients: (loadingSetter) => dispatch(getClients(loadingSetter))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clients));
