import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useMemberStore } from '@/app/store/MyStore/MembersStore';
import AssignmentModal from '../../assignment_UI/AssignmentModal'; // Make sure to import your AssignmentModal

interface Data {
  [key: string]: string | number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  data: Data[];
  headCells: HeadCell[];
  title: string;
  dense?: boolean;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onDelete?: (myId: string) => void;
  onFilter?: () => void;
  renderRowActions?: (row: Data) => React.ReactNode;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  data,
  headCells,
  title,
  dense = false,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  onDelete,
  onFilter,
  renderRowActions,
}) => {
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>(headCells[0].id);
  const [selected, setSelected] = React.useState<string | null>(null); // Single selection
  const [selectedName, setSelectedName] = React.useState<string | number | null>(null); // Single selection
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [openModal, setOpenModal] = React.useState(false);
  const [currentAssignment, setCurrentAssignment] = React.useState<Data | null>(null);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map(n => n.id as string);
      setSelected(newSelected[0]); // Select the first item if 'select all' is checked
    } else {
      setSelected(null);
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string, n: string | number) => {
    console.log('to delete');
    console.log(id);
    console.log(n);
    if (selected === id) {
      setSelectedName(null);
      setSelected(null); // Deselect if the same row is clicked again
    } else {
      setSelected(id);
      setSelectedName(n);
    }
  };

  const handleOpenModal = (assignment: Data) => {
    setCurrentAssignment(assignment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentAssignment(null);
  };

  return (
    <Box sx={{ width: '90%vw', margin: '0 auto' }} lg={{ width: '90%', margin: '0 auto' }}> {/* Centered and set width to 90% */}
      <Paper sx={{ width: '100%', mb: 2, margin: 0, padding: 0 }}>
        <Toolbar
          sx={[
            { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
            selected && {
              bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            },
          ]}
        >
          {selected ? (
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
              {selectedName} sélectionné
            </Typography>
          ) : (
            <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
              {title}
            </Typography>
          )}
          {selected ? (
            <Tooltip title="Supprimer">
              <IconButton onClick={() => onDelete(selected)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filtrer la liste">
              <IconButton onClick={onFilter}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} width='100%' size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => {
                        const isAsc = orderBy === headCell.id && order === 'asc';
                        setOrder(isAsc ? 'desc' : 'asc');
                        setOrderBy(headCell.id);
                      }}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span style={visuallyHidden}>
                          {order === 'desc' ? 'trié par décroissant' : 'trié par croissant'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {/* Remove the attachments column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  const isItemSelected = selected === row.id;
                  const labelId = `enhanced-table-checkbox-${row.id}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row._id as string, row.Title)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {headCells.map(headCell => (
                        <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                          {/* Display only a small piece of content for the description */}
                          {headCell.id === 'description' ? (
                            <>
                              {row[headCell.id].toString().substring(0, 20)}... {/* Shortened description */}
                              <button onClick={() => handleOpenModal(row)}>View More</button> {/* Button to open modal */}
                            </>
                          ) : (
                            row[headCell.id]
                          )}
                        </TableCell>
                      ))}
                      {renderRowActions && <TableCell>{renderRowActions(row)}</TableCell>}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={event => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
      
      {/* Assignment Modal */}
      <AssignmentModal
        open={openModal}
        onClose={handleCloseModal}
        assignment={currentAssignment}
      />
    </Box>
  );
};

export default EnhancedTable;
