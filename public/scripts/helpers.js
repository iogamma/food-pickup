// Given an order, return calculated subtotal, gst, pst, and total object
module.exports = {
  calOrderTotals: (arrOrder) => {
    arrOrder.forEach( function(item) {
      const totals = {
        subtotal: 0,
        gst     : 0,
        pst     : 0,
        total   : 0
      }
      itemTotal = Number(item.quantity) * item.price;
      totals.subtotal += itemTotal;
    })
    totals.gst = totals.subtotal * 0.05;
    totals.pst = totals.subtotal * 0.07;
    totals.total = totals.subtotal + totals.gst + totals.pst;

    return totals;
  }
};