import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const AwsTableDetail = ({ data }) => {
    const [copy,setCopy]=useState('');
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            color: theme.palette.common.black,
            fontSize: '18px',
            fontWeight: 600,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const copyToClipboard = async (text) => {
        try {
           const valueCopy = await navigator.clipboard.writeText(String(text) ?? '');
            setCopy(valueCopy);
            alert(`${text}`)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='mt-4'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead className='bg-sky-300'>
                        <TableRow>
                            {Object.keys(data[0]).map((key) => (
                                <StyledTableCell key={key} style={{ textTransform: "capitalize" }}>
                                    {key}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((data) => (
                            <StyledTableRow key={data.name}>
                                <StyledTableCell className='flex items-center gap-2'>{data.resourceId} <ContentCopyIcon className='cursor-pointer' onClick={() => copyToClipboard(data.resourceId)} /></StyledTableCell>
                                <StyledTableCell>{data.resourceName}</StyledTableCell>
                                {
                                    data.engine && <StyledTableCell>{data.engine}</StyledTableCell>
                                }
                                <StyledTableCell>{data.region}</StyledTableCell>
                                {
                                    data.desiredCapacity && <StyledTableCell>{data.desiredCapacity}</StyledTableCell>
                                }
                                {
                                    data.minSize && <StyledTableCell>{data.minSize}</StyledTableCell>
                                }
                                {
                                    data.maxSize && <StyledTableCell>{data.maxSize}</StyledTableCell>
                                }
                                <StyledTableCell>{data.status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AwsTableDetail