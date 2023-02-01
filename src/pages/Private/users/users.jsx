import React, { useRef, useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import PageContainer from "../../../components/container/page-container/page-container.jsx";
import WaiteroTextField from "../../../components/text-field/waitero-text-field.jsx";
import SearchIcon from '@material-ui/icons/Search';
import UsersTable from "../../../components/table/users-table.jsx"
import { InputAdornment } from "@material-ui/core";
import { getUsers } from "../../../api/api-admin/admin-requests.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { cleanErrorMessage } from "../../../redux/types/AdminTypes.js";
import WaiteroAlert from "../../../components/alert/alert.jsx";

const UsersPage = ({ adminReducer, cleanErrorMessage, getUsers }) => {

  const isScreenMounted = useRef(true)

  // eslint-disable-next-line
  const [searched, setSearched] = useState('')

  useEffect(() => {
    if (!isScreenMounted.current) return;
    else {
      getUsers()
    }
    return () => isScreenMounted.current = false;
    // eslint-disable-next-line
  }, [])
  return (
    <PageContainer>
      <Box
        width="90%"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        paddingBottom="2%"
      >
        <Box textAlign="left" fontSize="35px">
          Utilizatori
        </Box>
      </Box>
      <Box
        width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box textAlign="left" fontSize="35px">
          <WaiteroTextField variant="outlined" label="Cauta un utilizator" fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />
        </Box>
      </Box>
      <Box width="90%" display="flex" flexDirection="column" justifyContent="center" paddingTop="2%" >
        <UsersTable searched={searched} />
      </Box>
      <WaiteroAlert isError={adminReducer.hasErrors} message={adminReducer.message} cleanError={() => cleanErrorMessage()} />
    </PageContainer>
  );
};

const mapStateToProps = (state) => ({
  adminReducer: state.adminReducer,
});

const mapDispatchToProps = (dispatch) => ({
  cleanErrorMessage: () => dispatch(cleanErrorMessage()),
  getUsers: (loadingSetter) => dispatch(getUsers(loadingSetter))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersPage))
