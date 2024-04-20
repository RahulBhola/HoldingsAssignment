Here is the final project Image that looks like

Build a single-page React application that displays the holdings table
Stack to use
- Frontend framework - React.js latest version is preferred.
- We prefer to use material-ui
- Date parsing - you’re free to use Dayjs 
- Rest API client
- For table axios

Holdings Table
- Dataset to use is available as an API at https://canopy-frontend-task.now.sh/api/holdings
- JSON object with a field payload containing an array of JSON objects
- Each JSON object contains multiple properties, of which the following are to be displayed
in the table
- Name of the holding - name (string)
- Ticker - ticker (string)
- The asset class it belongs to - asset_class (string)
- Average price - avg_price (float)
- Market Price - market_price (float)
- Latest change percentage - latest_chg_pct (float)
- Market Value in Base CCY - market_value_ccy (float)
Bonus! if possible, group the rows based on asset_class.
- All holdings belonging to the same asset_class should be displayed together
Double bonus!
- Grouped holdings can be expanded or collapsed

Used imports
npx create-react-app holdings-table
cd holdings-table
npm install @material-ui/core @material-ui/icons axios dayjs


![image](https://github.com/RahulBhola/HoldingsAssignment/assets/104344946/7d564ca3-4dc6-4521-afbb-c7ddd0012fb6)
