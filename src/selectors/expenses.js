import moment from "moment";

// Get Visible expense

const getVisibleExpenses = (expenses, { text, kind, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch =
      startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch =
      endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = expense.description
      .toLowerCase()
      .includes(text.toLowerCase());
      const kindMatch = expense.kind
      .toLowerCase()
      .includes(kind.toLowerCase());
    return startDateMatch && endDateMatch && textMatch && kindMatch;
  })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

export default getVisibleExpenses;
