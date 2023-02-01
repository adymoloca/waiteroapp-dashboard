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
import DeleteModalWithIcon from '../modal/delete-modal-icon.jsx'

const columns = [
    { id: 'name', label: 'Nume', minWidth: 40 },
    { id: 'email', label: 'Email', minWidth: 30 },
    { id: 'phone', label: 'Numar de telefon', minWidth: 30 },
    { id: 'createdAt', label: 'Creat in', minWidth: 20 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 550,
    },
});

const UsersTable = ({ users, searched }) => {
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

    const getRows = (usersData) => {
        const newdata = usersData?.filter((el) => el.name.includes(searched) || el.email.includes(searched) || el.phone.includes(searched)).map((user) => {
            const { name, email, phone, createdAt, _id } = user;
            return {
                name: name,
                email: email,
                phone: phone,
                createdAt: createdAt,
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
                                key={'actions'}
                                align={'center'}
                                style={{
                                    width: 50,
                                    fontSize: '18px',
                                    fontWeight: '600',
                                }}
                            >
                                Actiuni
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRows(users)
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                return (
                                    <TableRow key={row.phone + index.toString()}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    size="small"
                                                    width={column.minWidth}
                                                    key={column.id}
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
                                            key={'actions'}
                                            align={'center'}
                                        >
                                            <DeleteModalWithIcon type={'user'} message={'Sunteti sigur de stergerea acestui user?'} userId={row.id} />
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

const mapStateToProps = (state) => ({ users: state.adminReducer.users || [] });

export default connect(mapStateToProps, null)(UsersTable);
