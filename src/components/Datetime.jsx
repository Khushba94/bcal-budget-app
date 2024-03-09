import React from 'react'

var DateTime = () => {
  var showDate = new Date();
  var displayTodaysDate = showDate.getDate()+'/'+showDate.getMonth()+'/'+showDate.getFullYear();
  return (
    <div className="fs-5" variant="outline-primary">
    {displayTodaysDate}
    </div>
  )
}

export default DateTime;
