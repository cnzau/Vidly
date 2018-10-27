import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  // _(items)convert items array into lodash wrapper to have it as an object
  //  then chain it with methods
  // _.slice(items, startIndex) slice array from startidx
  // _.take() go to array and pick items from the array
}
