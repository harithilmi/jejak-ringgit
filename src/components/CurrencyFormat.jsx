import PropTypes from 'prop-types'

const CurrencyFormat = ({ value, displayType }) => {
  const formatCurrency = (amount) => {
    const numberFormat = new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return numberFormat.format(amount).replace('RM', '').trim();
  };

  const formattedValue = formatCurrency(value);
  
  if (displayType === 'text') {
    return <span>{formattedValue}</span>;
  }
  
  return null;
};

CurrencyFormat.propTypes = {
  value: PropTypes.number.isRequired,
  displayType: PropTypes.string.isRequired
}

export default CurrencyFormat;
