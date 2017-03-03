workflow

populate current orders:
  if (orders.status = "placed") {
    populate element to current orders
  }
  if (orders.ready_time != null) {
    remove from current orders;
  }

populate orders in queue:
  if (orders.ready_time != null) {
    populate element to queue;
  }
  if (orders.status = "completed") {
    remove from queue;
  }

onsubmit of order, add ready_time to order_id in database by ajax data: $(this).serialize()?
