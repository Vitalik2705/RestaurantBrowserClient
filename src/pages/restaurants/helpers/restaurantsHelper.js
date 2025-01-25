export function getCombinedTablesInfo(diningTables) {
  const combinedTables = diningTables.reduce((acc, table) => {
    const existingTable = acc.find((t) => t.capacity === table.capacity);

    if (existingTable) {
      existingTable.count += 1;
    } else {
      acc.push({ capacity: table.capacity, count: 1 });
    }

    return acc;
  }, []);

  return combinedTables.map((table) => (
    <div key={table.capacity} className="dining-table-item">
      {`${table.count} ${table.count === 1 ? 'стіл' : 'столів'} для ${table.capacity} людей`}
    </div>
  ));
}

export const getPriceSymbol = (priceCategory) => {
  switch (priceCategory) {
    case 'LOW':
      return '$';
    case 'MEDIUM':
      return '$$';
    case 'HIGH':
      return '$$$';
    default:
      return '';
  }
};

export const handleAddressClick = (restaurant) => {
  const { latitude, longitude } = restaurant.address;
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapUrl, '_blank');
};