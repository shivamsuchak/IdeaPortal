import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array?.map((el, index) => [el, index])
	stabilizedThis?.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis?.map((el) => el[0])
}

const headCells = [
	{ id: 'S.no', numeric: true, disablePadding: false, label: 'S.no' },
	{ id: 'ideaName', numeric: false, disablePadding: false, label: 'Name' },
	{
		id: 'ideaDescription',
		numeric: false,
		disablePadding: false,
		label: 'Description',
	},
	{
		id: 'ideaDocxURL',
		numeric: false,
		disablePadding: false,
		label: 'Document',
	},
	{ id: 'ideaDate', numeric: false, disablePadding: false, label: 'Date' },
	{
		id: 'ideaSubmittedBy',
		numeric: false,
		disablePadding: false,
		label: 'Submitted By',
	},
	{
		id: 'More Info',
		numeric: false,
		disablePadding: false,
		label: 'More Info',
	},
]

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						// align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}))

export default function NewTableForIdeas({ ideas }) {
	const classes = useStyles()
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [dense, setDense] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const router = useRouter()

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = ideas.map((n) => n.name)
			setSelected(newSelecteds)
			return
		}
		setSelected([])
	}

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const handleChangeDense = (event) => {
		setDense(event.target.checked)
	}

	const isSelected = (name) => selected.indexOf(name) !== -1

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, ideas?.result.length - page * rowsPerPage)

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}
						aria-label='enhanced table'>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={ideas?.length}
						/>
						<TableBody>
							{stableSort(ideas?.result, getComparator(order, orderBy))
								?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								?.map((idea, index) => {
									const isItemSelected = isSelected(idea.name)
									const labelId = `enhanced-table-checkbox-${index}`

									return (
										<TableRow
											hover
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={idea.ideaName}>
											<TableCell align='left'>{index + 1}</TableCell>
											<TableCell align='left'>{idea.ideaName}</TableCell>
											<TableCell align='left'>{idea.ideaDescription}</TableCell>
											<TableCell align='left' style={{ color: 'blue' }}>
												<Link
													href={
														'/theme/' +
														router.query.themeid +
														'/ideas/' +
														router.query.ideaid +
														'/ideadocuments'
													}
													as={
														'/theme/' +
														router.query.themeid +
														'/ideas/' +
														idea.ideaID +
														'/ideadocuments'
													}>
													Check out all documents
												</Link>
											</TableCell>
											<TableCell align='left'>
												{idea.ideaDate.substring(0, 10)}
											</TableCell>
											<TableCell align='left'>{idea.user.userName}</TableCell>
											<TableCell align='left' style={{ color: 'blue' }}>
												<Link
													href={
														'/theme/' +
														router.query.themeid +
														'/ideas/' +
														idea.ideaID
													}
													as={
														'/theme/' +
														router.query.themeid +
														'/ideas/' +
														idea.ideaID
													}>
													<a>More Info</a>
												</Link>
											</TableCell>
										</TableRow>
									)
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={ideas?.result.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	)
}
