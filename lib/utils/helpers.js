// Given an order, return calculated subtotal, gst, pst, and total object
module.exports = {
  calOrderTotals: (arrOrder) => {
    const totals = {
        subtotal: 0,
        gst     : 0,
        pst     : 0,
        total   : 0
      };
    arrOrder.forEach( function(item) {
      itemTotal = Number(item.quantity) * item.price;
      totals.subtotal += itemTotal;
    });
    totals.gst = totals.subtotal * 0.05;
    totals.pst = totals.subtotal * 0.07;
    totals.total = totals.subtotal + totals.gst + totals.pst;

    return totals;
  },
  stringifyOrder: (arr) => {
    let stringOrder = "";

    arr.forEach((obj) => {
      stringOrder += obj.quantity;
      stringOrder += "%20";
      stringOrder += (obj.name + "s");
      stringOrder += ",";
    });
    stringOrder = stringOrder.replace(/[’]/g, "");
    stringOrder = stringOrder.replace(/\s/g, "%20");
    stringOrder = stringOrder.replace("-", "%20");

    return stringOrder;
  },
  groupQuery: (arr) => {
    const newObject = {};

    for(eachobject of arr) {
      const objectId = eachobject.order_id;
      const temp = {
        order_id: eachobject["order_id"],
        quantity: [eachobject["quantity"]],
        username: eachobject["username"],
        phone_number: eachobject["phone_number"],
        status: eachobject["status"],
        name: [eachobject["name"]],
        ready_time: eachobject["ready_time"]
      };

      if(! newObject[objectId]) {
        newObject[objectId] = temp;
      } else {
        newObject[objectId].name.push(temp.name.toString());
        newObject[objectId].quantity.push(temp.quantity.toString());
      }
    }
  return newObject;
  }
};