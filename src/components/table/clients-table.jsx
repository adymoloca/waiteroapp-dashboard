import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@material-ui/core';
import DeleteModalWithIcon from '../modal/delete-modal-icon.jsx';
import LockModalSwitch from '../modal/lock-modal-icon.jsx';

const columns = [
    { id: 'name', label: 'Nume', minWidth: 20 },
    { id: 'email', label: 'Email', minWidth: 20 },
    { id: 'phone', label: 'Numar de telefon', minWidth: 20 },
    { id: 'restaurants', label: 'Restaurante', minWidth: 10 },
    { id: 'restaurantName', label: 'Nume restaurant', minWidth: 20 }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 550,
    },
});

const ClientsTable = ({ clients, searched }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(rowsPerPage + event.target.value);
        setPage(0);
    };

    const getRows = (clientsData) => {
        const newdata = clientsData.filter((el) => el.name.includes(searched) || el.email.includes(searched) || el.phone.includes(searched)).map((client) => {
            const { name, email, phone, restaurants, isBlocked, _id } = client;
            return {
                name: name,
                email: email,
                phone: phone,
                restaurants: restaurants.length,
                restaurantName: restaurants[0]?.restaurantName || '',
                isBlocked: isBlocked,
                id: _id
            };
        });
        return newdata;
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id + index.toString()}
                                    align={column.align}
                                    style={{
                                        width: column.minWidth,
                                        fontSize: '18px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key={'active'}
                                align={'center'}
                                style={{
                                    width: 20,
                                    fontSize: '18px',
                                    fontWeight: '600',
                                }}
                            >
                                Activ
                            </TableCell>
                            <TableCell
                                key={'actions'}
                                align={'center'}
                                style={{
                                    width: 20,
                                    fontSize: '18px',
                                    fontWeight: '600',
                                }}
                            >
                                Actiuni
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRows(clients)
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                return (
                                    <TableRow key={row.phone + index.toString()}>
                                        {columns.map((column, index2) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    size="small"
                                                    width={column.minWidth}
                                                    key={column.id + index2}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                        typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell
                                            size="small"
                                            width={20}
                                            key={'active' + row.id}
                                            align={'center'}
                                        >
                                            <LockModalSwitch isBlocked={row.isBlocked} clientId={row.id} />
                                        </TableCell>
                                        <TableCell
                                            size="small"
                                            width={20}
                                            key={'actions' + row.id}
                                            align={'center'}
                                        >
                                            <DeleteModalWithIcon type={'client'} message={'Sunteti sigur de stergerea acestui client?'} clientId={row.id} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={clients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

const mapStateToProps = (state) => ({ clients: state.adminReducer.clients });

export default connect(mapStateToProps, null)(ClientsTable);
