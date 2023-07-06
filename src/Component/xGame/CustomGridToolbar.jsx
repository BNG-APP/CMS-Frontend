import React from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport ,GridToolbarFilterButton} from '@mui/x-data-grid';
const CustomGridToolbar = () => {
  return (
    <GridToolbarContainer>
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
  )
}

export default CustomGridToolbar