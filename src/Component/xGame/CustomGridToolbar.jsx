import React from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport,gridExpandedSortedRowIdsSelector ,GridToolbarFilterButton,useGridApiContext,} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';
const CustomGridToolbar = () => {
  const getRowsFromCurrentPage = ({ apiRef }) =>
  gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);

const getFilteredRows = ({ apiRef }) => gridExpandedSortedRowIdsSelector(apiRef);

const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt',
);
const apiRef = useGridApiContext();

const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

const buttonBaseProps = {
  color: 'primary',
  size: 'small',
  startIcon: <ExportIcon />,
};

  return (
    <GridToolbarContainer>
    <GridToolbarFilterButton />
    {/* <GridToolbarExport printOptions={{ disableToolbarButton: true }}/> */}
    <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getFilteredRows })}
      >
        Download
      </Button>
  </GridToolbarContainer>
  )
}

export default CustomGridToolbar