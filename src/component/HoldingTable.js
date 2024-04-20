import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Typography,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({}); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://canopy-frontend-task.now.sh/api/holdings'
        );
        const data = response.data.payload;

        if (Array.isArray(data)) {
          setHoldings(data); 
          setError(null);
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setHoldings([]);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  const groupedHoldings = groupBy(holdings, 'asset_class');

  const toggleGroup = (assetClass) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [assetClass]: !prev[assetClass],
    }));
  };

  return (
    <div className='bg-sky-100 p-6'>
    <TableContainer component={Paper} className='p-6'>
      {Object.keys(groupedHoldings).map((assetClass) => (
        <div key={assetClass} >
          <TableRow>
            <TableCell colSpan={7}>
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => toggleGroup(assetClass)} 
                >
                  {expandedGroups[assetClass] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
                <Typography variant="h6" component="div">
                  {assetClass} ({groupedHoldings[assetClass].length})
                </Typography>

              </Box>
            </TableCell>
          </TableRow>
          <Collapse in={expandedGroups[assetClass]} timeout="auto" unmountOnExit>
            <Table className='border shadow-xl'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Ticker</TableCell>
                  <TableCell>Average Price</TableCell>
                  <TableCell>Market Price</TableCell>
                  <TableCell>Latest Change Percentage</TableCell>
                  <TableCell>Market Value in Base CCY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='bg-sky-100 p-6'>
                {groupedHoldings[assetClass].map((holding, index) => (
                  <TableRow key={index}>
                    <TableCell>{holding.name}</TableCell>
                    <TableCell>{holding.ticker}</TableCell>
                    <TableCell>{holding.avg_price}</TableCell>
                    <TableCell>{holding.market_price}</TableCell>
                    <TableCell>{holding.latest_chg_pct}</TableCell>
                    <TableCell>{holding.market_value_ccy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </div>
      ))}
    </TableContainer>
    </div>
  );
};

export default HoldingsTable;
