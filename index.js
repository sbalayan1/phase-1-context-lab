let createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

let createEmployeeRecords = (arrayOfEmployees) => arrayOfEmployees.map(employee => createEmployeeRecord(employee))

let createTimeInEvent = function(input) {
    let [d, h] = input.split(' ')

    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(h, 10),
        date: d
    })

    return this
}


let createTimeOutEvent = function(input) {
    let [d, h] = input.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(h, 10),
        date: d,
    })

    return this
}

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(record => record.date === date)
    let timeOut = this.timeOutEvents.find(record => record.date === date)
    let hoursWorked = ((timeOut.hour - timeIn.hour)/100)

    return hoursWorked
}

let wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    let wages = hours * this.payPerHour
    return wages
}

let findEmployeeByFirstName = (employees, firstName) => {
    let employee = employees.find(employee => employee.firstName === firstName)
    return employee
}

let calculatePayroll = (employee) => {
    let totalWages = employee.reduce((memo, record) => memo + allWagesFor.call(record), 0)
    return totalWages
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

